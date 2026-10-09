import { chromium } from 'playwright-core';
import { resolve } from 'path';

const logoPath = resolve('logo-icon.svg').split('\\').join('/');
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({width: 512, height: 512});
await page.goto('file:///' + logoPath);
await page.screenshot({path: 'logo-icon.png', omitBackground: true});
await browser.close();
console.log('done: logo-icon.png');
