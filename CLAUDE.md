# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

<!-- OPENSPEC:START -->
# OpenSpec Instructions

These instructions are for AI assistants working in this project.

Always open `@/openspec/AGENTS.md` when the request:
- Mentions planning or proposals (words like proposal, spec, change, plan)
- Introduces new capabilities, breaking changes, architecture shifts, or big performance/security work
- Sounds ambiguous and you need the authoritative spec before coding

Use `@/openspec/AGENTS.md` to learn:
- How to create and apply change proposals
- Spec format and conventions
- Project structure and guidelines

Keep this managed block so 'openspec update' can refresh the instructions.

<!-- OPENSPEC:END -->

# Working in This Repo

This is the source for a course that builds a terminal AI agent from scratch (TypeScript + Vercel AI SDK + Ink). The `done` branch holds the complete app; `main` and the `NN-lesson` branches are progressively stripped-down versions (see Course Development Workflow below). Because of this, **what exists on disk varies by branch** — some files (e.g. `src/agent/run.ts`, `evals/executors.ts`) may contain teaching scaffolding such as top-level invocation/`console.log` calls rather than finished module exports. Read the actual file before assuming behavior.

## Commands

```bash
# Run the agent (interactive Ink TUI)
npm run dev        # tsx watch, auto-restart, loads .env
npm start          # run once via tsx

# Build & global install
npm run build      # tsc -p tsconfig.build.json -> dist/
npm install -g .   # exposes the `agi` CLI (bin -> dist/cli.js)

# Evals (LMNR / Laminar — this project's "tests")
npm run eval               # run all evals (npx lmnr eval)
npm run eval:file-tools    # single eval file
npm run eval:shell-tools
npm run eval:agent
npx lmnr eval evals/<name>.eval.ts   # run any one eval file directly

# Lint / format (Biome — tabs, double quotes; no npm script)
npx biome check .
npx biome format --write .
```

There is no unit-test runner; correctness is validated through the LMNR evals. Both running and evals require `.env` with `OPENAI_API_KEY` and `LMNR_PROJECT_API_KEY`.

## Conventions

- **ESM only**, and `moduleResolution: bundler` with `allowImportingTsExtensions` — relative imports include the explicit extension (`./system/prompt.ts`, `./ui/index.tsx`). Match this when adding imports.
- TypeScript strict mode; `tsconfig.json` is `noEmit` (for tsx/typecheck), `tsconfig.build.json` is what actually emits `dist/`.
- Model is `gpt-5-mini` via `@ai-sdk/openai`, referenced as a string literal in `run.ts` and `evals/executors.ts`.

## Architecture

Two thin entry points — `src/index.ts` (dev) and `src/cli.ts` (shebang, packaged as the `agi` bin) — both just `render(<App />)`. All real logic is in `src/agent/` and `src/ui/`.

**UI (`src/ui/`)** — Ink (React in the terminal). `App.tsx` owns all state (messages, conversation history, streaming text, active tool calls, pending approval, token usage) and is the only place that calls the agent. It wires `runAgent` to a set of callbacks defined as `AgentCallbacks` in `src/types.ts`: `onToken`, `onToolCallStart`/`onToolCallEnd`, `onComplete`, `onToolApproval` (HITL — returns `Promise<boolean>` the UI resolves when the user accepts/rejects), and `onTokenUsage`. Components live in `src/ui/components/` (MessageList, ToolCall, ToolApproval, TokenUsage, Input, Spinner).

**Agent core (`src/agent/`)**
- `run.ts` — `runAgent(userMessage, conversationHistory, callbacks)`: the manual tool-calling loop. Calls the model, streams tokens, executes any tool calls, appends results to history, repeats until the model stops requesting tools, then returns the updated `ModelMessage[]` history (which `App.tsx` stores for the next turn).
- `tools/` — each tool is its own file (e.g. `dateTime.ts`) defined with the AI SDK `tool()` helper + Zod `inputSchema`. `tools/index.ts` aggregates them into a single `tools` object; `ToolName` is `keyof typeof tools`.
- `executeTools.ts` — dispatcher: looks up a tool by name in `tools` and runs its `execute`, returning a string (handles unknown / non-executable tools).
- `context/` — context-window management, exposed via a barrel `index.ts`: `tokenEstimator.ts` (token counting), `modelLimits.ts` (per-model limits + threshold helpers), `compaction.ts` (`compactConversation` summarizes history when over threshold).
- `system/` — `prompt.ts` (the `SYSTEM_PROMPT`) and `filterMessages.ts`.

