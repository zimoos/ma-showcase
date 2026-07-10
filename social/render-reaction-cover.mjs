import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const socialDir = fileURLToPath(new URL(".", import.meta.url));
const pageUrl = new URL("./reaction-time-cover.html", import.meta.url);
const output = `${socialDir}assets/reaction-time-cover.png`;

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(pageUrl.href);
  await page.screenshot({ path: output });
} finally {
  await browser.close();
}

console.log(`[verified] rendered ${output}`);
