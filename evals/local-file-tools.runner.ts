import dataset from "./data/file-tools.json" with { type: "json" };
import { singleTurnExecutor } from "./executors.ts";
import { toolsSelected, toolsAvoided, toolSelectionScore } from "./evaluators.ts";
import type { SingleTurnDatasetEntry } from "./types.ts";

const entries = dataset as SingleTurnDatasetEntry[];

for (const [index, entry] of entries.entries()) {
    const output = await singleTurnExecutor(entry.data);

    const selectedScore = toolsSelected(output, entry.target);
    const avoidedScore = toolsAvoided(output, entry.target);
    const selectionScore = toolSelectionScore(output, entry.target);

    console.log({
      index,
      category: entry.target.category,
      prompt: entry.data.prompt,
      expectedTools: entry.target.expectedTools ?? [],
      forbiddenTools: entry.target.forbiddenTools ?? [],
      actualTools: output.toolNames,
      selectedScore,
      avoidedScore,
    selectionScore,  
    });

}