import { escapeHtml } from "../notify.js";

// ---------------------------------------------------------------------------
// Shell commun — header, footer, barre tricolore identiques sur les 3 emails
// ---------------------------------------------------------------------------

function emailShell(bannerHtml, bodyHtml, unsubscribeUrl = null) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:system-ui,sans-serif;background:#F8F6F1;margin:0;padding:24px">
  <div style="max-width:480px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid rgba(27,43,60,0.08)">

    <!-- HEADER unifié -->
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#1B2B3C;border-collapse:collapse">
      <tr>
        <td style="padding:18px 24px">
          <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse">
            <tr>
              <!-- Logo : carré vert arrondi + avion (logo du site) -->
              <td style="vertical-align:middle">
                <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
                  <tr>
                    <td style="width:36px;height:36px;background:#008751;border-radius:8px;text-align:center;vertical-align:middle;font-size:20px;line-height:36px;color:#fff">✈</td>
                    <td style="padding-left:10px;font-family:Georgia,serif;font-size:15px;font-weight:600;color:rgba(255,255,255,0.90);letter-spacing:0.01em;vertical-align:middle;white-space:nowrap">Alertes Vols Bénin</td>
                  </tr>
                </table>
              </td>
              <!-- Drapeau béninois -->
              <td style="text-align:right;vertical-align:middle">
                <table cellpadding="0" cellspacing="0" style="width:32px;height:22px;border-radius:4px;overflow:hidden;border-collapse:collapse;display:inline-table">
                  <tr>
                    <td rowspan="2" style="width:40%;background:#008751"></td>
                    <td style="height:11px;background:#FCD116"></td>
                  </tr>
                  <tr>
                    <td style="height:11px;background:#E8112D"></td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>

    <!-- BANNIÈRE contextuelle -->
    ${bannerHtml}

    <!-- CORPS -->
    <div style="padding:32px">
      ${bodyHtml}
    </div>

    <!-- FOOTER -->
    <div style="padding:16px 24px;text-align:center;border-top:1px solid rgba(27,43,60,0.08)">
      <p style="color:#9BADB3;font-size:11px;margin:0 0 6px;line-height:1.5">Pour ne pas rater l'alerte, ajoute <strong>alertesvolsbenin@gmail.com</strong> à tes contacts.</p>
      ${unsubscribeUrl ? `<a href="${unsubscribeUrl}" style="color:#C5D0D8;font-size:11px;text-decoration:none">Me désinscrire</a>` : ''}
    </div>

    <!-- Barre tricolore -->
    <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;height:4px">
      <tr>
        <td style="background:#008751;width:25%"></td>
        <td style="background:#FCD116;width:50%"></td>
        <td style="background:#E8112D;width:25%"></td>
      </tr>
    </table>

  </div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Email 1 — Confirmation d'inscription
// ---------------------------------------------------------------------------

export function confirmationEmailHtml(confirmUrl) {
  const banner = `
    <div style="background:#008751;padding:28px 24px;text-align:center">
      <div style="width:52px;height:52px;background:rgba(255,255,255,0.18);border-radius:50%;margin:0 auto 12px;text-align:center;line-height:52px;font-size:26px">✉️</div>
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;letter-spacing:-0.3px">Confirme ton adresse email</h1>
    </div>`;

  const body = `
    <p style="color:#667888;line-height:1.7;margin:0 0 12px;font-size:15px">Tu t'es inscrit pour recevoir une alerte dès que les vols Paris-Cotonou à tarif spécial s'ouvrent sur <strong style="color:#1B2B3C">voyage.benin.bj</strong>.</p>
    <p style="color:#667888;line-height:1.7;margin:0 0 28px;font-size:15px">Clique ci-dessous pour confirmer ton adresse et activer ton alerte :</p>
    <div style="text-align:center">
      <a href="${confirmUrl}" style="background:#008751;color:#fff;text-decoration:none;padding:15px 36px;border-radius:10px;font-weight:600;font-size:15px;display:inline-block">Confirmer mon inscription →</a>
    </div>
    <p style="color:#9BADB3;font-size:12px;margin:28px 0 0;text-align:center">Si tu n'as pas demandé cette inscription, ignore cet email.</p>`;

  return emailShell(banner, body);
}

// ---------------------------------------------------------------------------
// Email 2 — Bienvenue après paiement
// ---------------------------------------------------------------------------

