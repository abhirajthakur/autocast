"use client";

import AppHeader from "@/components/app-header";
import JobCard from "@/components/job-card";
import PageHeader from "@/components/page-header";
import { useJobs } from "@/hooks/useJob";
import { useSession } from "@/lib/auth-client";
import { Button } from "@autocast/ui/components/button";
import { Inbox, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 px-4">
    <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-6">
      <Inbox className="h-8 w-8 text-muted-foreground" />
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-2">
      No content jobs yet
    </h3>

    <p className="text-muted-foreground text-center mb-6 max-w-sm">
      Submit your first piece of content and watch Autocast transform it into
      media assets.
    </p>

    <Button variant="hero" asChild>
      <Link href="/submit">
        <Plus className="h-4 w-4" />
        Create your first job
      </Link>
    </Button>
  </div>
);

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const { data: jobs, error, isLoading: jobsLoading } = useJobs();

  if (sessionLoading || jobsLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    router.push("/signin");
    return null;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-red-500">
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <PageHeader
            title="Content Jobs"
            description="Track your content processing progress"
          >
            <Button variant="hero" asChild>
              <Link href="/submit">
                <Plus className="h-4 w-4" />
                New Content
              </Link>
            </Button>
          </PageHeader>

          {jobs && jobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </div>
      </main>
    </div>
  );
}
