#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
demo_dir="$repo_root/demos/01-terminal-status"
artifact_dir="$demo_dir/artifact"

: "${AGORA_ROOT:?Set AGORA_ROOT to an Agora checkout containing downloaded models.}"

export MA_AGORA_DATA_ROOT="$AGORA_ROOT"
export MA_AGORA_COMMAND="${MA_AGORA_COMMAND:-$AGORA_ROOT/.venv/bin/agora}"

rm -rf "$artifact_dir"

ma run --prompt "Use the filesystem write tool immediately. Create '$artifact_dir' and write '$artifact_dir/index.html' with exactly this single-line HTML: <main style='background:#171923;color:#f7d6ff;font-family:monospace;padding:48px'><h1>Agora Demo Ready</h1><p>provider: agora</p><p>model: qwen3.6-35b-a3b-q4</p><p>tools: fs, exec, web</p><p>status: verified</p></main>. Use no external assets, packages, or network calls. Verify '$artifact_dir/index.html' exists, then reply with exactly: artifact verified." \
  | tee "$demo_dir/transcript.txt"

test -s "$artifact_dir/index.html"
printf '\n[verified] generated %s\n' "$artifact_dir/index.html"
