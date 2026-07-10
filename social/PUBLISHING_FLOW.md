# Five-Minute Publishing Flow

Use this flow only after the article copy, cover, body images, and short video are already prepared. The bundle is the single source of truth; do not rewrite claims in each platform editor.

## Public-message rule

The post leads with a user's task and a visible result: what MA was asked to do, what it actually produced, and how the result was verified. Explain MA once as a coding agent that works in a repository. Provider names, model names, internal runtimes, and implementation details belong in linked documentation only; they are never the hook, title, cover, first screen, or short-video voiceover.

Every release bundle must include `marketing.audience`, `title_hook`, `retention_proof`, `comment_prompt`, and `star_conversion`. The validator rejects a bundle without them.

## The Three Reasons Someone Acts

### 1. Why they stop

The title and cover must show a concrete task plus a credible conflict. MA's hook is not “supports a runtime”; it is “an AI said it was done, so a browser judged the real result.” Use a task anyone can inspect, such as making a game, fixing a broken interaction, or shipping a small app. Do not use provider, model, benchmark, or implementation nouns in the title.

### 2. Why they stay

Open with the task and a pass/fail rule in the first screen or first paragraph. Then show the evidence chain quickly: the agent touched the repository, the artifact exists, and the user path was exercised. Include one bounded limitation or failure when it matters. That makes the proof more credible than a polished product tour.

### 3. Why they comment

End with a precise invitation that is easy to answer: ask readers for their own failed task, broken prompt, or acceptance rule. Do not end with “what do you think?” The first reply should repeat the challenge and tell people what evidence to include. Reply to concrete examples with a reproducible test plan, not generic thanks.

### GitHub conversion

The GitHub link appears after the evidence, with a route to the exact prompt, artifact, and verifier. The call to action is “bring a real task and try to break MA,” not “please give us a Star.” A Star is the outcome of earned trust and a clear next step.

## 0. Validate before opening a publisher

```bash
cd /Users/zhuqingyu/dev/ma-showcase
npm run publish:check
npm run publish:brief
```

The check must pass before anything is uploaded. It proves all referenced assets exist, are non-empty, and the short video has readable metadata.

## 1. Zhihu: 2 minutes

1. Copy the body with `node social/publish-flow.mjs social/releases/<release>.json --copy=zhihu-body`.
2. Paste it into the article editor with the system clipboard.
3. Paste the listed body images through the system clipboard in manifest order. Zhihu turns pasted GIFs into a static key frame, so describe it honestly and point to the original GIF in the public repository.
4. Upload the declared cover, choose an accurate topic, and open computer preview.
5. Check title, cover, outbound links, and every image. Request publish confirmation only at the final `发布` action, then verify the public URL.

## 2. Douyin: 90 seconds

1. Upload `assets.short_video` as a video, not as a GIF.
2. Copy the caption with `--copy=douyin-caption`.
3. Confirm the vertical video preview, caption, and hashtags. Publish only after explicit final confirmation, then record the public URL.

## 3. YouTube Shorts: 90 seconds

1. Upload the same `assets.short_video`.
2. Copy the title with `--copy=youtube-title` and description with `--copy=youtube-description`.
3. Check the vertical preview, visibility, audience setting, title, and GitHub link. Publish only after explicit final confirmation, then record the public URL.

## 4. Completion proof

For every platform, retain the public URL plus a screenshot of the rendered post. Start tracking views, comments, saves/likes, follows, click-throughs, and GitHub Stars against the release id.

The target is five minutes from validated assets to a fully checked publishing screen. The final public action and any platform-specific declaration stay explicit because they are irreversible external actions.
