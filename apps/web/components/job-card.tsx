import { formatRelativeDate } from "@/lib/format-date";
import { JobSummary } from "@autocast/shared";
import { Card, CardContent, CardHeader } from "@autocast/ui/components/card";
import { Clock } from "lucide-react";
import Link from "next/link";
import ProgressBar from "./progress-bar";
import StatusBadge from "./status-badge";

const JobCard = ({ id, title, status, progress, createdAt }: JobSummary) => {
  const relativeTime = formatRelativeDate(createdAt);

  return (
    <Link href={`/job/${id}`}>
      <Card className="group cursor-pointer border-border/50 bg-card hover:border-primary/30 hover:bg-background-subtle transition-all duration-300">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {title}
              </h3>
              <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {relativeTime}
                </span>
              </div>
            </div>
            <StatusBadge status={status} />
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ProgressBar progress={progress} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default JobCard;
