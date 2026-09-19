/**
 * Bénin Flight Watcher
 * ---------------------
 * Surveille voyage.benin.bj et alerte dès que la réservation s'ouvre.
 *
 * Secrets admin (`wrangler secret put <NOM>`) :
 *   NTFY_TOPIC           -> topic ntfy.sh (ex: "espoir-benin-alert-7x9k")
 *   RESEND_API_KEY       -> clé API Resend
 *   ALERT_EMAIL_FROM     -> adresse expéditrice vérifiée Resend
 *   ALERT_EMAIL_TO       -> ton adresse email (admin)
 *   TWILIO_ACCOUNT_SID   -> Twilio SID
 *   TWILIO_AUTH_TOKEN    -> Twilio token
 *   TWILIO_FROM_NUMBER   -> numéro Twilio (+33...)
 *   TWILIO_TO_NUMBER     -> ton numéro (+33...) [admin uniquement]
 *   TURNSTILE_SECRET_KEY -> clé secrète Cloudflare Turnstile (optionnel)
 *   ADMIN_SECRET         -> token Bearer pour /check, /reset, /test-notify, /admin/*
 *
 * Vars (wrangler.toml) :
 *   TARGET_URL                 -> URL à surveiller
 *   PLACEHOLDER_MARKERS        -> phrases qui signifient "pas encore ouvert"
 *   APP_BASE_URL               -> URL publique du Worker (pour les liens email)
 *   TURNSTILE_SITE_KEY         -> clé publique Turnstile (affichée dans le HTML)
 *   DEEP_ROUTES                -> routes profondes à sonder (HEAD), séparées par virgule
 *   GOV_RSS_URL                -> URL du flux RSS veille gouvernementale
 *   GOV_EXTRA_SOURCES          -> flux RSS supplémentaires, séparés par virgule (optionnel)
 *   STALE_CHECK_DAYS           -> jours sans changement de hash avant alerte dérive (défaut: 7)
 *   ANTIBOT_ALERT_THRESHOLD    -> checks consécutifs anti-bot avant alerte admin (défaut: 3)
 *   HIGH_ALERT_TTL_DAYS        -> durée en jours du mode haute vigilance (défaut: 30)
 *   SILENCE_WARN_DAYS          -> jours sans changement d'état + signal externe → alerte (défaut: 14)
 *   SUBSCRIPTION_PRICE_DISPLAY -> texte du prix affiché (ex: "3,99 €")
 *   PAYPAL_MODE                -> "sandbox" ou "live"
 */

import { sendAdminNotifications, enqueueSubscriberAlert } from "./notify.js";
import { legalPage } from "./pages/legal.js";
import { confirmationEmailHtml, welcomeEmailHtml, alertEmailHtml } from "./pages/emails.js";
import { COMMENT_IMAGES } from "./comment-images.js";
import { serveStaticImage } from "./static-images.js";
import {
  handleSubscribePage,
  handleInscriptionPage,
  handleSubscribePost,
  handlePaymentReturn,
  handlePaymentCancel,
  handlePaymentSuccess,
  handleCreateOrder,
  handleCaptureOrder,
  handleConfirm,
  handleUnsubscribe,
  handleAdminStats,
  handleAdminPage,
  processFanout,
} from "./handlers/subscribers.js";

// ── Clés KV ─────────────────────────────────────────────────────────────────
const STATE_KEY             = "watch_state";
const LOG_KEY               = "last_run";
const HASH_KEY              = "last_content_hash";
const CHANGE_NOTIFIED_KEY   = "change_notified_hash";
const ROUTE_STATUS_KEY      = "route_statuses";
const HISTORY_KEY           = "check_history";
const HISTORY_MAX           = 200;
const GOV_SEEN_KEY          = "gov_seen_articles";
const GOV_SIGNAL_KEY        = "gov_signal_active";
// Nouvelles clés (tâches 1-5)
const LAST_HASH_CHANGED_KEY  = "last_hash_changed_at";
const ANTIBOT_STREAK_KEY     = "antibot_streak";
const ANTIBOT_NOTIFIED_KEY   = "antibot_notified";
const HIGH_ALERT_KEY         = "high_alert_mode";
const LAST_STATE_CHANGE_KEY  = "last_state_change_at";
const STALE_JS_NOTIFIED_KEY  = "stale_js_notified";
const SILENCE_NOTIFIED_KEY   = "silence_watchdog_notified";

// ── Valeurs par défaut (variables d'env configurables dans wrangler.toml) ───
const STALE_CHECK_DAYS_DEFAULT       = 7;
const ANTIBOT_ALERT_THRESHOLD_DEFAULT = 3;
const HIGH_ALERT_TTL_DAYS_DEFAULT    = 30;
const SILENCE_WARN_DAYS_DEFAULT      = 14;

const GOV_CRON = "0 6,18 * * *";
const DEEP_ROUTES_DEFAULT =
  "/booking,/vols,/conditions-generales,/reservations,/reservation,/reserver,/flights,/book";

