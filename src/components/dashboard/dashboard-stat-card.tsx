import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

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
    className: "text-emerald-400",
  },
  down: {
    icon: ArrowDownRight,
    className: "text-amber-300",
  },
  neutral: {
    icon: ArrowRight,
    className: "text-brand-silver/70",
  },
} as const;

export function DashboardStatCard({
  stat,
  icon: Icon,
}: DashboardStatCardProps) {
  const trend = trendDetails[stat.trendDirection ?? "neutral"];
  const TrendIcon = trend.icon;

  return (
    <Card className="border border-white/10 bg-white/[0.035] shadow-none">
      <CardHeader className="grid grid-cols-[1fr_auto] gap-4">
        <div>
          <CardDescription>{stat.label}</CardDescription>

          <CardTitle className="mt-2 text-3xl font-semibold text-white">
            {stat.value}
          </CardTitle>
        </div>

        <span className="grid size-11 place-items-center rounded-xl border border-brand-gold/20 bg-brand-gold/8 text-brand-gold">
          <Icon className="size-5" />
        </span>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{stat.detail}</p>

        {stat.trend && (
          <p
            className={cn(
              "mt-3 flex items-center gap-1.5 text-xs font-medium",
              trend.className,
            )}
          >
            <TrendIcon className="size-3.5" />
            {stat.trend}
          </p>
        )}
      </CardContent>
    </Card>
  );
}