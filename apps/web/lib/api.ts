import { createClient } from "@autocast/api-client";

export const client = createClient(process.env.NEXT_PUBLIC_API_URL!);

export async function getJobs() {
  const request = await client.api.jobs.$get();
  if (request.status === 401) {
    throw new Error("Unauthorized");
  }
  const response = await request.json();

  return response;
}

export async function getJob(id: string) {
  const request = await client.api.jobs[":id"].$get({
    param: {
      id,
    },
  });

  if (request.status === 401) {
    throw new Error("Unauthorized");
  }
  if (request.status === 404) {
    throw new Error("Not Found");
  }

  const response = await request.json();

  return response;
}

// export async function submitJob(payload: SubmitJobPayload): Promise<Job> {
//   return request<Job>("/api/jobs", {
//     method: "POST",
//     body: JSON.stringify(payload),
//   });
// }
//
// export async function deleteJob(id: string): Promise<void> {
//   return request<void>(`/api/jobs/${id}`, { method: "DELETE" });
// }
//
// export async function regenerateAssets(jobId: string): Promise<void> {
//   return request<void>(`/api/jobs/${jobId}/regenerate`, { method: "POST" });
// }
