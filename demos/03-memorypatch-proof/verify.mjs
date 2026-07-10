import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL("./EVIDENCE.json", import.meta.url), "utf8"));

assert.equal(evidence.source_kind, "synthetic_public_demo_only");
assert.equal(evidence.before.memory_status, "unmounted");
assert.equal(evidence.patch_1.context_tokens_used_by_patch, 0);
assert.equal(evidence.patch_2.context_tokens_used_by_patch, 0);
assert.equal(evidence.patch_2.previous_patch_id, evidence.patch_1.id);
assert.notEqual(evidence.patch_1.source_id, evidence.patch_2.source_id);
assert.deepEqual(evidence.rollback.active_memory_patch_ids, [evidence.patch_1.id]);
assert.match(evidence.recall_after_patch_1, /先给出可复现的验证证据/);
assert.match(evidence.rollback.recall, /先给出可复现的验证证据/);
assert.deepEqual(evidence.acceptance, {
  two_distinct_source_ids: true,
  patch_2_has_patch_1_as_parent: true,
  metadata_verified_mount: true,
  metadata_verified_rollback: true,
});

console.log("[verified] recorded MA + Agora MemoryPatch evidence is internally consistent");
