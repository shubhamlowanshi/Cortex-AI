import axios from "axios";
import { getModel } from "../config/llmModels.js";
import {uploadToS3} from "../utils/uploadsToS3.js"
import {getFromS3} from "../utils/getFromS3.js"

export const visionAgent = async (state) => {
  try {
    const llm = await getModel("image");
    const res = await llm.invoke(`
        You are an elite AI image prompt engineer.
Convert the user request into a highly detailed image generation prompt.

Requirements:
 - Cinematic lighting
 - Professional composition
 - Ultra realistic
 - High detail
 - Beautiful color palette
 - Sharp focus
 - 8k quality
 - Photorealistic
 - Depth of field
 - Professional photography
 - Stunning visuals

 Return only image prompt.
 User Request:
 ${state.prompt}
        `);

    const prompt = res.content.trim();

    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    const imageRes = await axios.get(imageUrl, { responseType:"arraybuffer" ,timeout:30000});
    const buffer = Buffer.from(imageRes.data);
    const filename = `image-${Date.now()}.png`;

    await uploadToS3(filename, buffer, "image/png");

    const expirySeconds = 10 * 60; // 10 minutes, matches the message below
    const downloadUrl = await getFromS3(filename, expirySeconds);

    return {
      ...state,
      aiResponse: `
![Generated Image](${downloadUrl})
📤 [Generated Image](${downloadUrl})
⌛ Link expires in 10 minutes.
`
    };
  } catch (error) {
    return {
      ...state,
      aiResponse: "❌ Failed to generate image"
    };
  }
};