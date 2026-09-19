/**
 * Notifications admin (ntfy + email + SMS) et mise en file du fan-out abonnés.
 * Les canaux admin sont intentionnellement séparés du fan-out communautaire.
 */

export async function sendAdminNotifications(env, { title, message }) {
  const tasks = [];

  if (env.RESEND_API_KEY && env.ALERT_EMAIL_FROM && env.ALERT_EMAIL_TO) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          from: env.ALERT_EMAIL_FROM,
          to: [env.ALERT_EMAIL_TO],
          subject: title,
          html: `<p>${escapeHtml(message)}</p>`,
        }),
      })
        .then((r) => ({ channel: "email", ok: r.ok, status: r.status }))
        .catch((e) => ({ channel: "email", ok: false, error: String(e) }))
    );
  }

  if (
    env.TWILIO_ACCOUNT_SID &&
    env.TWILIO_AUTH_TOKEN &&
    env.TWILIO_FROM_NUMBER &&
    env.TWILIO_TO_NUMBER
  ) {
    const body = new URLSearchParams({
      From: env.TWILIO_FROM_NUMBER,
      To: env.TWILIO_TO_NUMBER,
      Body: `${title}\n${message}`,
    });
    const basicAuth = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
    tasks.push(
      fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${basicAuth}`,
            "content-type": "application/x-www-form-urlencoded",
          },
          body: body.toString(),
        }
      )
        .then((r) => ({ channel: "sms", ok: r.ok, status: r.status }))
        .catch((e) => ({ channel: "sms", ok: false, error: String(e) }))
    );
  }

  return Promise.all(tasks);
}

/**
 * Envoie un SMS à un numéro d'abonné via Twilio.
 * Retourne { ok, skipped?, status? }.
 */
export async function sendSubscriberSms(env, toNumber, text) {
  if (
    !env.TWILIO_ACCOUNT_SID ||
    !env.TWILIO_AUTH_TOKEN ||
    !env.TWILIO_FROM_NUMBER
  ) {
    return { ok: true, skipped: "twilio non configuré" };
  }
  try {
    const body = new URLSearchParams({
      From: env.TWILIO_FROM_NUMBER,
      To: toNumber,
      Body: text,
    });
    const basicAuth = btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`);
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${basicAuth}`,
          "content-type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      }
    );
    return { ok: res.ok, status: res.status };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/**
 * Pousse un message dans la Queue Cloudflare pour fan-out vers les abonnés.
 * Le consumer lit D1 par pages de 50 et s'auto-chaîne jusqu'à épuisement.
 * triggered_at permet de calculer la salutation selon l'heure locale France.
 */
export async function enqueueSubscriberAlert(env, { title, message }) {
  if (!env.FANOUT_QUEUE) return { skipped: "queue non configurée" };
  await env.FANOUT_QUEUE.send({
    type: "subscriber_alert",
    title,
    message,
    last_confirmed_at: null,
    last_id: null,
    triggered_at: new Date().toISOString(),
  });
  return { queued: true };
}

export function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
