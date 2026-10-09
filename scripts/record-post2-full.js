/**
 * POST 2 — Simulation complète utilisateur (une seule prise)
 * Parcours: voyage.benin.bj → alertesvolsbenin.com → inscription → Stripe
 * Viewport: 393x852 (iPhone 15, mobile) → ffmpeg scale 1080x1920
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.resolve(__dirname, '../contenus/semaine-1/video-clips');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const wait = ms => new Promise(r => setTimeout(r, ms));

async function smoothScroll(page, totalPx, durationMs = 2000) {
  const steps = Math.round(durationMs / 16);
  const stepPx = totalPx / steps;
  for (let i = 0; i < steps; i++) {
    await page.evaluate(s => window.scrollBy(0, s), stepPx);
    await wait(16);
  }
}

async function typeRealistic(locator, text, wpm = 180) {
  const msPerChar = Math.round(60000 / (wpm * 5));
  await locator.click();
  for (const ch of text) {
    await locator.type(ch, { delay: msPerChar + Math.random() * 30 });
  }
}

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ['--disable-blink-features=AutomationControlled']
  });

  const context = await browser.newContext({
    viewport:      { width: 393, height: 852 },
    deviceScaleFactor: 2,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    recordVideo: {
      dir: OUT_DIR,
      size: { width: 393, height: 852 }
    }
  });

  const page = await context.newPage();

  // ─── SCÈNE 1 : voyage.benin.bj ──────────────────────────────────────────
  // "Je cherche un vol Paris-Cotonou — le site officiel dit : bientôt disponible"
  console.log('🎬 Scène 1 — voyage.benin.bj');
  await page.goto('https://voyage.benin.bj', { waitUntil: 'load', timeout: 30000 });
  await wait(3500);                                      // lire le titre
  await smoothScroll(page, 300, 2000);                  // scroller doucement
  await wait(3000);                                      // lire "bientôt disponible"
  await smoothScroll(page, 200, 1500);
  await wait(2500);                                      // pause — le constat est fait

  // ─── SCÈNE 2 : alertesvolsbenin.com landing ─────────────────────────────
  // "J'ai trouvé le site d'alerte. Le service est simple."
  console.log('🎬 Scène 2 — landing alertesvolsbenin.com');
  await page.goto('https://alertesvolsbenin.com', { waitUntil: 'load', timeout: 30000 });
  await wait(3500);                                      // voir le timer et le badge
  await smoothScroll(page, 450, 2500);                  // descendre vers le pitch
  await wait(2500);
  await smoothScroll(page, 350, 2000);                  // descendre vers le CTA
  await wait(2500);
  await smoothScroll(page, 250, 1800);
  await wait(2000);

  // ─── SCÈNE 3 : /inscription ─────────────────────────────────────────────
  // "Je m'inscris. Le formulaire est court."
  console.log('🎬 Scène 3 — inscription');
  await page.goto('https://alertesvolsbenin.com/inscription', { waitUntil: 'load', timeout: 30000 });
  await wait(3000);
  await smoothScroll(page, 250, 1500);
  await wait(1500);

  // Remplir le formulaire — Prénom
  try {
    const prenom = page.locator('input[placeholder="Jean"]').first();
    await prenom.scrollIntoViewIfNeeded();
    await wait(600);
    await typeRealistic(prenom, 'Kolade', 150);
    await wait(400);

    // Nom
    const nom = page.locator('input[placeholder="Dupont"]').first();
    await typeRealistic(nom, 'Adeyemi', 150);
    await wait(400);

    // Email
    const email = page.locator('input[type="email"]').first();
    await typeRealistic(email, 'kolade.adeyemi@gmail.com', 200);
    await wait(500);

    // Téléphone
    const tel = page.locator('input[type="tel"]').first();
    await typeRealistic(tel, '+33 6 78 90 12 34', 150);
    await wait(800);

    // Scroll pour voir le bouton payer
    await smoothScroll(page, 200, 1200);
    await wait(1000);

    // Bouton Payer — #continueBtnMobile sur viewport mobile
    const payBtn = page.locator('#continueBtnMobile, #continueBtn').first();
    await payBtn.scrollIntoViewIfNeeded();
    await wait(1200);                                    // pause avant de cliquer
    await payBtn.hover();
    await wait(600);
    await payBtn.click();
    console.log('  → Bouton payer cliqué');
  } catch (e) {
    console.log('  ⚠ Formulaire:', e.message);
    await smoothScroll(page, 300, 1500);
    await wait(2000);
  }

  // ─── SCÈNE 4 : Stripe checkout ──────────────────────────────────────────
  // "Le paiement sécurisé Stripe. 5,99€. Une fois. C'est tout."
  console.log('🎬 Scène 4 — Stripe checkout');
  await wait(4000);                                      // attendre chargement Stripe
  await smoothScroll(page, 200, 1500);
  await wait(3000);                                      // lire le montant 5,99€
  await smoothScroll(page, 150, 1200);
  await wait(2500);                                      // montrer le cadenas / sécurité

  // fin — cadrer sur le checkout
  await wait(2000);

  await context.close();
  await browser.close();
  console.log('\n✅ Enregistrement terminé');

  // Renommer le fichier WebM généré
  await wait(1000);
  const files = fs.readdirSync(OUT_DIR)
    .filter(f => f.endsWith('.webm'))
    .sort((a, b) =>
      fs.statSync(path.join(OUT_DIR, b)).mtimeMs -
      fs.statSync(path.join(OUT_DIR, a)).mtimeMs
    );
  if (files[0]) {
    const src = path.join(OUT_DIR, files[0]);
    const dst = path.join(OUT_DIR, 'raw-full-take.webm');
    if (fs.existsSync(dst)) fs.unlinkSync(dst);
    fs.renameSync(src, dst);
    console.log('📹 Brut sauvegardé → video-clips/raw-full-take.webm');
    console.log('➡  Lance: node scripts/edit-post2.js');
  }
})();
