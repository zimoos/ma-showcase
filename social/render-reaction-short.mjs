import { spawnSync } from "node:child_process";
import { mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const socialDir = fileURLToPath(new URL(".", import.meta.url));
const tempDir = `${socialDir}.tmp`;
const cardUrl = new URL("./reaction-short-card.html", import.meta.url);
const output = `${socialDir}ma-agora-reaction-short.mp4`;

await rm(tempDir, { recursive: true, force: true });
await mkdir(tempDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
  for (const scene of ["intro", "tool", "browser", "outro"]) {
    const sceneUrl = new URL(cardUrl);
    sceneUrl.searchParams.set("scene", scene);
    await page.goto(sceneUrl.href);
    await page.screenshot({ path: `${tempDir}/${scene}.png` });
  }
} finally {
  await browser.close();
}

const result = spawnSync("ffmpeg", [
  "-hide_banner", "-loglevel", "error", "-y",
  "-loop", "1", "-t", "1.8", "-i", `${tempDir}/intro.png`,
  "-loop", "1", "-t", "2.4", "-i", `${tempDir}/tool.png`,
  "-loop", "1", "-t", "1.2", "-i", `${tempDir}/browser.png`,
  "-i", `${socialDir}../recordings/02-reaction-time.gif`,
  "-loop", "1", "-t", "1.8", "-i", `${tempDir}/outro.png`,
  "-filter_complex",
  "[0:v]scale=1080:1920,setsar=1[v0];[1:v]scale=1080:1920,setsar=1[v1];[2:v]scale=1080:1920,setsar=1[v2];color=c=0x111827:s=1080x1920:d=4.41[bg];[3:v]scale=1000:-2[fg];[bg][fg]overlay=(W-w)/2:(H-h)/2,setsar=1[v3];[4:v]scale=1080:1920,setsar=1[v4];[v0][v1][v2][v3][v4]concat=n=5:v=1:a=0,format=yuv420p[out]",
  "-map", "[out]", "-r", "30", "-movflags", "+faststart", output,
], { encoding: "utf8" });

if (result.status !== 0) {
  throw new Error(result.stderr || "ffmpeg failed to render the short");
}

console.log(`[verified] rendered ${output}`);
