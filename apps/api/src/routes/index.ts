import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createRouter } from "../lib/create-app.js";
import assetsRouter from "./assets.js";
import authRouter from "./auth.js";
import contentRouter from "./content.js";
import jobsRouter from "./jobs.js";

const app = createRouter()
  .use(logger())
  .use(cors())
  .route("/api/auth", authRouter)
  .route("/api/content", contentRouter)
  .route("/api/jobs", jobsRouter)
  .route("/api/assets", assetsRouter);

export type AppType = typeof app;

export default app;
