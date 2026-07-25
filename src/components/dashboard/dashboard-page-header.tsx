import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";

type DashboardPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: ReactNode;
};

export function DashboardPageHeader({
  eyebrow,
  title,
  description,
  actions,
}: DashboardPageHeaderProps) {
  return (
    <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-3xl">
        {eyebrow && (
          <Badge
            variant="outline"
            className="mb-3 border-brand-gold/25 bg-brand-gold/5 text-brand-gold"
          >
            {eyebrow}
          </Badge>
        )}

        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
          {description}
        </p>
      </div>

      {actions && <div className="flex shrink-0 flex-wrap gap-2">{actions}</div>}
    </div>
  );
}