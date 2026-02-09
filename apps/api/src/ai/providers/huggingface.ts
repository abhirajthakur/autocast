import { InferenceClient } from "@huggingface/inference";
import { env } from "#config/env.js";

const client = new InferenceClient(env.HF_TOKEN);

export async function huggingFaceGenerateVideo(script: string): Promise<Blob> {
  if (!script || typeof script !== "string") {
    throw new Error("Script must be a non-empty string");
  }

  try {
    const video = await client.textToVideo({
      provider: "auto",
      model: "zai-org/CogVideoX-5b",
      inputs: script,
    });

    if (!video) {
      throw new Error("Empty response from Hugging Face");
    }

    return video;
  } catch (error) {
    console.error("HuggingFace textToVideo error:", error);
    throw new Error("Failed to generate video from Hugging Face");
  }
}
