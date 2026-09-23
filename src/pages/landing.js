import { escapeHtml } from "../notify.js";
import { shareFabHtml } from "./shared.js";

export function subscribePage(turnstileSiteKey, confirmedCount, priceDisplay, watchState, baseUrl) {
  const shareUrl = `${baseUrl || ""}/inscription`;
  const waShareText = encodeURIComponent("Sois alerté dès que les vols Paris-Cotonou s'ouvrent sur voyage.benin.bj, les places partent en quelques minutes ! 👉 " + shareUrl);
  const COMMENT_COUNT = 8;
  const proofItemsHtml = Array.from({length: COMMENT_COUNT}, (_, i) =>
    `<div class="proof-item">
          <img src="/img/comment-${i + 1}.png" alt="Commentaire Instagram" loading="lazy" width="360" height="100">
        </div>`
  ).join("\n        ");

  const now = new Date();
  const flightYear = now.getMonth() >= 9 ? now.getFullYear() + 1 : now.getFullYear();

  const isOpen = watchState === "open_notified";
  const statusDotClass = isOpen ? "status-dot-open" : "status-dot-closed";
  const statusText = isOpen
    ? "voyage.benin.bj : réservations ouvertes"
    : "voyage.benin.bj : bientôt disponible";

  const counterRounded = Math.floor(confirmedCount / 10) * 10;
  const counterHtml = confirmedCount >= 1
    ? `<p class="cta-counter"><em class="hl">+${counterRounded > 0 ? counterRounded : confirmedCount} personnes déjà inscrites</em></p>`
    : "";

  const ROUTE_IMG = "/static/route.jpg";
  const LAST_YEAR_IMG1 = "/static/last-year-1.jpg";
  const LAST_YEAR_IMG2 = "/static/last-year-2.jpg";
  const LAST_YEAR_IMG3 = "/static/last-year-3.jpg";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Alerte Vol Paris-Cotonou ${flightYear} | Soyez prévenu dès l'ouverture</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='6' fill='%23008751'/%3E%3Ctext x='16' y='24' text-anchor='middle' font-size='22'%3E✈%3C/text%3E%3C/svg%3E">
<link rel="canonical" href="${escapeHtml(baseUrl)}/">
<meta name="description" content="Recevez un email et un SMS dès que les vols spéciaux Paris-Cotonou s'ouvrent sur voyage.benin.bj. Les places partent en quelques minutes : inscrivez-vous pour être prévenu en premier.">
<meta name="keywords" content="vol Paris Cotonou, réservation vol Bénin, billet avion Bénin, voyage Bénin, alerte vol, Paris Cotonou avion, voyage.benin.bj">
<meta property="og:title" content="Alerte Vol Paris-Cotonou | Soyez prévenu dès l'ouverture">
<meta property="og:description" content="Les places partent en quelques minutes. Recevez un email et un SMS dès que les réservations s'ouvrent sur voyage.benin.bj.">
<meta property="og:image" content="https://www.voyage.benin.bj/assets/hero-bg.webp">
<meta property="og:url" content="${escapeHtml(baseUrl)}/">
<meta property="og:type" content="website">
<meta property="og:locale" content="fr_FR">
<meta property="og:site_name" content="Alertes Vols Bénin">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Alerte Vol Paris-Cotonou | Soyez prévenu dès l'ouverture">
<meta name="twitter:description" content="Les places partent en quelques minutes. Inscrivez-vous pour être prévenu en premier.">
<meta name="twitter:image" content="https://www.voyage.benin.bj/assets/hero-bg.webp">
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Alertes Vols Bénin",
  "url": "${escapeHtml(baseUrl)}/",
  "description": "Service d'alerte par email et SMS pour les vols spéciaux Paris-Cotonou via voyage.benin.bj",
  "applicationCategory": "TravelApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "5.99",
    "priceCurrency": "EUR"
  },
  "creator": {
    "@type": "Organization",
    "name": "Alertes Vols Bénin"
  }
}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="preload" as="image" href="https://www.voyage.benin.bj/assets/bg-illustration.webp" fetchpriority="high">
<style>
:root{
  --deep:#1B2B3C;--accent:#e8112d;--bg:#F8F6F1;--bg2:#FFFFFF;
  --muted:#667888;--line:rgba(27,43,60,0.10);
  --flag-green:#008751;--flag-yellow:#FCD116;--flag-red:#E8112D;
  --font-display:'Sora',ui-sans-serif,system-ui,sans-serif;
  --font-body:'Inter',ui-sans-serif,system-ui,-apple-system,sans-serif;
  --slide-dur:70s;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;overflow-x:hidden;max-width:100%}
