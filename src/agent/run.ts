import "dotenv/config";
import {generateText, type ModelMessage} from "ai";
import { openai } from "@ai-sdk/openai";
import { SYSTEM_PROMPT } from "./system/prompt.ts";
import type { AgentCallbacks } from "../types.ts";
import { tools } from "./tools/index.ts";
import { executeTools } from "./executeTools.ts";

const MODEL_NAME = "gpt-5-mini";

export const runAgent = async (
    userMessage: string, 
    conversationHistory: ModelMessage[], 
    callbacks: AgentCallbacks,) => {
    const { text, toolCalls } = await generateText({
        model: openai(MODEL_NAME),
        prompt: userMessage,
        system: SYSTEM_PROMPT,
        tools,
    });

    console.log(text, toolCalls);
    
    toolCalls.forEach((tc)=> {
        console.log(executeTools(tc.toolName, tc.input));
    });
    
};


runAgent("Hello what is the current date and time?");



//npx tsx src/agent/run.ts
