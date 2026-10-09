import { escapeHtml } from "../notify.js";

// ---------------------------------------------------------------------------
// Shell commun, header, footer, barre tricolore identiques sur les 3 emails
// ---------------------------------------------------------------------------

function emailShell(bannerHtml, bodyHtml, unsubscribeUrl = null) {
  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="font-family:system-ui,s ans-serif;background:#F8F6F1;margin:0;padding:24px">
  <div style="max-width:480px;margin:0 auto;background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid rgba(27,43,60,0 .08)">

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
                    <td style="width:36px;height:36px;border-radius:8px;overflow:hidden;vertical-align:middle"><img src="https://alertesvolsbenin.com/logo-icon.svg" width="36" height="36" style="display:block;border-radius:8px" alt=""></td>
                    <td style="padding-left:10px;font-family:Georgia,serif;font-size:15px;font-weight:600;color:rgba(255,255,255,0 .90);letter-spacing:0.01em;vertical-align:middle;white-space:nowrap">Alertes Vols Bénin</td>
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
    <div style="padding:16px 24px;text-align:center;border-top:1px solid rgba(27,43,60,0 .08)">
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
// Email 1, Confirmation d'inscription
// ---------------------------------------------------------------------------

export function confirmationEmailHtml(confirmUrl) {
  const banner = `
    <div style="background:#008751;padding:28px 24px;text-align:center">
      <div style="width:52px;height:52px;background:rgba(255,255,255,0 .18);border-radius:50%;margin:0 auto 12px;text-align:center;line-height:52px;font-size:26px">✉️</div>
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
// Email 2, Bienvenue après paiement
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
    <div style="background:rgba(0,135,81,0.06);border:1px solid rgba(0,1 35,81,0 .14);border-radius:10px;padding:16px;margin:20px 0;text-align:center">
      <p style="color:#1a5a3a;font-size:14px;line-height:1.6;margin:0 0 14px"><strong>Passe le mot à tes proches pour voyager ensemble !</strong><br>Plus on est nombreux à être alertés, moins on rate le coche.</p>
      <a href="https://wa.me/?text=${waText}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;margin:4px" target="_blank">WhatsApp</a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=${fbUrl}" style="display:inline-block;background:#1877F2;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;margin:4px" target="_blank">Facebook</a>
    </div>
    <p style="color:#667888;line-height:1.7;margin:0;font-size:14px">À très vite,<br><strong style="color:#1B2B3C">L'équipe Alertes Vols Bénin</strong></p>`;

  return emailShell(banner, body, unsubscribeUrl);
}

// ---------------------------------------------------------------------------
// Email 3, Alerte vol ouvert
// ---------------------------------------------------------------------------

export function alertEmailHtml(personalMessage, unsubscribeUrl) {
  const banner = `
    <div style="background:#E8112D;padding:28px 24px;text-align:center">
      <table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 auto 14px">
        <tr>
          <td style="width:56px;height:56px;border-radius:12px;overflow:hidden;vertical-align:middle"><img src="https://alertesvolsbenin.com/logo-icon.svg" width="56" height="56" style="display:block;border-radius:12px" alt=""></td>
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
// Email 4, Campagne partage
// ---------------------------------------------------------------------------

export function shareEmailHtml(firstName, unsubscribeUrl) {
  const name = escapeHtml(firstName);
  const shareUrl = "https://alertesvolsbenin.com/inscription?utm_source=whatsapp&utm_medium=referral&utm_campaign=share_sept26";
  const waText = encodeURIComponent(
    "Hey ! Je suis inscrit pour recevoir une alerte dès que les vols Paris-Cotonou s'ouvrent sur voyage.benin.bj. Les places partent en quelques minutes, inscris-toi aussi 👉 " + shareUrl
  );

  const banner = `
    <div style="background:#008751;padding:28px 24px;text-align:center">
      <div style="font-size:36px;margin-bottom:8px">🙏</div>
      <h1 style="color:#fff;margin:0;font-size:20px;font-weight:700;letter-spacing:-0.3px">Un service pour ceux qui comptent pour toi</h1>
    </div>`;

  const body = `
    <p style="color:#667888;line-height:1.7;margin:0 0 14px;font-size:15px">Bonjour <strong style="color:#1B2B3C">${name}</strong>,</p>
    <p style="color:#667888;line-height:1.7;margin:0 0 14px;font-size:15px">Tu fais partie des <strong style="color:#1B2B3C">plus de 30 premières personnes</strong> inscrites sur Alertes Vols Bénin. Merci.</p>
    <p style="color:#667888;line-height:1.7;margin:0 0 14px;font-size:15px">C'est grâce à des gens comme toi que ce service peut aider le plus grand nombre.</p>
    <p style="color:#667888;line-height:1.7;margin:0 0 20px;font-size:15px">Tu as sûrement des proches, famille, amis qui cherchent aussi un vol Paris-Cotonou ou avec qui voyager. Envoie-leur le lien pour qu'ils puissent être aussi alertés et sécuriser leur place rapidement.</p>
    <div style="text-align:center;margin:24px 0">
      <a href="https://wa.me/?text=${waText}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;padding:14px 32px;border-radius:10px;font-size:15px;font-weight:600;white-space:nowrap" target="_blank">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" style="vertical-align:middle;margin-right:8px;margin-bottom:2px;display:inline-block"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.999 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.522 5.83L0 24l6.347-1.505A11.951 11.951 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.8 9.8 0 01-5.028-1.387l-.36-.214-3.742.981.999-3.648-.235-.374A9.781 9.781 0 012.18 12c0-5.413 4.406-9.818 9.818-9.818 5.413 0 9.819 4.405 9.819 9.818 0 5.413-4.406 9.818-9.818 9.818z"/></svg>
        Partager sur WhatsApp
      </a>
    </div>
    <p style="color:#667888;line-height:1.7;margin:0;font-size:14px">À bientôt,<br><strong style="color:#1B2B3C">L'équipe Alertes Vols Bénin</strong></p>`;

  return emailShell(banner, body, unsubscribeUrl);
}

// ---------------------------------------------------------------------------
// Envoi email de bienvenue
// ---------------------------------------------------------------------------

export async function sendWelcomeEmail(env, email, firstName, lastName, token) {
  if (!env.RESEND_API_KEY || !env.ALERT_EMAIL_FROM) return { ok: true, skipped: true };
  const unsubscribeUrl = `${env.APP_BASE_URL}/unsubscribe?token=${token}`;
  const shareUrl = `${env.APP_BASE_URL}/inscription?utm_source=whatsapp&utm_medium=referral&utm_campaign=welcome`;
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
