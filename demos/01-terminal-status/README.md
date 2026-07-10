# 01 Terminal Status

This is the first verified MA + Agora showcase run.

![Terminal recording](../../recordings/01-terminal-status.gif)

## Evidence

- [Prompt](PROMPT.md)
- [Generated HTML artifact](artifact/index.html)
- [Recorded terminal run](../../recordings/01-terminal-status.gif)
- [Replay script](run.sh)

The recording shows MA calling `fs__write_file`, reading the result back, returning `artifact verified`, and a shell assertion confirming the file exists.

## Replay

```bash
AGORA_ROOT=/path/to/agora bash demos/01-terminal-status/run.sh
```

The script fails when the generated artifact is missing or empty.
