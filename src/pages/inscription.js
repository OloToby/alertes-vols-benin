import { escapeHtml } from "../notify.js";
import { shareFabHtml } from "./shared.js";

export function inscriptionPage(turnstileSiteKey, confirmedCount, priceDisplay, toast = "", baseUrl = "") {
  const shareUrl = `${baseUrl}/inscription`;
  const widget = turnstileSiteKey
    ? `<div class="cf-turnstile" data-sitekey="${escapeHtml(turnstileSiteKey)}" data-appearance="always" data-size="flexible" data-error-callback="onTurnstileError" data-expired-callback="onTurnstileExpired"></div>
<p id="turnstile-hint" style="display:none;font-size:12px;color:var(--muted);text-align:center;margin:-8px 0 14px">La vérification a échoué — vous pouvez continuer normalement.</p>`
    : "";
  const script = turnstileSiteKey
    ? `<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`
    : "";

  const counterRounded = Math.floor(confirmedCount / 10) * 10;
  const counter = confirmedCount >= 1
    ? `<p class="counter"><em class="hl-r">+${counterRounded > 0 ? counterRounded : confirmedCount} personnes déjà inscrites</em></p>`
    : "";

  const stepperHtml = `<div class="stepper" aria-label="Étapes de l'inscription">
      <div class="stepper-step active">
        <span class="stepper-num">1</span>
        <span class="stepper-label">Vos infos</span>
      </div>
      <div class="stepper-line"></div>
      <div class="stepper-step">
        <span class="stepper-num">2</span>
        <span class="stepper-label">Paiement${priceDisplay ? " · " + escapeHtml(priceDisplay) : ""}</span>
      </div>
      <div class="stepper-line"></div>
      <div class="stepper-step">
        <span class="stepper-num">3</span>
        <span class="stepper-label">Alerte activée</span>
      </div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscription | Alerte Vol Paris-Cotonou</title>
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23008751'/%3E%3Ctext x='16' y='24' text-anchor='middle' font-size='22'%3E✈%3C/text%3E%3C/svg%3E">
  <meta name="description" content="Inscrivez-vous pour recevoir un email et un SMS dès que les vols Paris-Cotonou s'ouvrent sur voyage.benin.bj. Les places partent en quelques minutes.">
<meta name="robots" content="noindex">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  ${script}
  <style>
    :root{--deep:#1B2B3C;--accent:#e8112d;--bg:#F8F6F1;--bg2:#FFFFFF;--muted:#667888;--line:rgba(27,43,60,0.10);--flag-green:#008751;--flag-yellow:#FCD116;--flag-red:#E8112D;--font-display:'Sora',ui-sans-serif,system-ui,sans-serif;--font-body:'Inter',ui-sans-serif,system-ui,sans-serif;--slide-dur:70s}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{overflow-x:hidden}
    body{font-family:var(--font-body);color:var(--deep);background:linear-gradient(to bottom,#0d1a10,#111f13);min-height:100svh;display:flex;flex-direction:column;overflow-x:hidden}

    .slideshow{position:fixed;inset:0;z-index:-2;overflow:hidden}
    .slide{position:absolute;inset:0;background-size:cover;background-position:center 40%;opacity:0;animation:crossfade var(--slide-dur) infinite;filter:saturate(110%) brightness(0.80)}
    .slide:nth-child(1){background-image:url('https://www.voyage.benin.bj/assets/bg-illustration.webp');animation-delay:0s}
    .slide:nth-child(2){background-image:url('https://www.voyage.benin.bj/assets/bg-ganvie.webp');background-position:center 55%;animation-delay:5s}
    .slide:nth-child(3){background-image:url('https://www.voyage.benin.bj/assets/bg-nikki.webp');animation-delay:10s}
    .slide:nth-child(4){background-image:url('https://www.voyage.benin.bj/assets/hero-bg.webp');animation-delay:15s}
    @keyframes crossfade{0%{opacity:0}5%{opacity:1}25%{opacity:1}30%{opacity:0}100%{opacity:0}}
    .hero-overlay{position:fixed;inset:0;z-index:-1;background:linear-gradient(to bottom,rgba(0,0,0,0.30) 0%,rgba(0,0,0,0.55) 40%,rgba(0,0,0,0.75) 70%,rgba(0,0,0,0.88) 100%)}

    .topbar{display:flex;align-items:center;justify-content:space-between;padding:clamp(20px,4vw,40px) clamp(16px,3vw,32px) 0}
    .wordmark{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none}
    .wordmark-icon{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1}
    .wordmark-label{font-family:var(--font-display);font-size:15px;font-weight:600;letter-spacing:0.01em;color:rgba(255,255,255,0.90)}
    .flag-chip{width:32px;height:22px;border-radius:4px;overflow:hidden;display:grid;grid-template-columns:2fr 3fr;grid-template-rows:1fr 1fr;box-shadow:0 0 0 1px rgba(255,255,255,0.28)}
    .flag-chip span:nth-child(1){grid-row:1/3;grid-column:1;background:var(--flag-green)}
    .flag-chip span:nth-child(2){grid-row:1;grid-column:2;background:var(--flag-yellow)}
    .flag-chip span:nth-child(3){grid-row:2;grid-column:2;background:var(--flag-red)}

    .insc-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(24px,4vw,48px) clamp(16px,4vw,40px) clamp(32px,5vw,56px)}
    .insc-intro{text-align:center;margin-bottom:28px;max-width:480px}
    .insc-intro h1{font-family:var(--font-display);font-size:clamp(24px,5vw,38px);font-weight:700;line-height:1.12;color:#fff;margin-bottom:10px}
    .insc-intro p{font-size:clamp(14px,1.5vw,16px);color:rgba(255,255,255,0.72);line-height:1.6}

    .insc-card{background:rgba(255,255,255,0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.3);border-radius:20px;width:100%;max-width:480px;overflow:hidden;box-shadow:0 8px 48px rgba(0,0,0,0.3)}
    @media(min-width:768px){.insc-card{max-width:580px}.insc-intro{max-width:580px}}
    .flag-bar{display:flex;height:3px}
    .flag-bar div:nth-child(1){flex:1;background:var(--flag-green)}
    .flag-bar div:nth-child(2){flex:2;background:var(--flag-yellow)}
    .flag-bar div:nth-child(3){flex:1;background:var(--flag-red)}
    .insc-card-body{padding:clamp(22px,3vw,32px)}

    .stepper{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:22px;padding:16px 8px}
    .stepper-step{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;flex-shrink:0}
    .stepper-num{width:32px;height:32px;border-radius:50%;background:rgba(27,43,60,0.08);color:var(--muted);font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .3s}
    .stepper-step.active .stepper-num{background:var(--flag-green);color:#fff;box-shadow:0 2px 12px rgba(0,135,81,0.3)}
    .stepper-label{font-size:11px;font-weight:600;color:var(--muted);white-space:nowrap}
    .stepper-step.active .stepper-label{color:var(--flag-green)}
    .stepper-line{flex:1;height:2px;background:rgba(27,43,60,0.10);margin:0 8px;margin-bottom:20px;min-width:24px}

    .motivation{background:rgba(232,17,45,0.06);border:1px solid rgba(232,17,45,0.12);border-radius:10px;padding:14px 16px;margin-bottom:20px;font-size:14px;color:#8a1025;line-height:1.65;text-align:center}

    .counter{display:inline-flex;align-items:center;gap:7px;background:rgba(0,135,81,0.08);color:var(--flag-green);font-size:13px;font-weight:600;padding:6px 14px;border-radius:999px;margin-top:16px;margin-bottom:14px}
    .counter-dot{width:7px;height:7px;background:var(--flag-green);border-radius:50%;flex-shrink:0;animation:pulse 1.8s ease-in-out infinite}
    @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.75)}}

    .form-section-label{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin:0 0 14px;padding-bottom:8px;border-bottom:1px solid var(--line)}
    .row{display:grid;grid-template-columns:1fr 1fr;gap:12px}
    .field{margin-bottom:14px}
    label{display:block;font-size:11px;font-weight:600;color:var(--muted);margin-bottom:5px;text-transform:uppercase;letter-spacing:.06em}
    .req{color:var(--accent)}
    .opt{font-weight:400;text-transform:none;letter-spacing:normal;font-size:12px}
    input,select{width:100%;padding:12px 14px;background:rgba(248,246,241,0.6);border:1.5px solid rgba(27,43,60,0.12);border-radius:10px;color:var(--deep);font-size:15px;font-family:var(--font-body);transition:border-color .2s,box-shadow .2s;-webkit-appearance:none}
    select{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23667888' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:36px;cursor:pointer}
    input:focus,select:focus{outline:none;border-color:var(--flag-green);box-shadow:0 0 0 3px rgba(0,135,81,0.12)}
    input::placeholder{color:#9BADB3}
    .consent-box{display:flex;align-items:flex-start;gap:10px;margin-bottom:16px;padding:12px;background:rgba(248,246,241,0.6);border:1.5px solid rgba(27,43,60,0.08);border-radius:10px}
    .consent-box input[type=checkbox]{width:17px;height:17px;flex-shrink:0;margin-top:2px;accent-color:var(--flag-green);cursor:pointer;-webkit-appearance:auto;padding:0;border:none;background:none}
    .consent-label{font-size:12px;color:var(--muted);line-height:1.6;cursor:pointer}
    .cf-turnstile{display:none!important}
    .btn{width:100%;padding:15px 30px;background:var(--flag-green);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:600;font-family:var(--font-body);cursor:pointer;transition:background .2s,transform .12s;box-shadow:0 4px 20px rgba(0,135,81,0.25)}
    .btn:hover{background:#006640;transform:translateY(-1px)}
    .btn:active{transform:scale(.99)}
    .privacy{margin-top:14px;text-align:center;color:var(--muted);font-size:12px;line-height:1.7}

    .insc-footer{padding:20px 24px;text-align:center;font-size:12px;color:rgba(255,255,255,0.5)}
    .insc-footer a{color:rgba(255,255,255,0.5);text-decoration:none}
    .insc-footer a:hover{color:rgba(255,255,255,0.8)}
    .footer-bar{display:flex;height:4px;width:100%;margin-top:16px}
    .bar-green{flex:1;background:var(--flag-green)}
    .bar-yellow{flex:2;background:var(--flag-yellow)}
    .bar-red{flex:1;background:var(--flag-red)}

    .field-error input,.field-error select{border-color:var(--accent);box-shadow:0 0 0 3px rgba(232,17,45,0.10)}
    .error-msg{font-size:11px;color:var(--accent);margin-top:4px;display:none}
    .field-error .error-msg{display:block}
    .form-alert{display:flex;align-items:center;gap:10px;background:rgba(232,17,45,0.07);border:1px solid rgba(232,17,45,0.2);border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:13px;color:#8a1025;line-height:1.5;animation:shake .4s ease}
    @keyframes shake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}

    .back-link{background:none;border:none;color:var(--muted);font-size:13px;font-family:var(--font-body);cursor:pointer;padding:0;margin-bottom:18px;display:inline-flex;align-items:center;gap:4px;transition:color .2s}
    .back-link:hover{color:var(--deep)}
    .pay-summary{font-size:15px;color:var(--deep);line-height:1.6;margin-bottom:16px;padding:14px;background:rgba(0,135,81,0.06);border:1px solid rgba(0,135,81,0.12);border-radius:10px}
    .pay-summary strong{color:var(--flag-green)}
    .pay-label{font-size:11px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:14px}
    #paypal-buttons{margin-bottom:12px;min-height:50px}
    .insc-top-cd{padding:clamp(36px,7vw,80px) clamp(8px,2vw,48px);text-align:center;display:flex;justify-content:center}
    .insc-top-cd-inner{display:flex;flex-direction:column;align-items:center}
    .insc-top-cd-units{display:flex;align-items:flex-start;gap:clamp(4px,1.5vw,16px)}
    .insc-top-cd-unit{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:clamp(56px,14vw,120px);background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);border-radius:16px;padding:clamp(10px,3vw,22px) 6px}
    .insc-top-cd-unit b{font-family:var(--font-display);font-size:clamp(40px,10vw,91px);font-weight:800;color:#fff;line-height:1;font-variant-numeric:tabular-nums;letter-spacing:-2px}
    .insc-top-cd-unit small{font-size:clamp(11px,2.5vw,17px);color:rgba(255,255,255,0.40);text-transform:uppercase;letter-spacing:0.08em;font-weight:700}
    .insc-top-cd-sep{font-family:var(--font-display);font-size:clamp(30px,7vw,67px);font-weight:700;color:rgba(255,255,255,0.20);padding-top:clamp(10px,3vw,22px);line-height:1}
    .hl-r{background:#ff2d2d;color:#fff!important;border-radius:4px;padding:1px 6px}
    .cdbar-insc{display:flex;flex-direction:column;gap:8px;background:rgba(0,135,81,0.06);border:1px solid rgba(0,135,81,0.18);border-radius:12px;padding:13px 16px;margin-bottom:18px}
    .cdbar-insc-label{font-size:12.5px;color:var(--muted);line-height:1.4}
    .cdbar-insc-label strong{color:var(--flag-green)}
    .cdbar-insc-units{display:flex;align-items:center;gap:5px}
    .cdbar-insc-unit{display:flex;flex-direction:column;align-items:center;min-width:44px;background:#fff;border:1px solid rgba(0,135,81,0.15);border-radius:7px;padding:7px 4px}
    .cdbar-insc-unit b{font-family:'Sora',sans-serif;font-size:18px;font-weight:700;color:var(--deep);line-height:1;font-variant-numeric:tabular-nums}
    .cdbar-insc-unit small{font-size:8.5px;color:var(--muted);text-transform:uppercase;letter-spacing:0.07em;margin-top:2px}
    .cdbar-insc-sep{font-size:16px;font-weight:700;color:var(--muted);padding-bottom:8px}

    @media(max-width:480px){
      .row{grid-template-columns:1fr}
      .insc-card-body{padding:20px 18px}
    }
    @media(prefers-reduced-motion:reduce){.counter-dot{animation:none}.slide{animation:none;opacity:1}.slide:nth-child(n+2){opacity:0}}
    .toast{position:fixed;top:20px;left:50%;transform:translateX(-50%);background:var(--flag-green);color:#fff;padding:14px 24px;border-radius:10px;font-size:15px;font-weight:500;box-shadow:0 4px 20px rgba(0,0,0,0.15);z-index:999;display:flex;align-items:center;gap:10px;animation:slideDown .3s ease,fadeOut .4s ease 3.8s forwards}
    @keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-12px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}
    @keyframes fadeOut{to{opacity:0;pointer-events:none}}
  </style>
</head>
<body>
  <div class="slideshow" aria-hidden="true"><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div></div>
  <div class="hero-overlay" aria-hidden="true"></div>

  ${toast === "dejainscrit" ? `<div class="toast" role="alert">✓ Déjà inscrit ! Tu recevras l'alerte dès l'ouverture.</div>` : ""}
  ${toast === "paiement_annule" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Paiement annulé. Tu peux recommencer.</div>` : ""}
  ${toast === "email" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Adresse email invalide.</div>` : ""}
  ${toast === "prenom" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Le prénom est obligatoire.</div>` : ""}
  ${toast === "nom" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Le nom est obligatoire.</div>` : ""}

  ${toast === "telephone" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Le numéro de téléphone est obligatoire.</div>` : ""}
  ${toast === "turnstile" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Vérification de sécurité échouée. Réessayez.</div>` : ""}
  ${toast === "ratelimit" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Trop de tentatives. Réessaie dans quelques minutes.</div>` : ""}
  ${toast === "paiement" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Erreur de paiement. Réessaie dans quelques instants.</div>` : ""}
  ${toast === "serveur" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Erreur inattendue. Réessaie.</div>` : ""}
  ${toast === "formulaire" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Données de formulaire invalides.</div>` : ""}
  ${toast === "email_envoi" ? `<div class="toast" style="background:var(--flag-red)" role="alert">Inscription enregistrée mais l'email de confirmation n'a pas pu être envoyé.</div>` : ""}

  <nav class="topbar">
    <a href="/" class="wordmark" aria-label="Alertes Vols Bénin - accueil">
      <span class="wordmark-icon" aria-hidden="true">✈</span>
      <span class="wordmark-label">Alertes Vols Bénin</span>
    </a>
    <div class="flag-chip" aria-hidden="true"><span></span><span></span><span></span></div>
  </nav>

  <main class="insc-main">
    <div class="insc-top-cd" id="insc-top-cd">
      <div class="insc-top-cd-inner">
        <div class="insc-top-cd-units">
          <div class="insc-top-cd-unit"><b id="ct-d">--</b><small>jours</small></div>
          <div class="insc-top-cd-sep">:</div>
          <div class="insc-top-cd-unit"><b id="ct-h">--</b><small>heures</small></div>
          <div class="insc-top-cd-sep">:</div>
          <div class="insc-top-cd-unit"><b id="ct-m">--</b><small>min</small></div>
          <div class="insc-top-cd-sep">:</div>
          <div class="insc-top-cd-unit"><b id="ct-s">--</b><small>sec</small></div>
        </div>
        ${counter}
      </div>
    </div>
    <div class="insc-intro">
      <h1>Inscrivez-vous.</h1>
      <p>Recevez un email et un SMS dès que les réservations des vols Paris-Cotonou s'ouvrent.</p>
    </div>
    <div class="insc-card">
      <div class="flag-bar"><div></div><div></div><div></div></div>
      <div class="insc-card-body">
        ${stepperHtml}
        <div class="motivation">
          <strong>En décembre 2025, les places sont parties en quelques minutes.</strong><br>Ne manquez pas la prochaine ouverture.
        </div>
        <form method="POST" action="/subscribe" novalidate>
          <p class="form-section-label">Vos coordonnées</p>
          <div class="row">
            <div class="field">
              <label for="first_name">Prénom <span class="req">*</span></label>
              <input type="text" id="first_name" name="first_name" required autocomplete="given-name" placeholder="Jean">
              <p class="error-msg" data-for="first_name">Le prénom est obligatoire.</p>
            </div>
            <div class="field">
              <label for="last_name">Nom <span class="req">*</span></label>
              <input type="text" id="last_name" name="last_name" required autocomplete="family-name" placeholder="Dupont">
              <p class="error-msg" data-for="last_name">Le nom est obligatoire.</p>
            </div>
          </div>
          <div class="field">
            <label for="email">Email <span class="req">*</span></label>
            <input type="email" id="email" name="email" required autocomplete="email" placeholder="jean@exemple.fr" inputmode="email">
            <p class="error-msg" data-for="email">Adresse email invalide.</p>
          </div>
          <div class="field">
            <label for="phone">Téléphone <span class="req">*</span></label>
            <input type="tel" id="phone" name="phone" required autocomplete="tel" placeholder="+33 6 12 34 56 78 ou +229 97 00 00 00" inputmode="tel">
            <p class="error-msg" data-for="phone">Indicatif international requis (ex : +33 6 12 34 56 78 ou +229 97 00 00 00)</p>
            <p style="font-size:12px;color:var(--muted);margin:6px 0 0">Utilisé uniquement pour votre alerte SMS à l'ouverture des réservations.</p>
          </div>
          <div class="consent-box">
            <input type="checkbox" id="sms_consent" name="sms_consent" value="1" checked>
            <label class="consent-label" for="sms_consent">J'accepte de recevoir une alerte par SMS en plus de l'email.</label>
          </div>
          ${widget}
          <button type="button" class="btn" id="continueBtn">Continuer vers le paiement →</button>
          <p class="privacy">Désinscription en un clic · Aucune revente de données</p>
        </form>

        <div id="paymentStep" style="display:none">
          <button type="button" class="back-link" id="backBtn">← Modifier mes informations</button>
          <div class="pay-summary" id="paySummary"></div>
          <div class="cdbar-insc" id="cdbar-insc">
            <p class="cdbar-insc-label">Tarif de lancement <strong>5,99€</strong> · passe à <strong>8,99€</strong> le 1ᵉʳ nov. 2026</p>
            <div class="cdbar-insc-units">
              <div class="cdbar-insc-unit"><b id="ci-d">--</b><small>jours</small></div>
              <div class="cdbar-insc-sep">:</div>
              <div class="cdbar-insc-unit"><b id="ci-h">--</b><small>heures</small></div>
              <div class="cdbar-insc-sep">:</div>
              <div class="cdbar-insc-unit"><b id="ci-m">--</b><small>min</small></div>
              <div class="cdbar-insc-sep">:</div>
              <div class="cdbar-insc-unit"><b id="ci-s">--</b><small>sec</small></div>
            </div>
          </div>
          <p class="pay-label">Paiement sécurisé :</p>
          <button id="stripePayBtn" class="btn" type="button" style="display:flex;align-items:center;justify-content:center;gap:10px">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Payer ${escapeHtml(priceDisplay || "5,99 €")} par carte
          </button>
          <p style="text-align:center;font-size:11px;color:var(--muted);margin:8px 0 0">Paiement sécurisé par <strong>Stripe</strong> · Visa, Mastercard, CB</p>
          <div id="payError" class="form-alert" style="display:none;margin-top:12px" role="alert">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#c0392b" stroke-width="2"/><path d="M12 8v4m0 4h.01" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/></svg>
            <span id="payErrorMsg">Erreur de paiement. Réessayez.</span>
          </div>
        </div>
      </div>
    </div>
  </main>

  <footer class="insc-footer">
    Service indépendant, non affilié à Bénin Tours S.A. ni au Gouvernement du Bénin.<br>
    <a href="/cgv">Conditions Générales de Vente</a> · <a href="/cgv">Mentions légales</a> · <a href="/cgv">Politique de confidentialité</a>
    <div class="footer-bar"><span class="bar-green"></span><span class="bar-yellow"></span><span class="bar-red"></span></div>
  </footer>
${shareFabHtml(shareUrl)}
<script>
function onTurnstileError(){var h=document.getElementById('turnstile-hint');if(h)h.style.display='block';}
function onTurnstileExpired(){var h=document.getElementById('turnstile-hint');if(h)h.style.display='block';}
(function(){
  var form=document.querySelector('form');
  if(!form)return;
  var rules=[
    {id:'first_name',test:function(v){return v.trim().length>0}},
    {id:'last_name',test:function(v){return v.trim().length>0}},
    {id:'email',test:function(v){return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v.trim())}},
    {id:'phone',test:function(v){var d=v.trim().replace(/[\\s\\-\\(\\)\\.]/g,'');return /^\\+\\d{7,15}$/.test(d);}}
  ];
  function clearError(id){
    var f=document.getElementById(id);
    if(f)f.closest('.field').classList.remove('field-error');
  }
  rules.forEach(function(r){
    var el=document.getElementById(r.id);
    if(el)el.addEventListener('input',function(){clearError(r.id);var a=document.getElementById('form-alert');if(a)a.remove();});
  });

  function validateForm(){
    var errors=[];
    var alert=document.getElementById('form-alert');
    if(alert)alert.remove();
    rules.forEach(function(r){
      var el=document.getElementById(r.id);
      var field=el.closest('.field');
      if(!r.test(el.value)){field.classList.add('field-error');errors.push(r.id);}
      else{field.classList.remove('field-error');}
    });
    if(errors.length){
      var msg=document.createElement('div');
      msg.id='form-alert';
      msg.className='form-alert';
      msg.setAttribute('role','alert');
      msg.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#c0392b" stroke-width="2"/><path d="M12 8v4m0 4h.01" stroke="#c0392b" stroke-width="2" stroke-linecap="round"/></svg>Veuillez corriger les champs en rouge.';
      form.insertBefore(msg,form.firstChild);
      document.getElementById(errors[0]).focus();
      return false;
    }
    return true;
  }

  var continueBtn=document.getElementById('continueBtn');
  var paymentStep=document.getElementById('paymentStep');
  var backBtn=document.getElementById('backBtn');

  if(continueBtn && paymentStep){
    continueBtn.addEventListener('click',function(){
      if(!validateForm())return;
      form.style.display='none';
      paymentStep.style.display='block';
      var name=document.getElementById('first_name').value.trim();
      document.getElementById('paySummary').innerHTML='<strong>'+name+'</strong>, finalisez votre inscription en payant ci-dessous.';
      document.querySelectorAll('.stepper-step')[0].classList.remove('active');
      document.querySelectorAll('.stepper-step')[0].classList.add('done');
      document.querySelectorAll('.stepper-step')[0].querySelector('.stepper-num').textContent='✓';
      document.querySelectorAll('.stepper-step')[1].classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
    });

    backBtn.addEventListener('click',function(){
      paymentStep.style.display='none';
      form.style.display='block';
      document.querySelectorAll('.stepper-step')[0].classList.add('active');
      document.querySelectorAll('.stepper-step')[0].classList.remove('done');
      document.querySelectorAll('.stepper-step')[0].querySelector('.stepper-num').textContent='1';
      document.querySelectorAll('.stepper-step')[1].classList.remove('active');
    });

    function getFormData(){
      return {
        email:document.getElementById('email').value.trim(),
        firstName:document.getElementById('first_name').value.trim(),
        lastName:document.getElementById('last_name').value.trim(),
        phone:document.getElementById('phone').value.trim(),
        smsConsent:document.getElementById('sms_consent').checked,
        turnstileToken:(document.querySelector('[name="cf-turnstile-response"]')||{}).value||''
      };
    }

    function showPayError(msg){
      var el=document.getElementById('payError');
      document.getElementById('payErrorMsg').textContent=msg||'Erreur de paiement. Réessayez.';
      el.style.display='flex';
    }

    var stripePayBtn=document.getElementById('stripePayBtn');
    if(stripePayBtn){
      stripePayBtn.addEventListener('click',function(){
        var btn=this;
        btn.disabled=true;
        var origHtml=btn.innerHTML;
        btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:spin 1s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Redirection en cours...';
        var data=getFormData();
        fetch('/api/create-stripe-session',{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify(data)
        }).then(function(r){return r.json();}).then(function(d){
          if(d.url){
            window.location.href=d.url;
          } else {
            var msgs={dejainscrit:'Vous êtes déjà inscrit.',ratelimit:'Trop de tentatives. Réessayez.',paiement:'Erreur de paiement.'};
            showPayError(msgs[d.error]||'Erreur de paiement.');
            btn.disabled=false;
            btn.innerHTML=origHtml;
          }
        }).catch(function(){
          showPayError('Erreur de connexion. Réessayez.');
          btn.disabled=false;
          btn.innerHTML=origHtml;
        });
      });
    }

  } else {
    form.addEventListener('submit',function(e){
      if(!validateForm())e.preventDefault();
    });
  }
})();
</script>
<script>
(function(){
  var D=new Date('2026-11-01T00:00:00+01:00').getTime();
  var el=document.getElementById('cdbar-insc');
  if(!el)return;
  function pad(n){return String(n).padStart(2,'0');}
  function tick(){
    var r=D-Date.now();
    if(r<=0){el.style.display='none';return;}
    document.getElementById('ci-d').textContent=Math.floor(r/864e5);
    document.getElementById('ci-h').textContent=pad(Math.floor(r%864e5/36e5));
    document.getElementById('ci-m').textContent=pad(Math.floor(r%36e5/6e4));
    document.getElementById('ci-s').textContent=pad(Math.floor(r%6e4/1e3));
  }
  tick();setInterval(tick,1000);
})();
</script>
<script>
(function(){
  var D=new Date('2026-11-01T00:00:00+01:00').getTime();
  var top=document.getElementById('insc-top-cd');
  function pad(n){return String(n).padStart(2,'0');}
  function set(id,v){var e=document.getElementById(id);if(e)e.textContent=v;}
  function tick(){
    var r=D-Date.now();
    if(r<=0){if(top)top.style.display='none';return;}
    set('ct-d',Math.floor(r/864e5));
    set('ct-h',pad(Math.floor(r%864e5/36e5)));
    set('ct-m',pad(Math.floor(r%36e5/6e4)));
    set('ct-s',pad(Math.floor(r%6e4/1e3)));
  }
  tick();setInterval(tick,1000);
})();
</script>
</body>
</html>`;
}