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

## Run Locally

The examples require an MA installation and an Agora checkout containing a downloaded supported model.

```bash
AGORA_ROOT=/path/to/agora bash demos/01-terminal-status/run.sh
```

The script exits successfully only after the generated file is present and non-empty.

## Status

This is an early showcase repository. Every recording is a real local run; model speed and output can vary by hardware and model version.
