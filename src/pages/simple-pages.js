import { escapeHtml } from "../notify.js";
import { pageShell, shareFabHtml } from "./shared.js";
import { FONT_CSS } from "../fonts.js";

export function confirmEmailSentPage(email) {
  return pageShell(
    "Vérifie ta boîte mail",
    `<div style="text-align:center">
      <div style="font-size:44px;margin-bottom:16px">📬</div>
      <h2>Vérifie ta boîte mail</h2>
      <p class="msg" style="margin-top:12px">Un email de confirmation a été envoyé à <strong>${escapeHtml(email)}</strong>.<br><br>Clique sur le lien pour activer ton inscription.</p>
      <p class="msg" style="margin-top:14px;font-size:13px">Pas d'email ? Vérifie tes spams ou <a href="/inscription">réessaie</a>.</p>
    </div>`
  );
}


export function messagePage(heading, body, backUrl = "/") {
  return pageShell(
    heading,
    `<div style="text-align:center">
      <h2>${escapeHtml(heading)}</h2>
      <p class="msg" style="margin-top:12px">${body}</p>
      <a class="home" href="${backUrl}">← Retour${backUrl === "/inscription" ? " au formulaire" : " à l'accueil"}</a>
    </div>`
  );
}

export function confirmationPage(priceDisplay, baseUrl) {
  const shareUrl = `${baseUrl}/inscription`;
  const waText = encodeURIComponent("Je viens de m'inscrire pour être alerté dès que les vols Paris-Cotonou s'ouvrent sur voyage.benin.bj. Les places partent en quelques minutes, inscris-toi aussi 👉 " + shareUrl);
  const fbUrl = encodeURIComponent(shareUrl);
  const stepperHtml = `<div class="stepper" aria-label="Étapes de l'inscription">
      <div class="stepper-step done">
        <span class="stepper-num">✓</span>
        <span class="stepper-label">Vos infos</span>
      </div>
      <div class="stepper-line done"></div>
      <div class="stepper-step done">
        <span class="stepper-num">✓</span>
        <span class="stepper-label">Paiement${priceDisplay ? " · " + escapeHtml(priceDisplay) : ""}</span>
      </div>
      <div class="stepper-line done"></div>
      <div class="stepper-step active">
        <span class="stepper-num">3</span>
        <span class="stepper-label">Alerte activée</span>
      </div>
    </div>`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inscription confirmée | Alertes Vols Bénin</title>
  <link rel="icon" type="image/svg+xml" href="/logo-icon.svg">
  <style>${FONT_CSS}
    :root{--deep:#1B2B3C;--accent:#e8112d;--bg:#F8F6F1;--bg2:#FFFFFF;--muted:#667888;--line:rgba(27,43,60,0.10);--flag-green:#008751;--flag-yellow:#FCD116;--flag-red:#E8112D;--font-display:'Sora',ui-sans-serif,system-ui,sans-serif;--font-body:'Sora',ui-sans-serif,system-ui,sans-serif;--slide-dur:70s}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{}
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
    .flag-nav-wrap{position:relative}
    .flag-chip{width:38px;height:26px;border-radius:5px;cursor:pointer;border:none;padding:0;background:none;position:relative;transition:transform .15s,box-shadow .15s;box-shadow:0 0 0 1px rgba(255,255,255,0.28)}
    .flag-chip:hover{transform:scale(1.06);box-shadow:0 0 0 2px rgba(255,255,255,0.55)}
    .flag-bg{position:absolute;inset:0;border-radius:5px;overflow:hidden;display:grid;grid-template-columns:2fr 3fr;grid-template-rows:1fr 1fr;pointer-events:none}
    .flag-bg span:nth-child(1){grid-row:1/3;grid-column:1;background:var(--flag-green)}
    .flag-bg span:nth-child(2){grid-row:1;grid-column:2;background:var(--flag-yellow)}
    .flag-bg span:nth-child(3){grid-row:2;grid-column:2;background:var(--flag-red)}
    .hb-line{position:absolute;left:50%;transform:translateX(-50%);width:18px;height:2px;background:#fff;border-radius:1px;box-shadow:0 0 3px rgba(0,0,0,0.5);pointer-events:none;transition:transform .22s,opacity .22s,top .22s,width .22s}
    .hb-line:nth-child(2){top:6px}
    .hb-line:nth-child(3){top:12px}
    .hb-line:nth-child(4){top:18px}
    .flag-chip[aria-expanded="true"] .hb-line:nth-child(2){top:12px;transform:translateX(-50%) rotate(45deg)}
    .flag-chip[aria-expanded="true"] .hb-line:nth-child(3){opacity:0;width:0}
    .flag-chip[aria-expanded="true"] .hb-line:nth-child(4){top:12px;transform:translateX(-50%) rotate(-45deg)}
    .flag-nav{position:absolute;top:calc(100% + 10px);right:0;min-width:200px;background:rgba(4,8,14,0.96);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:6px;box-shadow:0 8px 32px rgba(0,0,0,0.5);opacity:0;transform:translateY(-6px) scale(0.97);pointer-events:none;transition:opacity .18s,transform .18s;z-index:200;backdrop-filter:blur(12px)}
    .flag-nav.open{opacity:1;transform:translateY(0) scale(1);pointer-events:auto}
    .flag-nav a{display:flex;align-items:center;padding:10px 14px;border-radius:8px;color:rgba(255,255,255,0.85);text-decoration:none;font-size:14px;font-weight:600;font-family:var(--font-display);letter-spacing:0.01em;transition:background .12s,color .12s}
    .flag-nav a:hover{background:rgba(255,255,255,0.08);color:#fff}
    .flag-nav a.active{color:var(--flag-yellow)}
    .flag-nav-sep{height:1px;background:rgba(255,255,255,0.08);margin:4px 0}

    .conf-main{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:clamp(24px,4vw,48px) clamp(16px,4vw,40px) clamp(32px,5vw,56px)}
    .conf-intro{text-align:center;margin-bottom:28px;max-width:480px}
    .conf-intro h1{font-family:var(--font-display);font-size:clamp(24px,5vw,38px);font-weight:700;line-height:1.12;color:#fff;margin-bottom:10px}
    .conf-intro p{font-size:clamp(14px,1.5vw,16px);color:rgba(255,255,255,0.72);line-height:1.6}

    .conf-card{background:rgba(255,255,255,0.95);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.3);border-radius:20px;width:100%;max-width:480px;overflow:hidden;box-shadow:0 8px 48px rgba(0,0,0,0.3)}
    .flag-bar{display:flex;height:3px}
    .flag-bar div:nth-child(1){flex:1;background:var(--flag-green)}
    .flag-bar div:nth-child(2){flex:2;background:var(--flag-yellow)}
    .flag-bar div:nth-child(3){flex:1;background:var(--flag-red)}
    .conf-card-body{padding:clamp(22px,3vw,32px);text-align:center}

    .stepper{display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:22px;padding:16px 8px}
    .stepper-step{display:flex;flex-direction:column;align-items:center;gap:6px;position:relative;flex-shrink:0}
    .stepper-num{width:32px;height:32px;border-radius:50%;background:rgba(27,43,60,0.08);color:var(--muted);font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;transition:all .3s}
    .stepper-step.active .stepper-num{background:var(--flag-green);color:#fff;box-shadow:0 2px 12px rgba(0,135,81,0.3)}
    .stepper-step.done .stepper-num{background:var(--flag-green);color:#fff}
    .stepper-label{font-size:11px;font-weight:600;color:var(--muted);white-space:nowrap}
    .stepper-step.active .stepper-label{color:var(--flag-green)}
    .stepper-step.done .stepper-label{color:var(--flag-green)}
    .stepper-line{flex:1;height:2px;background:rgba(27,43,60,0.10);margin:0 8px;margin-bottom:20px;min-width:24px}
    .stepper-line.done{background:var(--flag-green)}

    .check-circle{width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,var(--flag-green),#00a86b);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;box-shadow:0 4px 24px rgba(0,135,81,0.3);animation:scaleIn .5s cubic-bezier(.34,1.56,.64,1)}
    @keyframes scaleIn{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
    .check-circle svg{width:36px;height:36px}

    .conf-title{font-family:var(--font-display);font-size:22px;font-weight:700;color:var(--deep);margin-bottom:8px}
    .conf-subtitle{color:var(--muted);font-size:15px;line-height:1.6;margin-bottom:24px}

    .info-box{display:flex;align-items:flex-start;gap:12px;background:rgba(0,135,81,0.06);border:1px solid rgba(0,135,81,0.14);border-radius:12px;padding:14px 16px;text-align:left;margin-bottom:16px}
    .info-box svg{flex-shrink:0;margin-top:1px}
    .info-box p{font-size:13px;color:#1a5a3a;line-height:1.6}
    .info-box strong{color:var(--deep)}

    .home-link{display:inline-flex;align-items:center;gap:6px;margin-top:8px;padding:12px 28px;background:var(--flag-green);color:#fff;border-radius:12px;font-size:14px;font-weight:600;text-decoration:none;transition:background .2s,transform .12s;box-shadow:0 4px 20px rgba(0,135,81,0.25)}
    .home-link:hover{background:#006640;transform:translateY(-1px)}

    .share-section{margin-top:24px;padding-top:20px;border-top:1px solid var(--line)}
    .share-label{font-size:13px;color:var(--muted);margin-bottom:12px;line-height:1.5}
    .share-label strong{color:var(--deep)}
    .share-btns{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
    .share-btn{display:inline-flex;align-items:center;gap:6px;padding:10px 18px;border-radius:10px;font-size:13px;font-weight:600;text-decoration:none;color:#fff;transition:transform .12s,opacity .2s}
    .share-btn:hover{transform:translateY(-1px);opacity:.9}
    .share-btn.wa{background:#25D366}
    .share-btn.fb{background:#1877F2}
    .share-btn.copy{background:var(--deep);cursor:pointer;border:none;font-family:var(--font-body)}

    .conf-footer{padding:20px 24px;text-align:center;font-size:12px;color:rgba(255,255,255,0.5)}
    .conf-footer a{color:rgba(255,255,255,0.5);text-decoration:none}
    .conf-footer a:hover{color:rgba(255,255,255,0.8)}
    .footer-bar{display:flex;height:4px;width:100%;margin-top:16px}
    .bar-green{flex:1;background:var(--flag-green)}
    .bar-yellow{flex:2;background:var(--flag-yellow)}
    .bar-red{flex:1;background:var(--flag-red)}

    @media(max-width:480px){
      .conf-card-body{padding:20px 18px}
    }
    @media(prefers-reduced-motion:reduce){.slide{animation:none;opacity:1}.slide:nth-child(n+2){opacity:0}.check-circle{animation:none}}
  </style>
<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','2383978405745430');fbq('track','PageView');fbq('track','Lead',{currency:'EUR',value:5.99});</script>
<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2383978405745430&ev=PageView&noscript=1"/></noscript>
</head>
<body>
  <div class="slideshow" aria-hidden="true"><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div></div>
  <div class="hero-overlay" aria-hidden="true"></div>

  <nav class="topbar">
    <a href="/" class="wordmark" aria-label="Alertes Vols Bénin - accueil">
      <img src="/logo-icon.svg" alt="" aria-hidden="true" style="width:36px;height:36px;border-radius:8px;display:block;flex-shrink:0">
      <span class="wordmark-label">Alertes Vols Bénin</span>
    </a>
    <div class="flag-nav-wrap">
      <button class="flag-chip" id="flagMenuBtn" aria-label="Menu" aria-expanded="false" aria-controls="flagNav">
        <div class="flag-bg"><span></span><span></span><span></span></div>
        <span class="hb-line"></span>
        <span class="hb-line"></span>
        <span class="hb-line"></span>
      </button>
      <nav class="flag-nav" id="flagNav" role="menu">
        <a href="/" role="menuitem">Accueil</a>
        <a href="/inscription" role="menuitem" class="active">Inscription</a>
        <div class="flag-nav-sep"></div>
        <a href="/diaspora" role="menuitem">Pour la diaspora</a>
      </nav>
    </div>
  </nav>

  <main class="conf-main">
    <div class="conf-intro">
      <h1>C'est tout bon !</h1>
      <p>Ton inscription est confirmée. Tu fais partie des premiers alertés.</p>
    </div>
    <div class="conf-card">
      <div class="flag-bar"><div></div><div></div><div></div></div>
      <div class="conf-card-body">
        ${stepperHtml}
        <div class="check-circle">
          <svg viewBox="0 0 24 24" fill="none"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#fff"/></svg>
        </div>
        <h2 class="conf-title">Inscription confirmée</h2>
        <p class="conf-subtitle">Paiement reçu ! Ton alerte est active.</p>
        <div class="info-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-2h2v2h-2zm0-4V7h2v6h-2z" fill="#008751"/></svg>
          <p>Tu recevras un <strong>email</strong> et un <strong>SMS</strong> dès que les vols Paris-Cotonou s'ouvrent sur <a href="https://www.voyage.benin.bj/" style="color:#008751;font-weight:600">voyage.benin.bj</a>.</p>
        </div>
        <div class="share-section">
          <p class="share-label"><strong>Fais passer le mot !</strong><br>Partage le lien à tes proches pour qu'ils ne ratent pas l'ouverture.</p>
          <div class="share-btns">
            <a href="https://wa.me/?text=${waText}" class="share-btn wa" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${fbUrl}" class="share-btn fb" target="_blank" rel="noopener">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <button class="share-btn copy" onclick="navigator.clipboard.writeText('${shareUrl}');this.textContent='Copié ✓';setTimeout(()=>{this.innerHTML='<svg width=\\'14\\' height=\\'14\\' viewBox=\\'0 0 24 24\\' fill=\\'#fff\\'><path d=\\'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\\'/></svg> Copier le lien'},1500)">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/></svg>
              Copier le lien
            </button>
          </div>
        </div>
        <a href="/" class="home-link" style="margin-top:20px">← Retour à l'accueil</a>
      </div>
    </div>
  </main>

  <footer class="conf-footer">
    <p>Alertes Vols Bénin</p>
    <div class="footer-bar"><div class="bar-green"></div><div class="bar-yellow"></div><div class="bar-red"></div></div>
  </footer>
  ${shareFabHtml(shareUrl)}
<script>
(function(){
  var btn=document.getElementById('flagMenuBtn');
  var nav=document.getElementById('flagNav');
  if(btn&&nav){
    btn.addEventListener('click',function(e){
      e.stopPropagation();
      var open=nav.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
    document.addEventListener('click',function(e){
      if(!nav.contains(e.target)&&e.target!==btn){
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
      }
    });
  }
})();
</script>
</body>
</html>`;
}