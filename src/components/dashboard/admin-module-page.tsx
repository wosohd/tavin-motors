import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  Plus,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type AdminStatusTone =
  | "neutral"
  | "gold"
  | "burgundy"
  | "green"
  | "blue"
  | "red";

export type AdminModuleMetric = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export type AdminRecordField = {
  label: string;
  value: string;
};

export type AdminModuleRecord = {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusTone: AdminStatusTone;
  fields: AdminRecordField[];
};

export type AdminModuleConfig = {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel: string;
  metrics: AdminModuleMetric[];
  records: AdminModuleRecord[];
};

type AdminModulePageProps = {
  config: AdminModuleConfig;
};

const statusToneStyles: Record<
  AdminStatusTone,
  string
> = {
  neutral:
    "border-border bg-muted/70 text-muted-foreground",
  gold:
    "border-brand-gold/30 bg-brand-gold/10 text-brand-gold",
  burgundy:
    "border-brand-burgundy/30 bg-brand-burgundy/10 text-brand-red dark:bg-brand-burgundy/30",
  green:
    "border-emerald-600/25 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
  blue:
    "border-sky-600/25 bg-sky-600/10 text-sky-700 dark:text-sky-400",
  red:
    "border-red-600/25 bg-red-600/10 text-red-700 dark:text-red-400",
};

export function AdminModulePage({
  config,
}: AdminModulePageProps) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-border pb-7 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="tm-eyebrow">
              {config.eyebrow}
            </p>

            <Badge
              variant="outline"
              className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
            >
              Phase 1 demo
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            {config.title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            {config.description}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "border-border bg-card/65",
            )}
          >
            <ArrowLeft aria-hidden="true" />
            Admin overview
          </Link>

          <button
            type="button"
            disabled
            title="This action will be connected in Phase 2."
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "cursor-not-allowed bg-primary opacity-70",
            )}
          >
            <Plus aria-hidden="true" />
            {config.actionLabel}
          </button>
        </div>
      </header>

      <section
        aria-label={`${config.title} statistics`}
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {config.metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              key={metric.label}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/75 p-5 backdrop-blur-xl transition-colors hover:border-brand-gold/30"
            >
              <div className="absolute top-0 right-0 size-28 translate-x-8 -translate-y-8 rounded-full bg-brand-burgundy/10 blur-2xl dark:bg-brand-burgundy/20" />

              <div className="relative flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </p>

                  <p className="mt-4 text-4xl font-semibold tracking-[-0.05em]">
                    {metric.value}
                  </p>

                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {metric.detail}
                  </p>
                </div>

                <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                  <Icon
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>
              </div>
            </article>
          );
        })}
      </section>

      <section
        aria-labelledby="admin-records-heading"
        className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl sm:p-6"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="admin-records-heading"
              className="text-xl font-semibold tracking-[-0.025em]"
            >
              Current records
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Frontend demonstration data for this
              administrative workspace.
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit border-border bg-background/60 text-muted-foreground"
          >
            {config.records.length} records shown
          </Badge>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {config.records.map((record) => (
            <article
              key={record.id}
              className="flex flex-col rounded-xl border border-border bg-background/45 p-5 transition-colors hover:border-brand-gold/30 hover:bg-brand-gold/5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {record.id}
                  </p>

                  <h3 className="mt-2 text-base font-semibold">
                    {record.title}
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {record.subtitle}
                  </p>
                </div>

                <Badge
                  variant="outline"
                  className={cn(
                    "shrink-0",
                    statusToneStyles[
                      record.statusTone
                    ],
                  )}
                >
                  {record.status}
                </Badge>
              </div>

              <dl className="mt-5 grid gap-3 border-t border-border pt-4 sm:grid-cols-2">
                {record.fields.map((field) => (
                  <div key={field.label}>
                    <dt className="text-[0.68rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                      {field.label}
                    </dt>

                    <dd className="mt-1 text-sm font-medium">
                      {field.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4">
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock3
                    aria-hidden="true"
                    className="size-3.5"
                  />
                  Demo information
                </span>

                <button
                  type="button"
                  disabled
                  title="Record actions will be enabled in Phase 2."
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "cursor-not-allowed border-border bg-card/60 opacity-70",
                  )}
                >
                  Review
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="relative overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-burgundy/10 p-5 dark:bg-brand-burgundy/20 sm:p-6">
        <div className="absolute top-1/2 right-0 size-56 -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-burgundy/15 blur-3xl" />

        <div className="relative">
          <p className="tm-eyebrow">
            Phase 2 connection
          </p>

          <h2 className="mt-3 text-lg font-semibold">
            Administrative actions are currently
            demonstration-only
          </h2>

          <p className="mt-2 max-w-4xl text-sm leading-6 text-muted-foreground">
            Creating, editing, approving and deleting
            records will be connected to authentication,
            role permissions, PostgreSQL and Prisma during
            backend development.
          </p>
        </div>
      </aside>
    </div>
  );
}