// Domaines de confiance pour activer gov_signal_active (filtre anti-bruit RSS)
const GOV_TRUSTED_DOMAINS = [
  "gouv.bj",
  "lanouvelletribune.info",
  "lematinal.bj",
  "24haubenin.info",
  "beninwebtv.com",
  "agencebeninpresse.info",
  "banouto.bj",
];

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export default {
  // -------------------------------------------------------------------------
  // HTTP
  // -------------------------------------------------------------------------
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const method = request.method;

    const imgMatch = url.pathname.match(/^\/img\/comment-(\d+)\.png$/);
    if (imgMatch) {
      const idx = parseInt(imgMatch[1], 10) - 1;
      if (idx >= 0 && idx < COMMENT_IMAGES.length) {
        const binary = Uint8Array.from(atob(COMMENT_IMAGES[idx]), c => c.charCodeAt(0));
        return new Response(binary, {
          headers: { "content-type": "image/png", "cache-control": "public, max-age=604800" },
        });
      }
    }

    const staticMatch = url.pathname.match(/^\/static\/(.+)$/);
    if (staticMatch) {
      const resp = serveStaticImage(staticMatch[1]);
      if (resp) return resp;
    }

    if (url.pathname === "/favicon.ico" || url.pathname === "/favicon.svg") {
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="#008751"/><text x="16" y="24" text-anchor="middle" font-size="22">✈</text></svg>`;
      return new Response(svg, {
        headers: { "content-type": "image/svg+xml", "cache-control": "public, max-age=86400" },
      });
    }

    if (url.pathname === "/sitemap.xml" && method === "GET") {
      const base = "https://alertesvolsbenin.com";
      const today = new Date().toISOString().split("T")[0];
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${base}/</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${base}/inscription</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
</urlset>`;
      return new Response(xml, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=86400" } });
    }

    if ((url.pathname === "/cgv" || url.pathname === "/mentions-legales") && method === "GET")
      return new Response(legalPage(), { headers: { "content-type": "text/html; charset=utf-8" } });

    if (url.pathname === "/" && method === "GET")
      return handleSubscribePage(request, env);

    if (url.pathname === "/inscription" && method === "GET")
      return handleInscriptionPage(request, env);

    if (url.pathname === "/subscribe" && method === "GET")
      return Response.redirect(new URL("/", request.url).toString(), 301);

    if (url.pathname === "/subscribe" && method === "POST")
      return handleSubscribePost(request, env);

    if (url.pathname === "/payment-return" && method === "GET")
      return handlePaymentReturn(request, env);

    if (url.pathname === "/payment-cancel" && method === "GET")
      return handlePaymentCancel(request, env);

    if (url.pathname === "/payment-success" && method === "GET")
      return handlePaymentSuccess(request, env);

    if (url.pathname === "/api/create-order" && method === "POST")
      return handleCreateOrder(request, env);

    if (url.pathname === "/api/capture-order" && method === "POST")
      return handleCaptureOrder(request, env);

    if (url.pathname === "/confirm" && method === "GET")
      return handleConfirm(request, env);

    if (url.pathname === "/unsubscribe" && method === "GET")
      return handleUnsubscribe(request, env);

    if (url.pathname === "/admin" && method === "GET")
      return handleAdminPage(request, env);

    // ── Endpoints admin protégés par ADMIN_SECRET ────────────────────────────
    if (
      (url.pathname === "/admin/subscribers" ||
        url.pathname === "/check" ||
        url.pathname === "/test-notify" ||
        url.pathname === "/test-emails" ||
        url.pathname === "/reset") &&
      method === "GET"
    ) {
      const deny = requireAdmin(request, env);
      if (deny) return deny;

      if (url.pathname === "/admin/subscribers")
        return handleAdminStats(request, env);

      if (url.pathname === "/check") {
        const result = await runCheck(env, { force: false });
        return jsonResponse(result);
      }

      if (url.pathname === "/test-emails") {
        const to = url.searchParams.get("to");
        if (!to) return jsonResponse({ ok: false, error: "Missing ?to= param" }, 400);
        const token = crypto.randomUUID();
        const baseUrl = env.APP_BASE_URL;
        const confirmUrl = `${baseUrl}/confirm?token=${token}`;
        const unsubUrl = `${baseUrl}/unsubscribe?token=${token}`;
        const shareUrl = `${baseUrl}/inscription`;
        const results = [];
        for (const [subject, html] of [
          ["[1/3] Confirme ton inscription — Alertes Vols Bénin", confirmationEmailHtml(confirmUrl)],
          ["[2/3] Espoir, c'est validé ! Ton alerte vol est active.", welcomeEmailHtml("Espoir", "A.", unsubUrl, shareUrl)],
          ["[3/3] ✈️ Les vols Paris-Cotonou sont OUVERTS !", alertEmailHtml("Les réservations sont ouvertes sur voyage.benin.bj. Les places partent en quelques minutes !", unsubUrl)],
        ]) {
          const r = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
            body: JSON.stringify({ from: env.ALERT_EMAIL_FROM, to: [to], subject, html }),
          });
          results.push({ subject, ok: r.ok, status: r.status });
        }
        return jsonResponse({ ok: true, results });
      }

      if (url.pathname === "/test-notify") {
        const result = await sendAdminNotifications(env, {
          title: "🧪 Test | Bénin Flight Watcher",
          message:
            "Ceci est un test. Si tu reçois ce message par email/SMS, tout est bien configuré.",
        });
        return jsonResponse({ ok: true, result });
      }

      if (url.pathname === "/reset") {
        await Promise.all([
          env.STATE.put(STATE_KEY, "closed"),
          env.STATE.delete(CHANGE_NOTIFIED_KEY),
          env.STATE.delete(GOV_SIGNAL_KEY),
        ]);
        return jsonResponse({
          ok: true,
          message: "État réinitialisé (surveillance, alerte générique et signal gov réarmés).",
        });
      }
    }

    // ── Signal gouvernemental — réinitialisation manuelle ────────────────────
    // DELETE /admin/gov-signal → efface gov_signal_active (utile si faux positif RSS)
    if (url.pathname === "/admin/gov-signal" && method === "DELETE") {
      const deny = requireAdmin(request, env);
      if (deny) return deny;
      await env.STATE.delete(GOV_SIGNAL_KEY);
      return jsonResponse({ ok: true, message: "gov_signal_active effacé." });
    }

    // ── Mode haute vigilance (tâche 4) ───────────────────────────────────────
    // POST /admin/high-alert  → activer
    // GET  /admin/high-alert  → statut
    // DELETE /admin/high-alert → désactiver
    if (url.pathname === "/admin/high-alert") {
      const deny = requireAdmin(request, env);
      if (deny) return deny;

      if (method === "GET") {
        const raw = await env.STATE.get(HIGH_ALERT_KEY);
        if (raw) {
          const ttlDays = parseInt(env.HIGH_ALERT_TTL_DAYS || String(HIGH_ALERT_TTL_DAYS_DEFAULT), 10);
          return jsonResponse({ active: true, since: raw, ttl_days: ttlDays });
        }
        return jsonResponse({ active: false });
      }

      if (method === "POST") {
        const ttlDays = parseInt(env.HIGH_ALERT_TTL_DAYS || String(HIGH_ALERT_TTL_DAYS_DEFAULT), 10);
        const now = new Date().toISOString();
        await env.STATE.put(HIGH_ALERT_KEY, now, { expirationTtl: ttlDays * 24 * 60 * 60 });
        return jsonResponse({
          ok: true,
          // Ce que ce flag fait réellement — ne pas induire en erreur :
          // il supprime la double confirmation (pre_open → open_notified en 1 seul check positif),
          // il N'augmente PAS la fréquence de scan (toujours 1/min, limité par l'architecture cron).
          effect: "confirmation_shortcut_only",
          message:
            `Flag activé pour ${ttlDays} jours. ` +
            `Effet : le prochain check croisé positif (marqueur absent + route 200) ` +
            `déclenchera immédiatement le fan-out sans attendre la double confirmation habituelle. ` +
            `La fréquence de scan reste 1 vérification/minute — ce flag ne la modifie pas.`,
          since: now,
          expires_at: new Date(Date.now() + ttlDays * 24 * 60 * 60 * 1000).toISOString(),
          to_increase_frequency:
            "Migrer vers un Durable Object avec alarm() — voir commentaires dans src/index.js.",
        });
      }

      if (method === "DELETE") {
        await env.STATE.delete(HIGH_ALERT_KEY);
        return jsonResponse({ ok: true, message: "Mode haute vigilance désactivé." });
      }
    }

    if (url.pathname === "/status" && method === "GET") {
      const [state, lastRunRaw, routeStatusRaw, govSignalRaw, historyRaw, highAlertRaw, antibotStreakRaw] =
        await Promise.all([
          env.STATE.get(STATE_KEY),
          env.STATE.get(LOG_KEY),
          env.STATE.get(ROUTE_STATUS_KEY),
          env.STATE.get(GOV_SIGNAL_KEY),
          env.STATE.get(HISTORY_KEY),
          env.STATE.get(HIGH_ALERT_KEY),
          env.STATE.get(ANTIBOT_STREAK_KEY),
        ]);
      let history = [];
      try { if (historyRaw) history = JSON.parse(historyRaw); } catch {}
      return jsonResponse({
        state: state || "closed",
        lastRun: lastRunRaw ? JSON.parse(lastRunRaw) : null,
        routeStatuses: routeStatusRaw ? JSON.parse(routeStatusRaw) : null,
        govSignalActive: !!govSignalRaw,
        highAlertActive: !!highAlertRaw,
        antibotStreak: parseInt(antibotStreakRaw || "0", 10),
        history: history.slice(-20).reverse(),
      });
    }

    return new Response("Not found", { status: 404 });
  },

  // -------------------------------------------------------------------------
  // Cron — routage selon event.cron
  // -------------------------------------------------------------------------
  async scheduled(event, env, ctx) {
    if (event.cron === GOV_CRON) {
      // Cron basse fréquence (2×/jour) : veille presse + checks de résilience
      ctx.waitUntil(
        Promise.all([
          runGovCheck(env),
          runResilienceChecks(env),
        ])
      );
    } else {
      // Cron haute fréquence (toutes les minutes) : check principal
      ctx.waitUntil(runCheck(env, { force: false }));
    }
  },

  // -------------------------------------------------------------------------
  // Queue consumer - fan-out email + SMS abonnés
  // -------------------------------------------------------------------------
  async queue(batch, env, ctx) {
    await processFanout(batch, env);
  },
};

