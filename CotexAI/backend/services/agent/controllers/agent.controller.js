import axios from "axios"
import { graph } from "../graph/graph.js"
import { addMessages } from "../config/memory.js"

export const agent = async (req, res) => {
    try {

        const { prompt, conversationId } = req.body

        await addMessages(conversationId,"user",prompt)
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: "user", content: prompt
        })

        const result = await graph.invoke({
            prompt, conversationId
        })
        const response = result.aiResponse
        await addMessages(conversationId,"assistent",response)
        await axios.post(`${process.env.CHAT_SERVICE}/save-message`, {
            conversationId, role: "assistant", content: response
        })
        return res.status(200).json(response)

    }
    catch (error) {
        return res.status(500).json({ message: `agent error ${error}` })

    }
}