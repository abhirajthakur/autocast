import { cn } from "@autocast/ui/lib/utils";
import { AlertCircle, Check, Circle, Loader2 } from "lucide-react";

type StepStatus = "pending" | "in_progress" | "completed" | "failed";

interface WorkflowStepProps {
  icon: React.ReactNode;
  title: string;
  status: StepStatus;
  isLast?: boolean;
}

const statusIcons = {
  pending: Circle,
  in_progress: Loader2,
  completed: Check,
  failed: AlertCircle,
};

const WorkflowStep = ({ icon, title, status, isLast = false }: WorkflowStepProps) => {
  const StatusIcon = statusIcons[status];

  return (
    <div className="flex items-start gap-4">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300",
            status === "pending" && "border-border bg-muted text-muted-foreground",
            status === "in_progress" && "border-blue-500 bg-blue-500/20 text-blue-400",
            status === "completed" && "border-emerald-500 bg-emerald-500/20 text-emerald-400",
            status === "failed" && "border-destructive bg-destructive/20 text-destructive"
          )}
        >
          {status === "in_progress" ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : status === "completed" ? (
            <Check className="h-5 w-5" />
          ) : status === "failed" ? (
            <AlertCircle className="h-5 w-5" />
          ) : (
            <span className="text-muted-foreground">{icon}</span>
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "w-0.5 h-8 mt-2 transition-colors duration-300",
              status === "completed" ? "bg-emerald-500/50" : "bg-border"
            )}
          />
        )}
      </div>
      <div className="pt-2">
        <p
          className={cn(
            "text-sm font-medium transition-colors",
            status === "pending" && "text-muted-foreground",
            status === "in_progress" && "text-blue-400",
            status === "completed" && "text-emerald-400",
            status === "failed" && "text-destructive"
          )}
        >
          {title}
        </p>
      </div>
    </div>
  );
};

export default WorkflowStep;

