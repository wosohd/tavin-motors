import type { ReactNode } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { DashboardMobileMenu } from "@/components/dashboard/dashboard-mobile-menu";
import { DashboardNavigation } from "@/components/dashboard/dashboard-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { dashboardRoleDetails } from "@/lib/dashboard-navigation";
import { cn } from "@/lib/utils";
import type { DashboardRole } from "@/types/dashboard";

type DashboardShellProps = {
  role: DashboardRole;
  children: ReactNode;
};

export function DashboardShell({
  role,
  children,
}: DashboardShellProps) {
  const details = dashboardRoleDetails[role];
  const AccountIcon = details.accountIcon;
  const SwitchIcon = details.switchIcon;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-sidebar-border bg-sidebar/95 text-sidebar-foreground backdrop-blur-xl lg:flex lg:flex-col">
        <div className="border-b border-sidebar-border px-6 py-5">
          <BrandMark />

          <Badge
            variant="outline"
            className="mt-5 border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
          >
            {details.label}
          </Badge>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <DashboardNavigation role={role} />
        </div>

        <div className="space-y-4 border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 rounded-xl border border-sidebar-border bg-sidebar-accent/70 p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-burgundy/15 text-brand-gold dark:bg-brand-burgundy/35">
              <AccountIcon
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-sidebar-foreground">
                {details.accountName}
              </span>

              <span className="block truncate text-xs text-muted-foreground">
                {details.accountDetail}
              </span>
            </span>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Appearance
            </p>

            <ThemeToggle variant="full" />
          </div>

          <div className="grid gap-2">
            <Link
              href={details.switchHref}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "justify-start border-sidebar-border bg-sidebar-accent/40",
              )}
            >
              <SwitchIcon aria-hidden="true" />
              {details.switchLabel}
            </Link>

            <Link
              href="/"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "lg",
                }),
                "justify-start text-muted-foreground hover:text-foreground",
              )}
            >
              <ExternalLink aria-hidden="true" />
              Return to website
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <DashboardMobileMenu role={role} />

        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[100rem]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}