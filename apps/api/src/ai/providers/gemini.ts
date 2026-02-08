import { GoogleGenAI } from "@google/genai";
import { env } from "../../config/env.js";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

async function geminiGenerate(prompt: string, model: string) {
  if (!prompt) {
    throw new Error("Prompt must be a non-empty string");
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    if (!response?.text) {
      throw new Error("Empty response from Gemini");
    }

    return response;
  } catch (error) {
    console.error("Gemini generateText error:", error);
    throw new Error("Failed to generate text from Gemini");
  }
}

export async function geminiGenerateText(prompt: string): Promise<string> {
  if (!prompt) {
    throw new Error("Prompt must be a non-empty string");
  }

  try {
    const response = await geminiGenerate(prompt, "gemini-2.5-flash");

    const text =
      response.text ??
      response.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join("");

    if (!text) {
      throw new Error("Empty text response from Gemini");
    }

    return text;
  } catch (error) {
    console.error("Gemini text generation error:", error);
    throw new Error("Failed to generate text from Gemini");
  }
}

export async function geminiGenerateImage(prompt: string) {
  try {
    const response = await geminiGenerate(prompt, "gemini-2.5-flash-image");

    const parts = response?.candidates?.[0]?.content?.parts;
    if (!parts) {
      throw new Error("No image data returned from Gemini");
    }

    for (const part of parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData?.data) {
        return Buffer.from(part.inlineData.data, "base64");
      }
    }

    throw new Error("No image found in Gemini response");
  } catch (error) {
    console.error("Gemini image generation error:", error);
    throw new Error("Failed to generate image from Gemini");
  }
}
