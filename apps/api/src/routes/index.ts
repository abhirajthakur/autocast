import { env } from "#config/env.js";
import { createRouter } from "#lib/create-app.js";
import assetsRouter from "#routes/assets.js";
import authRouter from "#routes/auth.js";
import jobsRouter from "#routes/jobs.js";

import { cors } from "hono/cors";
import { logger } from "hono/logger";

const app = createRouter()
  .use(logger())
  .use(
    "*",
    cors({
      origin: env.FRONTEND_BASE_URL,
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
    }),
  )
  .route("/api/auth", authRouter)
  .route("/api/jobs", jobsRouter)
  .route("/api/assets", assetsRouter);

export type AppType = typeof app;

export default app;
