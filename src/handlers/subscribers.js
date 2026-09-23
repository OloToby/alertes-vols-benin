import { escapeHtml, sendSubscriberSms } from "../notify.js";
import { createStripeCheckoutSession, retrieveStripeSession } from "./stripe.js";
import { subscribePage } from "../pages/landing.js";
import { inscriptionPage } from "../pages/inscription.js";
import { adminPage } from "../pages/admin.js";
import { confirmEmailSentPage, messagePage, confirmationPage } from "../pages/simple-pages.js";
import { alertEmailHtml, confirmationEmailHtml, welcomeEmailHtml, sendWelcomeEmail } from "../pages/emails.js";
import { trackEvent } from "../analytics.js";

const RATE_LIMIT_MAX = 10;
const RATE_LIMIT_TTL = 3600;

// ---------------------------------------------------------------------------
// Helpers salutation personnalisée
// ---------------------------------------------------------------------------

function isSummerTime(date) {
  const y = date.getUTCFullYear();
  const mar31 = new Date(Date.UTC(y, 2, 31));
  mar31.setUTCDate(31 - mar31.getUTCDay());
  const oct31 = new Date(Date.UTC(y, 9, 31));
  oct31.setUTCDate(31 - oct31.getUTCDay());
  return date >= mar31 && date < oct31;
}

function localHourFrance(utcDate) {
  return (utcDate.getUTCHours() + (isSummerTime(utcDate) ? 2 : 1)) % 24;
}

function buildGreeting(civility, lastName, triggeredAt) {
  const d = triggeredAt ? new Date(triggeredAt) : new Date();
  const sal = localHourFrance(d) >= 18 ? "Bonsoir" : "Bonjour";
  if (civility && lastName) {
    return `${sal} ${civility === "M" ? "Monsieur" : "Madame"} ${lastName}`;
  }
  return sal;
}

function buildAlertText(firstName, lastName, triggeredAt) {
  const greeting = buildGreeting(null, lastName, triggeredAt);
  const name = firstName ? ` ${firstName}` : "";
  return `${greeting}${name}, Alertes Vols Bénin vous informe que voyage.benin.bj est ouvert. Réservez vite votre billet ! 👉 https://www.voyage.benin.bj/ Bonne réservation.`;
}

function buildAlertSms(firstName, lastName, triggeredAt) {
  return buildAlertText(firstName, lastName, triggeredAt);
}

function isValidPhone(raw) {
  if (!raw) return false;
  const digits = raw.replace(/[\s\-\(\)\.]/g, '');
  return /^\+\d{7,15}$/.test(digits);
}

// ---------------------------------------------------------------------------
// Routes HTTP
// ---------------------------------------------------------------------------

export async function handleSubscribePage(request, env) {
  const [count, watchState] = await Promise.all([
    getConfirmedCount(env),
    env.STATE.get("watch_state").then((v) => v || "closed").catch(() => "closed"),
  ]);
  return htmlResponse(subscribePage(env.TURNSTILE_SITE_KEY, count, env.SUBSCRIPTION_PRICE_DISPLAY || "", watchState, env.APP_BASE_URL || ""));
}

export async function handleInscriptionPage(request, env) {
  const count = await getConfirmedCount(env);
  const url = new URL(request.url);
  const msg = url.searchParams.get("msg") || url.searchParams.get("erreur") || "";
  return htmlResponse(inscriptionPage(env.TURNSTILE_SITE_KEY, count, env.SUBSCRIPTION_PRICE_DISPLAY || "", msg, env.APP_BASE_URL || ""));
}

export async function handleSubscribePost(request, env) {
  try {
    return await _handleSubscribePost(request, env);
  } catch (err) {
    console.error("handleSubscribePost unhandled error:", String(err), err?.stack);
    return Response.redirect(new URL("/inscription?erreur=serveur", request.url).href, 303);
  }
}

