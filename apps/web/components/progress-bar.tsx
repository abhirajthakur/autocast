import { cn } from "@autocast/ui/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

const ProgressBar = ({
  progress,
  className,
  showLabel = false,
}: ProgressBarProps) => {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
        {progress > 0 && progress < 100 && (
          <div
            className="absolute inset-0 h-full rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
            style={{ backgroundSize: "200% 100%" }}
          />
        )}
      </div>
      {showLabel && (
        <span className="mt-1 block text-right text-xs text-muted-foreground">
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
