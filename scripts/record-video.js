// Enregistre video-promo.html en MP4 via Playwright + ffmpeg
// Usage : node record-video.js
const { chromium } = require('playwright');
const { execSync } = require('child_process');
const path = require('path');
const fs   = require('fs');

(async () => {
  const htmlPath = path.resolve(__dirname, 'video-promo.html');
  const fileUrl  = 'file:///' + htmlPath.replace(/\\/g, '/');
  const tmpDir   = __dirname;

  console.log('Lancement du navigateur…');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport:    { width: 360, height: 640 },
    recordVideo: { dir: tmpDir, size: { width: 360, height: 640 } }
  });

  const page = await context.newPage();
  await page.goto(fileUrl);

  // Lancer la lecture EN PREMIER (avant de masquer les contrôles)
  await page.click('#playbtn');

  // Masquer les contrôles et rendre le widget plein écran
  await page.addStyleTag({ content: `
    body   { padding:0 !important; justify-content:flex-start !important;
             background:#000 !important; overflow:hidden !important; }
    .controls { display:none !important; }
    .vc    { border-radius:0 !important; border:none !important; width:360px !important; height:640px !important; }
  ` });
  console.log('Enregistrement en cours (62 s)…');
  await page.waitForTimeout(62000);

  await context.close();
  await browser.close();

  // Retrouver le dernier .webm créé
  const webmFiles = fs.readdirSync(tmpDir)
    .filter(f => f.endsWith('.webm'))
    .map(f => ({ f, t: fs.statSync(path.join(tmpDir, f)).mtimeMs }))
    .sort((a, b) => b.t - a.t);

  if (!webmFiles.length) { console.error('Aucun fichier .webm trouvé.'); process.exit(1); }

  const webmPath = path.join(tmpDir, webmFiles[0].f);
  const mp4Path  = path.join(tmpDir, 'video-promo.mp4');

  console.log('Conversion en MP4 (1080×1920, Instagram Stories/Reels)…');
  // 360×640 → 1080×1920 = ×3 exact (ratio 9:16)
  execSync(
    `ffmpeg -y -i "${webmPath}" -vf "scale=1080:1920" -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -movflags +faststart "${mp4Path}"`,
    { stdio: 'inherit' }
  );

  fs.unlinkSync(webmPath);
  console.log('\n✅ Fichier créé : video-promo.mp4');
})();
