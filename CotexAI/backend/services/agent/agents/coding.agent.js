import { getModel } from "../config/llmModels.js";

export const codingAgent = async (state) => {
    const intentLlm = await getModel("intent")
    const llm = await getModel("coding")
    const intentRes = await intentLlm.invoke(`
        you are an intent classifier.
        
        Return ONLY one of these valuse.

        CODE_GENERATION
        CODE_REVIEW
        CODE_EXPLANATION
        DEBUGGING
        OPTIMIZATION
        CONVERSATION
        CONVERSION
        DOCUMENTATION

        User Request:
        ${state.prompt}
        `)

    const intent = intentRes.content

    if (intent === "CODE_GENERATION") {
        const prompt = `
            You are CortexAI coding Agent.

            Generate the requested project.

            Default the requested project.
            Default stack:
            - Node.js
            - Express.js
            - MongoDB
            - React.js
            - Tailwind CSS
            - Redux Toolkit
            -html,css,js
            use React/next.js/vue ONLY if explicitly requested.

            Rules:
            -responsive
            -modern ui
            -css Variable
            -flexbox/grid
            -Smooth scroll
            -Hover Effetcs
            -beautifull spacing
            -Single page unless user asks otherwise.

            return ONLY valid json.

            schema:

            {
            "files:[
            {
            "name":"index.html",
            "content":""
            },
            {
            "name":"style.css",
            "content":""
            },
            {
            "name":"script.js",
            "content":""
            }
            ]
            
            }
            
            Rules:
            -output must start with{
            -output mustend with}
            -no markdown
            -No explanation
            -No extra text
            -no \'\'\'
            -never mention intent

            User Request:
            ${state.prompt}

            `

            const res=await llm.invoke(prompt)
           const data=JSON.parse(res.content)
           return{
            ...state,
            aiResponse:"code genrated successfully",
            artifacts:[
                {
                    id:Date.now(),
                    type:"project",
                    files:data.files ||[],
                    title:state.prompt
                }
            ]
           }


    }

    const res=await llm.invoke(
        `
        The user's request is:

        ${intent}
        Return MarkDown only.
        Never generate project files.
        Use Heading like:
        #Overview
        ## Expalnation
        ## Problem
        ##Improvement
        ## Best Practices
        ## Otimized code (if Need)
        user Request:
        ${state.prompt}
        
    )
        `
    )

    const data=res.content
    return{
        ...state,
        aiResponse:data,
        artifacts:[]
    }

}