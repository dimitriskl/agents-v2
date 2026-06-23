# Learning Scorecard: AI Agent Evals

This document tracks learning performance over time. Scores are diagnostic, not grades: they identify what to practice next.

## Current Snapshot

Date: 2026-06-23
Topic: Single-turn eval scorers and local runner
Overall score: 8/10

## Breakdown

| Area | Score | Evidence | Next practice |
| --- | ---: | --- | --- |
| Conceptual model | 8/10 | Correctly pushed back that Laminar should come later, after the local parts are built and tested. | Keep naming each part before coding: dataset, executor, evaluator, runner. |
| Negative scoring | 8/10 | Implemented `toolsAvoided` with the right rule: fail if a forbidden tool was selected. | Simplify with early return and `Set` lookup. |
| Positive scoring | 8/10 | Fixed `toolsSelected` to require every expected tool. Local hard-coded checks passed. | Keep checking edge cases: no expected tools, extra selected tools, missing required tools. |
| Testing discipline | 8/10 | Built and ran a tiny local runner over `evals/data/file-tools.json` before adding Laminar. | Next, use the runner output to isolate whether failures come from executor coverage, scorer logic, or model behavior. |
| Runner wiring | 8/10 | The local runner correctly loops dataset entries, calls `singleTurnExecutor`, runs scorers, and prints the result shape needed for debugging. | Add aggregate averages after the executor covers all expected mock tools. |
| Executor coverage | 5/10 | Runner output showed only the `readFile` case passes because the executor currently only exposes `readFile`. | Add mock definitions for `writeFile`, `listFiles`, and `deleteFile`, then build the `ToolSet` from `data.tools`. |
| Code hygiene | 5/10 | Logic is readable enough, but formatting and unused imports currently fail Biome. | Run formatter or clean imports after each small evaluator. |

## Weak Sides To Watch

- Scope control: keep framework wiring out until the local parts work.
- Failure attribution: decide whether a bad score comes from the runner, executor, scorer, dataset, or model.
- Formatting/import cleanup: make small code checks part of the loop.
- Evidence habit: prove a scorer with tiny examples before trusting it inside a full eval run.

## Current Next Step

Update `evals/executors.ts` so the mocked tool set includes every tool named by the dataset, then rerun `evals/local-file-tools.runner.ts` without Laminar.

## History

- 2026-06-23: 7/10 after `toolsAvoided`; main gap was strict positive scoring.
- 2026-06-23: 8/10 after strict `toolsSelected`; scorer logic passed local hard-coded checks.
- 2026-06-23: 8/10 after local runner; runner wiring works and exposed incomplete executor mock-tool coverage.
