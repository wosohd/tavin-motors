import type { LucideIcon } from "lucide-react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStat } from "@/types/dashboard";

type DashboardStatCardProps = {
  stat: DashboardStat;
  icon: LucideIcon;
};

const trendDetails = {
  up: {
    icon: ArrowUpRight,
    className:
      "text-emerald-700 dark:text-emerald-400",
  },
  down: {
    icon: ArrowDownRight,
    className:
      "text-amber-700 dark:text-amber-300",
  },
  neutral: {
    icon: ArrowRight,
    className: "text-muted-foreground",
  },
} as const;

export function DashboardStatCard({
  stat,
  icon: Icon,
}: DashboardStatCardProps) {
  const trend =
    trendDetails[
      stat.trendDirection ?? "neutral"
    ];

  const TrendIcon = trend.icon;

  return (
    <Card className="border border-border bg-card/80 shadow-sm transition-colors hover:bg-card">
      <CardHeader className="grid grid-cols-[1fr_auto] gap-4">
        <div>
          <CardDescription>
            {stat.label}
          </CardDescription>

          <CardTitle className="mt-2 text-3xl font-semibold text-foreground">
            {stat.value}
          </CardTitle>
        </div>

        <span className="grid size-11 place-items-center rounded-xl border border-brand-gold/25 bg-brand-gold/10 text-brand-gold shadow-sm">
          <Icon
            aria-hidden="true"
            className="size-5"
          />
        </span>
      </CardHeader>

      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">
          {stat.detail}
        </p>

        {stat.trend && (
          <p
            className={cn(
              "mt-3 flex items-center gap-1.5 text-xs font-medium",
              trend.className,
            )}
          >
            <TrendIcon
              aria-hidden="true"
              className="size-3.5"
            />

            {stat.trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}