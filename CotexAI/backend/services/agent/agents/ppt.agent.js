import { getModel } from "../config/llmModels.js"
import { generatePpt } from "../utils/generatePpt.js"
import { uploadToS3 } from "../utils/uploadsToS3.js"
import { getFromS3 } from "../utils/getFromS3.js"

export const pptAgent = async (state) => {
    try {
        const llm = await getModel('ppt')
        const prompt = `You are a professional presentation designer.

        Return ONLY valid JSON. No markdown. No code block. No explanation.
        "theme":"midnight | sunset | forest | royal | coral | ocean (pick the best fit for the topic mood)"
        Format:
        {
        "title":"",
        "subtitle":"",
        "slides":[
        {
        "title":"",
        "points":["", "", "", ""]
        }
        ]
        }

        Rules:
        - Generate exactly 6 content slides.
        - Each slide should have 4-6 concise bullet points.

        Topic:
        ${state.prompt}
        `

        const res = await llm.invoke(prompt)

        const cleaned = res.content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim()

        const data = JSON.parse(cleaned)

        const pptBuffer = await generatePpt(data)
        const filename = `ppt-${Date.now()}.pptx`

        await uploadToS3(
            filename,
            pptBuffer,
            "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        )
        const downloadUrl = await getFromS3(filename, 60 * 10)

        return {
            ...state,
            aiResponse: `# Presentation Generated

**${data.title}**
📤 [Download PPT](${downloadUrl})
_Link expires in 10 minutes._
`
        }
    }
    catch (error) {
        console.error("pptAgent error:", error)
        return {
            ...state,
            aiResponse: "❌ Failed to generate presentation"
        }
    }
}