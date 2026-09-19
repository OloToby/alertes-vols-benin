import { escapeHtml } from "../notify.js";

function paypalBase(env) {
  return (env.PAYPAL_MODE || "sandbox") === "live"
    ? "https://api-m.paypal.com"
    : "https://api-m.sandbox.paypal.com";
}

export async function getPaypalToken(env) {
  const creds = btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`);
  const res = await fetch(`${paypalBase(env)}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${creds}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!res.ok) throw new Error(`PayPal token: ${await res.text()}`);
  return (await res.json()).access_token;
}

export async function createPaypalOrder(env, accessToken) {
  const price = env.SUBSCRIPTION_PRICE_AMOUNT || "10.00";
  const appBase = env.APP_BASE_URL || "";
  const res = await fetch(`${paypalBase(env)}/v2/checkout/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      "PayPal-Request-Id": crypto.randomUUID(),
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ description: "Alerte vols Bénin - inscription", amount: { currency_code: "EUR", value: price } }],
      application_context: {
        brand_name: "Alertes Vols Bénin",
        landing_page: "NO_PREFERENCE",
        user_action: "PAY_NOW",
        return_url: `${appBase}/payment-return`,
        cancel_url: `${appBase}/payment-cancel`,
      },
    }),
  });
  if (!res.ok) throw new Error(`PayPal order: ${await res.text()}`);
  return await res.json();
}

export async function capturePaypalOrder(env, orderId, accessToken) {
  const res = await fetch(`${paypalBase(env)}/v2/checkout/orders/${orderId}/capture`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "content-type": "application/json",
      "PayPal-Request-Id": crypto.randomUUID(),
    },
  });
  if (!res.ok) throw new Error(`PayPal capture: ${await res.text()}`);
  return await res.json();
}

export async function createPaypalCheckout(request, env, subscriberData) {
  try {
    const accessToken = await getPaypalToken(env);
    const order = await createPaypalOrder(env, accessToken);
    const approveLink = order.links.find((l) => l.rel === "approve")?.href;
    if (!approveLink) throw new Error("No approve link in PayPal response");
    await env.STATE.put(`payorder:${order.id}`, JSON.stringify(subscriberData), { expirationTtl: 3600 });
    return Response.redirect(approveLink, 303);
  } catch (err) {
    console.error("createPaypalCheckout error:", String(err), err?.stack);
    return Response.redirect(new URL("/inscription?erreur=paiement", request.url).href, 303);
  }
}
