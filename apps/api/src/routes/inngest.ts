import { inngest } from "#inngest/client.js";
import { contentPipeline } from "#inngest/repurpose.js";
import { createRouter } from "#lib/create-app.js";
import { serve } from "inngest/hono";

const inngestRouter = createRouter().on(
  ["GET", "PUT", "POST"],
  "*",
  serve({
    client: inngest,
    functions: [contentPipeline],
  }),
);

export default inngestRouter;
