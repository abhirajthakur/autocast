import type { AppType } from "@autocast/api/routes";
import { hc } from "hono/client";

export const createClient = (baseUrl: string) =>
  hc<AppType>(baseUrl, {
    init: {
      credentials: "include",
    },
  });
