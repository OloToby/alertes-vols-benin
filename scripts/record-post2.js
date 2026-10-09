const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const CLIPS_DIR = path.resolve(__dirname, '../contenus/semaine-1/video-clips');
if (!fs.existsSync(CLIPS_DIR)) fs.mkdirSync(CLIPS_DIR, { recursive: true });

async function smooth_scroll(page, totalPx, steps = 20, delayMs = 60) {
  const stepSize = totalPx / steps;
  for (let i = 0; i < steps; i++) {
    await page.evaluate((s) => window.scrollBy({ top: s, behavior: 'instant' }), stepSize);
    await page.waitForTimeout(delayMs);
  }
}

async function recordClip(clipName, fn) {
  console.log(`\n▶  Recording: ${clipName}...`);
  const browser = await chromium.launch({ headless: false, slowMo: 80 });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    recordVideo: { dir: CLIPS_DIR, size: { width: 1280, height: 720 } }
  });
  const page = await context.newPage();
  try {
    await fn(page);
    await page.waitForTimeout(500);
  } catch (e) {
    console.error(`  Error in ${clipName}:`, e.message);
  }
  await context.close(); // flushes video to disk
  await browser.close();

  // rename the latest .webm to the clip name
  await new Promise(r => setTimeout(r, 800));
  const files = fs.readdirSync(CLIPS_DIR)
    .filter(f => f.endsWith('.webm') && !f.startsWith('clip'))
    .sort((a, b) => fs.statSync(path.join(CLIPS_DIR, b)).mtimeMs - fs.statSync(path.join(CLIPS_DIR, a)).mtimeMs);
  if (files[0]) {
    const src = path.join(CLIPS_DIR, files[0]);
    const dst = path.join(CLIPS_DIR, `${clipName}.webm`);
    fs.renameSync(src, dst);
    console.log(`  Saved -> ${clipName}.webm`);
  }
}

(async () => {
  // ─── CLIP 1 — voyage.benin.bj ────────────────────────────────────────────
  // "C'est le site officiel du gouvernement du Bénin. Les vols sont pas encore ouverts."
  await recordClip('clip1-voyage-benin', async (page) => {
    await page.goto('https://voyage.benin.bj', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);                  // observer le titre/header
    await smooth_scroll(page, 500, 15, 80);           // scroll vers le contenu
    await page.waitForTimeout(2500);
    await smooth_scroll(page, 600, 20, 70);           // continuer à descendre
    await page.waitForTimeout(3000);                  // laisser voir la section vols
    await smooth_scroll(page, -1100, 15, 60);         // remonter en haut
    await page.waitForTimeout(1500);
  });

  // ─── CLIP 2 — alertesvolsbenin.com landing ───────────────────────────────
  // "Tu paies 5,99€ via Stripe. Dès que les vols s'ouvrent, tu reçois un email et un SMS."
  await recordClip('clip2-alertes-landing', async (page) => {
    await page.goto('https://alertesvolsbenin.com', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3000);
    await smooth_scroll(page, 400, 12, 80);
    await page.waitForTimeout(2000);
    await smooth_scroll(page, 500, 15, 70);
    await page.waitForTimeout(2500);
    await smooth_scroll(page, 400, 12, 70);
    await page.waitForTimeout(2000);
  });

  // ─── CLIP 3 — alertesvolsbenin.com inscription (Stripe) ──────────────────
  await recordClip('clip3-inscription', async (page) => {
    await page.goto('https://alertesvolsbenin.com/inscription', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(3500);                  // montrer le formulaire
    await smooth_scroll(page, 300, 10, 80);
    await page.waitForTimeout(2500);
    // simuler le survol du bouton payer
    try {
      const btn = page.locator('button, [type="submit"], .pay-btn, .stripe-btn').first();
      await btn.hover({ timeout: 3000 });
    } catch {}
    await page.waitForTimeout(3000);
  });

  // ─── CLIP 4 — CGV / remboursement 18 mois ───────────────────────────────
  await recordClip('clip4-cgv', async (page) => {
    await page.goto('https://alertesvolsbenin.com/legal', { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(2500);
    await smooth_scroll(page, 600, 18, 70);
    await page.waitForTimeout(2000);
    await smooth_scroll(page, 500, 15, 70);
    await page.waitForTimeout(3000);
  });

  console.log('\n✅ Tous les clips enregistrés dans contenus/semaine-1/video-clips/');
  console.log('➡  Lance maintenant: node scripts/montage-post2.js');
})();
