import { access, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { spawnSync } from "node:child_process";

const [, , manifestArg, ...flags] = process.argv;
const usage = "Usage: node social/publish-flow.mjs <release.json> [--check] [--copy=zhihu-body|douyin-caption|youtube-title|youtube-description]";

if (!manifestArg) {
  throw new Error(usage);
}

const manifestPath = resolve(manifestArg);
const manifestDir = dirname(manifestPath);
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));

const required = [
  ["id", manifest.id],
  ["assets.cover", manifest.assets?.cover],
  ["assets.short_video", manifest.assets?.short_video],
  ["assets.body_images", manifest.assets?.body_images?.length],
  ["zhihu.title", manifest.platforms?.zhihu?.title],
  ["zhihu.body", manifest.platforms?.zhihu?.body],
  ["douyin.caption", manifest.platforms?.douyin?.caption],
  ["youtube.title", manifest.platforms?.youtube?.title],
  ["youtube.description", manifest.platforms?.youtube?.description],
];

const missing = required.filter(([, value]) => !value).map(([name]) => name);
if (missing.length > 0) {
  throw new Error(`Incomplete release bundle: ${missing.join(", ")}`);
}

const resolveAsset = (assetPath) => resolve(manifestDir, "..", "..", assetPath);
const assets = [manifest.assets.cover, ...manifest.assets.body_images, manifest.assets.short_video];

if (flags.includes("--check")) {
  for (const asset of assets) {
    const fullPath = resolveAsset(asset);
    await access(fullPath);
    const info = await stat(fullPath);
    if (info.size === 0) {
      throw new Error(`Empty asset: ${asset}`);
    }
    console.log(`[ok] ${asset} (${info.size} bytes)`);
  }

  const probe = spawnSync("ffprobe", [
    "-v", "error", "-show_entries", "stream=width,height:format=duration",
    "-of", "default=noprint_wrappers=1", resolveAsset(manifest.assets.short_video),
  ], { encoding: "utf8" });
  if (probe.status !== 0) {
    throw new Error(probe.stderr || "ffprobe failed for short_video");
  }
  const metadata = Object.fromEntries(probe.stdout.trim().split("\n").map((line) => line.split("=")));
  if (Number(metadata.width) >= Number(metadata.height) || Number(metadata.duration) <= 0) {
    throw new Error(`Short video must be a non-empty vertical video, got ${probe.stdout.trim()}`);
  }
  console.log(`[ok] short video metadata\n${probe.stdout.trim()}`);
  console.log(`[ready] ${manifest.id}: all platform assets and copy are present`);
  process.exit(0);
}

const copyFlag = flags.find((flag) => flag.startsWith("--copy="));
if (copyFlag) {
  const key = copyFlag.slice("--copy=".length);
  const copyable = {
    "zhihu-body": manifest.platforms.zhihu.body,
    "douyin-caption": manifest.platforms.douyin.caption,
    "youtube-title": manifest.platforms.youtube.title,
    "youtube-description": manifest.platforms.youtube.description,
  };
  if (!copyable[key]) {
    throw new Error(`Unsupported copy target: ${key}`);
  }
  const copied = spawnSync("pbcopy", [], { input: copyable[key], encoding: "utf8" });
  if (copied.status !== 0) {
    throw new Error(copied.stderr || "pbcopy failed");
  }
  console.log(`[copied] ${key}`);
  process.exit(0);
}

console.log(`${manifest.id}\n`);
console.log("Five-minute release order:");
console.log(`1. Zhihu: ${manifest.platforms.zhihu.title}`);
console.log(`   cover: ${manifest.assets.cover}`);
console.log(`   body images: ${manifest.assets.body_images.join(", ")}`);
console.log(`2. Douyin: ${manifest.assets.short_video}`);
console.log(`   ${manifest.platforms.douyin.caption}`);
console.log(`3. YouTube: ${manifest.platforms.youtube.title}`);
console.log(`   ${manifest.assets.short_video}`);
