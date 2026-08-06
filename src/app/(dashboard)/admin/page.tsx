import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  Inbox,
  PackageSearch,
  PanelsTopLeft,
  ShieldCheck,
  Ship,
  UsersRound,
  Warehouse,
  Wrench,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AdminStat = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

type AdminOperation = {
  title: string;
  description: string;
  href: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
};

type AdminActivity = {
  title: string;
  description: string;
  time: string;
  status:
    | "Pending"
    | "Review"
    | "Confirmed"
    | "Published";
};

const adminStats: AdminStat[] = [
  {
    label: "Vehicles in stock",
    value: "24",
    detail: "6 featured inventory vehicles",
    icon: Warehouse,
  },
  {
    label: "Incoming vehicles",
    value: "8",
    detail: "3 expected within fourteen days",
    icon: Ship,
  },
  {
    label: "Pending listings",
    value: "6",
    detail: "Awaiting marketplace moderation",
    icon: ShieldCheck,
  },
  {
    label: "Open enquiries",
    value: "13",
    detail: "Across imports, service and contact",
    icon: Inbox,
  },
];

const adminOperations: AdminOperation[] = [
  {
    title: "Inventory management",
    description:
      "Review vehicles currently available through Tavin Motors.",
    href: "/admin/inventory",
    metric: "24",
    metricLabel: "vehicles",
    icon: Warehouse,
  },
  {
    title: "Incoming vehicles",
    description:
      "Track vehicles that are being sourced, shipped or cleared.",
    href: "/admin/incoming",
    metric: "8",
    metricLabel: "in transit",
    icon: Ship,
  },
  {
    title: "Marketplace moderation",
    description:
      "Review customer listings before they appear publicly.",
    href: "/admin/marketplace",
    metric: "6",
    metricLabel: "pending",
    icon: ShieldCheck,
  },
  {
    title: "Import enquiries",
    description:
      "Manage personalised vehicle sourcing requests.",
    href: "/admin/imports",
    metric: "5",
    metricLabel: "active",
    icon: PackageSearch,
  },
  {
    title: "Service bookings",
    description:
      "Coordinate diagnostics, repairs and maintenance bookings.",
    href: "/admin/service-bookings",
    metric: "7",
    metricLabel: "scheduled",
    icon: CalendarDays,
  },
  {
    title: "Customer enquiries",
    description:
      "Respond to general website and vehicle enquiries.",
    href: "/admin/enquiries",
    metric: "8",
    metricLabel: "unresolved",
    icon: Inbox,
  },
  {
    title: "User management",
    description:
      "Review customer and administrator demo accounts.",
    href: "/admin/users",
    metric: "42",
    metricLabel: "users",
    icon: UsersRound,
  },
  {
    title: "Website content",
    description:
      "Manage homepage sections, notices and featured content.",
    href: "/admin/content",
    metric: "4",
    metricLabel: "sections",
    icon: PanelsTopLeft,
  },
];

const recentActivity: AdminActivity[] = [
  {
    title: "New import request",
    description:
      "Toyota Harrier 2021 sourcing request submitted.",
    time: "12 minutes ago",
    status: "Pending",
  },
  {
    title: "Marketplace listing submitted",
    description:
      "Mazda CX-5 listing requires administrative review.",
    time: "34 minutes ago",
    status: "Review",
  },
  {
    title: "Service booking confirmed",
    description:
      "Vehicle diagnostics booked for Thursday morning.",
    time: "1 hour ago",
    status: "Confirmed",
  },
  {
    title: "Inventory vehicle published",
    description:
      "Mercedes-Benz C200 added to public inventory.",
    time: "3 hours ago",
    status: "Published",
  },
];

const statusStyles: Record<
  AdminActivity["status"],
  string
