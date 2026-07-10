import { chromium } from "playwright";

const artifactUrl = new URL("./artifact/index.html", import.meta.url).href;
const browser = await chromium.launch({ headless: true });

try {
  const page = await browser.newPage({ viewport: { width: 900, height: 700 } });
  await page.goto(artifactUrl);
  await page.getByRole("button", { name: "Start" }).click();
  await page.waitForFunction(
    () => document.getElementById("game-panel")?.classList.contains("go"),
    undefined,
    { timeout: 7_000 },
  );
  await page.locator("#game-panel").click();
  await page.getByRole("button", { name: "Play Again" }).waitFor({ timeout: 2_000 });

  const result = (await page.locator(".score-display").textContent())?.trim() ?? "";
  if (!/^\d+ ms$/.test(result)) {
    throw new Error(`Expected a millisecond result, received: ${result || "<empty>"}`);
  }

  console.log(`[verified] reaction game reached result state: ${result}`);
} finally {
  await browser.close();
}
