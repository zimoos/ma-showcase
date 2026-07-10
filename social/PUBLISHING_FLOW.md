# Five-Minute Publishing Flow

Use this flow only after the article copy, cover, body images, and short video are already prepared. The bundle is the single source of truth; do not rewrite claims in each platform editor.

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
