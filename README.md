# MA Showcase

Real, reproducible demos made by [MA](https://github.com/zimoos/my-agent) with the Agora local runtime.

![MA and Agora create and verify a real artifact](recordings/01-terminal-status.gif)

Each demo keeps four things together:

1. The prompt and task boundary.
2. The command used to run MA with Agora.
3. The generated artifact and a direct verification step.
4. A terminal recording made from that same command.

This repository does not use synthetic agent output or staged completion claims. A demo is only listed after its artifact exists and the recorded command has completed.

## Demos

| Demo | What it proves | Artifact |
| --- | --- | --- |
| [01 Terminal Status](demos/01-terminal-status/) | MA + Agora can create and verify a standalone UI artifact through its filesystem tool. | `artifact/index.html` |
| [02 Reaction Time](demos/02-reaction-time/) | MA + Agora can build a browser interaction, then a real browser test reaches its result state. | `artifact/index.html` |

### 02 Reaction Time

![A real browser run of MA-generated Reaction Time](recordings/02-reaction-time.gif)

The artifact, browser recording, and verifier are committed together. The GIF shows a Playwright-run browser opening the generated game, waiting for its live "go" state, clicking the panel, and reaching the result screen.

## Run Locally

The examples require an MA installation and an Agora checkout containing a downloaded supported model.

```bash
AGORA_ROOT=/path/to/agora bash demos/01-terminal-status/run.sh

# For the browser interaction demo
AGORA_ROOT=/path/to/agora bash demos/02-reaction-time/run.sh
npm ci
npx playwright install chromium
npm run verify:reaction
```

The replay scripts exit successfully only after the generated file is present and non-empty. The reaction-time verifier also proves that the artifact reaches a result screen after a real click sequence.

## Status

This is an early showcase repository. Every recording is a real local run; model speed and output can vary by hardware and model version. The initial reaction-time run took roughly two minutes before its file-tool action; it is evidence of a working artifact, not a claim that every local machine will finish at that speed.
