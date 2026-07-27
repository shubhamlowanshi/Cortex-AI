import { Annotation } from "@langchain/langgraph";


export const AgentState=Annotation.Root({
    conversationId:Annotation(),
    prompt:Annotation(),
    aiResponse:Annotation(),
    agent:Annotation()
})
