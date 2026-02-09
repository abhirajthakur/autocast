import { db } from "#db/index.js";
import { jobs } from "#db/schema.js";
import { inngest } from "#inngest/client.js";
import { createRouter } from "#lib/create-app.js";
import authMiddleware from "#middleware/auth.js";

import { JobStatus } from "@autocast/shared";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const contentSchema = z.object({
  title: z.string().trim().min(1).optional(),
  content: z.string().trim().min(1, "Content is required"),
});

const contentRouter = createRouter()
  .use(authMiddleware)
  .post("/", zValidator("json", contentSchema), async (c) => {
    const { title, content } = c.req.valid("json");

    const session = c.get("session");

    if (!session) {
      return c.body(null, 401);
    }

    try {
      const [job] = await db
        .insert(jobs)
        .values({
          userId: session.userId,
          title,
          originalContent: content,
          status: JobStatus.QUEUED,
        })
        .returning();

      if (!job) {
        return c.json({ error: "Failed to create job record" }, 500);
      }

      await inngest.send({
        name: "autocast/content.submitted",
        data: {
          userId: session.userId,
          jobId: job.id,
          content,
        },
      });

      return c.json(
        {
          jobId: job.id,
          status: JobStatus.QUEUED,
        },
        201,
      );
    } catch (err) {
      console.error("Content submission failed:", err);

      return c.json(
        {
          error: "Internal server error",
          message: "Failed to submit content",
        },
        500,
      );
    }
  });

export default contentRouter;
