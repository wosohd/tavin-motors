"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Menu } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { DashboardNavigation } from "@/components/dashboard/dashboard-navigation";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { dashboardRoleDetails } from "@/lib/dashboard-navigation";
import { cn } from "@/lib/utils";
import type { DashboardRole } from "@/types/dashboard";

type DashboardMobileMenuProps = {
  role: DashboardRole;
  canAccessAdmin?: boolean;
};

export function DashboardMobileMenu({
  role,
  canAccessAdmin = false,
}: DashboardMobileMenuProps) {
  const [open, setOpen] = useState(false);

  const details = dashboardRoleDetails[role];

  const SwitchIcon = details.switchIcon;

  const canSwitchDashboards =
    role === "admin" || canAccessAdmin;

  const switchLabel =
    role === "admin"
      ? "Customer Dashboard"
      : "Admin Dashboard";

  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl lg:hidden">
      <BrandMark />

      <Sheet
        open={open}
        onOpenChange={setOpen}
      >
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Open dashboard navigation"
            />
          }
        >
          <Menu aria-hidden="true" />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="border-white/10 bg-[#0b0e12] p-0"
        >
          <SheetHeader className="border-b border-white/10 px-5 py-5">
            <SheetTitle>
              {details.label}
            </SheetTitle>

            <SheetDescription>
              {details.accountDetail}
            </SheetDescription>
          </SheetHeader>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5">
            <DashboardNavigation
              role={role}
              onNavigate={() =>
                setOpen(false)
              }
            />

            <div className="mt-auto space-y-3 border-t border-white/10 pt-5">
              <ThemeToggle variant="full" />

              {canSwitchDashboards && (
                <Link
                  href={details.switchHref}
                  onClick={() =>
                    setOpen(false)
                  }
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "w-full justify-start",
                  )}
                >
                  <SwitchIcon />

                  {switchLabel}
                </Link>
              )}

              <Link
                href="/"
                onClick={() =>
                  setOpen(false)
                }
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "lg",
                  }),
                  "w-full justify-start",
                )}
              >
                <ExternalLink />

                Return to website
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}