export function welcomeEmailHtml(firstName, lastName, unsubscribeUrl, shareUrl) {
  const name = escapeHtml(firstName);
  const waText = encodeURIComponent(
    "Hey ! Je viens de m'inscrire pour recevoir une alerte dès que les vols Paris-Cotonou s'ouvrent sur voyage.benin.bj. Les places partent en quelques minutes, alors inscris-toi aussi 👉 " + shareUrl
  );
  const fbUrl = encodeURIComponent(shareUrl);

  const banner = `
    <div style="background:#008751;padding:28px 24px;text-align:center">
      <div style="font-size:36px;margin-bottom:8px">✅</div>
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;letter-spacing:-0.3px">${name}, c'est validé !</h1>
    </div>`;

  const body = `
    <p style="color:#667888;line-height:1.7;margin:0 0 14px;font-size:15px">Ton paiement est passé, ton alerte est active. Y'a plus qu'à attendre l'ouverture.</p>
    <p style="color:#667888;line-height:1.7;margin:0 0 14px;font-size:15px">Concrètement : dès que <strong style="color:#1B2B3C">voyage.benin.bj</strong> ouvre les réservations des vols Paris-Cotonou, on t'envoie un <strong style="color:#1B2B3C">email + SMS</strong> dans la foulée. Pas besoin de rafraîchir le site 50 fois par jour.</p>
    <p style="color:#667888;line-height:1.7;margin:0 0 14px;font-size:15px">Pour rappel, en décembre dernier les places sont parties en quelques minutes. Cette fois, tu seras dans les premiers prévenus.</p>
    <div style="background:rgba(0,135,81,0.06);border:1px solid rgba(0,135,81,0.14);border-radius:10px;padding:16px;margin:20px 0;text-align:center">
      <p style="color:#1a5a3a;font-size:14px;line-height:1.6;margin:0 0 14px"><strong>Passe le mot à tes proches pour voyager ensemble !</strong><br>Plus on est nombreux à être alertés, moins on rate le coche.</p>
      <a href="https://wa.me/?text=${waText}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;margin:4px" target="_blank">WhatsApp</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${fbUrl}" style="display:inline-block;background:#1877F2;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;margin:4px" target="_blank">Facebook</a>
    </div>
    <p style="color:#667888;line-height:1.7;margin:0;font-size:14px">À très vite,<br><strong style="color:#1B2B3C">L'équipe Alertes Vols Bénin</strong></p>`;

  return emailShell(banner, body, unsubscribeUrl);
}

// ---------------------------------------------------------------------------
// Email 3 — Alerte vol ouvert
// ---------------------------------------------------------------------------

export function alertEmailHtml(personalMessage, unsubscribeUrl) {
  const banner = `
    <div style="background:#E8112D;padding:28px 24px;text-align:center">
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 auto 14px">
        <tr>
          <td style="width:56px;height:56px;background:#008751;border-radius:12px;text-align:center;vertical-align:middle;font-size:32px;line-height:56px;color:#fff">✈</td>
        </tr>
      </table>
      <h1 style="color:#fff;margin:0;font-size:26px;font-weight:700;letter-spacing:-0.5px">Les vols sont OUVERTS !</h1>
    </div>`;

  const body = `
    <p style="color:#1B2B3C;font-size:16px;line-height:1.7;margin:0 0 28px;text-align:center">${escapeHtml(personalMessage)}</p>
    <div style="text-align:center">
      <a href="https://www.voyage.benin.bj/" style="background:#008751;color:#fff;text-decoration:none;padding:15px 44px;border-radius:10px;font-weight:700;font-size:16px;display:inline-block">Réserver maintenant →</a>
    </div>
    <p style="color:#E8112D;font-size:13px;font-weight:600;margin:20px 0 0;text-align:center">Dépêche-toi, les places partent en quelques minutes !</p>`;

  return emailShell(banner, body, unsubscribeUrl);
}

// ---------------------------------------------------------------------------
// Envoi email de bienvenue
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(env, email, firstName, lastName, token) {
  if (!env.RESEND_API_KEY || !env.ALERT_EMAIL_FROM) return { ok: true, skipped: true };
  const unsubscribeUrl = `${env.APP_BASE_URL}/unsubscribe?token=${token}`;
  const shareUrl = `${env.APP_BASE_URL}/inscription`;
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
        subject: `${firstName}, c'est validé ! Ton alerte vol est active.`,
        html: welcomeEmailHtml(firstName, lastName, unsubscribeUrl, shareUrl),
      }),
    });
    if (!res.ok) {
      console.error(`sendWelcomeEmail failed for ${email}: ${await res.text()}`);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error(`sendWelcomeEmail exception for ${email}:`, err);
    return { ok: false };
  }
}
