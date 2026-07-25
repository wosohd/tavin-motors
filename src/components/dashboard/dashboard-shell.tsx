import Link from "next/link";
import { ExternalLink } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { DashboardMobileMenu } from "@/components/dashboard/dashboard-mobile-menu";
import { DashboardNavigation } from "@/components/dashboard/dashboard-navigation";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { dashboardRoleDetails } from "@/lib/dashboard-navigation";
import { cn } from "@/lib/utils";
import type { DashboardRole } from "@/types/dashboard";

type DashboardShellProps = {
  role: DashboardRole;
  children: React.ReactNode;
};

export function DashboardShell({ role, children }: DashboardShellProps) {
  const details = dashboardRoleDetails[role];
  const AccountIcon = details.accountIcon;
  const SwitchIcon = details.switchIcon;

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-white/10 bg-[#0b0e12]/95 backdrop-blur-xl lg:flex lg:flex-col">
        <div className="border-b border-white/10 px-6 py-5">
          <BrandMark />

          <Badge
            variant="outline"
            className="mt-5 border-brand-gold/25 bg-brand-gold/5 text-brand-gold"
          >
            {details.label}
          </Badge>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <DashboardNavigation role={role} />
        </div>

        <div className="space-y-4 border-t border-white/10 p-4">
          <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.035] p-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-burgundy/35 text-brand-gold">
              <AccountIcon className="size-5" />
            </span>

            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-white">
                {details.accountName}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {details.accountDetail}
              </span>
            </span>
          </div>

          <div className="grid gap-2">
            <Link
              href={details.switchHref}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "justify-start",
              )}
            >
              <SwitchIcon />
              {details.switchLabel}
            </Link>

            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: "ghost", size: "lg" }),
                "justify-start",
              )}
            >
              <ExternalLink />
              Return to website
            </Link>
          </div>
        </div>
      </aside>

      <div className="lg:pl-72">
        <DashboardMobileMenu role={role} />

        <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="mx-auto w-full max-w-[100rem]">{children}</div>
        </main>
      </div>
    </div>
  );
}