async function _handleSubscribePost(request, env) {
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";

  const hourKey = `ratelimit:sub:${ip}:${new Date().toISOString().slice(0, 13)}`;
  let rateCount = 0;
  try {
    rateCount = parseInt((await env.STATE.get(hourKey)) || "0", 10);
  } catch {}
  if (rateCount >= RATE_LIMIT_MAX) {
    await trackEvent(env, request, 'form_error', { field: 'ratelimit' });
    return Response.redirect(new URL("/inscription?erreur=ratelimit", request.url).href, 303);
  }
  try {
    await env.STATE.put(hourKey, String(rateCount + 1), { expirationTtl: RATE_LIMIT_TTL });
  } catch {}

  let data;
  try {
    data = await request.formData();
  } catch {
    await trackEvent(env, request, 'form_error', { field: 'formulaire' });
    return Response.redirect(new URL("/inscription?erreur=formulaire", request.url).href, 303);
  }

  const firstName = (data.get("first_name") || "").trim();
  const lastName  = (data.get("last_name") || "").trim();
  const email     = (data.get("email") || "").trim().toLowerCase();
  const phone     = (data.get("phone") || "").trim();
  const smsConsent = data.get("sms_consent") === "1" ? 1 : 0;
  const turnstileToken = data.get("cf-turnstile-response");

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    await trackEvent(env, request, 'form_error', { field: 'email' });
    return Response.redirect(new URL("/inscription?erreur=email", request.url).href, 303);
  }
  if (!firstName) {
    await trackEvent(env, request, 'form_error', { field: 'prenom' });
    return Response.redirect(new URL("/inscription?erreur=prenom", request.url).href, 303);
  }
  if (!lastName) {
    await trackEvent(env, request, 'form_error', { field: 'nom' });
    return Response.redirect(new URL("/inscription?erreur=nom", request.url).href, 303);
  }
  if (!isValidPhone(phone)) {
    await trackEvent(env, request, 'form_error', { field: 'telephone' });
    return Response.redirect(new URL("/inscription?erreur=telephone", request.url).href, 303);
  }

  if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
    const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, turnstileToken, ip);
    if (!ok) await trackEvent(env, request, 'form_error', { field: 'turnstile' });
  }

  const existing = await env.DB.prepare(
    "SELECT status, token FROM subscribers WHERE email = ?"
  ).bind(email).first();

  if (existing) {
    if (existing.status === "confirmed") {
      await trackEvent(env, request, 'form_error', { field: 'duplicate' });
      return Response.redirect(
        new URL("/inscription?msg=dejainscrit", request.url).toString(), 303
      );
    }
    if (existing.status === "pending") {
      await trackEvent(env, request, 'form_step1_success');
      const { ok } = await sendConfirmationEmail(env, email, existing.token);
      if (!ok) return Response.redirect(new URL("/inscription?erreur=email_envoi", request.url).href, 303);
      return htmlResponse(confirmEmailSentPage(email));
    }
    if (existing.status === "unsubscribed") {
      await trackEvent(env, request, 'form_step1_success');
      if (env.STRIPE_SECRET_KEY) {
        try {
          const session = await createStripeCheckoutSession(env, { email, phone, firstName, lastName, smsConsent, reactivate: true });
          return Response.redirect(session.url, 303);
        } catch (err) {
          console.error("createStripeCheckoutSession error:", String(err));
          return Response.redirect(new URL("/inscription?erreur=paiement", request.url).href, 303);
        }
      }
      const newToken = crypto.randomUUID();
      await env.DB.prepare(
        `UPDATE subscribers SET status='pending', token=?, confirmed_at=NULL,
         first_name=?, last_name=?, phone=?, sms_consent=? WHERE email=?`
      ).bind(newToken, firstName, lastName, phone, smsConsent, email).run();
      const { ok } = await sendConfirmationEmail(env, email, newToken);
      if (!ok) return htmlResponse(messagePage("Erreur d'envoi", "Ton compte a été réactivé mais l'email de confirmation n'a pas pu être envoyé."), 500);
      return htmlResponse(confirmEmailSentPage(email));
    }
  }

  await trackEvent(env, request, 'form_step1_success');

  if (env.STRIPE_SECRET_KEY) {
    try {
      const session = await createStripeCheckoutSession(env, { email, phone, firstName, lastName, smsConsent, reactivate: false });
      return Response.redirect(session.url, 303);
    } catch (err) {
      console.error("createStripeCheckoutSession error:", String(err));
      return Response.redirect(new URL("/inscription?erreur=paiement", request.url).href, 303);
    }
  }

  const id    = crypto.randomUUID();
  const token = crypto.randomUUID();
  const now   = new Date().toISOString();

  await env.DB.prepare(
    `INSERT INTO subscribers (id, email, phone, first_name, last_name, sms_consent, status, token, created_at)
     VALUES (?, ?, ?, ?, ?, ?, 'pending', ?, ?)`
  ).bind(id, email, phone, firstName, lastName, smsConsent, token, now).run();

  const { ok } = await sendConfirmationEmail(env, email, token);
  if (!ok) return Response.redirect(new URL("/inscription?erreur=email_envoi", request.url).href, 303);

  return htmlResponse(confirmEmailSentPage(email));
}

