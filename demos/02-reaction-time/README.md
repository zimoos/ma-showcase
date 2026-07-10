# 02 Reaction Time

This demo is a browser game generated in a real MA + Agora session.

![Browser recording](../../recordings/02-reaction-time.gif)

## Evidence

- [Prompt](PROMPT.md)
- [Generated HTML artifact](artifact/index.html)
- [Recorded browser run](../../recordings/02-reaction-time.gif)
- [Replay script](run.sh)
- [Browser verifier](verify.mjs)

The recording and verifier both execute the generated page: start a round, wait until the panel enters its live `go` state, click it, then require a millisecond result and `Play Again` button. The initial local generation needed about two minutes before MA called the filesystem tool. That duration is recorded as a constraint, not marketed as a speed claim.

## Replay

```bash
AGORA_ROOT=/path/to/agora bash demos/02-reaction-time/run.sh
npm ci
npx playwright install chromium
npm run verify:reaction
```

The model is responsible for producing the artifact. The browser verifier does not fabricate a pass: it fails unless the generated page completes the interaction.
