import { env } from "../../config/env.js";
import { scriptPrompt } from "../prompts.js";

async function openRouterGenerate(prompt: string, model: string): Promise<any> {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt must be a non-empty string");
  }

  if (!model || typeof model !== "string") {
    throw new Error("Model must be a non-empty string");
  }

  const fullPrompt = scriptPrompt(prompt);

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages: [
            {
              role: "user",
              content: fullPrompt,
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `OpenRouter API error (${response.status}): ${errorText}`,
      );
    }

    const data = await response.json();

    if (!data?.choices?.length) {
      throw new Error("Empty response from OpenRouter");
    }

    return data;
  } catch (error) {
    console.error("OpenRouter generate error:", error);
    throw new Error("Failed to generate content from OpenRouter");
  }
}

export async function openRouterGenerateText(prompt: string) {
  return await openRouterGenerate(prompt, "mistralai/mistral-7b-instruct:free");
}

export async function openRouterGenerateImage(prompt: string) {
  return await openRouterGenerate(
    prompt,
    "google/gemini-2.5-flash-image-preview",
  );
}
