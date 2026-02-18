import { createClient } from "@autocast/api-client";
import { SubmitJobBody } from "@autocast/shared";

export const client = createClient(process.env.NEXT_PUBLIC_API_URL!);

function assertNever(x: never): never {
  throw new Error(`Unhandled response status: ${JSON.stringify(x)}`);
}

export async function getJobs() {
  const response = await client.api.jobs.$get();
  switch (response.status) {
    case 200:
      return await response.json();

    case 401:
      throw new Error("Unauthorized");

    default:
      return assertNever(response);
  }
}

export async function getJobById(id: string) {
  const response = await client.api.jobs[":id"].$get({
    param: { id },
  });

  switch (response.status) {
    case 200:
      return await response.json();

    case 401:
      throw new Error("Unauthorized");

    case 404: {
      const { error } = await response.json();
      throw new Error(error);
    }

    default:
      return assertNever(response);
  }
}

export async function submitJob(payload: SubmitJobBody) {
  const response = await client.api.jobs.$post({
    json: payload,
  });

  switch (response.status) {
    case 201:
      return await response.json();

    case 401:
      throw new Error("Unauthorized");

    case 500: {
      const { error } = await response.json();
      throw new Error(error);
    }

    default:
      return assertNever(response);
  }
}
