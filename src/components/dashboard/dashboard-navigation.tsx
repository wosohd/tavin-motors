"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  dashboardRoleDetails,
  type DashboardNavigationItem,
} from "@/lib/dashboard-navigation";
import { cn } from "@/lib/utils";
import type { DashboardRole } from "@/types/dashboard";

function isNavigationItemActive(
  pathname: string,
  item: DashboardNavigationItem,
) {
  if (item.exact) {
    return pathname === item.href;
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

type DashboardNavigationProps = {
  role: DashboardRole;
  onNavigate?: () => void;
};

export function DashboardNavigation({
  role,
  onNavigate,
}: DashboardNavigationProps) {
  const pathname = usePathname();
  const items = dashboardRoleDetails[role].navigation;

  return (
    <nav aria-label="Dashboard navigation" className="space-y-1">
      {items.map((item) => {
        const active = isNavigationItemActive(pathname, item);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={onNavigate}
            className={cn(
              "group flex min-h-11 items-center gap-3 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "border-brand-gold/30 bg-brand-burgundy/30 text-white shadow-[inset_3px_0_0_var(--brand-gold)]"
                : "border-transparent text-muted-foreground hover:border-white/10 hover:bg-white/[0.04] hover:text-white",
            )}
          >
            <Icon
              aria-hidden="true"
              className={cn(
                "size-4.5 transition-colors",
                active
                  ? "text-brand-gold"
                  : "text-brand-silver/60 group-hover:text-brand-gold",
              )}
            />

            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}