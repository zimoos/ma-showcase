# Social Assets

This directory holds platform-ready assets built only from real MA + Agora evidence. The vertical short combines the actual `fs__write_file` recording with a Playwright-run interaction of the generated reaction-time game.

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

> This is a real local MA + Agora run, not a staged trailer. The agent used a filesystem tool to create a reaction-time game, then a browser test clicked through to a measured result. Prompt, generated artifact, GIF, and verifier: https://github.com/zimoos/ma-showcase

### Douyin

**Caption**:

> 我给本地 Coding Agent 出了一道题：做一个能玩的小游戏，然后让浏览器当裁判。它调用文件工具写出页面，浏览器真实点击后进入结果态。提示词、生成物和验收脚本全部开源：github.com/zimoos/ma-showcase

**Hashtags**: `#AI编程 #本地大模型 #开源项目 #CodingAgent`

### Zhihu

**Lead paragraph**:

> 本地 Coding Agent 最容易被误判的地方，是看起来已经“写完了”，却没有证据说明它真的完成了用户路径。这次我没有只看代码：先记录它的文件工具调用，再让浏览器实际点击生成的小游戏，只有进入结果态才算通过。

Every claim above is bounded by the recordings and verifier committed in this repository.
