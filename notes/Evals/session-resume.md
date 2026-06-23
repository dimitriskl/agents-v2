# Evals Learning Session Resume

## Goal

We are learning evals by building them step by step, not by having the assistant write everything.

The style should be:

1. Explain one small concept.
2. Ask the user to predict or reason.
3. Let the user write the next small piece.
4. Run/check it.
5. Explain the result.

Do not jump ahead and implement full files for the user.

## What We Clarified

### What `evals/data/file-tools.json` is

This file already existed in the repo from the initial commit. It was not created during the session.

It is a dataset: an "exam sheet" for the agent.

Each item has:

```txt
data   = the question/input given to the model
target = the answer key used by the evaluator
```

Example idea:

```txt
Prompt: "Read the contents of package.json"
Available tools: readFile, writeFile, listFiles, deleteFile
Expected tool: readFile
```

The user understood that we create these examples because we need to measure whether the agent understands which tool to use in each case.

### Negative evals

Example:

```txt
"What is the capital of France?"
```

The user correctly explained:

```txt
This is outside the scope of file tools.
It is a general knowledge question.
If the agent selects a file tool, something is wrong.
```

Extra clarification:

Wrong tool use may come from:

```txt
- weak tool descriptions
- weak system prompt
- confusing tool names
- too many available tools
- model behavior
```

### Why we use mock tools

The user correctly understood:

```txt
For single-turn evals, we are testing tool selection, not the real tool behavior.
So the eval should not actually delete files, write files, or run commands.
```

Important distinction:

```txt
Tool selection eval:
Did the model choose the right tool?

Tool implementation test:
Does the tool actually work?
```

## Code Built So Far

File being edited:

```txt
evals/executors.ts
```

The user added imports similar to:

```ts
import { z } from "zod";
import { generateText, tool, type ToolSet } from "ai";
import type { EvalData, SingleTurnResult } from "./types.ts";
import { openai } from "@ai-sdk/openai";
```

The user added one fake tool definition:

```ts
const toolDefinitions = {
  readFile: {
    description: "Read the contents of a file at the specified path",
    inputSchema: z.object({
      path: z.string().describe("The path to the file to read"),
    }),
  },
};
```

Concept learned:

```txt
description = tells the model when to use the tool
inputSchema = tells the model how to call the tool
```

Important clarification:

We use Zod instead of `any` because Zod exists at runtime and can be converted into JSON schema for the model. TypeScript types disappear at runtime.

The user added an AI SDK `ToolSet`:

```ts
const tools: ToolSet = {
  readFile: tool(toolDefinitions.readFile),
};
```

Concept learned:

```txt
toolDefinitions = plain definitions we wrote
tools = AI SDK-compatible tool objects passed to generateText
```

The user added an executor:

```ts
export async function singleTurnExecutor(
  data: EvalData,
): Promise<SingleTurnResult> {
  const result = await generateText({
    model: openai("gpt-5-mini"),
    prompt: data.prompt,
    tools,
  });

  const calls = result.toolCalls.map((tc) => ({
    toolName: tc.toolName,
    args: tc.input,
  }));

  return {
    toolCalls: calls,
    toolNames: calls.map((tc) => tc.toolName),
    selectedAny: calls.length > 0,
  };
}
```

Concept learned:

```txt
executor input  = EvalData
executor output = SingleTurnResult
```

Why executor receives `data`, not `target`:

```txt
data is the exam question.
target is the answer key.
The model should not see the answer key.
```

## Manual Test Done

The user added a temporary call at the bottom:

```ts
const output = await singleTurnExecutor({
  prompt: "read the contents of package.json",
  tools: ["readFile"],
});

console.log(output);
```

They ran:

```bash
npx tsx --env-file=.env evals/executors.ts
```

Output showed the model selected:

```txt
toolName: readFile
input: { path: "package.json" }
```

And the executor returned:

```ts
{
  toolCalls: [ { toolName: "readFile", args: ... } ],
  toolNames: [ "readFile" ],
  selectedAny: true
}
```

Meaning:

```txt
The model chose the correct tool for the read-file prompt.
The executor successfully converted raw AI SDK output into SingleTurnResult.
```

## Where To Resume

Resume from the negative-case prediction.

Ask the user:

```txt
Now change the temporary test call to:

const output = await singleTurnExecutor({
  prompt: "What is the capital of France?",
  tools: ["readFile"],
});

console.log(output);

Before running it, predict:
1. What should toolNames be?
2. What should selectedAny be?
3. Why?
```

Expected learning target:

```txt
For a negative/general-knowledge prompt, the ideal output is:

toolNames: []
selectedAny: false

because no file tool is needed.
```

After that, guide the user to write the first evaluator/scorer.

Do not write it for them immediately.

## Next Concepts To Teach

### 1. Evaluator/scorer

Explain:

```txt
The executor produces the model's answer.
The evaluator compares that answer with the target/answer key.
```

Start with the simplest scorer:

```ts
export function toolsSelected(output: SingleTurnResult, target: EvalTarget) {
  // user should help fill this in step by step
}
```

Teach:

```txt
output.toolNames = what the model selected
target.expectedTools = what we expected
```

### 2. Strict golden check

Goal:

```txt
If expectedTools is ["readFile"] and output.toolNames is ["readFile"], score 1.
Otherwise score 0.
```

### 3. Negative check

Goal:

```txt
If forbiddenTools contains "readFile" and the model selected readFile, score 0.
If it avoided forbidden tools, score 1.
```

### 4. Laminar eval file

Only after executor and evaluator are understood, create:

```txt
evals/file-tools.eval.ts
```

Explain:

```txt
Laminar evaluate() connects:
dataset + executor + evaluators
```

### 5. Tracing

After eval scores work, explain tracing:

```txt
Score tells us what happened.
Trace helps us inspect why it happened.
```

Then add telemetry to the actual agent or executor.

## User Preferences / Teaching Notes

The user does not want full code generated all at once.

They want to understand:

```txt
- who created each file
- why each file exists
- why each package/tool is used
- what each line contributes
```

The assistant should avoid saying "open this file and do X" without first explaining why that file exists and why the next step matters.

The user is learning well when asked to explain in their own words.

Strength shown:

```txt
The user understands tool selection vs tool execution.
The user understands negative cases and scope.
The user asks good "why" questions.
```

Current weakness:

```txt
The user needs stronger understanding of the plumbing:
dataset -> executor -> evaluator -> Laminar experiment.
```

