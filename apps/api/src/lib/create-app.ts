import { Hono } from "hono";
import type { AuthType } from "./types.js";

export function createRouter() {
  return new Hono<{ Variables: AuthType }>({
    strict: false,
  });
}
