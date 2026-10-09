export async function createStripeCheckoutSession(env, subscriberData) {
  const appBase = env.APP_BASE_URL || "";
  const priceInCents = Math.round(parseFloat(env.SUBSCRIPTION_PRICE_AMOUNT || "5.99") * 100);

  const params = new URLSearchParams({
    mode: "payment",
    "payment_method_types[]": "card",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][product_data][name]": "Alerte Vols Bénin – Inscription",
    "line_items[0][price_data][unit_amount]": String(priceInCents),
    "line_items[0][quantity]": "1",
    success_url: `${appBase}/payment-return?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appBase}/payment-cancel`,
    customer_email: subscriberData.email,
  });

  let res;
  for (let attempt = 0; attempt < 3; attempt++) {
    if (attempt > 0) await new Promise(r => setTimeout(r, 600 * attempt));
    res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });
    if (res.ok || res.status < 500) break;
  }

  if (!res.ok) throw new Error(`Stripe session: ${await res.text()}`);
  const session = await res.json();

  await env.STATE.put(`stripeorder:${session.id}`, JSON.stringify(subscriberData), {
    expirationTtl: 7200,
  });

  return session;
}

export async function retrieveStripeSession(env, sessionId) {
  const res = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}`,
    { headers: { Authorization: `Bearer ${env.STRIPE_SECRET_KEY}` } }
  );
  if (!res.ok) throw new Error(`Stripe retrieve: ${await res.text()}`);
  return await res.json();
}