// ---------------------------------------------------------------------------
// Logique de détection
// ---------------------------------------------------------------------------

function requireAdmin(request, env) {
  if (!env.ADMIN_SECRET) {
    return new Response("Admin not configured", { status: 401 });
  }
  const auth = request.headers.get("Authorization") || "";
  const [type, token] = auth.split(" ");
  if (type !== "Bearer" || token !== env.ADMIN_SECRET) {
    return new Response("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": 'Bearer realm="Bénin Flight Watcher"' },
    });
  }
  return null;
}

async function runCheck(env, { force }) {
  const startedAt = new Date().toISOString();
  const deepRoutes = (env.DEEP_ROUTES || DEEP_ROUTES_DEFAULT)
    .split(",")
    .map((r) => r.trim())
    .filter(Boolean);

  // Fetch home + sondage des routes en parallèle
  const [homeResult, routeResults] = await Promise.all([
    fetchHome(env.TARGET_URL),
    probeAllRoutes(env.TARGET_URL, deepRoutes),
  ]);

  const { html, status: homeStatus, error: fetchError } = homeResult;

  // Extraction granulaire (titre, meta-description, body normalisé)
  const parts = extractPageParts(html);
  const [titleHash, metaHash, bodyHash] = await Promise.all([
    sha256(parts.title),
    sha256(parts.metaDescription),
    sha256(parts.bodyNormalized),
  ]);

  // Marqueurs placeholder
  const markers = (env.PLACEHOLDER_MARKERS || "bientôt disponible")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  const lowerHtml = html.toLowerCase();
  const markerPresent = html.length === 0 || markers.some((m) => lowerHtml.includes(m));

  // Routes profondes — seul un statut 200 confirmé compte
  const anyRouteIs200 = deepRoutes.some(
    (r) => routeResults[r] && routeResults[r].status === 200
  );

  // Détection anti-bot — avant la machine à états (tâche 2)
  const antibotType = !fetchError && html.length > 0 ? detectAntiBot(html, homeStatus) : null;

  // Lectures KV groupées
  const [
    previousState,
    previousBodyHash,
    fetchErrorNotified,
    changeNotifiedHash,
    govSignalRaw,
    previousRouteStatusesRaw,
    cachedHistoryRaw,
    previousAntibotStreak,
    antibotNotifiedKey,
    lastHashChangedAt,
    highAlertRaw,
  ] = await Promise.all([
    env.STATE.get(STATE_KEY).then((v) => v || "closed"),
    env.STATE.get(HASH_KEY),
    env.STATE.get("fetch_error_notified"),
    env.STATE.get(CHANGE_NOTIFIED_KEY),
    env.STATE.get(GOV_SIGNAL_KEY),
    env.STATE.get(ROUTE_STATUS_KEY),
    env.STATE.get(HISTORY_KEY),
    env.STATE.get(ANTIBOT_STREAK_KEY),
    env.STATE.get(ANTIBOT_NOTIFIED_KEY),
    env.STATE.get(LAST_HASH_CHANGED_KEY),
    env.STATE.get(HIGH_ALERT_KEY),
  ]);

  const govSignalActive = !!govSignalRaw;
  const highAlertActive = !!highAlertRaw;
  let antibotStreak = parseInt(previousAntibotStreak || "0", 10);

  let previousRouteStatuses = {};
  try {
    if (previousRouteStatusesRaw) previousRouteStatuses = JSON.parse(previousRouteStatusesRaw);
  } catch { /* migration : clé absente ou format invalide */ }

  let action = "none";
  let newState = previousState;
  const notifyResults = [];

  // ── Erreur fetch home ─────────────────────────────────────────────────────
  if (fetchError) {
    if (fetchErrorNotified !== "1") {
      notifyResults.push(
        await sendAdminNotifications(env, {
          title: "⚠️ Bénin Flight Watcher | site injoignable",
          message: `Impossible de charger ${env.TARGET_URL} (${fetchError}).`,
        })
      );
      await env.STATE.put("fetch_error_notified", "1");
    }
    action = "fetch_error";

  // ── Détection anti-bot (tâche 2) ──────────────────────────────────────────
  // La réponse est invalide : ne pas mettre à jour la machine à états.
  } else if (antibotType) {
    if (fetchErrorNotified === "1") await env.STATE.delete("fetch_error_notified");

    antibotStreak++;
    await env.STATE.put(ANTIBOT_STREAK_KEY, String(antibotStreak));
    action = `antibot:${antibotType}`;

    const threshold = parseInt(
      env.ANTIBOT_ALERT_THRESHOLD || String(ANTIBOT_ALERT_THRESHOLD_DEFAULT),
      10
    );
    // Alerte si seuil atteint et qu'on n'a pas déjà alerté pour ce streak exact
    if (antibotStreak >= threshold && antibotNotifiedKey !== String(antibotStreak)) {
      notifyResults.push(
        await sendAdminNotifications(env, {
          title: `🤖 Bénin | challenge anti-bot (${antibotStreak}× consécutif)`,
          message:
            `Type détecté : ${antibotType}. Le site renvoie un challenge anti-bot ou un refus ` +
            `depuis ${antibotStreak} vérifications consécutives.\n` +
            `Les données de surveillance sont invalides — l'état courant (${previousState}) ` +
            `peut ne plus refléter la réalité.\n` +
            `Vérification manuelle requise : ${env.TARGET_URL}`,
        })
      );
      await env.STATE.put(ANTIBOT_NOTIFIED_KEY, String(antibotStreak));
    }

  } else {
    // ── Fetch valide — réinitialiser compteurs d'anomalie ────────────────────
    if (antibotStreak > 0) {
      await Promise.all([
        env.STATE.put(ANTIBOT_STREAK_KEY, "0"),
        env.STATE.delete(ANTIBOT_NOTIFIED_KEY),
      ]);
      antibotStreak = 0;
    }
    if (fetchErrorNotified === "1") await env.STATE.delete("fetch_error_notified");

    // ── Suivi temporel du hash (tâche 1 — baseline pour détection de stagnation) ──
    if (bodyHash !== previousBodyHash) {
      await env.STATE.put(LAST_HASH_CHANGED_KEY, startedAt);
    } else if (!lastHashChangedAt) {
      // Premier run : poser la baseline
      await env.STATE.put(LAST_HASH_CHANGED_KEY, startedAt);
    }

    // ── Notification changement générique (admin only, basée sur body normalisé) ──
    if (
      previousBodyHash &&
      previousBodyHash !== bodyHash &&
      changeNotifiedHash !== bodyHash &&
      previousState !== "open_notified"
    ) {
      notifyResults.push(
        await sendAdminNotifications(env, {
          title: "🔍 Bénin | changement détecté sur voyage.benin.bj",
          message: `La page a changé (contenu différent du dernier scan). ${env.TARGET_URL}`,
        })
      );
      await env.STATE.put(CHANGE_NOTIFIED_KEY, bodyHash);
      action = "generic_change_notified";
    }

    if (bodyHash !== previousBodyHash) await env.STATE.put(HASH_KEY, bodyHash);

    // ── Détection transitions 404→200 sur routes profondes (admin only) ─────────
    for (const route of deepRoutes) {
      const prev = previousRouteStatuses[route];
      const curr = routeResults[route];
      if (curr && curr.status === 200 && (!prev || prev.status !== 200)) {
        notifyResults.push(
          await sendAdminNotifications(env, {
            title: `🚀 Bénin | ${route} est passée à 200`,
            message:
              `La route ${route} répond maintenant en 200 ` +
              `(avant : ${prev ? prev.status ?? "inconnu" : "jamais sondée"}). ${env.TARGET_URL}`,
          })
        );
      }
    }

    // ── Machine à états : confirmation croisée + temporelle ─────────────────────
    const crossConfirmed = !markerPresent && anyRouteIs200;

    if (crossConfirmed) {
      if (previousState === "pre_open") {
        // 2ᵉ check consécutif positif → fan-out abonnés
        const alertTitle = "🇧🇯 Réservation Bénin OUVERTE !";
        const alertMessage =
          `Confirmation croisée validée 2× consécutives : marqueur absent + route de ` +
          `réservation en 200. Fonce : ${env.TARGET_URL}`;
        notifyResults.push(
          await sendAdminNotifications(env, { title: alertTitle, message: alertMessage })
        );
        const fanout = await safeFanout(env, { title: alertTitle, message: alertMessage });
        notifyResults.push(fanout);
        if (fanout.sent || fanout.reason === "already_open_notified") {
          newState = "open_notified";
          action = "notified";
          if (govSignalActive) await env.STATE.delete(GOV_SIGNAL_KEY);
          if (highAlertActive) await env.STATE.delete(HIGH_ALERT_KEY);
        } else {
          action = "fanout_failed";
        }
      } else if (previousState !== "open_notified") {
        // govSignalActive OU highAlertActive → 1 seul check suffit, fan-out immédiat
        if (govSignalActive || highAlertActive) {
          const alertTitle = "🇧🇯 Réservation Bénin OUVERTE !";
          const reason = govSignalActive
            ? "Pré-alerte gouvernementale active"
            : "Mode haute vigilance admin actif";
          const alertMessage =
            `Confirmation croisée positive (marqueur absent + route 200). ` +
            `${reason} → fan-out immédiat. ${env.TARGET_URL}`;
          notifyResults.push(
            await sendAdminNotifications(env, { title: alertTitle, message: alertMessage })
          );
          const fanout = await safeFanout(env, { title: alertTitle, message: alertMessage });
          notifyResults.push(fanout);
          if (fanout.sent || fanout.reason === "already_open_notified") {
            newState = "open_notified";
            action = "notified";
            if (govSignalActive) await env.STATE.delete(GOV_SIGNAL_KEY);
            if (highAlertActive) await env.STATE.delete(HIGH_ALERT_KEY);
          } else {
            action = "fanout_failed";
          }
        } else {
          // 1ᵉʳ check positif sans signal → pré-ouverture, admin only
          notifyResults.push(
            await sendAdminNotifications(env, {
              title: "🟡 Bénin | pré-ouverture détectée",
              message:
                `Confirmation croisée positive (marqueur absent + route 200). ` +
                `Attente d'un 2ᵉ check consécutif avant fan-out. ${env.TARGET_URL}`,
            })
          );
          newState = "pre_open";
          action = "pre_open";
        }
      }
    } else if (!markerPresent && html.length > 0 && !anyRouteIs200) {
      // Marqueur absent mais routes pas encore en 200 — signal faible
      if (previousState === "pre_open") {
        notifyResults.push(
          await sendAdminNotifications(env, {
            title: "⚠️ Bénin | pré-ouverture perdue",
            message:
              `Le marqueur reste absent mais les routes sont retombées en 404. ` +
              `Confirmation croisée non maintenue — retour en surveillance. ${env.TARGET_URL}`,
          })
        );
        newState = "watching";
        action = "pre_open_lost";
      } else if (previousState !== "watching" && previousState !== "open_notified") {
        notifyResults.push(
          await sendAdminNotifications(env, {
            title: "👁️ Bénin | marqueur absent, routes 404",
            message:
              `Le marqueur placeholder a disparu mais /booking, /vols, /conditions-generales ` +
              `sont toujours en 404. Possible redesign sans ouverture. ${env.TARGET_URL}`,
          })
        );
        newState = "watching";
        action = "watching";
      }
    } else {
      // Marqueur présent (ou page vide) — état normal
      if (previousState === "open_notified") {
        newState = "closed";
        action = action === "none" ? "rearmed" : action;
      } else if (previousState === "watching" || previousState === "pre_open") {
        newState = "closed";
        action = action === "none" ? "back_to_closed" : action;
      }
    }
  }

  // ── Écritures KV conditionnelles ──────────────────────────────────────────
  if (newState !== previousState) {
    await env.STATE.put(STATE_KEY, newState);
    // Horodatage du changement d'état — utilisé par le watchdog de silence (tâche 5)
    await env.STATE.put(LAST_STATE_CHANGE_KEY, startedAt);
  }

  // Sauvegarde statuts routes (seulement si changé)
  const newRouteStatuses = {};
  for (const r of deepRoutes) {
    const res = routeResults[r];
    newRouteStatuses[r] = { status: res ? res.status : null };
    if (res && res.error) newRouteStatuses[r].error = res.error;
  }
  if (JSON.stringify(newRouteStatuses) !== JSON.stringify(previousRouteStatuses)) {
    await env.STATE.put(ROUTE_STATUS_KEY, JSON.stringify(newRouteStatuses));
  }

  // Historique horodaté (cap strict HISTORY_MAX)
  const historyEntry = {
    ts: startedAt,
    titleHash,
    metaHash,
    bodyHash,
    routes: newRouteStatuses,
    markerPresent,
    state: newState,
    ...(antibotType ? { anomaly: antibotType } : {}),
  };
  await recordHistory(env, historyEntry, cachedHistoryRaw);

  // Log du run
  const logEntry = {
    startedAt,
    markerPresent,
    anyRouteIs200,
    crossConfirmed: !markerPresent && html.length > 0 && anyRouteIs200,
    govSignalActive,
    highAlertActive,
    antibotType,
    antibotStreak,
    fetchError,
    previousState,
    newState,
    action,
    htmlLength: html.length,
  };
  await env.STATE.put(LOG_KEY, JSON.stringify(logEntry));

  return { ...logEntry, notifyResults };
}

