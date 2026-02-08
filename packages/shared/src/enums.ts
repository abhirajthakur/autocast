import { z } from "zod";

export const JobStatusSchema = z.enum([
  "QUEUED",
  "PROCESSING",
  "COMPLETED",
  "FAILED",
]);
export const JobStatus = JobStatusSchema.enum;
export type JobStatus = Lowercase<z.infer<typeof JobStatusSchema>>;

export const StepStatusSchema = z.enum([
  "PENDING",
  "RUNNING",
  "COMPLETED",
  "FAILED",
]);
export const StepStatus = StepStatusSchema.enum;
export type StepStatus = Lowercase<z.infer<typeof StepStatusSchema>>;

export const AssetTypeSchema = z.enum([
  "SUMMARY",
  "SCRIPT",
  "STORYBOARD",
  "IMAGE",
  "VIDEO",
  "CAPTIONS",
]);
export const AssetType = AssetTypeSchema.enum;
export type AssetType = Lowercase<z.infer<typeof AssetTypeSchema>>;

export const AiProviderSchema = z.enum(["GEMINI", "OPENROUTER", "HUGGINGFACE"]);
export const AiProvider = AiProviderSchema.enum;
export type AiProvider = Lowercase<z.infer<typeof AiProviderSchema>>;
