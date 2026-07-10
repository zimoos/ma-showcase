import { pathToFileURL } from "node:url";
import { resolve, join } from "node:path";

const maRoot = process.env.MA_ROOT ? resolve(process.env.MA_ROOT) : "";
const agoraRoot = process.env.AGORA_ROOT ? resolve(process.env.AGORA_ROOT) : "";

if (!maRoot || !agoraRoot) {
  throw new Error("Set MA_ROOT to a built my-agent checkout and AGORA_ROOT to an Agora checkout.");
}

const { AgoraProviderRuntime } = await import(pathToFileURL(join(maRoot, "dist/src/provider/agora.js")).href);
const runId = `showcase-memoryproof-${Date.now()}`;
const profileId = `ma-showcase-${runId}`;
const firstFact = "Aurora演示项目的发布原则是先给出可复现的验证证据，再给出宣传结论。";
const secondFact = "Aurora演示项目的验收方式是由独立检查器确认结果，再发布。";

const runtime = new AgoraProviderRuntime(
  {
    provider: "agora",
    baseURL: "mcp-stdio://agora",
    apiKey: "agora-mcp",
    model: "qwen3.6-35b-a3b-q4",
    maxTokens: 64,
    temperature: 0.1,
    agoraRuntime: {
      command: process.env.AGORA_COMMAND || join(agoraRoot, ".venv/bin/agora"),
      args: ["mcp", "serve"],
      dataRoot: process.env.AGORA_DATA_ROOT || join(process.env.HOME, ".my-agent/agora"),
      cwd: agoraRoot,
    },
    agoraMemory: {
      userId: "ma-showcase",
      projectId: "ma-showcase",
      conversationId: runId,
    },
  },
  { requestTimeoutMs: 180_000, streamIdleTimeoutMs: 180_000, maxRetries: 0 },
  { sessionId: runId, cwd: process.cwd() },
);

const chat = (content) => runtime.createChatCompletion({
  model: "qwen3.6-35b-a3b-q4",
  messages: [{ role: "user", content }],
  stream: false,
  max_tokens: 64,
});

try {
  await runtime.ready();
  const memory = runtime.getMemoryController();
  if (!memory) throw new Error("Agora MCP did not expose the required memory lifecycle tools.");

  await chat(firstFact);
  const first = JSON.parse((await memory.internalize({ profile_id: profileId })).content);
  const firstPatchId = first.output_memory_patch_id;
  if (typeof firstPatchId !== "string") throw new Error("First internalization did not produce a patch.");
  const firstRecall = await chat("Aurora演示项目的发布原则是什么？只回答原则。");

  await chat(secondFact);
  const second = JSON.parse((await memory.internalize({ profile_id: profileId })).content);
  const secondPatchId = second.output_memory_patch_id;
  if (typeof secondPatchId !== "string") throw new Error("Second internalization did not produce a patch.");
  const rollback = JSON.parse((await memory.rollback({ profile_id: profileId, patch_id: firstPatchId })).content);
  const rollbackRecall = await chat("Aurora演示项目的发布原则是什么？只回答原则。");

  console.log(JSON.stringify({
    run_id: runId,
    source_kind: "synthetic_public_demo_only",
    first_patch_id: firstPatchId,
    second_patch_id: secondPatchId,
    first_source_id: first.source_id,
    second_source_id: second.source_id,
    first_recall: firstRecall.choices[0]?.message?.content ?? "",
    rollback,
    rollback_recall: rollbackRecall.choices[0]?.message?.content ?? "",
    final_provider_state: runtime.getProviderState(),
  }, null, 2));
} finally {
  await runtime.close();
}