// ---------------------------------------------------------------------------
// Garde anti-double fan-out
// ---------------------------------------------------------------------------

async function safeFanout(env, { title, message }) {
  const freshState = await env.STATE.get(STATE_KEY);
  if (freshState === "open_notified") {
    return { sent: false, reason: "already_open_notified" };
  }
  try {
    const result = await enqueueSubscriberAlert(env, { title, message });
    return { sent: true, ...result };
  } catch (err) {
    return { sent: false, reason: "enqueue_failed", error: String(err) };
  }
}

// ---------------------------------------------------------------------------
// Fetch home page — retourne aussi le statut HTTP pour détection anti-bot
// ---------------------------------------------------------------------------

async function fetchHome(targetUrl) {
  try {
    const resp = await fetch(targetUrl, {
      headers: { "user-agent": UA },
      cf: { cacheTtl: 0, cacheEverything: false },
    });
    return { html: await resp.text(), status: resp.status, error: null };
  } catch (err) {
    return { html: "", status: null, error: String(err) };
  }
}

// ---------------------------------------------------------------------------
// Sondage des routes profondes (HEAD, parallèle)
// ---------------------------------------------------------------------------

async function probeAllRoutes(baseUrl, routes) {
  const results = {};
  await Promise.all(
    routes.map(async (route) => {
      try {
        const resp = await fetch(new URL(route, baseUrl).toString(), {
          method: "HEAD",
          headers: { "user-agent": UA },
          cf: { cacheTtl: 0, cacheEverything: false },
        });
        results[route] = { status: resp.status, error: null };
      } catch (err) {
        results[route] = { status: null, error: String(err) };
      }
    })
  );
  return results;
}

