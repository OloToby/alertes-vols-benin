import { FONT_CSS } from '../fonts.js';

export function diasporaPage(confirmedCount = 0) {
  const count = confirmedCount >= 10 ? Math.floor(confirmedCount / 10) * 10 : confirmedCount;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Guide Diaspora Bénin, Toutes vos démarches en un seul endroit</title>
  <meta name="description" content="Vols spéciaux, passeport, immatriculation consulaire, ePass, e-Visa, ANIP, My Afro Origins, investir au Bénin. Le guide complet pour les Béninois de l'extérieur.">
  <link rel="icon" type="image/svg+xml" href="/logo-icon.svg">
  <link rel="canonical" href="https://alertesvolsbenin.com/diaspora">
  <style>${FONT_CSS}
    :root{--deep:#1B2B3C;--flag-green:#008751;--flag-yellow:#FCD116;--flag-red:#E8112D;--green:#008751;--yellow:#FCD116;--red:#E8112D;--muted:#667888;--line:rgba(27,43,60,.10);--bg:#F8F6F1;--bg2:#ffffff;--font-display:'Sora',ui-sans-serif,system-ui,sans-serif;--font-body:'Sora',ui-sans-serif,system-ui,sans-serif;--slide-dur:70s}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth}
    body{font-family:var(--font-body);background:var(--bg);color:var(--deep);font-size:15px;line-height:1.7;overflow-x:hidden}
    a{color:var(--green);text-decoration:none}a:hover{text-decoration:underline}

    /* SLIDESHOW */
    .slideshow{position:fixed;inset:0;z-index:-2;overflow:hidden}
    .slide{position:absolute;inset:0;background-size:cover;background-position:center 40%;opacity:0;animation:crossfade var(--slide-dur) infinite;filter:saturate(110%) brightness(0.80)}
    .slide:nth-child(1){background-image:url('https://www.voyage.benin.bj/assets/bg-illustration.webp');animation-delay:0s}
    .slide:nth-child(2){background-image:url('https://www.voyage.benin.bj/assets/bg-ganvie.webp');background-position:center 55%;animation-delay:5s}
    .slide:nth-child(3){background-image:url('https://www.voyage.benin.bj/assets/bg-nikki.webp');animation-delay:10s}
    .slide:nth-child(4){background-image:url('https://www.voyage.benin.bj/assets/hero-bg.webp');animation-delay:15s}
    .slide:nth-child(5){background-image:url('https://www.voyage.benin.bj/assets/destinations/cotonou.webp');animation-delay:20s}
    .slide:nth-child(6){background-image:url('https://www.voyage.benin.bj/assets/destinations/ganvie.webp');animation-delay:25s}
    .slide:nth-child(7){background-image:url('https://www.voyage.benin.bj/assets/destinations/ouidah.webp');animation-delay:30s}
    .slide:nth-child(8){background-image:url('https://images.unsplash.com/photo-1600241005059-71de13374958?w=1920&q=80&fit=crop');animation-delay:35s}
    .slide:nth-child(9){background-image:url('https://images.unsplash.com/photo-1734867782044-c8a75907ba8d?w=1920&q=80&fit=crop');animation-delay:40s}
    .slide:nth-child(10){background-image:url('https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1920&q=80&fit=crop');animation-delay:45s}
    .slide:nth-child(11){background-image:url('https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=1920&q=80&fit=crop');animation-delay:50s}
    .slide:nth-child(12){background-image:url('https://images.unsplash.com/photo-1655682603240-03df03520988?w=1920&q=80&fit=crop');animation-delay:55s}
    .slide:nth-child(13){background-image:url('https://images.unsplash.com/photo-1734255026082-82fdc81991f0?w=1920&q=80&fit=crop');animation-delay:60s}
    .slide:nth-child(14){background-image:url('https://images.unsplash.com/photo-1535940360221-641a69c43bac?w=1920&q=80&fit=crop');animation-delay:65s}
    @keyframes crossfade{0%{opacity:0}1.5%{opacity:1}5.5%{opacity:1}7.14%{opacity:0}100%{opacity:0}}
    .hero-overlay{position:fixed;inset:0;z-index:-1;background:linear-gradient(to bottom,rgba(0,0,0,0.20) 0%,rgba(0,0,0,0.45) 40%,rgba(0,0,0,0.68) 70%,rgba(0,0,0,0.82) 100%)}

    /* HERO */
    .hero{background:none;display:flex;flex-direction:column;position:relative}
    .topbar{display:flex;align-items:center;justify-content:space-between;padding:clamp(20px,4vw,40px) clamp(16px,3vw,32px) 0}
    .wordmark{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none}
    .wordmark:hover{text-decoration:none}
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

    /* HERO INNER */
    .hero-inner{max-width:800px;margin:0 auto;padding:clamp(28px,5vw,52px) clamp(16px,3vw,32px) clamp(48px,8vw,72px)}
    .hero-tag{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--flag-yellow);background:rgba(252,209,22,.10);border:1px solid rgba(252,209,22,.20);border-radius:20px;padding:4px 12px;margin-bottom:20px}
    .hero h1{font-size:clamp(28px,6vw,52px);font-weight:800;line-height:1.08;letter-spacing:-1.5px;color:#fff;margin-bottom:20px}
    .h1-mark{background:var(--flag-green);color:#fff;padding:0 7px 3px;border-radius:5px;font-style:normal;display:inline}
    .hero-sub{font-size:clamp(15px,2.2vw,18px);color:rgba(255,255,255,0.72);max-width:540px;line-height:1.6;margin-bottom:28px}
    .hero-portals{display:flex;flex-wrap:wrap;gap:8px}
    .portal-chip{font-size:12px;font-weight:600;color:rgba(255,255,255,0.70);background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.16);border-radius:6px;padding:5px 12px;transition:background .15s,color .15s,border-color .15s}
    .portal-chip:hover{background:rgba(255,255,255,0.16);color:#fff;border-color:rgba(255,255,255,0.30);text-decoration:none}

    /* ALERT BAND */
    .alert-band{background:var(--deep);padding:16px clamp(16px,4vw,48px);border-bottom:1px solid rgba(255,255,255,0.06)}
    .alert-inner{max-width:800px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap}
    .alert-left{display:flex;align-items:center;gap:12px}
    .alert-icon{width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .alert-icon svg{width:18px;height:18px;display:block}
    .alert-body{display:flex;flex-direction:column;gap:2px}
    .alert-route{display:flex;align-items:center;gap:6px;color:#fff;font-size:14px;font-weight:700;font-family:var(--font-display)}
    .alert-dot{width:7px;height:7px;border-radius:50%;background:var(--flag-yellow);flex-shrink:0;animation:pulse 2s infinite}
    .alert-arrow{color:rgba(255,255,255,0.35);font-size:13px}
    .alert-sub{font-size:12px;color:rgba(255,255,255,0.5);font-family:var(--font-body)}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
    .alert-cta{display:inline-flex;align-items:center;gap:6px;background:var(--flag-green);color:#fff;font-size:13px;font-weight:700;padding:9px 18px;border-radius:20px;flex-shrink:0;transition:background .15s,transform .12s;font-family:var(--font-display)}
    .alert-cta:hover{background:#006640;color:#fff;text-decoration:none;transform:translateY(-1px)}
    .alert-cta svg{width:14px;height:14px;display:block}

    /* CONTENT */
    .content{max-width:800px;margin:0 auto;padding:48px clamp(16px,5vw,64px);background:var(--bg)}

    /* FIRST STEPS CALLOUT */
    .first-steps{background:var(--deep);border-radius:16px;padding:clamp(20px,4vw,28px) clamp(20px,4vw,28px);margin-bottom:56px}
    .first-steps-label{font-size:11px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--flag-yellow);margin-bottom:10px}
    .first-steps-title{font-family:var(--font-display);font-size:clamp(15px,2.5vw,17px);font-weight:700;color:#fff;margin-bottom:20px;line-height:1.4}
    .steps-row{display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .step-pill{display:inline-flex;align-items:center;gap:9px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:9px;padding:10px 16px;text-decoration:none;transition:background .15s,border-color .15s;flex-shrink:0}
    .step-pill:hover{background:rgba(255,255,255,.13);border-color:rgba(255,255,255,.22);text-decoration:none}
    .step-num{font-size:11px;font-weight:800;color:var(--flag-yellow);line-height:1}
    .step-name{font-size:13px;font-weight:700;color:#fff;line-height:1}
    .step-arrow{color:rgba(255,255,255,.25);font-size:18px;flex-shrink:0;line-height:1}

    /* SECTION */
    .section{margin-bottom:52px}
    .section-header{display:flex;align-items:center;gap:12px;margin-bottom:22px;padding-bottom:14px;border-bottom:2px solid var(--line)}
    .section-icon{width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .section-icon svg{width:18px;height:18px;display:block}
    .section-icon.green{background:rgba(0,135,81,.10);color:var(--green)}
    .section-icon.blue{background:rgba(27,43,60,.08);color:var(--deep)}
    .section-icon.yellow{background:rgba(252,209,22,.18);color:#7a6000}
    .section-icon.red{background:rgba(232,17,45,.08);color:var(--red)}
    .section-title{font-size:clamp(17px,2.8vw,21px);font-weight:800;letter-spacing:-.4px}

    /* SERVICE CARDS */
    .services{display:flex;flex-direction:column;gap:14px}
    .service{background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px 24px;overflow:hidden;transition:border-color .15s,box-shadow .15s}
    .service:hover{border-color:rgba(0,135,81,.3);box-shadow:0 2px 16px rgba(0,135,81,.07)}
    .service-name{font-size:15px;font-weight:700;color:var(--deep);line-height:1.35;margin-bottom:8px}
    .service-desc{font-size:13px;color:var(--muted);line-height:1.8;margin-bottom:12px}
    .service-meta{display:flex;flex-wrap:wrap;gap:6px}
    .badge{font-size:11px;font-weight:600;padding:4px 9px;border-radius:5px;white-space:normal;word-break:break-word;line-height:1.45;background:rgba(27,43,60,.07);color:var(--muted)}
    .badge-price,.badge-delay,.badge-free,.badge-caution,.badge-unavail{background:rgba(27,43,60,.07);color:var(--muted)}
    .service-link{display:inline-flex;align-items:center;gap:4px;font-size:12px;font-weight:600;color:var(--green);white-space:nowrap;margin-top:14px}
    .service-link::after{content:'↗';font-size:10px}
    .service-link:hover{text-decoration:none;color:#006640}

    /* PORTAILS CENTRAUX */
    .portals-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px}
    .portal-card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:16px;transition:border-color .15s}
    .portal-card:hover{border-color:rgba(0,135,81,.3)}
    .portal-url{font-size:13px;font-weight:700;color:var(--green);display:block;margin-bottom:4px}
    .portal-desc{font-size:12px;color:var(--muted)}

    /* GAPS */
    .gaps{background:rgba(27,43,60,.03);border:1px solid var(--line);border-radius:12px;padding:20px}
    .gap-item{display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid var(--line)}
    .gap-item:last-child{border-bottom:none;padding-bottom:0}
    .gap-dot{width:7px;height:7px;border-radius:50%;background:var(--red);flex-shrink:0;margin-top:6px}
    .gap-title{font-size:14px;font-weight:700;margin-bottom:2px}
    .gap-note{font-size:12px;color:var(--muted);line-height:1.5}

    /* SECTION NAV */
    .section-nav{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:50;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none}
    .section-nav::-webkit-scrollbar{display:none}
    .section-nav-inner{display:flex;padding:0}
    .snav-a{white-space:nowrap;padding:13px 14px;font-size:13px;font-weight:600;color:var(--muted);text-decoration:none;border-bottom:2px solid transparent;transition:color .15s,border-color .15s;display:block}
    .snav-a:hover{color:var(--deep);text-decoration:none}
    .snav-a.snav-active{color:var(--flag-green);border-bottom-color:var(--flag-green)}

    /* FEATURED CARD (sombre) */
    .service.featured{background:var(--deep);border-color:transparent}
    .service.featured:hover{border-color:transparent;box-shadow:0 4px 24px rgba(27,43,60,.25)}
    .service.featured .service-name{color:#fff}
    .service.featured .service-desc{color:rgba(255,255,255,.65)}
    .service.featured .badge-price,.service.featured .badge-caution,.service.featured .badge-delay,.service.featured .badge-unavail,.service.featured .badge-free{background:rgba(255,255,255,.10);color:rgba(255,255,255,.55)}
    .service.featured .service-link{color:var(--flag-green)}
    .featured-tag{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:var(--flag-green);color:#fff;padding:3px 9px;border-radius:4px;margin-bottom:8px}

    /* CLOSING CTA */
    .closing-cta{background:var(--deep);padding:clamp(40px,7vw,72px) clamp(16px,4vw,40px);text-align:center}
    .closing-inner{max-width:520px;margin:0 auto}
    .closing-label{font-size:11px;font-weight:700;letter-spacing:.10em;text-transform:uppercase;color:var(--flag-yellow);margin-bottom:14px}
    .closing-h2{font-family:var(--font-display);font-size:clamp(24px,4.5vw,36px);font-weight:800;color:#fff;line-height:1.12;letter-spacing:-.5px;margin-bottom:12px}
    .closing-sub{font-size:15px;color:rgba(255,255,255,.60);line-height:1.6;margin-bottom:28px}
    .closing-btn{display:inline-flex;align-items:center;gap:8px;background:var(--flag-green);color:#fff;font-family:var(--font-display);font-size:16px;font-weight:700;padding:15px 40px;border-radius:12px;text-decoration:none;box-shadow:0 4px 20px rgba(0,135,81,.25);transition:background .15s,transform .12s}
    .closing-btn:hover{background:#006640;transform:translateY(-2px);text-decoration:none;color:#fff}
    .closing-hint{margin-top:14px;font-size:12px;color:rgba(255,255,255,.35)}

    /* FOOTER */
    .site-footer{position:relative;z-index:1;background:var(--bg);display:flex;flex-direction:column;align-items:center;gap:4px;padding:28px 24px 0;text-align:center}
    .footer-copy{font-size:12px;color:var(--muted);line-height:1.9}
    .footer-copy a{color:var(--muted);text-decoration:none}
    .footer-copy a:hover{color:var(--deep)}
    .footer-bar{display:flex;height:4px;width:100%;margin-top:20px}
    .bar-green{flex:1;background:var(--flag-green)}
    .bar-yellow{flex:2;background:var(--flag-yellow)}
    .bar-red{flex:1;background:var(--flag-red)}

    /* SEARCH BAR */
    .search-wrap{padding:0 0 28px}
    .search-box{position:relative;display:flex;align-items:center}
    .search-icon{position:absolute;left:14px;width:16px;height:16px;color:var(--muted);pointer-events:none;flex-shrink:0}
    .search-input::-webkit-search-cancel-button,.search-input::-webkit-search-decoration{display:none}
    .search-input{width:100%;padding:13px 44px 13px 42px;font-family:var(--font-body);font-size:14px;font-weight:500;color:var(--deep);background:#fff;border:1.5px solid var(--line);border-radius:10px;outline:none;transition:border-color .15s,box-shadow .15s;-webkit-appearance:none}
    .search-input:focus{border-color:var(--flag-green);box-shadow:0 0 0 3px rgba(0,135,81,.10)}
    .search-input::placeholder{color:var(--muted);font-weight:400}
    .search-clear{position:absolute;right:12px;background:none;border:none;cursor:pointer;color:var(--muted);font-size:20px;padding:4px 6px;line-height:1;transition:color .15s;display:none}
    .search-clear:hover{color:var(--deep)}
    .search-status{font-size:12px;color:var(--muted);margin-top:6px;min-height:16px}
    .search-status.no-results{color:var(--red)}
    .search-no-results{text-align:center;padding:48px 16px;color:var(--muted);font-size:14px;display:none}
    .search-no-results strong{color:var(--deep);display:block;font-size:16px;margin-bottom:6px}

    @media(max-width:600px){
      .alert-inner{flex-direction:column;align-items:flex-start;gap:12px}
      .hero h1{font-size:26px;letter-spacing:-1px}
      .service{padding:18px 16px}
      .section-header{flex-wrap:wrap;row-gap:4px}
      .steps-row{gap:6px}
      .step-arrow{display:none}
    }
  </style>
</head>
<body>

<div class="slideshow" aria-hidden="true">
  <div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div>
</div>
<div class="hero-overlay" aria-hidden="true"></div>

<section class="hero">
  <header class="topbar">
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
        <a href="/inscription" role="menuitem">Inscription</a>
        <div class="flag-nav-sep"></div>
        <a href="/diaspora" role="menuitem" class="active">Pour la diaspora</a>
      </nav>
    </div>
  </header>
  <div class="hero-inner">
    <h1>Tout ce que la <span class="h1-mark">diaspora</span><br>béninoise doit savoir.</h1>
    <p class="hero-sub">Passeport, NPI, immatriculation, ePass, actes d'état civil. Les portails officiels béninois vérifiés, avec les vrais tarifs et délais.</p>
    <div class="hero-portals">
      <a href="#voyage" class="portal-chip">Vols spéciaux</a>
      <a href="#passeport" class="portal-chip">Passeport</a>
      <a href="#identite" class="portal-chip">Identité</a>
      <a href="#nationalite" class="portal-chip">Nationalité</a>
      <a href="#entreprendre" class="portal-chip">Investir</a>
      <a href="#consulaire" class="portal-chip">Consulaire</a>
    </div>
  </div>
</section>

<nav class="section-nav" aria-label="Navigation rapide">
  <div class="section-nav-inner">
    <a href="#voyage" class="snav-a">Voyage</a>
    <a href="#passeport" class="snav-a">Passeport</a>
    <a href="#identite" class="snav-a">Identité</a>
    <a href="#nationalite" class="snav-a">Nationalité</a>
    <a href="#entreprendre" class="snav-a">Entreprendre</a>
    <a href="#consulaire" class="snav-a">Consulaire</a>
    <a href="#portails" class="snav-a">Portails</a>
  </div>
</nav>

<div class="content">

  <div class="search-wrap">
    <div class="search-box">
      <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input id="diaspora-search" type="search" class="search-input" placeholder="Passeport, visa, investir, vote…" autocomplete="off" spellcheck="false" aria-label="Rechercher un service">
      <button id="search-clear" class="search-clear" aria-label="Effacer la recherche">&times;</button>
    </div>
    <p class="search-status" id="search-status" aria-live="polite"></p>
  </div>

  <div class="search-no-results" id="search-no-results">
    <strong id="search-no-results-msg"></strong>
    Ce service n'est peut-être pas encore référencé.
  </div>

  <!-- ── VOYAGE ─────────────────────────────────────────────────────── -->
  <section class="section" id="voyage">
    <div class="section-header">
      <div class="section-icon green"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16v-2l-8-5V3.5C13 2.67 12.33 2 11.5 2S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg></div>
      <h2 class="section-title">Voyage</h2>
    </div>
    <div class="services">

      <div class="service">
        <div>
          <div class="service-name">Laissez-passer consulaire</div>
          <div class="service-desc">Pour rentrer en urgence quand le passeport est expiré ou manquant. Usage unique, valable 30 jours.<br>Réservé aux urgences réelles (décès, hospitalisation).<br>Contact direct : paris.diplomatie.bj.</div>
          <div class="service-meta">
            <span class="badge badge-price">~16 € (tarif indicatif)</span>
            <span class="badge badge-delay">72 heures</span>
            <span class="badge badge-caution">Urgences uniquement</span>
            <span class="badge badge-unavail">Plateforme RDV temporairement inaccessible</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Couloir diaspora, DEI Cotonou</div>
          <div class="service-desc">File d'attente dédiée à l'aéroport de Cotonou pour les Béninois de la diaspora.<br>Montrez une preuve de résidence à l'arrivée : carte consulaire, carte de séjour ou passeport étranger en cours de validité.</div>
          <div class="service-meta">
            <span class="badge badge-free">Gratuit</span>
            <span class="badge badge-caution">dei.gouv.bj indisponible actuellement</span>
          </div>
        </div>
        <a href="https://dei.gouv.bj" target="_blank" class="service-link">DEI</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">e-Visa pour proches étrangers</div>
          <div class="service-desc">Votre conjoint(e) ou ami(e) non béninois vous accompagne ? Le visa se fait entièrement en ligne avant le départ.<br>Loi n° 2025-15 du 2 juillet 2025,formulaire et suivi sur evisa.bj.</div>
          <div class="service-meta">
            <span class="badge badge-price">~32 798 FCFA (30j, 1 entrée)</span>
            <span class="badge badge-price">~49 197 FCFA (30j, multi)</span>
            <span class="badge badge-price">~65 596 FCFA (90j, multi)</span>
            <span class="badge badge-caution">Tarifs indicatifs, vérifier sur evisa.bj</span>
          </div>
        </div>
        <a href="https://evisa.bj" target="_blank" class="service-link">evisa.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Diaspora Tour, consulats itinérants</div>
          <div class="service-desc">L'ambassade se déplace à Bruxelles, Berlin, Nantes, Lyon pour traiter passeports et documents consulaires sans venir à Paris.<br>Aucune date 2026 annoncée à ce jour. Suivre l'ambassade pour la prochaine édition.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Aucune date 2026 annoncée</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

    </div>
  </section>

  <!-- ── PASSEPORT & DOCUMENTS DE VOYAGE ───────────────────────────── -->
  <section class="section" id="passeport">
    <div class="section-header">
      <div class="section-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><circle cx="8" cy="12" r="2.5"/><path d="M14 9h4M14 12h4M14 15h4"/></svg></div>
      <h2 class="section-title">Passeport</h2>
    </div>
    <div class="services">

      <div class="service featured">
        <div>
          <div class="featured-tag">Nouveau 2025</div>
          <div class="service-name">ePass, renouvellement à distance</div>
          <div class="service-desc">Renouvellement du passeport béninois depuis chez vous. Biométrie sur smartphone, livraison à domicile.<br>Lancé en octobre 2025. iOS + Android.<br>Prérequis : NPI actif + immatriculation consulaire en cours de validité.<br>Support WhatsApp : +229 01 98 91 91 91.</div>
          <div class="service-meta">
            <span class="badge badge-delay">4 semaines maximum</span>
            <span class="badge badge-caution">Tarif révélé dans l'app</span>
          </div>
        </div>
        <a href="https://epass.gouv.bj" target="_blank" class="service-link">epass.gouv.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Passeport biométrique, ambassade Paris</div>
          <div class="service-desc">Pour un premier passeport ou si vous n'avez pas encore de NPI actif.<br>En personne au 89 rue du Cherche-Midi, Paris. Dossier complet requis.<br>Livraison Chronopost disponible. La plateforme RDV en ligne est temporairement hors service. Contacter l'ambassade directement.</div>
          <div class="service-meta">
            <span class="badge badge-price">~100 € (tarif indicatif)</span>
            <span class="badge badge-delay">Maximum 2 mois</span>
            <span class="badge badge-unavail">Plateforme RDV temporairement inaccessible</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

    </div>
  </section>

  <!-- ── IDENTITÉ & ÉTAT CIVIL ──────────────────────────────────────── -->
  <section class="section" id="identite">
    <div class="section-header">
      <div class="section-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
      <h2 class="section-title">Identité & état civil</h2>
    </div>
    <div class="services">

      <div class="service">
        <div>
          <div class="service-name">Immatriculation consulaire</div>
          <div class="service-desc">Première démarche à faire si vous n'avez pas encore vos papiers à jour.<br>Sans elle, l'ePass et la carte d'identité consulaire sont bloqués.<br>En personne au 89 rue du Cherche-Midi, Paris ou dans un consulat.</div>
          <div class="service-meta">
            <span class="badge badge-free">Gratuit</span>
            <span class="badge badge-delay">24 heures</span>
            <span class="badge badge-unavail">Plateforme RDV hors ligne. Contacter l'ambassade directement</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">NPI,Numéro Personnel d'Identification</div>
          <div class="service-desc">Votre numéro dans l'état civil béninois. Requis pour l'ePass, les actes en ligne et tout service ANIP.<br>Si vous en avez déjà un, récupérez-le gratuitement sur eservices.anip.bj.<br>Pour un premier NPI, c'est en personne au consulat.</div>
          <div class="service-meta">
            <span class="badge badge-free">Récupération en ligne : gratuit</span>
            <span class="badge badge-caution">Enrôlement initial : tarif non publié</span>
          </div>
        </div>
        <a href="https://eservices.anip.bj" target="_blank" class="service-link">eservices.anip.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Actes d'état civil en ligne (ANIP)</div>
          <div class="service-desc">Acte de naissance, mariage, décès, certificat de célibat, disponibles 24h/24 depuis Paris.<br>Via eservices.anip.bj ou l'app ANIP BJ. Besoin d'aide : appel gratuit au 7054 ou WhatsApp +229 01 48 50 00 00.</div>
          <div class="service-meta">
            <span class="badge badge-price">1 000 FCFA · acte de naissance</span>
            <span class="badge badge-price">2 000 FCFA · autres actes</span>
          </div>
        </div>
        <a href="https://eservices.anip.bj" target="_blank" class="service-link">eservices.anip.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Transcription d'actes civils étrangers</div>
          <div class="service-desc">Votre enfant est né en France ? Votre mariage a eu lieu à Paris ? Ces actes doivent être intégrés à l'état civil béninois.<br>100 % en ligne sur eservices.anip.bj. NPI requis.</div>
          <div class="service-meta">
            <span class="badge badge-price">2 000 FCFA</span>
          </div>
        </div>
        <a href="https://eservices.anip.bj" target="_blank" class="service-link">eservices.anip.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Casier judiciaire (bulletin B3)</div>
          <div class="service-desc">Souvent requis pour travailler au Bénin ou y lancer une activité. Valable 3 mois.<br>Demande en ligne, résultat en 72h sur service-public.bj.</div>
          <div class="service-meta">
            <span class="badge badge-price">1 900 FCFA</span>
            <span class="badge badge-delay">72 heures</span>
          </div>
        </div>
        <a href="https://service-public.bj" target="_blank" class="service-link">service-public.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Carte d'identité consulaire</div>
          <div class="service-desc">Carte d'identité béninoise valable 5 ans, reconnue dans le pays de résidence.<br>Sert aussi de justificatif de domicile local. En personne à l'ambassade (RDV hors ligne en ce moment. Contacter directement).</div>
          <div class="service-meta">
            <span class="badge badge-price">~30 € (indicatif)</span>
            <span class="badge badge-delay">72 heures</span>
            <span class="badge badge-unavail">Plateforme RDV hors ligne. Contacter l'ambassade directement</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Certificat de nationalité, enfant né à l'étranger</div>
          <div class="service-desc">Si votre enfant est né en Europe, ce document atteste qu'il est béninois. Requis pour son casier judiciaire béninois.<br>Demande via service-public.bj (justice.gouv.bj est en maintenance).</div>
          <div class="service-meta">
            <span class="badge badge-price">Timbre fiscal ~1 200 FCFA</span>
            <span class="badge badge-caution">justice.gouv.bj en maintenance. Passer par service-public.bj</span>
          </div>
        </div>
        <a href="https://service-public.bj" target="_blank" class="service-link">service-public.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Déclaration de naissance, diaspora</div>
          <div class="service-desc">30 jours après la naissance, c'est la limite légale pour déclarer votre enfant auprès du consul béninois.<br>Plateforme idiaspora.service-public.bj temporairement hors ligne. Passer par l'ambassade directement.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Délai légal : 30 jours après la naissance</span>
            <span class="badge badge-unavail">idiaspora.service-public.bj temporairement hors ligne</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

    </div>
  </section>

  <!-- ── NATIONALITÉ AFRO-DESCENDANTS ──────────────────────────────── -->
  <section class="section" id="nationalite">
    <div class="section-header">
      <div class="section-icon yellow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
      <h2 class="section-title">Nationalité, Afro-descendants</h2>
    </div>
    <div class="services">

      <div class="service">
        <div>
          <div class="service-name">My Afro Origins, nationalité béninoise pour afro-descendants</div>
          <div class="service-desc">Pour les afro-descendants qui veulent obtenir la nationalité béninoise. Le programme officiel du gouvernement.<br>Dossier 100 % en ligne, en français, anglais, portugais et espagnol. La décision finale se prend en personne au Bénin.<br>Dernière cérémonie : 1ᵉʳ septembre 2026. Contact : support.adan@gouv.bj.</div>
          <div class="service-meta">
            <span class="badge badge-price">~100 USD (indicatif)</span>
            <span class="badge badge-delay">3 mois environ</span>
            <span class="badge badge-caution">Décision finale en personne au Bénin</span>
          </div>
        </div>
        <a href="https://myafroorigins.bj" target="_blank" class="service-link">myafroorigins.bj</a>
      </div>

    </div>
  </section>

  <!-- ── ENTREPRENDRE & INVESTIR ────────────────────────────────────── -->
  <section class="section" id="entreprendre">
    <div class="section-header">
      <div class="section-icon green"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="17"/><line x1="9.5" y1="14.5" x2="14.5" y2="14.5"/></svg></div>
      <h2 class="section-title">Entreprendre & investir</h2>
    </div>
    <div class="services">

      <div class="service">
        <div>
          <div class="service-name">APIEx, guichet unique d'investissement</div>
          <div class="service-desc">Le guichet officiel pour investir au Bénin depuis l'étranger : création d'entreprise, agréments au code des investissements, accompagnement des projets.<br>Contact direct : (+229) 01 52 83 66 66 · apiex.contact@apiex.bj.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Tarifs selon projet</span>
          </div>
        </div>
        <a href="https://investbenin.bj" target="_blank" class="service-link">investbenin.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">MonEntreprise.bj, création en ligne</div>
          <div class="service-desc">Normalement, le portail pour créer son entreprise en ligne. En ce moment, le service pour les entreprises sociétaires est indisponible. Passer par APIEx en attendant.</div>
          <div class="service-meta">
            <span class="badge badge-unavail">Entreprises sociétaires : indisponible (maintenance)</span>
          </div>
        </div>
        <a href="https://monentreprise.bj" target="_blank" class="service-link">monentreprise.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">ANDF, foncier numérisé</div>
          <div class="service-desc">Titre foncier, extrait cadastral, transfert de propriété, tout en ligne depuis 2025.<br>Plateforme cadastrale sur cadastre.bj. Contact : andf@finances.bj, (+229) 01 97 43 42 93.</div>
          <div class="service-meta">
            <span class="badge badge-price">~0,3 % valeur vénale (indicatif)</span>
          </div>
        </div>
        <a href="https://andf.bj" target="_blank" class="service-link">andf.bj</a>
      </div>

    </div>
  </section>

  <!-- ── AUTRES SERVICES CONSULAIRES ───────────────────────────────── -->
  <section class="section" id="consulaire">
    <div class="section-header">
      <div class="section-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg></div>
      <h2 class="section-title">Autres services consulaires (Paris)</h2>
    </div>
    <div class="services">

      <div class="service">
        <div>
          <div class="service-name">Procuration</div>
          <div class="service-desc">Vous vendez un bien au Bénin depuis Paris ? Vous avez une succession à régler à distance ? La procuration consulaire authentifie le mandat que vous donnez à un tiers.<br>Requis pour toute vente, succession ou acte notarial à distance.</div>
          <div class="service-meta">
            <span class="badge badge-price">16 € (vérifié)</span>
            <span class="badge badge-delay">72 heures</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Certificat de vie</div>
          <div class="service-desc">Requis chaque année par les caisses de retraite béninoises pour continuer à percevoir une pension.<br>Signature en présence du requérant au consulat.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Tarif non vérifié</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Autorisation parentale de sortie du territoire</div>
          <div class="service-desc">Votre enfant voyage seul ou avec un seul parent ? Ce document est obligatoire pour entrer et sortir du Bénin.<br>En personne à l'ambassade.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Tarif non vérifié</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Légalisation d'actes</div>
          <div class="service-desc">Diplôme, jugement, acte notarial français que vous devez utiliser au Bénin. L'ambassade authentifie le document.<br>À noter : les actes publics français nécessitent l'apostille de La Haye avant la légalisation consulaire.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Tarif non vérifié</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">TRADUX,traductions officielles</div>
          <div class="service-desc">Le service officiel de traduction certifiée du gouvernement béninois.<br>Français, anglais, espagnol, portugais. Tarifs sur la plateforme.</div>
          <div class="service-meta">
            <span class="badge badge-free">Tarifs disponibles en ligne</span>
          </div>
        </div>
        <a href="https://tradux.gouv.bj" target="_blank" class="service-link">tradux.gouv.bj</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Fiche familiale d'état civil</div>
          <div class="service-desc">Résume votre situation familiale officielle : conjoint, enfants, filiation.<br>Souvent demandé pour des démarches immobilières ou successorales au Bénin. À demander à l'ambassade.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Tarif non vérifié</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Transfert de dépouille</div>
          <div class="service-desc">Pour le rapatriement au Bénin des restes d'un proche décédé en Europe.<br>Dossier à déposer en urgence à l'ambassade. Documents requis : certificat de décès traduit et légalisé, certificat de mise en bière, formalités douanières. Traitement prioritaire.</div>
          <div class="service-meta">
            <span class="badge badge-caution">Tarif non vérifié · traitement d'urgence</span>
          </div>
        </div>
        <a href="https://paris.diplomatie.bj" target="_blank" class="service-link">Ambassade Paris</a>
      </div>

      <div class="service">
        <div>
          <div class="service-name">Inscription électorale consulaire</div>
          <div class="service-desc">Pour voter lors des élections béninoises depuis Paris ou votre consulat.<br>Inscription dans la rubrique « CV » (Centre de vote) de l'app ANIP BJ.</div>
          <div class="service-meta">
            <span class="badge badge-free">Gratuit</span>
          </div>
        </div>
        <a href="https://eservices.anip.bj" target="_blank" class="service-link">App ANIP BJ</a>
      </div>

    </div>
  </section>

  <!-- ── PORTAILS CENTRAUX ──────────────────────────────────────────── -->
  <section class="section" id="portails">
    <div class="section-header">
      <div class="section-icon blue"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
      <h2 class="section-title">Portails officiels</h2>
    </div>
    <div class="portals-grid">
      <a href="https://service-public.bj/public/services/search?query=diaspora" target="_blank" class="portal-card" style="text-decoration:none">
        <span class="portal-url">service-public.bj</span>
        <span class="portal-desc">Guichet unique officiel de l'administration béninoise</span>
      </a>
      <a href="https://idiaspora.service-public.bj" target="_blank" class="portal-card" style="text-decoration:none">
        <span class="portal-url">idiaspora.service-public.bj</span>
        <span class="portal-desc">Services consulaires dématérialisés pour la diaspora. Lancé en avril 2024. Temporairement indisponible au 30/09/2026.</span>
      </a>
      <a href="https://paris.diplomatie.bj" target="_blank" class="portal-card" style="text-decoration:none">
        <span class="portal-url">paris.diplomatie.bj</span>
        <span class="portal-desc">Ambassade du Bénin en France. Remplace benin-ambassade.fr (migration permanente). WhatsApp E-Diaspora : +229 01 98 91 91 91.</span>
      </a>
      <a href="https://eservices.anip.bj" target="_blank" class="portal-card" style="text-decoration:none">
        <span class="portal-url">eservices.anip.bj</span>
        <span class="portal-desc">Identité numérique, actes, NPI, carte biométrique. App ANIP BJ disponible.</span>
      </a>
      <a href="https://evisa.bj" target="_blank" class="portal-card" style="text-decoration:none">
        <span class="portal-url">evisa.bj</span>
        <span class="portal-desc">E-Visa officiel pour visiteurs non béninois. Anciennement evisa.gouv.bj (migration permanente).</span>
      </a>
    </div>
  </section>

</div>

<section class="closing-cta">
  <div class="closing-inner">
    <div class="closing-label">Vols spéciaux Paris-Cotonou 2027</div>
    <h2 class="closing-h2">Soyez prévenu dès l'ouverture des réservations.</h2>
    <p class="closing-sub">Email + SMS<br>Les places partent en quelques minutes<br>5,99&nbsp;€</p>
    <a href="/inscription" class="closing-btn">S'inscrire <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3l5 5-5 5M3 8h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
    <p class="closing-hint">Service indépendant, non affilié au Gouvernement du Bénin</p>
  </div>
</section>

<footer class="site-footer">
  <p class="footer-copy">
    Service d'alerte pour les vols spéciaux Paris-Cotonou via <a href="https://www.voyage.benin.bj/">voyage.benin.bj</a>.<br>
    Non affilié à Bénin Tours S.A. ni au Gouvernement du Bénin.<br>
    <a href="/cgv">CGV</a> · <a href="/cgv#mentions">Mentions légales</a> · <a href="/cgv#confidentialite">Politique de confidentialité</a>
  </p>
  <div class="footer-bar"><span class="bar-green"></span><span class="bar-yellow"></span><span class="bar-red"></span></div>
</footer>

<script>
(function(){
  var navLinks=document.querySelectorAll('.snav-a');
  var sections=Array.from(navLinks).map(function(a){return document.getElementById(a.getAttribute('href').slice(1));}).filter(Boolean);
  function updateNav(){
    var y=window.scrollY+90;
    var active=sections[0];
    sections.forEach(function(s){if(s&&y>=s.offsetTop)active=s;});
    var snavEl=document.querySelector('.section-nav');
    navLinks.forEach(function(a){
      var isActive=active&&a.getAttribute('href')==='#'+active.id;
      a.classList.toggle('snav-active',isActive);
      if(isActive&&snavEl){
        var target=a.offsetLeft-snavEl.clientWidth/2+a.offsetWidth/2;
        snavEl.scrollLeft=Math.max(0,target);
      }
    });
  }
  window.addEventListener('scroll', updateNav,{passive:true});
  updateNav();
})();
(function(){
  var input=document.getElementById('diaspora-search');
  var clearBtn=document.getElementById('search-clear');
  var statusEl=document.getElementById('search-status');
  var noResultsEl=document.getElementById('search-no-results');
  var noResultsMsgEl=document.getElementById('search-no-results-msg');
  if(!input)return;

  var SYNONYMS={
    'billet':'vols spéciaux réservation paris cotonou',
    'vol':'vols spéciaux réservation laissez-passer voyage',
    'avion':'vols spéciaux paris cotonou voyage',
    'rentrer':'voyage vols spéciaux laissez-passer passeport',
    'urgence':'laissez-passer consulaire urgences décès hospitalisation',
    'papiers':'passeport immatriculation npi identité epass',
    'passeport':'epass passeport biométrique renouvellement ambassade paris',
    'renouveler':'epass passeport renouvellement distance',
    'identite':'npi immatriculation identité consulaire carte',
    'identité':'npi immatriculation identité consulaire carte',
    'npi':'npi numéro personnel identification eservices anip',
    'epass':'epass renouvellement passeport distance smartphone',
    'investir':'apiex investissement entreprise foncier andf',
    'investissement':'apiex investissement entreprise foncier andf',
    'business':'apiex entreprise monentreprise investissement',
    'entreprise':'apiex monentreprise entreprise investissement',
    'créer entreprise':'apiex monentreprise entreprise',
    'terrain':'foncier andf cadastral titre propriété cadastre',
    'maison':'foncier andf titre propriété cadastre',
    'immobilier':'foncier andf cadastral titre propriété',
    'vote':'inscription électorale anip voter élections béninoises',
    'voter':'inscription électorale anip voter élections béninoises',
    'nationalite':'nationalité béninoise afro origins descendants',
    'nationalité':'nationalité béninoise afro origins descendants',
    'naissance':'naissance déclaration enfant anip actes transcription',
    'enfant':'naissance déclaration mineur autorisation parentale',
    'mineur':'autorisation parentale mineur voyage sortie',
    'mariage':'mariage actes anip transcription état civil',
    'décès':'décès dépouille transfert rapatriement mort laissez-passer urgence',
    'mort':'décès dépouille transfert rapatriement mort',
    'rapatriement':'transfert dépouille rapatriement décès mort',
    'retraite':'certificat de vie pension retraite caisse',
    'pension':'certificat de vie pension retraite',
    'traduction':'tradux traduction certifiée officielle',
    'procuration':'procuration mandat succession vente notaire',
    'succession':'procuration succession mandat notaire',
    'acte':'actes anip naissance mariage décès état civil eservices',
    'casier':'casier judiciaire bulletin b3 justice travail',
    'judiciaire':'casier judiciaire bulletin b3',
    'visa':'evisa visa étranger conjoint',
    'immatriculation':'immatriculation consulaire obligatoire epass npi',
    'consulaire':'consulaire ambassade paris immatriculation carte',
    'aéroport':'couloir diaspora aéroport cotonou dei',
    'cotonou':'couloir diaspora aéroport cotonou',
    'tour':'diaspora tour consulat itinérant bruxelles berlin nantes',
    'itinerant':'diaspora tour consulat itinérant',
    'legalisation':'légalisation apostille diplôme jugement notarial',
    'légalisation':'légalisation apostille diplôme jugement notarial',
    'apostille':'légalisation apostille diplôme',
    'diplome':'légalisation apostille diplôme',
    'diplôme':'légalisation apostille diplôme',
    'fiche':'fiche familiale état civil conjoint filiation',
    'famille':'fiche familiale état civil conjoint enfants filiation'
  };

  function normalize(s){
    return (s||'').toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g,'')
      .replace(/[^a-z0-9\s]/g,' ').trim();
  }

  function buildSearchTerms(raw){
    var q=normalize(raw);
    var extra=[];
    Object.keys(SYNONYMS).forEach(function(k){
      if(q.indexOf(normalize(k))!==-1){
        extra.push(normalize(SYNONYMS[k]));
      }
    });
    return (q+' '+extra.join(' ')).trim().split(/ +/).filter(function(t){return t.length>2;});
  }

  var logTimer=null;

  function doSearch(raw){
    var trimmed=(raw||'').trim();
    clearBtn.style.display=trimmed?'block':'none';

    if(!trimmed||normalize(trimmed).length<2){
      document.querySelectorAll('.service').forEach(function(c){c.style.display='';});
      document.querySelectorAll('.section').forEach(function(s){s.style.display='';});
      noResultsEl.style.display='none';
      statusEl.textContent='';
      statusEl.className='search-status';
      clearTimeout(logTimer);
      return;
    }

    var terms=buildSearchTerms(trimmed);
    var totalVisible=0;

    document.querySelectorAll('.service').forEach(function(card){
      var text=normalize(card.textContent);
      var matches=terms.some(function(t){return text.indexOf(t)!==-1;});
      card.style.display=matches?'':'none';
      if(matches)totalVisible++;
    });

    document.querySelectorAll('.section').forEach(function(sec){
      var services=sec.querySelectorAll('.service');
      if(!services.length)return;
      var hasVisible=Array.from(services).some(function(c){return c.style.display!=='none';});
      sec.style.display=hasVisible?'':'none';
    });

    if(totalVisible===0){
      noResultsEl.style.display='block';
      noResultsMsgEl.textContent='Aucun service trouvé pour "'+trimmed+'".';
      statusEl.textContent='0 résultat';
      statusEl.className='search-status no-results';
      clearTimeout(logTimer);
      logTimer=setTimeout(function(){
        fetch('/api/diaspora-search',{
          method:'POST',
          headers:{'content-type':'application/json'},
          body:JSON.stringify({query:trimmed,resultCount:0})
        }).catch(function(){});
      },800);
    }else{
      noResultsEl.style.display='none';
      statusEl.textContent=totalVisible+' service'+(totalVisible>1?'s':'')+' trouvé'+(totalVisible>1?'s':'');
      statusEl.className='search-status';
      clearTimeout(logTimer);
    }
  }

  var debounce;
  input.addEventListener('input',function(){
    clearTimeout(debounce);
    debounce=setTimeout(function(){doSearch(input.value);},180);
  });
  clearBtn.addEventListener('click',function(){
    input.value='';
    doSearch('');
    input.focus();
  });

  document.querySelectorAll('.snav-a').forEach(function(a){
    a.addEventListener('click',function(){
      if(input.value){input.value='';doSearch('');}
    });
  });
})();
(function(){
  var nav=document.querySelector('.section-nav');
  if(!nav||nav.scrollWidth-nav.clientWidth<=2)return;
  var paused=false,lastTs=null,timer,speed=22;
  function tick(ts){
    if(!paused&&lastTs!==null){
      var max=nav.scrollWidth-nav.clientWidth;
      if(max>2){nav.scrollLeft+=speed*(ts-lastTs)/1000;if(nav.scrollLeft>=max)nav.scrollLeft=0;}
    }
    lastTs=ts;
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
  nav.addEventListener('mouseenter',function(){paused=true;});
  nav.addEventListener('mouseleave',function(){paused=false;lastTs=null;});
  nav.addEventListener('touchstart',function(){paused=true;clearTimeout(timer);},{passive:true});
  nav.addEventListener('touchend',function(){timer=setTimeout(function(){paused=false;lastTs=null;},3000);},{passive:true});
  window.addEventListener('scroll',function(){paused=true;clearTimeout(timer);timer=setTimeout(function(){paused=false;lastTs=null;},2500);},{passive:true});
})();
(function(){
  var btn=document.getElementById('flagMenuBtn');
  var nav=document.getElementById('flagNav');
  if(!btn||!nav)return;
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    var open=nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', open?'true':'false');
  });
  document.addEventListener('click', function(e){
    if(!nav.contains(e.target)&&e.target!==btn){
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown', function(e){
    if(e.key==='Escape'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');}
  });
})();
</script>

</body>
</html>`;
}