> = {
  Pending:
    "border-brand-gold/35 bg-brand-gold/10 text-brand-gold",
  Review:
    "border-brand-burgundy/30 bg-brand-burgundy/10 text-brand-red dark:bg-brand-burgundy/30",
  Confirmed:
    "border-emerald-600/25 bg-emerald-600/10 text-emerald-700 dark:text-emerald-400",
  Published:
    "border-sky-600/25 bg-sky-600/10 text-sky-700 dark:text-sky-400",
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-5 border-b border-border pb-7 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <p className="tm-eyebrow">
              Administration
            </p>

            <Badge
              variant="outline"
              className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
            >
              Phase 1 demo
            </Badge>
          </div>

          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Operations command centre
          </h1>

          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
            Review inventory, customer activity,
            marketplace submissions, import requests
            and service operations from one unified
            workspace.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin/inventory"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "border-border bg-card/65",
            )}
          >
            <CarFront aria-hidden="true" />
            Review inventory
          </Link>

          <Link
            href="/admin/marketplace"
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "bg-primary hover:bg-primary/90",
            )}
          >
            <ShieldCheck aria-hidden="true" />
            Moderate listings
          </Link>
        </div>
      </header>

      <section
        aria-labelledby="admin-overview-heading"
        className="space-y-4"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2
              id="admin-overview-heading"
              className="text-xl font-semibold tracking-[-0.025em]"
            >
              Business overview
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Demonstration statistics for the
              Phase 1 frontend.
            </p>
          </div>

          <Badge
            variant="outline"
            className="hidden border-border bg-card/60 text-muted-foreground sm:inline-flex"
          >
            Demo information
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
          {adminStats.map((stat) => {
            const Icon = stat.icon;

            return (
              <article
                key={stat.label}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card/75 p-5 backdrop-blur-xl transition-colors hover:border-brand-gold/30"
              >
                <div className="absolute top-0 right-0 size-28 translate-x-8 -translate-y-8 rounded-full bg-brand-burgundy/10 blur-2xl dark:bg-brand-burgundy/20" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>

                    <p className="mt-4 text-4xl font-semibold tracking-[-0.05em] text-foreground">
                      {stat.value}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {stat.detail}
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
        </div>
      </section>

      <div className="grid gap-6 2xl:grid-cols-[1.45fr_0.85fr]">
        <section
          aria-labelledby="operations-heading"
          className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl sm:p-6"
        >
          <div>
            <h2
              id="operations-heading"
              className="text-xl font-semibold tracking-[-0.025em]"
            >
              Operations
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Open an administrative workspace.
            </p>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {adminOperations.map((operation) => {
              const Icon = operation.icon;

              return (
                <Link
                  key={operation.href}
                  href={operation.href}
                  className="group flex min-h-40 flex-col justify-between rounded-xl border border-border bg-background/45 p-4 transition-all hover:-translate-y-0.5 hover:border-brand-gold/35 hover:bg-brand-gold/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="grid size-10 place-items-center rounded-lg border border-border bg-card text-brand-gold">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                      />
                    </span>

                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-gold"
                    />
                  </div>

                  <div className="mt-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-semibold">
                        {operation.title}
                      </h3>

                      <span className="text-xs font-semibold text-brand-gold">
                        {operation.metric}{" "}
                        {operation.metricLabel}
                      </span>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {operation.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section
          aria-labelledby="activity-heading"
          className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur-xl sm:p-6"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2
                id="activity-heading"
                className="text-xl font-semibold tracking-[-0.025em]"
              >
                Recent activity
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Latest demo operational updates.
              </p>
            </div>

            <Clock3
              aria-hidden="true"
              className="size-5 text-brand-gold"
            />
          </div>

          <div className="mt-6 divide-y divide-border">
            {recentActivity.map((activity) => (
              <article
                key={`${activity.title}-${activity.time}`}
                className="py-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-full bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">
                    <CheckCircle2
                      aria-hidden="true"
                      className="size-4"
                    />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="text-sm font-semibold">
                        {activity.title}
                      </h3>

                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[0.62rem]",
                          statusStyles[
                            activity.status
                          ],
                        )}
                      >
                        {activity.status}
                      </Badge>
                    </div>

                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {activity.description}
                    </p>

                    <p className="mt-2 text-[0.68rem] tracking-[0.08em] text-muted-foreground uppercase">
                      {activity.time}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden rounded-2xl border border-brand-gold/20 bg-brand-burgundy/10 p-6 dark:bg-brand-burgundy/20">
        <div className="absolute top-1/2 right-0 size-64 -translate-y-1/2 translate-x-1/3 rounded-full bg-brand-burgundy/15 blur-3xl" />

        <div className="relative flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="tm-eyebrow">
              Frontend demonstration
            </p>

            <h2 className="mt-3 text-xl font-semibold">
              Phase 2 will connect real operations
            </h2>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              Authentication, role permissions,
              database records, uploads and persistent
              administrative actions will be connected
              during backend development.
            </p>
          </div>

          <Link
            href="/admin/content"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "lg",
              }),
              "shrink-0 border-brand-gold/30 bg-background/50 hover:bg-brand-gold/10",
            )}
          >
            <Wrench aria-hidden="true" />
            Review website content
          </Link>
        </div>
      </section>
    </div>
  );
}