// ---------------------------------------------------------------------------
// Détection anti-bot (tâche 2)
// Retourne un type d'anomalie ou null si réponse normale.
// ---------------------------------------------------------------------------

function detectAntiBot(html, status) {
  if (status === 403) return "http_403";
  if (status === 429) return "rate_limited";
  const lower = html.toLowerCase();
  if (
    lower.includes("cf-browser-verification") ||
    lower.includes("cf-challenge") ||
    lower.includes("_cf_chl_opt") ||
    lower.includes("ddos protection by cloudflare") ||
    (lower.includes("checking your browser") && lower.includes("cloudflare")) ||
    (lower.includes("just a moment") && lower.includes("cloudflare"))
  ) return "cf_challenge";
  if (lower.includes("captcha") && html.length < 50000) return "captcha";
  return null;
}

// ---------------------------------------------------------------------------
// Extraction granulaire du contenu HTML
// ---------------------------------------------------------------------------

function extractPageParts(html) {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

  let metaDescription = "";
  const metas = html.match(/<meta\s[^>]*>/gi) || [];
  for (const meta of metas) {
    if (/name=["']description["']/i.test(meta)) {
      const contentMatch = meta.match(/content=["']([^"']*)["']/i);
      if (contentMatch) {
        metaDescription = contentMatch[1].trim();
        break;
      }
    }
  }

  const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const raw = bodyMatch ? bodyMatch[1] : html;
  const bodyNormalized = raw
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return {
    title: titleMatch ? titleMatch[1].trim() : "",
    metaDescription,
    bodyNormalized,
  };
}

// ---------------------------------------------------------------------------
// Historique horodaté en KV (tableau JSON borné, purge FIFO)
// ---------------------------------------------------------------------------

async function recordHistory(env, entry, cachedRaw) {
  let history = [];
  try {
    const raw = cachedRaw !== undefined ? cachedRaw : await env.STATE.get(HISTORY_KEY);
    if (raw) history = JSON.parse(raw);
    if (!Array.isArray(history)) history = [];
  } catch {
    history = [];
  }
  history.push(entry);
  if (history.length > HISTORY_MAX) {
    history = history.slice(history.length - HISTORY_MAX);
  }
  await env.STATE.put(HISTORY_KEY, JSON.stringify(history));
}

// ---------------------------------------------------------------------------
// Checks de résilience (tâche 1 + tâche 5) — cron 2×/jour
// ---------------------------------------------------------------------------

async function runResilienceChecks(env) {
  const [stale, silence] = await Promise.all([
    checkStaleHash(env),
    checkSilenceWatchdog(env),
  ]);
  return { stale, silence };
}

// Tâche 1 — Détection de dérive : hash stable depuis N jours alors que le monitoring
// pourrait être aveugle (SPA, contenu injecté côté client).
async function checkStaleHash(env) {
  const staleCheckDays = parseInt(
    env.STALE_CHECK_DAYS || String(STALE_CHECK_DAYS_DEFAULT),
    10
  );

  const [stateRaw, lastHashChangedRaw, currentBodyHashRaw, staleNotifiedRaw] = await Promise.all([
    env.STATE.get(STATE_KEY),
    env.STATE.get(LAST_HASH_CHANGED_KEY),
    env.STATE.get(HASH_KEY),
    env.STATE.get(STALE_JS_NOTIFIED_KEY),
  ]);

  const state = stateRaw || "closed";

  // Pas pertinent une fois que la réservation est notifiée
  if (state === "open_notified") return { skipped: "already_open" };
  if (!lastHashChangedRaw) return { skipped: "no_baseline" };

  const daysSinceChange =
    (Date.now() - new Date(lastHashChangedRaw).getTime()) / 86400000;

  if (daysSinceChange < staleCheckDays) {
    return { skipped: `recent_change_${Math.floor(daysSinceChange)}d` };
  }

  const currentBodyHash = currentBodyHashRaw || "";

  // Déjà alerté pour ce hash exact — pas de spam
  if (staleNotifiedRaw === currentBodyHash) return { skipped: "already_notified" };

  const dayStr = Math.floor(daysSinceChange);

  // Check de rendu headless (tâche 1 — Browser Rendering API)
  const browserNote = env.BROWSER
    ? await doHeadlessCompare(env)
    : "Browser Rendering API non disponible : binding BROWSER absent. " +
      "Requiert plan Workers Paid + addon Browser Rendering. " +
      "Pour activer : décommenter la section [browser] dans wrangler.toml " +
      "et suivre les instructions.";

  await sendAdminNotifications(env, {
    title: `⚠️ Bénin | contenu figé ${dayStr}j — vérification manuelle requise`,
    message:
      `Le hash du contenu brut de ${env.TARGET_URL} est inchangé depuis ${dayStr} jours ` +
      `(état actuel : ${state}).\n\n` +
      `Si le site est passé en application mono-page (SPA), le fetch HTML brut ne voit pas ` +
      `le contenu injecté côté client — le système peut rester silencieusement bloqué ` +
      `en "${state}" même si les réservations sont ouvertes.\n\n` +
      `${browserNote}\n\n` +
      `→ Action requise : vérifier manuellement ${env.TARGET_URL}`,
  });

  await env.STATE.put(STALE_JS_NOTIFIED_KEY, currentBodyHash);
  return { alerted: true, daysSinceChange: dayStr };
}

// Tâche 1 — Comparaison HTML brut vs DOM rendu (Browser Rendering API).
//
// Prérequis pour activer ce check :
//   1. Plan Workers Paid (https://developers.cloudflare.com/workers/platform/pricing/)
//   2. Addon Browser Rendering activé dans le tableau de bord Cloudflare
//   3. Binding dans wrangler.toml :
//        [browser]
//        binding = "BROWSER"
//   4. npm install @cloudflare/puppeteer
//   5. Décommenter le bloc ci-dessous
//
// Cette fonction est uniquement appelée quand env.BROWSER est défini.
// Sans le binding, checkStaleHash() retourne directement un message explicatif.
async function doHeadlessCompare(env) {
  try {
    // ── Décommenter les 8 lignes suivantes après avoir installé @cloudflare/puppeteer ──
    // const { default: puppeteer } = await import("@cloudflare/puppeteer");
    // const browser = await puppeteer.launch(env.BROWSER);
    // const page = await browser.newPage();
    // await page.goto(env.TARGET_URL, { waitUntil: "networkidle0", timeout: 30000 });
    // const renderedHtml = await page.content();
    // await browser.close();
    // return compareRawVsRendered(env, renderedHtml);
    // ── Fin du bloc à décommenter ──

    return (
      "Binding BROWSER présent mais @cloudflare/puppeteer non installé. " +
      "Exécuter : npm install @cloudflare/puppeteer " +
      "puis décommenter le bloc dans doHeadlessCompare() dans src/index.js."
    );
  } catch (err) {
    return `Erreur rendu headless : ${String(err)}.`;
  }
}

// Comparaison effective brut vs rendu — appelée depuis doHeadlessCompare() une fois activé.
function compareRawVsRendered(env, renderedHtml) {
  const rawResult = extractPageParts(env._lastRawHtml || "");
  const renderedParts = extractPageParts(renderedHtml);

  const rawLen = rawResult.bodyNormalized.length;
  const renderedLen = renderedParts.bodyNormalized.length;
  const ratio = rawLen > 0 ? renderedLen / rawLen : 1;

  const markers = (env.PLACEHOLDER_MARKERS || "bientôt disponible")
    .split(",").map(s => s.trim().toLowerCase()).filter(Boolean);
  const rawHasMarker = markers.some(m => rawResult.bodyNormalized.toLowerCase().includes(m));
  const renderedHasMarker = markers.some(m => renderedParts.bodyNormalized.toLowerCase().includes(m));

  if (rawHasMarker !== renderedHasMarker || ratio > 2.5 || ratio < 0.4) {
    return (
      `🚨 ÉCART SIGNIFICATIF entre HTML brut et DOM rendu JS :\n` +
      `- Ratio de contenu : ${ratio.toFixed(1)}x (brut: ${rawLen}c / rendu: ${renderedLen}c)\n` +
      `- Marqueur placeholder dans brut: ${rawHasMarker}, dans rendu JS: ${renderedHasMarker}\n` +
      `→ Le site a probablement changé de structure. Le monitoring HTML brut est potentiellement aveugle.`
    );
  }
  return (
    `DOM rendu JS comparable au HTML brut ` +
    `(ratio ${ratio.toFixed(1)}x, marqueur cohérent → monitoring HTML brut semble fiable).`
  );
}

// Tâche 5 — Watchdog de silence : alerte si le système reste immobile trop longtemps
// alors qu'un signal externe indique que l'ouverture est peut-être imminente.
async function checkSilenceWatchdog(env) {
  const silenceWarnDays = parseInt(
    env.SILENCE_WARN_DAYS || String(SILENCE_WARN_DAYS_DEFAULT),
    10
  );

  const [stateRaw, lastStateChangeRaw, govSignalRaw, highAlertRaw, silenceNotifiedRaw] =
    await Promise.all([
      env.STATE.get(STATE_KEY),
      env.STATE.get(LAST_STATE_CHANGE_KEY),
      env.STATE.get(GOV_SIGNAL_KEY),
      env.STATE.get(HIGH_ALERT_KEY),
      env.STATE.get(SILENCE_NOTIFIED_KEY),
    ]);

  const state = stateRaw || "closed";
  const govSignalActive = !!govSignalRaw;
  const highAlertActive = !!highAlertRaw;

  // Watchdog n'a de sens que si un signal externe suggère une ouverture imminente
  if (!govSignalActive && !highAlertActive) return { skipped: "no_external_signal" };
  if (state === "open_notified") return { skipped: "already_open" };
  if (!lastStateChangeRaw) return { skipped: "no_state_history" };

  const daysSinceChange =
    (Date.now() - new Date(lastStateChangeRaw).getTime()) / 86400000;

  if (daysSinceChange < silenceWarnDays) {
    return { skipped: `recent_state_change_${Math.floor(daysSinceChange)}d` };
  }

  // Idempotence : on alerte une seule fois par période de silence (clé = timestamp dernier changement)
  if (silenceNotifiedRaw === lastStateChangeRaw) return { skipped: "already_notified" };

  const signalDesc =
    govSignalActive && highAlertActive
      ? "signal presse gouvernementale + mode haute vigilance admin"
      : govSignalActive
      ? "signal presse gouvernementale actif"
      : "mode haute vigilance admin actif";

  await sendAdminNotifications(env, {
    title: `🔕 Bénin | silence suspect — ${Math.floor(daysSinceChange)}j sans changement`,
    message:
      `Le monitoring n'a enregistré aucun changement d'état depuis ${Math.floor(daysSinceChange)} jours ` +
      `(dernier changement : ${lastStateChangeRaw}, état actuel : ${state}).\n\n` +
      `Un signal externe est pourtant actif : ${signalDesc}.\n\n` +
      `Risque : le système est peut-être aveugle (SPA, challenge anti-bot, changement de structure du site). ` +
      `Vérification manuelle recommandée : ${env.TARGET_URL}`,
  });

  await env.STATE.put(SILENCE_NOTIFIED_KEY, lastStateChangeRaw);
  return { alerted: true, daysSinceChange: Math.floor(daysSinceChange) };
}

// ---------------------------------------------------------------------------
// Veille annonce gouvernementale (cron basse fréquence)
// Tâche 3 : généralisation multi-sources via GOV_EXTRA_SOURCES
// ---------------------------------------------------------------------------

async function runGovCheck(env) {
  const rssUrls = buildGovRssUrls(env);

  // Fetch toutes les sources en parallèle
  const feedResults = await Promise.all(rssUrls.map(fetchRssFeed));

  const errors = feedResults.filter(r => !r.ok);
  const successFeeds = feedResults.filter(r => r.ok);

  if (errors.length > 0) {
    await env.STATE.put(
      "gov_check_last_error",
      JSON.stringify({
        ts: new Date().toISOString(),
        errors: errors.map(e => ({ url: e.url, error: e.error })),
      })
    );
  }

  if (successFeeds.length === 0) {
    return { ok: false, errors: errors.map(e => e.error) };
  }

  // Fusionner les items de toutes les sources
  const allItems = successFeeds.flatMap(f => parseRssItems(f.xml));

  // Articles déjà vus (partagé entre toutes les sources)
  let seenGuids = [];
  try {
    const raw = await env.STATE.get(GOV_SEEN_KEY);
    if (raw) seenGuids = JSON.parse(raw);
    if (!Array.isArray(seenGuids)) seenGuids = [];
  } catch {
    seenGuids = [];
  }

  const seenSet = new Set(seenGuids);
  const newItems = allItems.filter((item) => !seenSet.has(item.guid));

  const notifyResults = [];
  let trustedCount = 0;
  let filteredOldCount = 0;

  if (newItems.length > 0) {
    const maxAgeDays = parseInt(env.GOV_MAX_ARTICLE_AGE_DAYS || "3", 10);
    const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
    const now = Date.now();

    for (const item of newItems) {
      // Toujours marquer comme vu — évite le retraitement même si l'article est rejeté
      seenSet.add(item.guid);

      // Rejeter les articles trop anciens : ils ne peuvent pas activer gov_signal_active
      const pubMs = item.pubDate ? new Date(item.pubDate).getTime() : NaN;
      const tooOld = !isNaN(pubMs) && (now - pubMs) > maxAgeMs;
      if (tooOld) {
        filteredOldCount++;
        continue;
      }

      const trusted = isTrustedSource(item);
      if (trusted) trustedCount++;
      notifyResults.push(
        await sendAdminNotifications(env, {
          title: trusted
            ? "📰 Bénin | veille gov — source officielle"
            : "📰 Bénin | veille gov — source non vérifiée",
          message: `${item.title}\n${item.link}${item.sourceUrl ? `\n(source : ${item.sourceUrl})` : ""}`,
        })
      );
    }

    // gov_signal_active uniquement si au moins un article récent vient d'un domaine de confiance
    if (trustedCount > 0) {
      await env.STATE.put(GOV_SIGNAL_KEY, new Date().toISOString(), {
        expirationTtl: 30 * 24 * 60 * 60,
      });
    }

    // Mise à jour GUIDs vus — inclut les articles rejetés pour ancienneté (cap 500, FIFO)
    const allSeen = [...seenSet];
    const capped = allSeen.length > 500 ? allSeen.slice(allSeen.length - 500) : allSeen;
    await env.STATE.put(GOV_SEEN_KEY, JSON.stringify(capped));
  }

  return {
    ok: true,
    feedsChecked: rssUrls.length,
    feedErrors: errors.length,
    newArticles: newItems.length,
    filteredOldArticles: filteredOldCount,
    trustedArticles: trustedCount,
    total: allItems.length,
    notifyResults,
  };
}

// Construit la liste complète des URLs RSS à interroger.
// Source primaire : GOV_RSS_URL (ou défaut Google News).
// Sources additionnelles : GOV_EXTRA_SOURCES (liste séparée par virgules).
function buildGovRssUrls(env) {
  const primary =
    env.GOV_RSS_URL ||
    "https://news.google.com/rss/search?q=" +
      encodeURIComponent('"vols spéciaux" OR "affrètement" Bénin OR "Bénin Tours"') +
      "&hl=fr&gl=FR&ceid=FR:fr";

  const extra = (env.GOV_EXTRA_SOURCES || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  return [primary, ...extra];
}

async function fetchRssFeed(url) {
  try {
    const resp = await fetch(url, { headers: { "user-agent": UA } });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return { ok: true, url, xml: await resp.text() };
  } catch (err) {
    return { ok: false, url, error: String(err), xml: "" };
  }
}

// ---------------------------------------------------------------------------
// Parsing RSS minimal (Workers-compatible, pas de dépendance XML)
// ---------------------------------------------------------------------------

function parseRssItems(xml) {
  const items = [];
  const itemBlocks = xml.match(/<item>([\s\S]*?)<\/item>/gi) || [];
  for (const block of itemBlocks) {
    const title = (block.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || "";
    const link = (block.match(/<link>([\s\S]*?)<\/link>/i) || [])[1] || "";
    const guid = (block.match(/<guid[^>]*>([\s\S]*?)<\/guid>/i) || [])[1] || link;
    const pubDate = (block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || [])[1] || "";
    const sourceUrlMatch = block.match(/<source\s[^>]*url=["']([^"']*)["']/i);
    const sourceUrl = sourceUrlMatch ? decodeXmlEntities(sourceUrlMatch[1].trim()) : "";
    items.push({
      title: decodeXmlEntities(title.trim()),
      link: decodeXmlEntities(link.trim()),
      guid: guid.trim(),
      pubDate,
      sourceUrl,
    });
  }
  return items;
}

function isTrustedSource(item) {
  const url = item.sourceUrl || item.link;
  if (!url) return false;
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return GOV_TRUSTED_DOMAINS.some((d) => host === d || host.endsWith("." + d));
  } catch {
    return false;
  }
}

function decodeXmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)));
}

// ---------------------------------------------------------------------------
// Utilitaires
// ---------------------------------------------------------------------------

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(hashBuffer)]
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function jsonResponse(obj) {
  return new Response(JSON.stringify(obj, null, 2), {
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}
