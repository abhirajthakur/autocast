import { z } from "zod";
import { aiProviderSchema, assetTypeSchema } from "./enums.js";

export const assetSchema = z.object({
  id: z.uuid(),
  type: assetTypeSchema,
  provider: aiProviderSchema,
  url: z.string().nullable(),
  content: z.string().nullable(),
  metadata: z.record(z.string(), z.any()).nullable(),
  createdAt: z.date(),
});

export const getAssetsResponseSchema = assetSchema.array();

export const assetIdParamSchema = z.object({
  id: z.uuid(),
});

export type Asset = z.infer<typeof assetSchema>;