**Evals (`evals/`)** — LMNR framework; `*.eval.ts` files are the entry points.
- `types.ts` — the eval contracts. Single-turn (`EvalData`/`EvalTarget`/`SingleTurnResult`) tests *tool selection without execution*; multi-turn (`MultiTurnEvalData`/`MultiTurnTarget`/`MultiTurnResult`) runs the full agent loop against mocked tools. Targets are categorized `golden` / `secondary` / `negative` (and `task-completion` / `conversation-continuation` / `negative` for multi-turn).
- `executors.ts` — run the model and return the structured result objects above.
- `evaluators.ts` — scoring functions: `toolSelectionScore` (precision/recall F1), `toolsSelected` (strict — all expected tools present), `toolsAvoided` (0 if any forbidden tool used).
- `utils.ts` — `buildMockedTools` (turns `mockTools` config into a Zod-schema `ToolSet` returning fixed values) and `buildMessages` (prepends `SYSTEM_PROMPT`).
- `data/*.json` — datasets; `mocks/tools.ts` — shared mock tools.

# Course Development Workflow

This repo contains a finished AI agent app. Course content is developed by working **backwards** from the complete app to a starter template.

## Branch Strategy

- `done` - The complete, finished app (current state)
- Each lesson branch contains the **solution for the previous lesson**
- Work backwards: `done` → `09-hitl` → `08-shell-tool` → ... → `01-intro-to-agents` → starter template

## Process for Each Lesson

Starting from the current branch (which has the complete code for that lesson):

1. **Create the "done" branch first** (only once at the start)
   ```bash
   git checkout -b done
   git push -u origin done
   git checkout main
   ```

2. **For each lesson (working backwards from 09 to 01):**

   a. **Identify the code** related to the current lesson topic

   b. **Copy ALL the code** that will be removed into the corresponding notes file in `notes/XX-Lesson-Name.md`
      - Include complete code blocks with file paths
      - Format for easy copy/paste during live coding
      - Add lecture notes and explanations

   c. **Remove the code** from the app

   d. **Verify the app still works** (or gracefully handles the missing feature)

   e. **Commit the changes** with a clear message

   f. **Create and push a new branch** for the lesson:
      ```bash
      git checkout -b XX-lesson-name
      git push -u origin XX-lesson-name
      git checkout main
      ```

3. **Continue backwards** to the next lesson until you reach a starter template

## Notes File Format

Each notes file in `notes/` should contain:

```markdown
# Lesson Title

## Overview
Brief explanation of what this lesson covers

## Key Concepts
- Concept 1
- Concept 2

## Code

### filename.ts
\`\`\`typescript
// Complete code that was removed
// Students can copy/paste this
\`\`\`

### another-file.ts
\`\`\`typescript
// More code
\`\`\`

## Exercises
Any exercises or challenges for students
```

## Lesson Order (backwards)

| Branch | Lesson | Code to Remove |
|--------|--------|----------------|
| `done` | Complete app | - |
| `09-hitl` | HITL | Human-in-the-loop approval system |
| `08-shell-tool` | Shell Tool | Shell/command execution tool |
| `07-web-search-context-management` | Web Search + Context | Web search tool, context/summarization |
| `06-file-system-tools` | File System Tools | File read/write/list tools |
| `05-multi-turn-evals` | Multi-turn Evals | Multi-turn evaluation code |
| `04-the-agent-loop` | The Agent Loop | Core agent loop implementation |
| `03-single-turn-evals` | Single Turn Evals | Single-turn evaluation code |
| `02-tool-calling` | Tool Calling | Tool definitions and calling logic |
| `01-intro-to-agents` | Intro to Agents | Basic agent structure |
| starter | Starter template | What students begin with |
- do not add any other code other than the code I removed to the lesson, use git status to see that code. ADD NOTHING ELSE. you are only to help make lecture notes and add that code to the notes, no other code. do not look in the repo for any other code other than the code I removed