body{font-family:var(--font-body);color:var(--deep);overflow-x:hidden;max-width:100%;background:var(--bg)}

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

.hero{min-height:100svh;display:flex;flex-direction:column;position:relative;overflow:hidden}
.topbar{display:flex;align-items:center;justify-content:space-between;padding:clamp(20px,4vw,40px) clamp(16px,3vw,32px) 0}
.wordmark{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none}
.wordmark-icon{width:36px;height:36px;border-radius:8px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.22);display:flex;align-items:center;justify-content:center;font-size:18px;line-height:1}
.wordmark-label{font-family:var(--font-display);font-size:15px;font-weight:600;letter-spacing:0.01em;color:rgba(255,255,255,0.90)}

.flag-chip{width:32px;height:22px;border-radius:4px;overflow:hidden;display:grid;grid-template-columns:2fr 3fr;grid-template-rows:1fr 1fr;box-shadow:0 0 0 1px rgba(255,255,255,0.28)}
.flag-chip span:nth-child(1){grid-row:1/3;grid-column:1;background:var(--flag-green)}
.flag-chip span:nth-child(2){grid-row:1;grid-column:2;background:var(--flag-yellow)}
.flag-chip span:nth-child(3){grid-row:2;grid-column:2;background:var(--flag-red)}

.hero-columns{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;padding:clamp(28px,6vw,56px) clamp(24px,5vw,80px) clamp(44px,7vw,72px);width:100%}
.hero-body{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;max-width:640px;width:100%}
.hero h1{font-family:var(--font-display);font-size:clamp(36px,8vw,72px);font-weight:700;line-height:1.08;letter-spacing:-0.5px;color:#fff;margin-bottom:18px}
.hero-lead{font-size:clamp(16px,1.6vw,19px);font-weight:400;color:rgba(255,255,255,0.85);line-height:1.65;max-width:46ch;margin-bottom:32px}
.scroll-cta{display:inline-flex;align-items:center;gap:8px;background:var(--flag-green);color:#fff;font-family:var(--font-body);font-size:16px;font-weight:600;padding:16px 40px;border-radius:12px;text-decoration:none;box-shadow:0 4px 20px rgba(27,43,60,0.20);transition:background .2s,transform .12s}
.scroll-cta:hover{background:#006640;transform:translateY(-2px)}
.hero-price-hint{margin-top:12px;font-size:13px;color:rgba(255,255,255,0.80);line-height:1.5}
.hero-price-hint strong{color:#fff;font-weight:700}
.hero-trust{margin-top:10px;font-size:12.5px;color:rgba(255,255,255,0.62);line-height:1.6;max-width:44ch}

.cdsection{position:relative;z-index:1;background:var(--bg);padding:clamp(36px,7vw,80px) clamp(8px,2vw,48px);text-align:center}
@media(min-width:1024px){.cdsection{padding:clamp(32px,3vw,48px) clamp(8px,2vw,48px)}}
.cdsection-inner{display:flex;flex-direction:column;align-items:center;gap:14px}
.cdsection-label{font-size:clamp(16px,2.5vw,27px);color:rgba(0,0,0,0.65);letter-spacing:0.01em;max-width:620px;line-height:1.5}
.cdsection-label strong{color:var(--deep)}
.service-note{background:var(--bg);padding:clamp(28px,5vw,52px) 20px;text-align:center;font-size:clamp(15px,1.5vw,18px);line-height:1.7;color:rgba(0,0,0,0.65)}
.service-note strong{color:var(--deep)}
.hl{background:#ff2d2d;color:#fff!important;border-radius:4px;padding:2px 6px}
.cdsection-units{display:flex;align-items:flex-start;gap:clamp(4px,1.5vw,16px)}
.cdsection-unit{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:clamp(56px,14vw,120px);background:#fff;border:1px solid rgba(27,43,60,0.12);border-radius:16px;padding:clamp(10px,3vw,22px) 6px}
.cdsection-unit b{font-family:var(--font-display);font-size:clamp(40px,10vw,91px);font-weight:800;color:var(--deep);line-height:1;font-variant-numeric:tabular-nums;letter-spacing:-2px}
.cdsection-unit small{font-size:clamp(11px,2.5vw,17px);color:rgba(0,0,0,0.38);text-transform:uppercase;letter-spacing:0.08em;font-weight:700}
.cdsection-sep{font-family:var(--font-display);font-size:clamp(30px,7vw,67px);font-weight:700;color:rgba(0,0,0,0.15);padding-top:clamp(10px,3vw,22px);line-height:1}

.route-card{background:none;border:none;border-radius:18px;padding:0;display:flex;flex-direction:column;align-items:center;gap:10px;width:100%;max-width:500px;flex-shrink:0;transition:transform .35s ease,filter .35s ease}
.route-card:hover{transform:scale(1.03);filter:drop-shadow(0 8px 32px rgba(0,0,0,0.4))}
.route-img{width:100%;height:auto;border-radius:18px;display:block;box-shadow:0 4px 24px rgba(0,0,0,0.35)}
.route-caption{font-family:var(--font-display);font-style:italic;font-size:15px;color:rgba(255,255,255,0.9);letter-spacing:0.01em}

.slide-caption{position:absolute;bottom:20px;right:24px;font-size:11px;color:rgba(255,255,255,.42);letter-spacing:.04em;pointer-events:none}

@media(min-width:900px){
  .hero-columns{flex-direction:row;align-items:center;justify-content:space-between;text-align:left;gap:56px}
  .hero-body{align-items:flex-start;text-align:left;max-width:560px}
  .hero-lead{margin-left:0}
  .route-card{margin-left:auto}
}

.subscribe{position:relative;z-index:1;background:var(--bg);padding:clamp(48px,8vw,96px) clamp(16px,4vw,48px) clamp(56px,9vw,104px)}
.subscribe-inner{max-width:none;margin:0 auto;width:100%;display:flex;flex-direction:column;align-items:center;text-align:center;gap:40px;padding:0 clamp(24px,5vw,80px)}
.subscribe-proof,.subscribe-main{width:100%}
.subscribe-inner h2{font-family:var(--font-display);font-size:clamp(28px,5vw,48px);font-weight:700;line-height:1.1;letter-spacing:-0.4px;color:var(--deep);margin-bottom:18px}
.sub-lead{font-size:clamp(15px,1.8vw,17px);color:var(--muted);line-height:1.8;max-width:52ch;margin-bottom:20px}
.trust-prose{font-size:14px;color:var(--muted);line-height:1.75;max-width:52ch;margin-bottom:28px}
.cta-main{display:inline-flex;align-items:center;gap:10px;background:var(--flag-green);color:#fff;font-family:var(--font-body);font-size:16px;font-weight:600;padding:16px 40px;border-radius:12px;text-decoration:none;margin-top:8px;box-shadow:0 4px 20px rgba(27,43,60,0.20);transition:background .2s,transform .12s}
.cta-main:hover{background:#006640;transform:translateY(-2px)}
.cta-sub{margin-top:12px;font-size:12px;color:var(--muted);line-height:1.6}
.cta-counter{margin-top:10px;font-size:13px;color:var(--muted);font-weight:500}
.wa-nudge{margin-top:40px;padding:28px clamp(16px,4vw,48px) 0;border-top:1px solid var(--line);display:flex;flex-direction:column;align-items:center;text-align:center}
.wa-nudge-text{font-size:14px;color:var(--muted);line-height:1.75;margin-bottom:28px}
.wa-nudge-btn{display:inline-flex;align-items:center;gap:10px;background:var(--flag-green);color:#fff;font-family:var(--font-body);font-size:16px;font-weight:600;padding:16px 40px;border-radius:12px;text-decoration:none;margin-top:8px;box-shadow:0 4px 20px rgba(27,43,60,0.20);transition:background .2s,transform .12s}
.wa-nudge-btn:hover{background:#006640;transform:translateY(-2px)}
.status-line{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:500;color:var(--muted);margin-bottom:20px;padding:8px 14px;background:var(--bg2);border:1px solid var(--line);border-radius:8px}
.status-dot-closed{width:8px;height:8px;border-radius:50%;background:#C0392B;flex-shrink:0}
.status-dot-open{width:8px;height:8px;border-radius:50%;background:var(--flag-green);flex-shrink:0}

.proof-lead{font-size:13px;color:var(--muted);margin-bottom:14px;text-align:left}
.proof-list{display:flex;flex-direction:column;gap:10px;position:relative;width:100%}
.proof-item{background:#1a1a2e;border:1px solid rgba(255,255,255,0.08);border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.15);transition:transform .25s ease,box-shadow .25s ease;width:85%;max-width:340px}
.proof-item:hover{transform:translateY(-3px) rotate(0deg)!important;box-shadow:0 8px 28px rgba(0,0,0,0.28)}
.proof-item:nth-child(odd){align-self:flex-start;transform:rotate(-0.8deg)}
.proof-item:nth-child(even){align-self:flex-end;transform:rotate(0.6deg)}
.proof-item:nth-child(3){margin-left:10%}
.proof-item:nth-child(6){margin-right:10%}
.proof-item img{display:block;width:100%;height:auto;object-fit:contain}

@media(min-width:960px){
  .subscribe-inner{max-width:none;display:grid;grid-template-columns:0.85fr 1.15fr;gap:64px;align-items:center;text-align:left}
  .sub-lead,.trust-prose{margin-left:0}
  .proof-lead{text-align:left}
}

.how{position:relative;z-index:1;background:var(--bg);padding:clamp(48px,8vw,96px) clamp(16px,4vw,48px)}
.how-inner{max-width:none;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.how h2{font-family:var(--font-display);font-size:clamp(28px,5vw,48px);font-weight:700;letter-spacing:-0.3px;margin-bottom:clamp(32px,5vw,52px);color:var(--deep)}
.steps{display:flex;flex-direction:column}
.step{display:flex;gap:24px;padding:24px 0;border-top:1px solid var(--line)}
.step:first-child{border-top:none;padding-top:0}
.step-n{font-family:var(--font-display);font-size:13px;font-weight:600;font-style:italic;color:var(--accent);min-width:28px;padding-top:2px;flex-shrink:0;letter-spacing:0.02em}
.step-content h4{font-size:15px;font-weight:600;margin-bottom:6px;color:var(--deep)}
.step-content p{font-size:14px;color:var(--muted);line-height:1.65}
@media(min-width:768px){
  .steps{flex-direction:row;gap:0}
  .step{flex:1;flex-direction:column;gap:12px;padding:0 32px;border-top:none;border-left:1px solid var(--line)}
  .step:first-child{border-left:none;padding-left:0}
  .step-n{padding-top:0}
}
@media(min-width:1280px){.how-inner{max-width:none}}

.faq{position:relative;z-index:1;background:var(--bg);padding:clamp(48px,8vw,96px) clamp(16px,4vw,48px)}
.faq-inner{max-width:none;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.faq h2{font-family:var(--font-display);font-size:clamp(28px,5vw,48px);font-weight:700;letter-spacing:-0.3px;margin-bottom:clamp(32px,5vw,52px);color:var(--deep)}
.faq-list{display:flex;flex-direction:column}
.faq-item{display:flex;gap:24px;padding:24px 0;border-top:1px solid var(--line)}
.faq-item:first-child{border-top:none;padding-top:0}
.faq-n{font-family:var(--font-display);font-size:13px;font-weight:600;font-style:italic;color:var(--accent);min-width:28px;padding-top:2px;flex-shrink:0;letter-spacing:0.02em}
.faq-content h4{font-size:15px;font-weight:600;margin-bottom:6px;color:var(--deep)}
.faq-content p{font-size:14px;color:var(--muted);line-height:1.65}
@media(min-width:768px){
  .faq-list{display:grid;grid-template-columns:1fr 1fr;gap:0}
  .faq-item{flex-direction:column;gap:12px;padding:0 32px 0;border-top:none;border-left:1px solid var(--line)}
  .faq-item:first-child{border-left:none;padding-left:0}
  .faq-item:nth-child(3){border-left:none;padding-left:0}
  .faq-n{padding-top:0}
}
.site-footer{position:relative;z-index:1;background:var(--bg);display:flex;flex-direction:column;align-items:center;gap:4px;padding:28px 24px 0;text-align:center}
.footer-copy{font-size:12px;color:var(--muted);line-height:1.9}
.footer-copy a{color:var(--muted);text-decoration:none}
.footer-copy a:hover{color:var(--deep)}
.footer-bar{display:flex;height:4px;width:100%;margin-top:20px}
.bar-green{flex:1;background:var(--flag-green)}
.bar-yellow{flex:2;background:var(--flag-yellow)}
.bar-red{flex:1;background:var(--flag-red)}
.nb{display:inline}
.carousel-dots{display:none}
.sticky-cta{display:none}
@media(max-width:680px){
  .subscribe{padding-bottom:80px}
  .site-footer{padding-bottom:80px}
  .sub-lead,.trust-prose{max-width:none}
  .nb{display:block}
  .proof-list{flex-direction:row;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;padding-bottom:8px;gap:12px;scrollbar-width:none}
  .proof-list::-webkit-scrollbar{display:none}
  .proof-item{min-width:280px;max-width:300px;width:80vw;flex-shrink:0;scroll-snap-align:center;transform:none!important;align-self:auto!important;margin-left:0!important;margin-right:0!important}
  .proof-item:first-child{margin-left:0}
  .carousel-dots{display:flex;justify-content:center;gap:6px;padding-top:10px}
  .dot{width:7px;height:7px;border-radius:50%;background:var(--line);transition:background .2s,transform .2s}
  .dot.active{background:var(--flag-green);transform:scale(1.3)}
  .sticky-cta{position:fixed;bottom:0;left:0;right:0;z-index:100;padding:10px 16px;padding-bottom:max(10px,env(safe-area-inset-bottom));background:rgba(255,255,255,0.97);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border-top:1px solid var(--line);transform:translateY(100%);transition:transform .3s ease;display:flex}
  .sticky-cta.visible{transform:translateY(0)}
  .sticky-cta a{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;background:var(--flag-green);color:#fff;font-family:var(--font-body);font-size:15px;font-weight:600;padding:14px 24px;border-radius:10px;text-decoration:none;box-shadow:0 -2px 12px rgba(0,0,0,0.08)}
  .share-fab{bottom:80px!important}
}
@media(prefers-reduced-motion:reduce){
  .slide{animation:none!important;opacity:0!important}.slide:nth-child(1){opacity:1!important}
  .route-img{animation:none}
}
.last-year{position:relative;z-index:1;background:var(--bg);padding:clamp(56px,9vw,100px) clamp(16px,4vw,48px)}
.last-year-inner{max-width:none;margin:0 auto;padding:0 clamp(24px,5vw,80px)}
.last-year-header{margin-bottom:clamp(28px,4vw,44px)}
.last-year h2{font-family:var(--font-display);font-size:clamp(28px,5vw,48px);font-weight:700;letter-spacing:-0.5px;margin-bottom:12px;color:var(--deep)}
.last-year-sub{font-size:clamp(15px,1.2vw,17px);color:var(--muted);line-height:1.7;max-width:56ch}
.ly-grid{display:grid;grid-template-columns:1.4fr 1fr;grid-template-rows:1fr 1fr;gap:12px}
.ly-img{border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(27,43,60,0.12);cursor:zoom-in}
.ly-img img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .3s ease}
.ly-img:hover img{transform:scale(1.03)}
.ly-img:first-child{grid-row:1/3;background:#132913}
.ly-img:first-child img{object-fit:contain}
.ly-caption{margin-top:18px;font-size:13px;color:var(--muted);line-height:1.5;font-style:italic;text-align:center}
.ly-modal{display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,0.90);align-items:center;justify-content:center;padding:20px}
.ly-modal.open{display:flex}
.ly-modal-img{max-width:min(90vw,720px);max-height:90vh;object-fit:contain;border-radius:12px;display:block}
.ly-modal-close{position:fixed;top:20px;right:24px;background:none;border:none;color:#fff;font-size:32px;cursor:pointer;line-height:1;opacity:.8}
.ly-modal-close:hover{opacity:1}
.ly-modal-nav{position:fixed;top:50%;transform:translateY(-50%);background:rgba(255,255,255,0.15);border:none;color:#fff;font-size:28px;cursor:pointer;width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;transition:background .2s}
.ly-modal-nav:hover{background:rgba(255,255,255,0.30)}
.ly-modal-prev{left:16px}
.ly-modal-next{right:16px}
@media(max-width:600px){
  .last-year-inner{padding:0 16px!important}
  .ly-grid{display:flex!important;flex-direction:row;overflow-x:auto;scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;gap:10px;padding-bottom:4px;scrollbar-width:none;align-items:flex-start}
  .ly-grid::-webkit-scrollbar{display:none}
  .ly-img{flex:0 0 calc(100vw - 64px)!important;scroll-snap-align:start;grid-row:auto!important;height:auto!important;border-radius:0!important;overflow:visible!important}
  .ly-img img{height:auto!important;object-fit:initial!important;width:100%;border-radius:10px}
  .ly-img:first-child{background:transparent!important}
}
</style>
</head>
<body>

<div class="slideshow" aria-hidden="true">
  <div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div>
</div>
<div class="hero-overlay" aria-hidden="true"></div>

<section class="hero" id="top">
  <header class="topbar">
    <a href="#top" class="wordmark" aria-label="Alertes Vols Bénin - accueil">
      <span class="wordmark-icon" aria-hidden="true">✈</span>
      <span class="wordmark-label">Alertes Vols Bénin</span>
    </a>
    <span class="flag-chip" role="img" aria-label="Drapeau du Bénin"><span></span><span></span><span></span></span>
  </header>

  <div class="hero-columns">
    <div class="hero-body">
      <h1>Soyez prévenu dès que les vols <em class="hl">spéciaux</em><br>affrétés Paris-Cotonou <span class="nb">de ${flightYear} s'ouvrent.</span></h1>
      <p class="hero-lead">Les places sur voyage.benin.bj partent en quelques minutes. Inscrivez-vous pour recevoir un email et un SMS dès l'ouverture des réservations.</p>
      <a href="/inscription" class="scroll-cta">
        S’inscrire
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M8 3v10M3 8l5 5 5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </a>
      <p class="hero-trust">Service indépendant, non affilié au Gouvernement du Bénin ni à Bénin Tours S.A.</p>
    </div>

    <div class="route-card" aria-hidden="true">
      <img class="route-img" src="${ROUTE_IMG}" alt="">
      <p class="route-caption">Paris ⇄ Cotonou</p>
    </div>
  </div>

  <span class="slide-caption" aria-hidden="true">© Bénin Tourisme</span>
</section>

<section class="cdsection" id="cdsection">
  <div class="cdsection-inner">
    <p class="cdsection-label"><em class="hl">À tout moment</em>, le gouvernement peut affréter les vols spéciaux Paris-Cotonou.<br><strong>Ne ratez pas l'alerte.</strong><br>L'offre de lancement disparaît dans :</p>
    <div class="cdsection-units">
      <div class="cdsection-unit"><b id="cd-d">--</b><small>jours</small></div>
      <div class="cdsection-sep">:</div>
      <div class="cdsection-unit"><b id="cd-h">--</b><small>heures</small></div>
      <div class="cdsection-sep">:</div>
      <div class="cdsection-unit"><b id="cd-m">--</b><small>min</small></div>
      <div class="cdsection-sep">:</div>
      <div class="cdsection-unit"><b id="cd-s">--</b><small>sec</small></div>
    </div>
    ${counterHtml}
  </div>
</section>

<div class="service-note">
  <em class="hl">Service d'alerte</em> email + SMS.<br><strong>Pas de vente de billets.</strong>
</div>

<section class="subscribe" id="inscription">
  <div class="subscribe-inner">

    <div class="subscribe-proof">
      <p class="proof-lead">Commentaires sous le post <a href="https://www.instagram.com/p/DRpFaGRDHU9/" target="_blank" rel="noopener" style="color:var(--flag-green);text-decoration:underline">@explore.benin</a> (109 commentaires, 2,6K likes) :</p>
      <div class="proof-list" role="list" aria-label="Témoignages">
        ${proofItemsHtml}
      </div>
      <div class="carousel-dots" aria-hidden="true">
        ${Array.from({length: COMMENT_COUNT}, (_, i) => `<span class="dot${i === 0 ? ' active' : ''}"></span>`).join('')}
      </div>
    </div>

    <div class="subscribe-main">
      <h2>Les places partent vite. Très vite.</h2>
      <p class="sub-lead">En décembre 2025, tout était complet en quelques minutes, sans aucun avertissement. Notre système vérifie voyage.benin.bj à chaque instant et vous prévient instantanément dès l'ouverture.</p>
      <div class="status-line">
        <span class="${statusDotClass}"></span>
        ${escapeHtml(statusText)}
      </div>
      <p class="trust-prose">Surveillance automatique. Paiement sécurisé par Stripe.</p>
      <a href="/inscription" class="cta-main">
        M’alerter dès l’ouverture
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </a>
      <p class="cta-sub">Email + SMS dès l’ouverture<br>Pas de vente de billets<br>Paiement sécurisé Stripe</p>
    </div>

  </div>
  <div class="wa-nudge">
    <p class="wa-nudge-text">Tu connais des proches qui cherchent un vol Paris-Cotonou ?</p>
    <a href="https://wa.me/?text=${waShareText}" class="wa-nudge-btn" target="_blank" rel="noopener">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      Partager sur WhatsApp
    </a>
  </div>
</section>


<section class="last-year">
  <div class="last-year-inner">
    <div class="last-year-header">
      <h2>L'année dernière</h2>
      <p class="last-year-sub">En décembre 2025, les réservations ont ouvert sans prévenir. Des milliers de Béninois ont raté leur vol en quelques minutes.</p>
    </div>
    <div class="ly-grid" id="lyGrid">
      <div class="ly-img" data-ly="0"><img src="${LAST_YEAR_IMG1}" alt="Décembre 2025 — Paris Cotonou 500€" loading="lazy"></div>
      <div class="ly-img" data-ly="1"><img src="${LAST_YEAR_IMG2}" alt="Décembre 2025 — dates des vols" loading="lazy"></div>
      <div class="ly-img" data-ly="2"><img src="${LAST_YEAR_IMG3}" alt="Décembre 2025 — Bénin" loading="lazy"></div>
    </div>
    <p class="ly-caption">Décembre 2025 — Les vols spéciaux Paris-Cotonou ont ouvert et se sont remplis en quelques minutes.</p>
  </div>
  <div class="ly-modal" id="lyModal" role="dialog" aria-modal="true">
    <button class="ly-modal-close" id="lyModalClose" aria-label="Fermer">×</button>
    <button class="ly-modal-nav ly-modal-prev" id="lyModalPrev" aria-label="Précédent">‹</button>
    <img class="ly-modal-img" id="lyModalImg" src="" alt="">
    <button class="ly-modal-nav ly-modal-next" id="lyModalNext" aria-label="Suivant">›</button>
  </div>
</section>


<section class="how">
  <div class="how-inner">
    <h2>Comment ça marche</h2>
    <div class="steps">
      <div class="step">
        <span class="step-n">01</span>
        <div class="step-content">
          <h4>Vous vous inscrivez</h4>
          <p>Renseignez vos coordonnées. Un email de confirmation active votre alerte.</p>
        </div>
      </div>
      <div class="step">
        <span class="step-n">02</span>
        <div class="step-content">
          <h4>On surveille pour vous</h4>
          <p>Notre système vérifie voyage.benin.bj chaque minute, jour et nuit, 7j/7.</p>
        </div>
      </div>
      <div class="step">
        <span class="step-n">03</span>
        <div class="step-content">
          <h4>Vous recevez l’alerte</h4>
          <p>Un email et un SMS avec le lien direct pour réserver, dès que les places sont disponibles.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="faq">
  <div class="faq-inner">
    <h2>Questions fréquentes</h2>
    <div class="faq-list">
      <div class="faq-item">
        <span class="faq-n">01</span>
        <div class="faq-content">
          <h4>Pourquoi c'est payant ?</h4>
          <p>Le service surveille voyage.benin.bj en continu, 24h/24, 7j/7, et envoie une alerte email et SMS en quelques secondes dès l'ouverture. Le coût de ${escapeHtml(priceDisplay)} couvre l'infrastructure et les SMS.</p>
        </div>
      </div>
      <div class="faq-item">
        <span class="faq-n">02</span>
        <div class="faq-content">
          <h4>Est-ce que vous vendez des billets ?</h4>
          <p>Non. Nous envoyons une alerte avec le lien direct vers voyage.benin.bj. La réservation se fait sur le site officiel du gouvernement béninois.</p>
        </div>
      </div>
      <div class="faq-item">
        <span class="faq-n">03</span>
        <div class="faq-content">
          <h4>C'est sécurisé ?</h4>
          <p>Le paiement est traité par Stripe. Nous ne stockons aucune coordonnée bancaire. Votre email et numéro de téléphone sont utilisés uniquement pour vous envoyer l'alerte.</p>
        </div>
      </div>
      <div class="faq-item">
        <span class="faq-n">04</span>
        <div class="faq-content">
          <h4>Quand reçois-je l'alerte ?</h4>
          <p>Dès que notre système détecte l'ouverture des réservations sur voyage.benin.bj, vous recevez simultanément un email et un SMS, en moins d'une minute.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<footer class="site-footer">
  <p class="footer-copy">
    Service d’alerte pour les vols spéciaux Paris-Cotonou via <a href="https://www.voyage.benin.bj/">voyage.benin.bj</a>.<br>
    Non affilié à Bénin Tours S.A. ni au Gouvernement du Bénin.<br>
    <a href="/cgv">CGV</a> · <a href="/cgv">Mentions légales</a> · <a href="/cgv">Politique de confidentialité</a>
  </p>
  <div class="footer-bar"><span class="bar-green"></span><span class="bar-yellow"></span><span class="bar-red"></span></div>
</footer>

${shareFabHtml(shareUrl)}

<div class="sticky-cta" id="stickyCta">
  <a href="/inscription">
    S'inscrire – ${escapeHtml(priceDisplay)}
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>
</div>

<script>
(function(){
  var isMobile=window.innerWidth<=680;

  // --- Carousel auto-scroll + dot indicators (mobile) ---
  if(isMobile){
    var el=document.querySelector('.proof-list');
    var dots=document.querySelectorAll('.carousel-dots .dot');
    if(el&&el.children.length){
      var idx=0,total=el.children.length,paused=false;
      function setActive(i){
        for(var d=0;d<dots.length;d++) dots[d].classList.toggle('active',d===i);
      }
      function next(){
        if(paused)return;
        idx=(idx+1)%total;
        el.scrollTo({left:el.children[idx].offsetLeft-el.offsetLeft,behavior:'smooth'});
        setActive(idx);
      }
      var timer=setInterval(next,2800);
      el.addEventListener('touchstart',function(){paused=true;clearInterval(timer);},{passive:true});
      el.addEventListener('touchend',function(){
        var snap=Math.round(el.scrollLeft/(el.scrollWidth/total));
        idx=Math.min(snap,total-1);
        setActive(idx);
        setTimeout(function(){paused=false;timer=setInterval(next,2800);},3000);
      },{passive:true});
      el.addEventListener('scroll',function(){
        if(!paused)return;
        var snap=Math.round(el.scrollLeft/(el.scrollWidth/total));
        setActive(Math.min(snap,total-1));
      },{passive:true});
    }
  }

  // --- Sticky CTA (mobile) ---
  if(isMobile){
    var sticky=document.getElementById('stickyCta');
    var hero=document.getElementById('top');
    if(sticky&&hero){
      var shown=false;
      var observer=new IntersectionObserver(function(entries){
        var heroVisible=entries[0].isIntersecting;
        if(!heroVisible&&!shown){sticky.classList.add('visible');shown=true;}
        if(heroVisible&&shown){sticky.classList.remove('visible');shown=false;}
      },{threshold:0.1});
      observer.observe(hero);
    }
  }
})();

// Mobile horizontal auto-scroll
(function(){
  var grid=document.getElementById('lyGrid');
  if(!grid||window.innerWidth>600)return;
  var items=grid.querySelectorAll('.ly-img');
  if(!items.length)return;
  var idx=0,total=items.length,paused=false;
  function scrollTo(n){
    idx=(n+total)%total;
    grid.scrollTo({left:items[idx].offsetLeft-grid.offsetLeft,behavior:'smooth'});
  }
  var timer=setInterval(function(){if(!paused)scrollTo(idx+1);},3000);
  grid.addEventListener('touchstart',function(){paused=true;clearInterval(timer);},{passive:true});
  grid.addEventListener('touchend',function(){paused=false;timer=setInterval(function(){scrollTo(idx+1);},3000);},{passive:true});
})();

// Lightbox last-year
(function(){
  var modal=document.getElementById('lyModal');
  var modalImg=document.getElementById('lyModalImg');
  if(!modal)return;
  var imgs=Array.from(document.querySelectorAll('[data-ly] img')).map(function(i){return i.src;});
  var idx=0;
  function show(n){
    idx=(n+imgs.length)%imgs.length;
    modalImg.src=imgs[idx];
    modal.classList.add('open');
    document.body.style.overflow='hidden';
  }
  function close(){modal.classList.remove('open');document.body.style.overflow='';}
  document.querySelectorAll('[data-ly]').forEach(function(el){
    el.addEventListener('click',function(){show(parseInt(el.dataset.ly));});
  });
  document.getElementById('lyModalClose').onclick=close;
  document.getElementById('lyModalPrev').onclick=function(){show(idx-1);};
  document.getElementById('lyModalNext').onclick=function(){show(idx+1);};
  modal.addEventListener('click',function(e){if(e.target===modal)close();});
  document.addEventListener('keydown',function(e){
    if(!modal.classList.contains('open'))return;
    if(e.key==='Escape')close();
    if(e.key==='ArrowLeft')show(idx-1);
    if(e.key==='ArrowRight')show(idx+1);
  });
})();
</script>
<script>
(function(){
  var D=new Date('2026-11-01T00:00:00+01:00').getTime();
  function pad(n){return String(n).padStart(2,'0');}
  function set(id,v){var e=document.getElementById(id);if(e)e.textContent=v;}
  function tick(){
    var r=D-Date.now();
    if(r<=0){
      var sec=document.getElementById('cdsection');
      if(sec)sec.style.display='none';
      return;
    }
    var d=Math.floor(r/864e5);
    var h=pad(Math.floor(r%864e5/36e5));
    var m=pad(Math.floor(r%36e5/6e4));
    var s=pad(Math.floor(r%6e4/1e3));
    set('cd-d',d);set('cd-h',h);set('cd-m',m);set('cd-s',s);
  }
  tick();setInterval(tick,1000);
})();
</script>
<script>
(function(){
  // Scroll depth + CTA click tracking (first-party, no cookie)
  var sent={};
  function beacon(e,v){
    if(sent[e+v])return;sent[e+v]=1;
    fetch('/track',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({e:e,v:v,p:window.location.pathname})}).catch(function(){});
  }
  window.addEventListener('scroll',function(){
    var pct=Math.round((window.scrollY/(document.documentElement.scrollHeight-window.innerHeight||1))*100);
    [25,50,75,100].forEach(function(m){if(pct>=m)beacon('scroll_depth',m);});
  },{passive:true});
  document.addEventListener('click',function(e){
    var a=e.target.closest('a[href="/inscription"],.cta-btn');
    if(a)beacon('cta_click',1);
  },{capture:true,passive:true});
  // Share FAB
  document.addEventListener('click',function(e){
    var el=e.target.closest('.fab-item');
    if(el)beacon('share_click',el.classList.contains('wa')?'whatsapp':el.classList.contains('fb')?'facebook':'copy');
  },{capture:true,passive:true});
})();
</script>

</body>
</html>`;
}