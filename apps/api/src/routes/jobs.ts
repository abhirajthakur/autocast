import { db } from "#db/index.js";
import { jobs, jobSteps } from "#db/schema.js";
import { inngest } from "#inngest/client.js";
import { createRouter } from "#lib/create-app.js";
import authMiddleware from "#middleware/auth.js";
import {
  getAllJobsResponseSchema,
  getJobResponseSchema,
  jobIdSchema,
  JobStatus,
  submitJobBody,
  submitJobResponse,
} from "@autocast/shared";

import { zValidator } from "@hono/zod-validator";
import { and, desc, eq } from "drizzle-orm";

const jobsRouter = createRouter()
  .use(authMiddleware)
  .get("/", async (c) => {
    const user = c.get("user");
    if (!user) {
      return c.body(null, 401);
    }

    const allJobs = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        status: jobs.status,
        progress: jobs.progress,
        createdAt: jobs.createdAt,
      })
      .from(jobs)
      .where(eq(jobs.userId, user.id))
      .orderBy(desc(jobs.createdAt));

    return c.json(getAllJobsResponseSchema.parse(allJobs), 200);
  })
  .get("/:id", zValidator("param", jobIdSchema), async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");

    if (!user) {
      return c.body(null, 401);
    }

    const job = await db.query.jobs.findFirst({
      columns: {
        id: true,
        title: true,
        originalContent: true,
        status: true,
        progress: true,
        createdAt: true,
      },
      where: and(eq(jobs.id, id), eq(jobs.userId, user.id)),
    });

    if (!job) {
      return c.json({ error: "Job not found" }, 404);
    }

    const { jobId, ...columns } = jobSteps._.columns;

    const steps = await db
      .select(columns)
      .from(jobSteps)
      .where(eq(jobSteps.jobId, id))
      .orderBy(jobSteps.id);

    return c.json(
      getJobResponseSchema.parse({
        job,
        steps,
      }),
      200,
    );
  })
  .post("/", zValidator("json", submitJobBody), async (c) => {
    const { title, content } = c.req.valid("json");

    const user = c.get("user");

    if (!user) {
      return c.body(null, 401);
    }

    try {
      const [job] = await db
        .insert(jobs)
        .values({
          userId: user.id,
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
          userId: user.id,
          jobId: job.id,
          content,
        },
      });

      const response = submitJobResponse.parse({
        jobId: job.id,
        status: JobStatus.QUEUED,
      });

      return c.json(response, 201);
    } catch (err) {
      console.error("Content submission failed:", err);

      return c.json(
        {
          error: "Failed to submit content",
        },
        500,
      );
    }
  });

export default jobsRouter;
