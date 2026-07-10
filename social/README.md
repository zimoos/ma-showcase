# Social Assets

This directory holds platform-ready assets built only from real MA evidence. The vertical short combines the actual `fs__write_file` recording with a Playwright-run interaction of the generated reaction-time game.

## Build

```bash
npm ci
npx playwright install chromium
node social/render-reaction-short.mjs
```

The result is `social/ma-agora-reaction-short.mp4`: 1080x1920, no audio, and suitable for YouTube Shorts or Douyin. It is not a benchmark claim: the original game generation took roughly two minutes before the first filesystem action.

## Posting Copy

### YouTube Shorts

**Title**: Can a Local Coding Agent Build a Game? I Made the Browser Judge It

**Description**:

> MA is a coding agent that works in a repository and proves the result. This is a real run, not a staged trailer: MA used a filesystem tool to create a reaction-time game, then a browser test clicked through to a measured result. Prompt, generated artifact, GIF, and verifier: https://github.com/zimoos/ma-showcase

### Douyin

**Caption**:

> 我让一个 AI 自己做了个小游戏，然后没相信它的“完成了”。我让浏览器去点，只有真的出现结果页才算过。MA 是个能在仓库里动手干活的 Coding Agent，提示词、生成物和验收脚本都开源：github.com/zimoos/ma-showcase

**Hashtags**: `#AI编程 #本地大模型 #开源项目 #CodingAgent`

### Zhihu

**Lead paragraph**:

> 本地 Coding Agent 最容易被误判的地方，是看起来已经“写完了”，却没有证据说明它真的完成了用户路径。这次我没有只看代码：先记录它的文件工具调用，再让浏览器实际点击生成的小游戏，只有进入结果态才算通过。

Every claim above is bounded by the recordings and verifier committed in this repository.
## MemoryPatch Release

## Current release

`memorypatch-proof-001` is the first serious MA-first release bundle. It uses a real local MemoryPatch lifecycle with two synthetic rules, two source ids, two patch versions, and a metadata-verified rollback. The bundle is deliberately explicit about its limits: it is not an unlimited-context claim or a broad model comparison.

```bash
npm run verify:memorypatch
npm run render:memorypatch
npm run publish:memorypatch:check
npm run publish:memorypatch:brief
```

The cover, two body images, vertical video, Zhihu article, Douyin caption, and YouTube copy all come from `releases/memorypatch-proof-001.json`.
