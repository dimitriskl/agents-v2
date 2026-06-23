import {z} from "zod";
import {generateText,tool, type ToolSet} from "ai";
import type {EvalData, SingleTurnResult} from "./types.ts";
import {openai} from "@ai-sdk/openai";

const toolDefinitions = {
  readFile:{
    description: "Read the contents of a file at the specified path",
    inputSchema: z.object({
      path: z.string().describe("The path to the file to read"),
    })
  }
}

const tools: ToolSet ={
  readFile: tool(toolDefinitions.readFile),
}

export async function singleTurnExecutor(data: EvalData):Promise<SingleTurnResult>{
  console.log(data.prompt);

  const result = await generateText({
    model: openai("gpt-5-mini"),
    prompt: data.prompt,
    tools,
  });

  console.log(result.toolCalls);

  const calls = result.toolCalls.map((tc)=>({
toolName: tc.toolName,
args: tc.input,
  }));

  return {
    toolCalls: calls,
    toolNames: calls.map((c)=>c.toolName),
    selectedAny: calls.length > 0,
  }
}