// ---------------------------------------------------------------------------
// Payment handlers
// ---------------------------------------------------------------------------

export async function handlePaymentReturn(request, env) {
  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) return htmlResponse(messagePage("Erreur", "Paramètre manquant.", "/inscription"), 400);

  let subscriberData;
  try {
    const raw = await env.STATE.get(`stripeorder:${sessionId}`);
    if (!raw) return htmlResponse(messagePage("Session expirée", `La session a expiré. <a href="/inscription">Recommencer →</a>`, "/inscription"), 410);
    subscriberData = JSON.parse(raw);
  } catch {
    return htmlResponse(messagePage("Erreur", "Erreur de session.", "/inscription"), 500);
  }

  let session;
  try {
    session = await retrieveStripeSession(env, sessionId);
  } catch (err) {
    console.error("Stripe retrieve failed:", String(err));
    await trackEvent(env, request, 'payment_error', { code: 'stripe_retrieve_exception' });
    return htmlResponse(messagePage("Paiement non confirmé", "Le paiement n'a pas pu être vérifié. Si tu as payé, contacte-nous.", "/inscription"), 402);
  }

  if (session.payment_status !== "paid") {
    await trackEvent(env, request, 'payment_error', { code: session.payment_status || 'not_paid' });
    return htmlResponse(messagePage("Paiement non complété", `Statut : ${session.payment_status}. Réessaie.`, "/inscription"), 402);
  }

  await env.STATE.delete(`stripeorder:${sessionId}`).catch(() => {});

  const { email, phone, firstName, lastName, smsConsent, reactivate } = subscriberData;
  const now = new Date().toISOString();
  const token = crypto.randomUUID();

  try {
    if (reactivate) {
      await env.DB.prepare(
        `UPDATE subscribers SET status='confirmed', token=?, confirmed_at=?,
         first_name=?, last_name=?, phone=?, sms_consent=? WHERE email=?`
      ).bind(token, now, firstName, lastName, phone, smsConsent, email).run();
    } else {
      const existing = await env.DB.prepare("SELECT id, status FROM subscribers WHERE email = ?").bind(email).first();
      if (existing && existing.status === "confirmed") {
        return Response.redirect(new URL("/inscription?msg=dejainscrit", request.url).toString(), 303);
      }
      if (existing) {
        await env.DB.prepare(
          `UPDATE subscribers SET status='confirmed', token=?, confirmed_at=?,
           first_name=?, last_name=?, phone=?, sms_consent=? WHERE email=?`
        ).bind(token, now, firstName, lastName, phone, smsConsent, email).run();
      } else {
        const id = crypto.randomUUID();
        await env.DB.prepare(
          `INSERT INTO subscribers (id, email, phone, first_name, last_name, sms_consent, status, token, confirmed_at, created_at) VALUES (?, ?, ?, ?, ?, ?, 'confirmed', ?, ?, ?)`
        ).bind(id, email, phone, firstName, lastName, smsConsent, token, now, now).run();
      }
    }
  } catch (err) {
    console.error("DB insert/update failed:", String(err));
    return htmlResponse(messagePage("Erreur d'inscription", `Paiement reçu mais ton inscription a échoué. Contacte-nous avec : ${escapeHtml(email)}.`, "/"), 500);
  }

  let emailResult = await sendWelcomeEmail(env, email, firstName, lastName, token);
  if (!emailResult.ok && !emailResult.skipped) {
    console.warn(`sendWelcomeEmail retry for ${email}`);
    emailResult = await sendWelcomeEmail(env, email, firstName, lastName, token);
    if (!emailResult.ok) console.error(`sendWelcomeEmail definitive failure for ${email}`);
  }
  await trackEvent(env, request, 'payment_completed');

  return htmlResponse(confirmationPage(env.SUBSCRIPTION_PRICE_DISPLAY || "", env.APP_BASE_URL || ""));
}

