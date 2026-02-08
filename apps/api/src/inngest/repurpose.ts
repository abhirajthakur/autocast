import { AiProvider, AssetType, JobStatus, StepStatus } from "@autocast/shared";
import { eq } from "drizzle-orm";
import {
  geminiGenerateImage,
  geminiGenerateText,
  huggingFaceGenerateVideo,
  openRouterGenerateImage,
  openRouterGenerateText,
} from "../ai/index.js";
import { db } from "../db/index.js";
import { assets, jobs, jobSteps } from "../db/schema.js";
import { uploadToCloudinary } from "../lib/cloudinary.js";
import { inngest } from "./client.js";

export const contentPipeline = inngest.createFunction(
  { id: "autocast.content.pipeline" },
  { event: "autocast/content.submitted" },

  async ({ event, step }) => {
    const { userId, jobId, content } = event.data;

    await db
      .update(jobs)
      .set({ status: JobStatus.PROCESSING })
      .where(eq(jobs.id, jobId));

    // Summarize Content
    const summary = await step.run("summarize-content", async () => {
      const text = await geminiGenerateText(content);

      await db.insert(jobSteps).values({
        jobId,
        stepName: AssetType.SUMMARY,
        status: StepStatus.COMPLETED,
        provider: AiProvider.GEMINI,
        completedAt: new Date(),
      });

      await db.insert(assets).values({
        userId,
        jobId,
        type: AssetType.SUMMARY,
        provider: AiProvider.GEMINI,
        content: text,
      });

      return text;
    });

    // Script Generation
    const script = await step.run("generate-script", async () => {
      const text = await openRouterGenerateText(summary);

      await db.insert(jobSteps).values({
        jobId,
        stepName: AssetType.SCRIPT,
        status: StepStatus.COMPLETED,
        provider: AiProvider.OPENROUTER,
        completedAt: new Date(),
      });

      await db.insert(assets).values({
        userId,
        jobId,
        type: AssetType.SCRIPT,
        provider: AiProvider.OPENROUTER,
        content: text,
      });

      return text;
    });

    // Storyboard
    const storyboard = await step.run("generate-storyboard", async () => {
      const json = await openRouterGenerateText(script);

      await db.insert(jobSteps).values({
        jobId,
        stepName: AssetType.STORYBOARD,
        status: StepStatus.COMPLETED,
        provider: AiProvider.OPENROUTER,
        completedAt: new Date(),
      });

      await db.insert(assets).values({
        userId,
        jobId,
        type: AssetType.STORYBOARD,
        provider: AiProvider.OPENROUTER,
        metadata: json,
      });

      return json;
    });

    //  Media Generation - Both images and video
    const [images, video] = await Promise.all([
      step.run("generate-images", async () => {
        const results = [];

        for (let i = 0; i < storyboard.scenes.length; i++) {
          const scenePrompt = storyboard.scenes[i].visual;

          let imageBuffer;
          let providerUsed: (typeof AiProvider)[keyof typeof AiProvider] =
            AiProvider.OPENROUTER;

          try {
            imageBuffer = await openRouterGenerateImage(scenePrompt);
          } catch {
            imageBuffer = await geminiGenerateImage(scenePrompt);
            providerUsed = AiProvider.GEMINI;
          }

          const imageUrl = await uploadToCloudinary(imageBuffer, "image");

          await db.insert(assets).values({
            userId,
            jobId,
            type: AssetType.IMAGE,
            provider: providerUsed,
            url: imageUrl,
            metadata: { scene: i + 1 },
          });

          results.push(imageUrl);
        }

        await db.insert(jobSteps).values({
          jobId,
          stepName: AssetType.IMAGE,
          status: StepStatus.COMPLETED,
          completedAt: new Date(),
        });

        return results;
      }),

      step.run("generate-video", async () => {
        const blob = await huggingFaceGenerateVideo(script);
        const arrayBuffer = await blob.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const videoUrl = await uploadToCloudinary(buffer, "video");

        await db.insert(jobSteps).values({
          jobId,
          stepName: AssetType.VIDEO,
          status: StepStatus.COMPLETED,
          provider: AiProvider.HUGGINGFACE,
          completedAt: new Date(),
        });

        await db.insert(assets).values({
          userId,
          jobId,
          type: AssetType.VIDEO,
          provider: AiProvider.HUGGINGFACE,
          url: videoUrl,
        });

        return videoUrl;
      }),
    ]);

    await db
      .update(jobs)
      .set({ status: JobStatus.COMPLETED })
      .where(eq(jobs.id, jobId));

    return {
      jobId,
      summary,
      script,
      storyboard,
      images,
      video,
    };
  },
);
