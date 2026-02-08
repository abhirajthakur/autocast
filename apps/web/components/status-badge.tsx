import { JobStatus } from "@autocast/shared";
import { cn } from "@autocast/ui/lib/utils";
import { Loader2 } from "lucide-react";

interface StatusBadgeProps {
  status: JobStatus;
  className?: string;
}

const statusConfig = {
  queued: {
    label: "Queued",
    className: "bg-muted text-muted-foreground border-border",
  },
  processing: {
    label: "Processing",
    className: "bg-blue-500/15 text-blue-400 border-blue-500/30",
  },
  completed: {
    label: "Completed",
    className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/15 text-destructive border-destructive/30",
  },
};

const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all",
        config.className,
        className
      )}
    >
      {status === "processing" && (
        <Loader2 className="h-3 w-3 animate-spin" />
      )}
      {config.label}
    </span>
  );
};

export default StatusBadge;

