import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
  page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));
  
  await page.goto('http://localhost:5173/');
  await page.waitForTimeout(2000);
  
  const rootHtml = await page.evaluate(() => document.getElementById('root')?.innerHTML);
  console.log('ROOT HTML LENGTH:', rootHtml?.length);
  
  await browser.close();
})();
