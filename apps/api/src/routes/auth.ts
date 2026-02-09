import { auth } from "#lib/auth.js";
import { createRouter } from "#lib/create-app.js";

const authRouter = createRouter().on(["POST", "GET"], "/*", (c) => {
  return auth.handler(c.req.raw);
});

export default authRouter;
