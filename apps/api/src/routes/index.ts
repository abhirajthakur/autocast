import { createRouter } from "#lib/create-app.js";
import assetsRouter from "#routes/assets.js";
import authRouter from "#routes/auth.js";
import contentRouter from "#routes/content.js";
import jobsRouter from "#routes/jobs.js";

import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = createRouter()
  .use(logger())
  .use(cors())
  .route("/api/auth", authRouter)
  .route("/api/content", contentRouter)
  .route("/api/jobs", jobsRouter)
  .route("/api/assets", assetsRouter);

export type AppType = typeof app;

export default app;