export async function handlePaymentCancel(request, env) {
  await trackEvent(env, request, 'payment_cancelled');
  return Response.redirect(new URL("/inscription?msg=paiement_annule", request.url).toString(), 303);
}

export async function handlePaymentSuccess(request, env) {
  return htmlResponse(confirmationPage(env.SUBSCRIPTION_PRICE_DISPLAY || "", env.APP_BASE_URL || ""));
}

// ---------------------------------------------------------------------------
// Smart Payment Buttons - JSON API
// ---------------------------------------------------------------------------

export async function handleCreateStripeSession(request, env) {
  try {
    const body = await request.json();
    const email = (body.email || "").trim().toLowerCase();
    const firstName = (body.firstName || "").trim();
    const lastName = (body.lastName || "").trim();
    const phone = (body.phone || "").trim();
    const smsConsent = body.smsConsent ? 1 : 0;
    const turnstileToken = body.turnstileToken || "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      await trackEvent(env, request, 'form_error', { field: 'email' });
      return jsonApiError("email", 400);
    }
    if (!firstName) {
      await trackEvent(env, request, 'form_error', { field: 'prenom' });
      return jsonApiError("prenom", 400);
    }
    if (!lastName) {
      await trackEvent(env, request, 'form_error', { field: 'nom' });
      return jsonApiError("nom", 400);
    }
    if (!isValidPhone(phone)) {
      await trackEvent(env, request, 'form_error', { field: 'telephone' });
      return jsonApiError("telephone", 400);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    const hourKey = `ratelimit:sub:${ip}:${new Date().toISOString().slice(0, 13)}`;
    let rateCount = 0;
    try { rateCount = parseInt((await env.STATE.get(hourKey)) || "0", 10); } catch {}
    if (rateCount >= RATE_LIMIT_MAX) {
      await trackEvent(env, request, 'form_error', { field: 'ratelimit' });
      return jsonApiError("ratelimit", 429);
    }
    try { await env.STATE.put(hourKey, String(rateCount + 1), { expirationTtl: RATE_LIMIT_TTL }); } catch {}

    if (env.TURNSTILE_SECRET_KEY && turnstileToken) {
      const ok = await verifyTurnstile(env.TURNSTILE_SECRET_KEY, turnstileToken, ip);
      if (!ok) await trackEvent(env, request, 'form_error', { field: 'turnstile' });
    }

    const existing = await env.DB.prepare(
      "SELECT status FROM subscribers WHERE email = ?"
    ).bind(email).first();

    if (existing && existing.status === "confirmed") {
      await trackEvent(env, request, 'form_error', { field: 'duplicate' });
      return jsonApiError("dejainscrit", 409);
    }

    const session = await createStripeCheckoutSession(env, {
      email, phone, firstName, lastName, smsConsent,
      reactivate: existing?.status === "unsubscribed",
    });

    await trackEvent(env, request, 'form_step1_success');
    await trackEvent(env, request, 'payment_initiated');

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error("handleCreateStripeSession error:", String(err), err?.stack);
    return jsonApiError("paiement", 500);
  }
}

