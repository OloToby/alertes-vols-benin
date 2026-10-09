const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const filePath = path.resolve(__dirname, '../contenus/semaine-1/post3-diaspora-slides.html');
  await page.goto('file:///' + filePath.replace(/\\/g, '/'));
  await page.waitForTimeout(2000);

  for (let i = 1; i <= 8; i++) {
    const el = page.locator(`#slide-${i}`);
    const outPath = path.resolve(__dirname, `../contenus/semaine-1/post3-slide-${i}.png`);
    await el.screenshot({ path: outPath, type: 'png' });
    console.log(`slide ${i} -> post3-slide-${i}.png`);
  }

  await browser.close();
  console.log('Done. 8 slides saved in contenus/semaine-1/');
})();
