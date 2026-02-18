import { z } from "zod";
import {
  aiProviderSchema,
  jobStatusSchema,
  stepStatusSchema,
} from "./enums.js";

export const submitJobBody = z.object({
  title: z.string().optional(),
  content: z.string().min(20),
});

export const submitJobResponse = z.object({
  jobId: z.uuid(),
  status: jobStatusSchema,
});

// Used in dashboard listing
export const jobSummarySchema = z.object({
  id: z.uuid(),
  title: z.string().nullable(),
  status: jobStatusSchema,
  progress: z.number(),
  createdAt: z.iso.datetime(),
});

// Used in single job page
export const jobDetailSchema = jobSummarySchema.extend({
  originalContent: z.string(),
});

export const jobStepSchema = z.object({
  id: z.number(),
  stepName: z.string(),
  status: stepStatusSchema,
  provider: aiProviderSchema,
  startedAt: z.iso.datetime().nullable(),
  completedAt: z.iso.datetime().nullable(),
  error: z.string().nullable(),
});

export const getAllJobsResponseSchema = jobSummarySchema.array();

export const getJobResponseSchema = z.object({
  job: jobDetailSchema,
  steps: jobStepSchema.array(),
});

export const jobIdSchema = z.object({
  id: z.uuid(),
});

export type JobSummary = z.infer<typeof jobSummarySchema>;
export type JobDetail = z.infer<typeof jobDetailSchema>;
export type JobStep = z.infer<typeof jobStepSchema>;
export type JobResponse = z.infer<typeof getJobResponseSchema>;
export type SubmitJobBody = z.infer<typeof submitJobBody>;
export type SubmitJobResponse = z.infer<typeof submitJobResponse>;