function jsonApiError(code, status) {
  return new Response(JSON.stringify({ error: code }), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// ---------------------------------------------------------------------------
// Confirm / Unsubscribe
// ---------------------------------------------------------------------------

export async function handleConfirm(request, env) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return htmlResponse(messagePage("Erreur", "Token manquant."), 400);

  const sub = await env.DB.prepare("SELECT status FROM subscribers WHERE token = ?")
    .bind(token).first();

  if (!sub) return htmlResponse(messagePage("Lien invalide", "Ce lien est invalide ou a expiré."), 404);
  if (sub.status === "confirmed")
    return htmlResponse(messagePage("Déjà confirmé", "Ton inscription est déjà active. Tu recevras l'alerte."));
  if (sub.status === "unsubscribed")
    return htmlResponse(messagePage("Compte désinscrit", "Ce compte est désinscrit. Réinscris-toi depuis la page d'accueil."), 400);

  await env.DB.prepare("UPDATE subscribers SET status='confirmed', confirmed_at=? WHERE token=?")
    .bind(new Date().toISOString(), token).run();

  await trackEvent(env, request, 'email_confirmed');

  return htmlResponse(confirmationPage(env.SUBSCRIPTION_PRICE_DISPLAY || "", env.APP_BASE_URL || ""));
}

export async function handleUnsubscribe(request, env) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) return htmlResponse(messagePage("Erreur", "Token manquant."), 400);

  const sub = await env.DB.prepare("SELECT status FROM subscribers WHERE token = ?")
    .bind(token).first();

  if (!sub) return htmlResponse(messagePage("Lien invalide", "Ce lien est invalide."), 404);
  if (sub.status === "unsubscribed")
    return htmlResponse(messagePage("Déjà désinscrit", "Tu étais déjà désinscrit. Tu ne recevras plus aucun email."));

  await env.DB.prepare("UPDATE subscribers SET status='unsubscribed' WHERE token=?")
    .bind(token).run();

  await trackEvent(env, request, 'unsubscribed');

  return htmlResponse(
    messagePage("Désinscription confirmée", "Tu ne recevras plus d'alertes. Tu peux te réinscrire à tout moment depuis la page d'accueil.")
  );
}

// ---------------------------------------------------------------------------
// Admin
// ---------------------------------------------------------------------------

