import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { assetIdSchema, assets, jobIdSchema } from "../db/schema.js";
import { createRouter } from "../lib/create-app.js";
import authMiddleware from "../middlewares/auth.js";

const assetsRouter = createRouter()
  .use(authMiddleware)
  .get("/job/:id", zValidator("param", jobIdSchema), async (c) => {
    const session = c.get("session");
    const { id } = c.req.valid("param");

    if (!session) {
      return c.body(null, 401);
    }

    const jobAssets = await db
      .select()
      .from(assets)
      .where(and(eq(assets.jobId, id), eq(assets.userId, session.userId)));

    return c.json(jobAssets);
  })
  .get("/:id", zValidator("param", assetIdSchema), async (c) => {
    const session = c.get("session");
    const { id } = c.req.valid("param");

    if (!session) {
      return c.body(null, 401);
    }

    const asset = await db.query.assets.findFirst({
      where: and(eq(assets.id, id), eq(assets.userId, session.userId)),
    });

    if (!asset) {
      return c.json({ error: "Asset not found" }, 404);
    }

    return c.json(asset);
  });

export default assetsRouter;
