import { spawnSync } from "node:child_process";
import { copyFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const socialDir = fileURLToPath(new URL(".", import.meta.url));
const assetsDir = `${socialDir}assets`;
const tempDir = `${socialDir}.tmp-memorypatch`;
const coverUrl = new URL("./memorypatch-proof-cover.html", import.meta.url);
const shortUrl = new URL("./memorypatch-proof-short.html", import.meta.url);

await rm(tempDir, { recursive: true, force: true });
await mkdir(tempDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const wide = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await wide.goto(coverUrl.href);
  await wide.screenshot({ path: `${assetsDir}/memorypatch-proof-cover.png` });

  const vertical = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  for (const scene of ["intro", "mount", "rollback", "outro"]) {
    const url = new URL(shortUrl);
    url.searchParams.set("scene", scene);
    await vertical.goto(url.href);
    await vertical.screenshot({ path: `${tempDir}/${scene}.png` });
  }
} finally {
  await browser.close();
}

const bodyImages = ["mount", "rollback"];
for (const scene of bodyImages) {
  await copyFile(`${tempDir}/${scene}.png`, `${assetsDir}/memorypatch-proof-${scene}.png`);
}

const output = `${socialDir}ma-memorypatch-proof-short.mp4`;
const result = spawnSync("ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-y",
  "-loop", "1", "-t", "2.2", "-i", `${tempDir}/intro.png`,
  "-loop", "1", "-t", "2.7", "-i", `${tempDir}/mount.png`,
  "-loop", "1", "-t", "2.7", "-i", `${tempDir}/rollback.png`,
  "-loop", "1", "-t", "2.2", "-i", `${tempDir}/outro.png`,
  "-filter_complex",
  "[0:v]scale=1080:1920,setsar=1[v0];[1:v]scale=1080:1920,setsar=1[v1];[2:v]scale=1080:1920,setsar=1[v2];[3:v]scale=1080:1920,setsar=1[v3];[v0][v1][v2][v3]concat=n=4:v=1:a=0,format=yuv420p[out]",
  "-map", "[out]", "-r", "30", "-movflags", "+faststart", output,
], { encoding: "utf8" });

if (result.status !== 0) throw new Error(result.stderr || "ffmpeg failed to render the MemoryPatch short");
console.log(`[verified] rendered MemoryPatch assets and ${output}`);
