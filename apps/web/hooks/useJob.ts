import { getJobById, getJobs, submitJob } from "@/lib/api";
import { SubmitJobBody } from "@autocast/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const jobKeys = {
  all: ["jobs"] as const,
  lists: () => [...jobKeys.all, "list"] as const,
  list: (filters?: string) => [...jobKeys.lists(), filters] as const,
  details: () => [...jobKeys.all, "detail"] as const,
  detail: (id: string) => [...jobKeys.details(), id] as const,
};

export function useJob(id: string) {
  return useQuery({
    queryKey: jobKeys.detail(id),
    queryFn: () => getJobById(id),
    enabled: !!id,
    staleTime: 1000 * 60, // 1 min
    retry: 1,
  });
}

export function useJobs() {
  return useQuery({
    queryKey: jobKeys.lists(),
    queryFn: getJobs,
    staleTime: 1000 * 60,
  });
}

export function useSubmitJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitJobBody) => submitJob(payload),
    onSuccess: (data) => {
      // Invalidate job list
      queryClient.invalidateQueries({
        queryKey: jobKeys.lists(),
      });

      // Optionally prefetch the new job
      queryClient.invalidateQueries({
        queryKey: jobKeys.detail(data.jobId),
      });
    },
  });
}
