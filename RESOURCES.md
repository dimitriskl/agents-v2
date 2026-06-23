# AI Agent Evals Resources

## Knowledge

- [Frontend Masters: AI Agents V2](https://frontendmasters.com/courses/ai-agents-v2/)
  Primary course source for this workspace. Use for: the intended lesson order and vocabulary.
- [Local transcript: why evals exist](notes/Evals/Evals1.md)
  Course transcript covering evals as measurement, regressions, and offline versus online evals. Use for: motivation and mental model.
- [Local transcript: eval datasets and executors](notes/Evals/Evals4.md)
  Course transcript covering dataset entries, mocked tools, and the single-turn executor. Use for: mapping JSON data to model calls.
- [Local transcript: deterministic tool-selection scorers](notes/Evals/Evals5.md)
  Course transcript covering why tool calls can be scored with ordinary code. Use for: single-turn evaluators.
- [Local transcript: running Laminar evals](notes/Evals/Evals6.md)
  Course transcript covering wiring datasets, executors, and evaluators into an experiment. Use for: running and interpreting the first eval.
- [Session resume: current eval learning state](notes/Evals/session-resume.md)
  Local teaching state from the previous eval session. Use for: staying in the right zone and not skipping ahead.
- [Current code: eval types](evals/types.ts)
  Local type definitions for single-turn and multi-turn eval data, targets, and results. Use for: checking exact shapes before coding.
- [Current code: evaluator scaffold](evals/evaluators.ts)
  Local evaluator implementation started for this course. Use for: the next coding exercise.

## Wisdom (Communities)

No community preference recorded yet.

## Gaps

- Add official Laminar eval documentation once the lesson needs exact current CLI/API behavior.
- Add official AI SDK documentation once the lesson needs exact current `generateText`, `tool`, or `stopWhen` semantics.
