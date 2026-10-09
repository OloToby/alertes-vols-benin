const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'C:\\Users\\espoi\\Desktop\\screenshots';
const DIRS = {
  mobile:  path.join(BASE, 'mobile'),
  desktop: path.join(BASE, 'desktop'),
};
const APP = 'http://localhost:8787';

// ── Nettoyage ────────────────────────────────────────────────────────────────
if (fs.existsSync(BASE)) fs.rmSync(BASE, { recursive: true, force: true });
Object.values(DIRS).forEach(d => fs.mkdirSync(d, { recursive: true }));

// ── Helpers ──────────────────────────────────────────────────────────────────
const forceSlide = () => {
  const s = document.querySelector('.slide');
  if (s) { s.style.opacity = '1'; s.style.animation = 'none'; }
};

const injectPaymentStep = () => {
  const form = document.querySelector('form');
  const pay  = document.getElementById('paymentStep');
  if (!form || !pay) return;
  form.style.display = 'none';
  pay.style.display  = 'block';
  const steps = document.querySelectorAll('.stepper-step');
  if (steps[0]) {
    steps[0].classList.remove('active');
    steps[0].classList.add('done');
    steps[0].querySelector('.stepper-num').textContent = '✓';
  }
  if (steps[1]) steps[1].classList.add('active');
  const ps = document.getElementById('paySummary');
  if (ps) ps.innerHTML = '<strong>Amara</strong>, finalisez votre inscription en payant ci-dessous.';
  const pp = document.getElementById('paypal-buttons');
  if (pp) pp.innerHTML = `
    <div style="background:#FFC439;border-radius:6px;padding:14px;text-align:center;font-weight:700;font-size:16px;color:#253B80;display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:10px">
      <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#003087" d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.26-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.477z"/></svg>
      Payer avec PayPal
    </div>
    <div style="text-align:center;margin:8px 0;color:#667888;font-size:13px">— ou payer par carte —</div>
    <div style="border:1.5px solid #e0e0e0;border-radius:6px;padding:12px;background:#fff">
      <div style="font-size:11px;font-weight:700;color:#667888;text-transform:uppercase;margin-bottom:8px">Carte bancaire</div>
      <div style="border:1px solid #d0d0d0;border-radius:4px;padding:10px;font-size:15px;margin-bottom:8px;color:#aaa">1234 5678 9012 3456</div>
      <div style="display:flex;gap:8px">
        <div style="flex:1;border:1px solid #d0d0d0;border-radius:4px;padding:10px;font-size:15px;color:#aaa">MM/AA</div>
        <div style="flex:1;border:1px solid #d0d0d0;border-radius:4px;padding:10px;font-size:15px;color:#aaa">CVV</div>
      </div>
    </div>`;
  window.scrollTo(0, 0);
};

// ── Capture d'un viewport ────────────────────────────────────────────────────
async function captureAll(page, outDir) {
  const shot = (name, opts = {}) =>
    page.screenshot({ path: path.join(outDir, name), ...opts });

  // 1. Accueil — hero
  await page.goto(APP, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await shot('01_accueil_hero.png');

  // 2. Accueil — countdown + urgence
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await shot('02_accueil_countdown.png');

  // 3. Accueil — preuve sociale
  await page.evaluate(() => window.scrollTo({ top: 1600, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await shot('03_accueil_proof.png');

  // 4. Accueil — flyers année dernière
  await page.evaluate(() => window.scrollTo({ top: 2600, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await shot('04_accueil_flyers.png');

  // 5. Accueil — comment ça marche + footer
  await page.evaluate(() => window.scrollTo({ top: 999999, behavior: 'instant' }));
  await page.waitForTimeout(400);
  await shot('05_accueil_comment_ca_marche.png');

  // 6. Inscription — formulaire vide (pleine page)
  await page.goto(`${APP}/inscription`, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await page.evaluate(forceSlide);
  await page.waitForTimeout(400);
  await shot('06_inscription_vide.png', { fullPage: true });

  // 7. Inscription — formulaire rempli (pleine page)
  await page.fill('#first_name', 'Amara');
  await page.fill('#last_name',  'Dossou');
  await page.fill('#email',      'amara.dossou@gmail.com');
  await page.fill('#phone',      '+33 6 45 78 23 91');
  await page.waitForTimeout(300);
  await shot('07_inscription_remplie.png', { fullPage: true });

  // 8. Paiement — étape 2 (pleine page)
  await page.evaluate(injectPaymentStep);
  await page.waitForTimeout(400);
  await shot('08_paiement.png', { fullPage: true });

  // 9. Confirmation (pleine page)
  await page.goto(`${APP}/payment-success?token=TEST123&email=amara.dossou%40gmail.com`, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  await page.evaluate(forceSlide);
  await page.waitForTimeout(400);
  await shot('09_confirmation.png', { fullPage: true });
}

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  const browser = await chromium.launch();

  // Mobile — iPhone 14 Pro
  const mPage = await browser.newPage();
  await mPage.setViewportSize({ width: 390, height: 844 });
  console.log('📱 Capture mobile...');
  await captureAll(mPage, DIRS.mobile);
  console.log('   ✅ Mobile OK');

  // Desktop — 1440 × 900
  const dPage = await browser.newPage();
  await dPage.setViewportSize({ width: 1440, height: 900 });
  console.log('🖥️  Capture desktop...');
  await captureAll(dPage, DIRS.desktop);
  console.log('   ✅ Desktop OK');

  await browser.close();
  console.log(`\n✅ Toutes les captures dans C:\\Users\\espoi\\Desktop\\screenshots\\`);
})();
