import { Badge } from "@/components/ui/badge";
import { formatDashboardStatus } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

type StatusTone =
  | "neutral"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "progress";

type StatusBadgeProps = {
  status: string;
  className?: string;
};

const statusToneMap: Record<string, StatusTone> = {
  DRAFT: "neutral",

  PENDING_REVIEW: "warning",
  PENDING_VERIFICATION: "warning",
  NEEDS_REVIEW: "warning",
  NEEDS_CHANGES: "warning",
  AWAITING_DEPOSIT: "warning",
  REQUESTED: "warning",

  SOURCING: "info",
  OPTIONS_SHARED: "info",
  PURCHASED: "info",

  SHIPPING: "progress",
  IN_TRANSIT: "progress",
  PORT_CLEARANCE: "progress",
  IN_PROGRESS: "progress",
  READY_SOON: "progress",

  APPROVED: "success",
  ACTIVE: "success",
  CONFIRMED: "success",
  COMPLETED: "success",
  PUBLISHED: "success",
  REPLIED: "success",

  REJECTED: "danger",
  CANCELLED: "danger",
  SUSPENDED: "danger",

  OPEN: "info",
  CLOSED: "neutral",

  CUSTOMER: "neutral",
  SELLER: "info",
  ADMINISTRATOR: "success",

  WEBSITE: "neutral",
  PHONE: "info",
  WHATSAPP: "success",
  EMAIL: "progress",
};

const toneClasses: Record<StatusTone, string> = {
  neutral:
    "border-border bg-muted/70 text-muted-foreground",

  info:
    "border-sky-600/25 bg-sky-500/10 text-sky-700 dark:border-sky-400/25 dark:text-sky-300",

  success:
    "border-emerald-600/25 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/25 dark:text-emerald-300",

  warning:
    "border-amber-600/25 bg-amber-500/10 text-amber-700 dark:border-amber-300/25 dark:text-amber-200",

  danger:
    "border-red-600/25 bg-red-500/10 text-red-700 dark:border-red-400/25 dark:text-red-300",

  progress:
    "border-brand-gold/30 bg-brand-gold/10 text-brand-gold",
};

export function StatusBadge({
  status,
  className,
}: StatusBadgeProps) {
  const tone = statusToneMap[status] ?? "neutral";

  return (
    <Badge
      variant="outline"
      className={cn(
        "whitespace-nowrap font-medium",
        toneClasses[tone],
        className,
      )}
    >
      {formatDashboardStatus(status)}
    </Badge>
  );
}