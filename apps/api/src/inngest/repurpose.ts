import {
  geminiGenerateImage,
  geminiGenerateText,
  huggingFaceGenerateVideo,
  openRouterGenerateImage,
  openRouterGenerateText,
} from "#ai/index.js";
import { db } from "#db/index.js";
import { assets, jobs, jobSteps } from "#db/schema.js";
import { inngest } from "#inngest/client.js";
import { uploadToCloudinary } from "#lib/cloudinary.js";

import { AiProvider, AssetType, JobStatus, StepStatus } from "@autocast/shared";
import { eq } from "drizzle-orm";

const TOTAL_STEPS = 5;

export const contentPipeline = inngest.createFunction(
  { id: "autocast.content.pipeline" },
  { event: "autocast/content.submitted" },

  async ({ event, step }) => {
    const { userId, jobId, content } = event.data;

    let completedSteps = 0;

    async function markStepCompleted() {
      completedSteps++;
      const progress = Math.floor((completedSteps / TOTAL_STEPS) * 100);

      await db.update(jobs).set({ progress }).where(eq(jobs.id, jobId));
    }

    await db
      .update(jobs)
      .set({
        status: JobStatus.PROCESSING,
        progress: 0,
      })
      .where(eq(jobs.id, jobId));

    try {
      // SUMMARY
      const summary = await step.run("summarize-content", async () => {
        const providerUsed = AiProvider.GEMINI;

        const text = await geminiGenerateText(content);

        await db.insert(jobSteps).values({
          jobId,
          stepName: AssetType.SUMMARY,
          status: StepStatus.COMPLETED,
          provider: providerUsed,
          completedAt: new Date(),
        });

        await db.insert(assets).values({
          userId,
          jobId,
          type: AssetType.SUMMARY,
          provider: providerUsed,
          content: text,
        });

        await markStepCompleted();
        return text;
      });

      // SCRIPT
      const script = await step.run("generate-script", async () => {
        const providerUsed = AiProvider.OPENROUTER;

        const text = await openRouterGenerateText(summary);

        await db.insert(jobSteps).values({
          jobId,
          stepName: AssetType.SCRIPT,
          status: StepStatus.COMPLETED,
          provider: providerUsed,
          completedAt: new Date(),
        });

        await db.insert(assets).values({
          userId,
          jobId,
          type: AssetType.SCRIPT,
          provider: providerUsed,
          content: text,
        });

        await markStepCompleted();
        return text;
      });

      // STORYBOARD
      const storyboard = await step.run("generate-storyboard", async () => {
        const providerUsed = AiProvider.OPENROUTER;

        const json = await openRouterGenerateText(script);

        await db.insert(jobSteps).values({
          jobId,
          stepName: AssetType.STORYBOARD,
          status: StepStatus.COMPLETED,
          provider: providerUsed,
          completedAt: new Date(),
        });

        await db.insert(assets).values({
          userId,
          jobId,
          type: AssetType.STORYBOARD,
          provider: providerUsed,
          metadata: json,
        });

        await markStepCompleted();
        return json;
      });

      // IMAGE + VIDEO (Parallel)
      const [images, video] = await Promise.all([
        step.run("generate-images", async () => {
          const results = [];
          const providersUsed = new Set<AiProvider>();

          for (let i = 0; i < storyboard.scenes.length; i++) {
            const scenePrompt = storyboard.scenes[i].visual;

            let imageBuffer;
            let providerUsed: AiProvider = AiProvider.OPENROUTER;

            try {
              imageBuffer = await openRouterGenerateImage(scenePrompt);
            } catch {
              imageBuffer = await geminiGenerateImage(scenePrompt);
              providerUsed = AiProvider.GEMINI;
            }

            providersUsed.add(providerUsed);

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
            provider:
              providersUsed.size === 1
                ? Array.from(providersUsed)[0]
                : AiProvider.OPENROUTER,
            completedAt: new Date(),
          });

          await markStepCompleted();
          return results;
        }),

        step.run("generate-video", async () => {
          const providerUsed = AiProvider.HUGGINGFACE;

          const blob = await huggingFaceGenerateVideo(script);

          const buffer = Buffer.from(await blob.arrayBuffer());

          const videoUrl = await uploadToCloudinary(buffer, "video");

          await db.insert(jobSteps).values({
            jobId,
            stepName: AssetType.VIDEO,
            status: StepStatus.COMPLETED,
            provider: providerUsed,
            completedAt: new Date(),
          });

          await db.insert(assets).values({
            userId,
            jobId,
            type: AssetType.VIDEO,
            provider: providerUsed,
            url: videoUrl,
          });

          await markStepCompleted();
          return videoUrl;
        }),
      ]);

      await db
        .update(jobs)
        .set({
          status: JobStatus.COMPLETED,
          progress: 100,
        })
        .where(eq(jobs.id, jobId));

      return {
        jobId,
        summary,
        script,
        storyboard,
        images,
        video,
      };
    } catch (error) {
      // If any step throws
      await db
        .update(jobs)
        .set({
          status: JobStatus.FAILED,
        })
        .where(eq(jobs.id, jobId));

      throw error;
    }
  },
);
