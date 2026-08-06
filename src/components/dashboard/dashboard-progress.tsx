import { clampProgress } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

type DashboardProgressProps = {
  value: number;
  label?: string;
  className?: string;
};

export function DashboardProgress({
  value,
  label = "Progress",
  className,
}: DashboardProgressProps) {
  const progress = clampProgress(value);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-3 text-xs">
        <span className="text-muted-foreground">
          {label}
        </span>

        <span className="font-semibold text-foreground">
          {progress}%
        </span>
      </div>

      <div
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progress}
        aria-valuetext={`${progress}% complete`}
        className="h-2 overflow-hidden rounded-full bg-muted shadow-inner"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-burgundy via-brand-red to-brand-gold transition-[width] duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}