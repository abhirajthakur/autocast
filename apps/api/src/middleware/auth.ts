import { auth } from "#lib/auth.js";
import type { AuthType } from "#lib/types.js";
import type { MiddlewareHandler } from "hono";
import { createMiddleware } from "hono/factory";

const authMiddleware: MiddlewareHandler<{
  Variables: AuthType;
}> = createMiddleware<{
  Variables: AuthType;
}>(async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});

export default authMiddleware;
