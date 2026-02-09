import { db } from "#db/index.js";
import { jobIdSchema, jobs, jobSteps } from "#db/schema.js";
import { createRouter } from "#lib/create-app.js";
import authMiddleware from "#middleware/auth.js";

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
      .select()
      .from(jobs)
      .where(eq(jobs.userId, user.id))
      .orderBy(desc(jobs.createdAt));

    return c.json(allJobs);
  })
  .get("/:id", zValidator("param", jobIdSchema), async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");

    if (!user) {
      return c.body(null, 401);
    }

    const job = await db.query.jobs.findFirst({
      where: and(eq(jobs.id, id), eq(jobs.userId, user.id)),
    });

    if (!job) {
      return c.json({ error: "Job not found" }, 404);
    }

    const steps = await db
      .select()
      .from(jobSteps)
      .where(eq(jobSteps.jobId, id))
      .orderBy(jobSteps.id);

    return c.json({
      job,
      steps,
    });
  });

export default jobsRouter;