export async function handleAdminStats(request, env) {
  try {
    const url = new URL(request.url);
    const offset = parseInt(url.searchParams.get("offset") || "0", 10);
    const limit = Math.min(parseInt(url.searchParams.get("limit") || "200", 10), 200);

    const [statsRes, subsRes] = await Promise.all([
      env.DB.prepare("SELECT status, COUNT(*) as n FROM subscribers GROUP BY status").all(),
      env.DB.prepare(
        `SELECT id, email, first_name, last_name, phone, sms_consent, status, created_at, confirmed_at
         FROM subscribers ORDER BY created_at DESC LIMIT ? OFFSET ?`
      ).bind(limit, offset).all(),
    ]);

    const rows = statsRes.results || [];
    const stats = Object.fromEntries(rows.map((r) => [r.status, r.n]));
    stats.total = rows.reduce((acc, r) => acc + r.n, 0);

    return new Response(JSON.stringify({ stats, subscribers: subsRes.results || [], offset, limit }, null, 2), {
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    console.error("Admin stats error:", err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }
}

export async function handleAdminPage(request, env) {
  return new Response(adminPage(), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function handleAdminAnalytics(request, env) {
  try {
    const url = new URL(request.url);
    const days = Math.min(parseInt(url.searchParams.get('days') || '30', 10), 90);
    const since = new Date(Date.now() - days * 24 * 3600 * 1000).toISOString();

    const [overview, funnel, errors, attribution, trend, conv_perf, recent] = await env.DB.batch([
      env.DB.prepare(
        `SELECT event_name, COUNT(*) as n, COUNT(DISTINCT session_id) as uniq
         FROM analytics_events WHERE created_at >= ?
         GROUP BY event_name ORDER BY n DESC`
      ).bind(since),

      env.DB.prepare(
        `SELECT 'landing' as step, 1 as ord, COUNT(DISTINCT session_id) as sessions
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=?
         UNION ALL
         SELECT 'inscription',2,COUNT(DISTINCT session_id)
           FROM analytics_events WHERE event_name='page_view' AND page='/inscription' AND created_at>=?
         UNION ALL
         SELECT 'form_submit',3,COUNT(DISTINCT session_id)
           FROM analytics_events WHERE event_name='form_step1_success' AND created_at>=?
         UNION ALL
         SELECT 'payment_init',4,COUNT(DISTINCT session_id)
           FROM analytics_events WHERE event_name='payment_initiated' AND created_at>=?
         UNION ALL
         SELECT 'payment_done',5,COUNT(DISTINCT session_id)
           FROM analytics_events WHERE event_name='payment_completed' AND created_at>=?
         ORDER BY ord`
      ).bind(since, since, since, since, since),

      env.DB.prepare(
        `SELECT event_name,
                COALESCE(json_extract(metadata,'$.field'), json_extract(metadata,'$.code'), 'unknown') as detail,
                COUNT(*) as n
         FROM analytics_events
         WHERE created_at>=? AND event_name IN ('form_error','payment_error')
         GROUP BY event_name, detail ORDER BY n DESC`
      ).bind(since),

      env.DB.prepare(
        `SELECT 'referrer' as dim, referrer_type as val, COUNT(DISTINCT session_id) as sessions
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=? GROUP BY referrer_type
         UNION ALL
         SELECT 'country', country, COUNT(DISTINCT session_id)
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=? GROUP BY country
         UNION ALL
         SELECT 'device', device, COUNT(DISTINCT session_id)
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=? GROUP BY device
         UNION ALL
         SELECT 'browser', browser, COUNT(DISTINCT session_id)
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=? GROUP BY browser
         ORDER BY dim, sessions DESC`
      ).bind(since, since, since, since),

      env.DB.prepare(
        `SELECT 'daily' as type, DATE(created_at) as key, COUNT(DISTINCT session_id) as n
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=? GROUP BY DATE(created_at)
         UNION ALL
         SELECT 'hourly', CAST(strftime('%H',created_at) AS TEXT), COUNT(*) as n
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=? GROUP BY strftime('%H',created_at)
         ORDER BY type, key`
      ).bind(since, since),

      env.DB.prepare(
        `SELECT 'source' as dim, v.referrer_type as val, v.visits, COALESCE(p.payments,0) as payments
         FROM (
           SELECT referrer_type, COUNT(DISTINCT session_id) as visits
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=?
           GROUP BY referrer_type
         ) v
         LEFT JOIN (
           SELECT ae1.referrer_type, COUNT(DISTINCT ae1.session_id) as payments
           FROM analytics_events ae1
           JOIN analytics_events ae2 ON ae1.session_id=ae2.session_id
           WHERE ae1.event_name='page_view' AND ae1.page='/' AND ae1.created_at>=?
             AND ae2.event_name='payment_completed' AND ae2.created_at>=?
           GROUP BY ae1.referrer_type
         ) p ON v.referrer_type=p.referrer_type
         UNION ALL
         SELECT 'device', v2.device, v2.visits, COALESCE(p2.payments,0)
         FROM (
           SELECT device, COUNT(DISTINCT session_id) as visits
           FROM analytics_events WHERE event_name='page_view' AND page='/' AND created_at>=?
           GROUP BY device
         ) v2
         LEFT JOIN (
           SELECT ae1.device, COUNT(DISTINCT ae1.session_id) as payments
           FROM analytics_events ae1
           JOIN analytics_events ae2 ON ae1.session_id=ae2.session_id
           WHERE ae1.event_name='page_view' AND ae1.page='/' AND ae1.created_at>=?
             AND ae2.event_name='payment_completed' AND ae2.created_at>=?
           GROUP BY ae1.device
         ) p2 ON v2.device=p2.device
         ORDER BY dim, visits DESC`
      ).bind(since, since, since, since, since, since),

      env.DB.prepare(
        `SELECT session_id, event_name, page, metadata, country, device, browser, referrer_type, created_at
         FROM analytics_events
         ORDER BY created_at DESC
         LIMIT 50`
      ),
    ]);

    return new Response(JSON.stringify({
      days,
      overview:    overview.results    || [],
      funnel:      funnel.results      || [],
      errors:      errors.results      || [],
      attribution: attribution.results || [],
      trend:       trend.results       || [],
      conv_perf:   conv_perf.results   || [],
      recent:      recent.results      || [],
    }, null, 2), { headers: { 'content-type': 'application/json; charset=utf-8' } });
  } catch (err) {
    console.error('handleAdminAnalytics error:', err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json; charset=utf-8' },
    });
  }
}

// ---------------------------------------------------------------------------
// Fan-out Queue consumer - email + SMS personnalisés
// ---------------------------------------------------------------------------

export async function processFanout(batch, env) {
  for (const msg of batch.messages) {
    const body = msg.body;

    if (body.type !== "subscriber_alert") { msg.ack(); continue; }

    const { title, triggered_at, last_confirmed_at, last_id } = body;
    const cursor = last_confirmed_at || '';
    const cursorId = last_id || '';

    if (!env.RESEND_API_KEY || !env.ALERT_EMAIL_FROM) {
      console.error("Fan-out: RESEND_API_KEY ou ALERT_EMAIL_FROM manquant.");
      msg.ack();
      continue;
    }

    try {
      const { results } = await env.DB.prepare(
        `SELECT id, email, phone, first_name, last_name, sms_consent, token, confirmed_at
         FROM subscribers WHERE status = 'confirmed'
         AND (? = '' OR confirmed_at > ? OR (confirmed_at = ? AND id > ?))
         ORDER BY confirmed_at, id LIMIT 50`
      ).bind(cursor, cursor, cursor, cursorId).all();

      if (results.length > 0) {
        const emailPayload = results.map((sub) => ({
          from: env.ALERT_EMAIL_FROM,
          to: [sub.email],
          subject: title,
          html: alertEmailHtml(
            buildAlertText(sub.first_name, sub.last_name, triggered_at),
            `${env.APP_BASE_URL}/unsubscribe?token=${sub.token}`
          ),
        }));

        const emailRes = await fetch("https://api.resend.com/emails/batch", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
            "content-type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        });

        if (!emailRes.ok) {
          const err = await emailRes.text();
          console.error(`Fan-out Resend error cursor=${cursor}: ${err}`);
          msg.retry({ delaySeconds: 60 });
          continue;
        }

        const smsJobs = results
          .filter((sub) => sub.sms_consent === 1 && sub.phone)
          .map((sub) =>
            sendSubscriberSms(env, sub.phone, buildAlertSms(sub.first_name, sub.last_name, triggered_at))
          );

        if (smsJobs.length > 0) {
          const smsResults = await Promise.all(smsJobs);
          const failed = smsResults.filter((r) => !r.ok && !r.skipped).length;
          if (failed > 0) console.warn(`Fan-out SMS: ${failed} échec(s) cursor=${cursor}`);
        }
      }

      if (results.length === 50) {
        const last = results[results.length - 1];
        await env.FANOUT_QUEUE.send({
          type: "subscriber_alert",
          title,
          triggered_at,
          last_confirmed_at: last.confirmed_at,
          last_id: last.id,
        });
      }

      msg.ack();
    } catch (err) {
      console.error(`Fan-out exception cursor=${cursor}:`, err);
      msg.retry({ delaySeconds: 60 });
    }
  }
}

// ---------------------------------------------------------------------------
// Helpers internes
// ---------------------------------------------------------------------------

async function sendConfirmationEmail(env, email, token) {
  if (!env.RESEND_API_KEY || !env.ALERT_EMAIL_FROM) return { ok: true, skipped: true };
  const confirmUrl = `${env.APP_BASE_URL}/confirm?token=${token}`;
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: env.ALERT_EMAIL_FROM,
        to: [email],
        subject: "✈️ Confirme ton inscription | Alertes vols Bénin",
        html: confirmationEmailHtml(confirmUrl),
      }),
    });
    if (!res.ok) {
      console.error(`sendConfirmationEmail failed for ${email}: ${await res.text()}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error(`sendConfirmationEmail exception for ${email}:`, err);
    return { ok: false };
  }
}

async function verifyTurnstile(secretKey, token, ip) {
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret: secretKey, response: token, remoteip: ip });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = await res.json();
    return data.success === true;
  } catch { return false; }
}

async function getConfirmedCount(env) {
  if (!env.DB) return 0;
  try {
    const row = await env.DB.prepare(
      "SELECT COUNT(*) as n FROM subscribers WHERE status = 'confirmed'"
    ).first();
    return row?.n || 0;
  } catch { return 0; }
}

function htmlResponse(html, status = 200) {
  return new Response(html, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
