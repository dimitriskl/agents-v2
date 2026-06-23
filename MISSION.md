# Mission: AI Agent Evals

## Why
You are following the Frontend Masters AI Agents V2 course and building the follow-along agent in this repository. The goal is to understand evals well enough to improve an agent with evidence instead of manual vibe checks.

## Success looks like
- You can explain the difference between a dataset, executor, evaluator, and experiment.
- You can write deterministic single-turn tool-selection evals for mocked tools.
- You can read eval failures and form a small hypothesis about whether to change data, tool descriptions, prompts, or model configuration.
- You can move into multi-turn evals without confusing deterministic scoring with LLM-as-judge scoring.

## Constraints
- Lessons should be small and tied to the current code in this repo.
- The teaching style should explain one concept, ask for a prediction, let you write the next small piece, then check the result.
- Do not jump ahead and implement full eval files for you.

## Out of scope
- Production online eval pipelines.
- Large-scale statistical eval methodology.
- Replacing the course structure with a separate curriculum.
