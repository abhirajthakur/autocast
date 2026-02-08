import AppHeader from "@/components/app-header";
import JobCard from "@/components/job-card";
import PageHeader from "@/components/page-header";
import { Button } from "@autocast/ui/components/button";
import { Inbox, Plus } from "lucide-react";
import Link from "next/link";

// Mock data
const mockJobs = [
  {
    id: "job-1",
    title: "The Future of AI in Content Creation",
    timestamp: "2 hours ago",
    status: "completed" as const,
    progress: 100,
    contentType: "Blog",
  },
  {
    id: "job-2",
    title: "Podcast Episode 47: Developer Tools",
    timestamp: "4 hours ago",
    status: "processing" as const,
    progress: 65,
    contentType: "Transcript",
  },
  {
    id: "job-3",
    title: "Product Launch Announcement",
    timestamp: "1 day ago",
    status: "completed" as const,
    progress: 100,
    contentType: "Notes",
  },
  {
    id: "job-4",
    title: "Weekly Newsletter Draft",
    timestamp: "1 day ago",
    status: "queued" as const,
    progress: 0,
    contentType: "Blog",
  },
  {
    id: "job-5",
    title: "Technical Documentation Update",
    timestamp: "2 days ago",
    status: "failed" as const,
    progress: 45,
    contentType: "Notes",
  },
];

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
  // TODO: replace mockJobs with realData
  const hasJobs = mockJobs.length > 0;

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

          {hasJobs ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockJobs.map((job) => (
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
