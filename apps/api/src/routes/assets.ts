import { db } from "#db/index.js";
import { assets } from "#db/schema.js";
import { createRouter } from "#lib/create-app.js";
import authMiddleware from "#middleware/auth.js";
import {
  assetIdParamSchema,
  assetSchema,
  getAssetsResponseSchema,
  jobIdSchema,
} from "@autocast/shared";
import { zValidator } from "@hono/zod-validator";
import { and, eq } from "drizzle-orm";

const assetsRouter = createRouter()
  .use(authMiddleware)
  .get("/job/:id", zValidator("param", jobIdSchema), async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");

    if (!user) {
      return c.body(null, 401);
    }

    const jobAssets = await db
      .select({
        id: assets.id,
        type: assets.type,
        provider: assets.provider,
        url: assets.url,
        content: assets.content,
        metadata: assets.metadata,
        createdAt: assets.createdAt,
      })
      .from(assets)
      .where(and(eq(assets.jobId, id), eq(assets.userId, user.id)));

    return c.json(getAssetsResponseSchema.parse(jobAssets));
  })
  .get("/:id", zValidator("param", assetIdParamSchema), async (c) => {
    const user = c.get("user");
    const { id } = c.req.valid("param");

    if (!user) {
      return c.body(null, 401);
    }

    const asset = await db.query.assets.findFirst({
      columns: {
        id: true,
        type: true,
        provider: true,
        url: true,
        content: true,
        metadata: true,
        createdAt: true,
      },
      where: and(eq(assets.id, id), eq(assets.userId, user.id)),
    });

    if (!asset) {
      return c.json({ error: "Asset not found" }, 404);
    }

    return c.json(assetSchema.parse(asset));
  });

export default assetsRouter;
