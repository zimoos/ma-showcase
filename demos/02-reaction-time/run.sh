#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
demo_dir="$repo_root/demos/02-reaction-time"
artifact_dir="$demo_dir/artifact"

: "${AGORA_ROOT:?Set AGORA_ROOT to an Agora checkout containing downloaded models.}"

export MA_AGORA_DATA_ROOT="$AGORA_ROOT"
export MA_AGORA_COMMAND="${MA_AGORA_COMMAND:-$AGORA_ROOT/.venv/bin/agora}"

rm -rf "$artifact_dir"
mkdir -p "$artifact_dir"

ma run --prompt "Use the filesystem write tool immediately. Create '$artifact_dir/index.html' as one self-contained reaction-time game with no external assets, packages, or network calls. It must include a Start button, wait for a random interval, turn the game panel green, and show a measured millisecond result plus a Play Again button when the green panel is clicked. Verify '$artifact_dir/index.html' exists before replying." \
  | tee "$demo_dir/transcript.txt"

test -s "$artifact_dir/index.html"
printf '\n[verified] generated %s\n' "$artifact_dir/index.html"
