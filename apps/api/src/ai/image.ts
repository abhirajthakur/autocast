import { geminiGenerateImage } from "./providers/gemini.js";
import { openRouterGenerateImage } from "./providers/openrouter.js";

export async function generateImageWithFallback(
  prompt: string,
): Promise<Buffer> {
  try {
    return await openRouterGenerateImage(prompt);
  } catch (error) {
    console.warn("OpenRouter image failed, falling back to Gemini");
    return await geminiGenerateImage(prompt);
  }
}
