.
├── .agents
├── AGENTS.md
├── biome.json
├── .claude
│   └── commands
│       └── openspec
│           ├── apply.md
│           ├── archive.md
│           └── proposal.md
├── CLAUDE.md
├── .codex
├── course.yaml
├── .env
├── evals
│   ├── data
│   │   ├── agent-multiturn.json
│   │   ├── file-tools.json
│   │   └── shell-tools.json
│   ├── evaluators.ts
│   ├── executors.ts
│   ├── mocks
│   │   └── tools.ts
│   ├── types.ts
│   └── utils.ts
├── .gitignore
├── notes
│   ├── 01-Intro-to-Agents.md
│   ├── 02-Tool-Calling.md
│   ├── 04-The-Agent-Loop.md
│   ├── 05-Multi-turn-Evals.md
│   ├── 06-File-System-Tools.md
│   ├── 07-Web-Search-Context-Management.md
│   ├── 08-Shell-Tool.md
│   ├── 09-HITL.md
│   ├── agents-tree.md
│   ├── course.md
│   ├── Evals
│   │   ├── 03-Single-Turn-Evals.md
│   │   ├── Evals1.md
│   │   ├── Evals2.md
│   │   ├── Evals3.md
│   │   ├── Evals4.md
│   │   ├── Evals5.md
│   │   ├── Evals6.md
│   │   ├── Evals7.md
│   │   └── session-resume.md
│   ├── notebooklm-sources-2026-06-23
│   │   ├── 1_-_Cd14526-Agentic_AI-C1-A01a-Intro-V2_-_lang_en-us.txt.md
│   │   ├── AI_Agents_Fundamentals_Building_Reliable_Agentic_Systems.md
│   │   ├── AI_Engineering_101_Evaluating_and_Optimizing_Agent_Performance.md
│   │   ├── Architecting_Synchronous_and_Asynchronous_Agentic_Workflows.md
│   │   ├── Architecting_the_Agent_Loop_Beyond_Deterministic_Workflows.md
│   │   ├── Bridging_the_Knowledge_Gap_Through_Tool_and_Function_Calling.md
│   │   ├── Building_a_Hello_World_LLM_Agent_with_OpenAI_SDK.md
│   │   ├── Building_and_Executing_LLM_Tool_Calls.md
│   │   ├── Building_and_Executing_LLM_Tool_Selection_Evaluations.md
│   │   ├── Building_and_Testing_the_Laminar_AGI_CLI_Tools.md
│   │   ├── Building_an_LLM_Evaluation_Judge_with_Structured_Outputs.md
│   │   ├── Building_File_System_Tools_for_AI_Agents.md
│   │   ├── Building_Reliable_Agents_Through_Synthetic_Data_and_Evals.md
│   │   ├── Building_the_Traditional_LLM_Agent_Loop.md
│   │   ├── Building_Your_First_LLM_Agent_with_Node.js.md
│   │   ├── Context_Management_Strategies_for_Large_Language_Models.md
│   │   ├── Deterministic_Evaluation_for_LLM_Tool_Selection.md
│   │   ├── Efficient_Agent_Compaction_and_Web_Search_Integration.md
│   │   ├── Empowering_AI_Agents_with_File_System_Tools.md
│   │   ├── Evaluating_Autonomous_Agents_Multi-Turn_Loops_and_LLM_as_a_Judge.md
│   │   ├── Fundamentals_of_AI_Agents_Concepts_and_Architecture.md
│   │   ├── GitHub_-_Hendrixer_agents-v2_·_GitHub.md
│   │   ├── Human-in-the-Loop_Unlocking_True_Productivity_and_AI_Trust.md
│   │   ├── Implementing_AI_Chat_Loops_and_Streaming_with_Tool_Calls.md
│   │   ├── Implementing_and_Testing_Multi-Turn_Agent_Evaluations.md
│   │   ├── Implementing_Deterministic_Human-in-the-Loop_Tool_Approvals.md
│   │   ├── Implementing_File_Management_Tools_for_LLM_Agents.md
│   │   ├── Implementing_Observability_and_Tracing_with_Laminar_AI_SDK.md
│   │   ├── Implementing_Token_Usage_Monitoring_and_Conversation_Compaction.md
│   │   ├── Quantifying_Quality_A_Guide_to_LLM_and_Agent_Evaluations.md
│   │   ├── Secure_AI_Sandboxing_and_Shell_Command_Execution_Tooling.md
│   │   ├── Strategies_for_Context_Compaction_and_Token_Limit_Management.md
│   │   ├── Strategies_for_LLM_Context_Management_and_Conversation_Compaction.md
│   │   ├── The_Architect's_Guide_to_Building_and_Mastering_AI_Agents.md
│   │   ├── The_Architecture_of_Higher_Level_LLM_Tools.md
│   │   ├── The_Science_of_Evaluation_in_Agent_Development.md
│   │   ├── The_Sovereign_Shell_Empowering_Agents_with_Terminal_Access.md
│   │   └── Web_Search_Integration_and_LLM_Context_Management_Strategies.md
│   ├── notebooklm-sources-2026-06-23.zip
│   └── .obsidian
│       ├── appearance.json
│       ├── app.json
│       ├── core-plugins.json
│       └── workspace.json
├── openspec
│   ├── AGENTS.md
│   └── project.md
├── package.json
├── package-lock.json
├── src
│   ├── agent
│   │   ├── context
│   │   │   ├── compaction.ts
│   │   │   ├── index.ts
│   │   │   ├── modelLimits.ts
│   │   │   └── tokenEstimator.ts
│   │   ├── executeTools.ts
│   │   ├── run.ts
│   │   ├── system
│   │   │   ├── filterMessages.ts
│   │   │   └── prompt.ts
│   │   └── tools
│   │       ├── dateTime.ts
│   │       └── index.ts
│   ├── cli.ts
│   ├── index.ts
│   ├── types.ts
│   └── ui
│       ├── App.tsx
│       ├── components
│       │   ├── Input.tsx
│       │   ├── MessageList.tsx
│       │   ├── Spinner.tsx
│       │   ├── TokenUsage.tsx
│       │   ├── ToolApproval.tsx
│       │   └── ToolCall.tsx
│       └── index.tsx
├── tsconfig.build.json
└── tsconfig.json

21 directories, 106 files
