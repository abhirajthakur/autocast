import { geminiGenerateImage } from "#ai/providers/gemini.js";
import { openRouterGenerateImage } from "#ai/providers/openrouter.js";

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
