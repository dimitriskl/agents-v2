import { tools } from "./tools";
export type ToolName = keyof typeof tools;


export const executeTools = async (name: string, argss: any) => {
    const tool = tools[name as ToolName] ;

    if(!tool) {
        return "unknown tool. this dosent exist"
    }

    const execute = tool.execute;

    if(!execute) {
        return "This is not a registered tool";
    }

    const result = await execute(argss, {
        toolCallId: "",
        messages: [],
    })

    return String(result);
}
