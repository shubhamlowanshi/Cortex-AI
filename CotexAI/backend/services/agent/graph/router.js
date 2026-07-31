import { getModel } from "../config/llmModels.js"

export const router = async (state) => {

    if (state.agent && state.agent !== 'auto') {
        return {
            ...state,
            agent: state.agent
        }
    }


    const llm = await getModel("router")
    const prompt = `you are an agent router

    available agents:

    -chat
    -search
    -coding
    -pdf
    -ppt
    -vision


    rules:

    chat:
    genral conversation,
    explainationns,
    learning,
    questions.

    search:
    current events,
    latest information,
    news,
    recents development,
    internet lookup.

    coding:
    Generate code,
    debug code,
    build projects,
    arhitecture,
    API design.

    pdg:
    questions about generate PDFs
    or document context.

    ppt:
    questions about generate ppts
    or ppt conntext.

    vision:
    Generate image,
    create image,
    
    Return ONLY one word:

    chat
    search
    coding
    pdf
    ppt 
    vision


    User Query:
   ${state.prompt}

    `

    const response = await llm.invoke(prompt)


    return {
        ...state,
        agent: response.content.trim().toLowerCase()
    }

}