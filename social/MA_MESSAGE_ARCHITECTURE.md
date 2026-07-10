# MA Message Architecture

MA is the product. Agora is an optional local memory runtime behind selected MA workflows, never the public hook.

## The Core Idea

Most local coding models feel like a new hire on every task: they do not know the repository, repeat the same mistakes, and cannot prove a result works. MA's long-term promise is different:

> Your local model should not restart its first day at work every morning. It should become a private skilled worker for the way your project is actually built and checked.

This is not a claim that a small local model is universally smarter than a frontier cloud model. It is a claim about accumulated project-specific practice, local control, and verification.

## What We Can Say Today

- MA works with local and cloud model providers, including a local Agora runtime over MCP stdio.
- MA creates artifacts in a repository, runs tests, and keeps the tool evidence instead of treating a model's prose as proof.
- A real local Qwen 3.6 35B Agora run passed the L3 medium delivery task: code change, PRD, technical architecture, existing tests, and an independent judge. The final rerun completed in about two minutes.
- MA refuses to report completion when requested browser evidence is missing.
- MA cleans up its provider-owned local model process when a non-interactive run is terminated.
- A real local MA -> Agora MCP run internalized two synthetic project rules into two distinct MemoryPatch versions, verified both mounts through response metadata, and rolled back to the first patch. The patch records for this run each report zero host-context tokens. The full, bounded evidence is in [03 Versioned MemoryPatch](../demos/03-memorypatch-proof/).

## What We Must Not Say Yet

- Do not say "unlimited context." The active model context is still finite. MemoryPatch is a separate, explicit, provider-scoped mechanism that must be mounted and verified from response metadata.
- Do not say the local model beats cloud models in general. The extreme open-world browser task did not pass within the 15-minute evaluation budget.
- Do not use a tiny reaction game as the main proof of coding-agent capability.
- Do not imply that the synthetic MemoryPatch proof proves general project understanding. It proves a versioned, metadata-verified memory lifecycle for two synthetic facts.

## Who Will Care

| Audience | Existing pain | MA message | Evidence they need |
| --- | --- | --- | --- |
| Mac-based local-model developer | Cloud cost, privacy, and a local model that forgets the repository | "Give the model a real task. Make it leave evidence." | Prompt, repository diff, test output, browser result |
| Solo builder | AI produces attractive code that fails on first use | "A coding agent is not done when it explains. It is done when the product survives its acceptance check." | Before/after defect, real interaction, a failure repaired |
| Small engineering team | Standards disappear across sessions and handoffs | "Turn project-specific habits into explicit, versioned memory only when the runtime proves it is mounted." | Profile id, patch id, response metadata, rollback proof |

## The Product Promise Users Actually Want

The hook is not that a model has a larger context number. The hook is that a local agent stops paying the same onboarding cost on every task.

| Situation | Pain today | MA promise | Guardrail |
| --- | --- | --- | --- |
| A solo developer opens an old repo | The model re-learns naming, test expectations, and release checks every time | Preserve approved, project-specific working rules as an explicit local asset | The rule must be sourceable, versioned, and reversible |
| A privacy-sensitive team uses local inference | Sending source code and conventions to another service is unacceptable or expensive | Keep inference and verified experience on the controlled machine where the team chooses to run it | Do not claim every tool or integration is offline by default |
| A smaller local model handles a repeatable workflow | It is weaker at broad novelty but repeatedly makes the same avoidable mistake | Make the workflow-specific constraint easier to recall and verify | Never market this as a universal frontier-model replacement |

The public sentence is:

> Context still has a window. A verified working habit does not have to be re-explained in every prompt.

## Content Ladder

### 1. Stop: a familiar loss

Headline pattern: a concrete outcome plus a tension.

- "本地 AI 每次开新会话，都像第一天入职"
- "AI 说游戏做好了，我只问它：浏览器同意吗？"
- "别再让本地模型每天重新认识你的代码库"

Do not lead with MCP, a model name, context windows, or a feature checklist.

### 2. Stay: show the proof chain

The first screen must show a task, then the physical result:

1. The user prompt.
2. The agent touches the real repository.
3. The test or browser exercises the promised behavior.
4. The agent repairs a failure, or the post says the task did not pass.

The medium note-search delivery is a valid proof of disciplined local delivery. The failed open-world run is useful as a transparent engineering diary, not a conversion hero.

### 3. Comment: make the reader supply the next test

Use one precise invitation:

> 你的本地模型最常在第几步失忆：读代码、改代码、跑测试，还是交付？把失败提示词贴出来，我用同一套验收规则跑。

The first reply should ask for the repository boundary and the acceptance rule, not say thanks.

### 4. Convert: invite a challenge, not pity

Link to GitHub after the evidence:

> 带一个你不相信 AI 能交付的真实任务来试。MA 的目标不是替你写一段漂亮回答，而是留下可以复查的结果。

## The Memory Story

The visual is not a dashboard mockup. It is a three-step real run:

1. A local model starts unmounted and receives an approved, synthetic project rule.
2. MA shows the explicit mounted profile and MemoryPatch id returned by `chat_complete` response metadata, then the latest retained runtime window contains only the recall question and answer.
3. A second patch is created from a distinct source, then MA rolls the profile back to the first patch and metadata proves the switch.

The public line is:

> Context still has a window. Experience does not have to live inside it.

The [public evidence bundle](../demos/03-memorypatch-proof/) contains the source boundary, patch ids, zero-host-context metadata, mount state, parent version, and rollback state. It must keep the synthetic-fact limitation beside the proof.

## First Serious Post

Title:

> 本地 AI 每次开新会话，都像第一天入职

Opening:

> 我不相信“无限上下文”这类宣传。我更在意一件很具体的事：本地模型能不能把我批准过的一条项目规则，变成可验证、可回退的经验，而不是下一轮又塞回提示词。我用 MA 跑了一次真实本地内化：未挂载 -> 生成 patch -> 回答规则 -> 生成第二个版本 -> 回滚到第一个版本。每一步都有 runtime metadata，而不是模型自己说记住了。

Required media before publishing:

1. The medium-task prompt and independent-pass report.
2. A screenshot of the generated PRD, architecture document, source diff, and passing test.
3. A short failure/recovery clip from a real task, not a toy game.
4. The completed MemoryPatch mount-and-rollback proof, with the synthetic-source and non-generalization limits visible.
