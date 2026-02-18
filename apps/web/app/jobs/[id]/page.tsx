"use client";

import AppHeader from "@/components/app-header";
import AssetPreview from "@/components/asset-preview";
import StatusBadge from "@/components/status-badge";
import WorkflowStep from "@/components/workflow-step";
import { useJob } from "@/hooks/useJob";
import { useSession } from "@/lib/auth-client";
import { Button } from "@autocast/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@autocast/ui/components/card";
import { ArrowLeft, Clock, Loader2, Video } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

export default function JobDetailPage({ params }: JobDetailPageProps) {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  const { data, isLoading: jobLoading, error } = useJob(params.id);

  if (sessionLoading || jobLoading) {
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

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        No job found
      </div>
    );
  }

  const { job, steps } = data;

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Back link */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {job.title ?? "Untitled Job"}
                </h1>

                {/* <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground"> */}
                <div className="text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {new Date(job.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>

              <StatusBadge status={job.status} />
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Workflow */}
            <Card className="lg:col-span-2 h-fit">
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Workflow Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                {steps.map((step, index) => (
                  <WorkflowStep
                    key={step.id}
                    icon={
                      <span className="text-xs font-mono">{index + 1}</span>
                    }
                    title={step.stepName}
                    status={step.status}
                    isLast={index === steps.length - 1}
                  />
                ))}
              </CardContent>
            </Card>

            {/* Assets */}
            <div className="lg:col-span-3 space-y-4">
              <h2 className="text-lg font-semibold">Generated Assets</h2>

              {/* Video placeholder */}
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
                    <Video className="h-6 w-6" />
                  </div>
                  <p className="text-sm">
                    Video will appear here once processing is complete.
                  </p>
                </CardContent>
              </Card>

              <AssetPreview type="audio" title="Voiceover" />
              <AssetPreview type="image" title="Scene Images" />
              <AssetPreview type="captions" title="Captions (SRT)" />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <Button variant="outline" disabled>
              Regenerate Assets
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
