const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, '../contenus/semaine-1/post1-arnaque-slides.html');
  await page.goto('file:///' + filePath.replace(/\\/g, '/'));

  // Wait for Montserrat font to load
  await page.waitForTimeout(2000);

  for (let i = 1; i <= 7; i++) {
    const el = page.locator(`#slide-${i}`);
    const outPath = path.resolve(__dirname, `../contenus/semaine-1/post1-slide-${i}.png`);
    await el.screenshot({ path: outPath, type: 'png' });
    console.log(`slide ${i} -> post1-slide-${i}.png`);
  }

  await browser.close();
  console.log('Done. 7 slides saved in contenus/semaine-1/');
})();
