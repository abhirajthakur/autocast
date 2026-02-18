import { z } from "zod";

export const jobStatusSchema = z.enum([
  "QUEUED",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
]);
export const JobStatus = jobStatusSchema.enum;
export type JobStatus = z.infer<typeof jobStatusSchema>;

export const stepStatusSchema = z.enum([
  "PENDING",
  "RUNNING",
  "COMPLETED",
  "FAILED",
]);
export const StepStatus = stepStatusSchema.enum;
export type StepStatus = z.infer<typeof stepStatusSchema>;

export const assetTypeSchema = z.enum([
  "SUMMARY",
  "SCRIPT",
  "STORYBOARD",
  "IMAGE",
  "VIDEO",
  "CAPTIONS",
]);
export const AssetType = assetTypeSchema.enum;
export type AssetType = z.infer<typeof assetTypeSchema>;

export const aiProviderSchema = z.enum(["GEMINI", "OPENROUTER", "HUGGINGFACE"]);
export const AiProvider = aiProviderSchema.enum;
export type AiProvider = z.infer<typeof aiProviderSchema>;
