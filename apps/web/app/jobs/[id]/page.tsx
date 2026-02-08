"use client";

import AppHeader from "@/components/app-header";
import AssetPreview from "@/components/asset-preview";
import StatusBadge from "@/components/status-badge";
import WorkflowStep from "@/components/workflow-step";
import { Button } from "@autocast/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@autocast/ui/components/card";
import { ArrowLeft, Clock, FileText, Video } from "lucide-react";
import Link from "next/link";

// Mock job data
const mockJobData = {
  id: "job-1",
  title: "The Future of AI in Content Creation",
  contentType: "Blog",
  timestamp: "Dec 22, 2024 at 2:34 PM",
  status: "processing" as const,
  steps: [
    { title: "Content validated", status: "completed" as const },
    { title: "Script prepared", status: "completed" as const },
    { title: "Visuals generated", status: "completed" as const },
    { title: "Voiceover created", status: "in_progress" as const },
    { title: "Video assembled", status: "pending" as const },
  ],
  assets: {
    captions: {
      content: `1
00:00:00,000 --> 00:00:04,500
The future of AI in content creation
is not just about automation.

2
00:00:04,500 --> 00:00:09,000
It's about augmenting human creativity
with intelligent assistance.`,
    },
  },
};

type JobDetailPageProps = {
  params: {
    id: string;
  };
};

export default function JobDetailPage({ params }: JobDetailPageProps) {

  const job = mockJobData; //TODO: Replace with fetch(params.id)

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
                  {job.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <FileText className="h-4 w-4" />
                    {job.contentType}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4" />
                    {job.timestamp}
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
                {job.steps.map((step, index) => (
                  <WorkflowStep
                    key={step.title}
                    icon={
                      <span className="text-xs font-mono">{index + 1}</span>
                    }
                    title={step.title}
                    status={step.status}
                    isLast={index === job.steps.length - 1}
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
              <AssetPreview
                type="captions"
                title="Captions (SRT)"
                content={job.assets.captions.content}
              />
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
