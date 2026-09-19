import { escapeHtml } from "../notify.js";
import { pageShell } from "./shared.js";

export function paymentPage(sessionId, email, paypalUrl, priceDisplay) {
  const paypalBtn = paypalUrl
    ? `<a href="${escapeHtml(paypalUrl)}" target="_blank" rel="noopener" class="paypal-btn">
         <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect width="24" height="24" rx="5" fill="#0070BA"/><path d="M7 8h6a3.5 3.5 0 010 7H9l-1 4H6l2-11z" fill="white"/><path d="M11 8h5a3.5 3.5 0 010 7h-4l-1 4h-2l2-11z" fill="white" opacity="0.5"/></svg>
         Payer ${escapeHtml(priceDisplay)} via PayPal
       </a>`
    : `<p style="font-size:13px;color:#667888;padding:10px;background:#f5f5f5;border-radius:8px">Paiement en cours de configuration, revenez bientôt.</p>`;

  return pageShell("Finaliser votre inscription", `
    <div>
      <h2 style="margin-bottom:6px">Finaliser votre inscription</h2>
      <p style="font-size:14px;color:var(--muted);margin-bottom:20px;line-height:1.6">
        Votre alerte sera activée dès réception de votre paiement et confirmation de l'email.
      </p>

      <div style="background:var(--bg);border:1px solid var(--line);border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:14px">
        <span style="color:var(--muted)">Email : </span>
        <strong>${escapeHtml(email)}</strong>
        <span style="margin-left:12px;color:var(--muted)">·</span>
        <span style="margin-left:12px;font-weight:600;color:var(--flag-green)">${escapeHtml(priceDisplay)}</span>
      </div>

      <div style="display:flex;flex-direction:column;gap:0;border:1.5px solid rgba(27,43,60,0.12);border-radius:12px;overflow:hidden;margin-bottom:24px">
        <div style="display:flex;align-items:flex-start;gap:14px;padding:16px;background:var(--bg)">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--flag-green);color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">1</div>
          <div style="flex:1">
            <p style="font-size:14px;font-weight:600;color:var(--deep);margin-bottom:10px">Effectuez le paiement</p>
            ${paypalBtn}
          </div>
        </div>
        <div style="height:1px;background:rgba(27,43,60,0.08)"></div>
        <div style="display:flex;align-items:flex-start;gap:14px;padding:16px;background:var(--bg)">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--flag-green);color:#fff;font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px">2</div>
          <div style="flex:1">
            <p style="font-size:14px;font-weight:600;color:var(--deep);margin-bottom:10px">Revenez ici et confirmez</p>
            <form method="POST" action="/confirmer-paiement">
              <input type="hidden" name="session_id" value="${escapeHtml(sessionId)}">
              <button type="submit" style="width:100%;padding:13px 20px;background:var(--flag-green);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;transition:background .2s" onmouseover="this.style.background='#006640'" onmouseout="this.style.background='var(--flag-green)'">
                J'ai effectué mon paiement →
              </button>
            </form>
          </div>
        </div>
      </div>

      <p style="font-size:12px;color:var(--muted);text-align:center;line-height:1.6">
        ⏱ Ce lien est valide 24h · Paiement vérifié manuellement sous 24h
      </p>
      <a href="/inscription" style="display:block;text-align:center;margin-top:16px;font-size:13px;color:var(--muted);text-decoration:none">← Recommencer l'inscription</a>
    </div>
  `);
}
