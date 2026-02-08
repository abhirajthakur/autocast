import { z } from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().default(8000),
  DATABASE_URL: z.string().url(),

  GEMINI_API_KEY: z.string(),
  OPENROUTER_API_KEY: z.string().nonempty(),
  HF_TOKEN: z.string().nonempty(),

  INNGEST_EVENT_KEY: z.string().optional(),
  INNGEST_SIGNING_KEY: z.string().optional(),

  FRONTEND_BASE_URL: z.string().default("http://localhost:3000"),

  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string().default("http://localhost:8000"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables", parsed.error.flatten());
  throw new Error("Invalid environment variables");
}

export const env = parsed.data;
