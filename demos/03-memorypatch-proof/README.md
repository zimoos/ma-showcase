# 03 Versioned MemoryPatch

This is a real local MA -> Agora MCP stdio run. It uses two **synthetic public project rules**; no personal chat, repository content, or private user data was used.

## What happened

1. The local Qwen session started unmounted.
2. MA internalized the first rule and Agora returned a mounted `MemoryPatch` id in chat response metadata.
3. A later request contained only the question and answer in the retained runtime window. The original rule was not re-sent in that window; the patch metadata recorded `context_tokens_used_by_patch: 0`.
4. A second rule produced a second patch with the first patch as its parent.
5. MA rolled the profile back to the first patch. The next response metadata reported that first patch as active and the first rule still answered correctly.

The recorded ids, evaluated patch sizes, source provenance, and the final window are in [EVIDENCE.json](EVIDENCE.json). `verify.mjs` checks the public evidence file has the claims above; it is not a substitute for rerunning the local model.

## What this proves

- MA can drive Agora's provider-scoped memory lifecycle through MCP stdio: internalize, mount verification, a new version, and rollback verification.
- The run produced separate, auditable source ids for the two intakes.
- This one patch recorded zero host-context tokens in its metadata and passed its own 3 target and 9 boundary checks.

## What it does not prove

- It is not an unlimited-context claim. The model context window remains finite.
- It is not a broad intelligence benchmark or evidence that a local model beats a cloud model.
- It is one synthetic-fact demonstration. Project-level usefulness still needs task-specific acceptance tests.

## Reproduce

Build MA first, then run the same synthetic-only lifecycle against a local Agora checkout:

```bash
cd /path/to/my-agent
npm run build

MA_ROOT="$PWD" AGORA_ROOT=/path/to/agora \
  node /path/to/ma-showcase/demos/03-memorypatch-proof/run.mjs
```

The script writes a new JSON record to stdout. It creates a timestamped local profile and MemoryPatch records; use a disposable `AGORA_DATA_ROOT` if you do not want the demo records in your normal local registry.
