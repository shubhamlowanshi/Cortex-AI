import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages"
import { getModel } from "../config/llmModels.js"
import { getMemory } from "../config/memory.js"


export const chatAgent = async (state) => {
    try {
        
         const llm = await getModel("chat")

    const history = await getMemory(state.conversationId)
    const searchContext = state.searchResults?.results?.length
        ? `
Web search results:
${state.searchResults.results
            .slice(0, 5)
            .map((r, i) => `${i + 1}. ${r.title}\n${r.content?.slice(0, 500)}`)
            .join('\n\n')}

Answer the user using only the above search results.`
        : ''

    const systemPrompt = `You are CortexAI,  an intelligent AI assistant.

    ${searchContext}
    if searchContext exists:
    
    -Use search results to answer.
    -Do not mention internal tools.

    rules:
    -for simple questions, greetings, and short queries, respond naturally in plain text.
    -For technical, educational, coding, or detailed topics, use clean Markdown.


    Formatting:
    -Use # for titles and ## for section.
    -Leave a blank line after heading.
    -Use bullet points for lists.
    -Use numbered lists for this.
    -Use fenced code blocks with language tags doe code.
    -Keep paragraph short and readable.
    -Never write headings and content on the same line.
    -Never generate large walls of text.

    `
    const messages = [
        new SystemMessage(systemPrompt)
    ]

    history.slice(-10).forEach(msg => {
        if (msg.role == 'user') {
            messages.push(new HumanMessage(msg.content))
        }
        else {
            messages.push(new AIMessage(msg.content))
        }
    });

    messages.push(new HumanMessage(state.prompt))

    const response = await llm.invoke(messages)

    return {
        ...state,
        aiResponse: response.content
    }

    } catch (error) {
        return {
        ...state,
        aiResponse: "❌ Failed to genarate response"
    }
        
    }
   
}