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
};

export function DashboardMobileMenu({
  role,
}: DashboardMobileMenuProps) {
  const [open, setOpen] = useState(false);
  const details = dashboardRoleDetails[role];
  const SwitchIcon = details.switchIcon;

  return (
    <div className="flex items-center justify-between border-b border-border bg-background/85 px-4 py-3 backdrop-blur-xl lg:hidden">
      <BrandMark />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger
          render={
            <Button
              variant="outline"
              size="icon-lg"
              aria-label="Open dashboard navigation"
              className="border-border bg-card/70"
            />
          }
        >
          <Menu aria-hidden="true" />
        </SheetTrigger>

        <SheetContent
          side="left"
          className="flex w-[88%] flex-col border-r border-border bg-background p-0 sm:max-w-sm"
        >
          <SheetHeader className="border-b border-border px-5 py-5 text-left">
            <SheetTitle className="text-foreground">
              {details.label}
            </SheetTitle>

            <SheetDescription>
              {details.accountDetail}
            </SheetDescription>
          </SheetHeader>

          <div className="border-b border-border px-4 py-4">
            <p className="mb-3 text-xs font-semibold tracking-[0.15em] text-muted-foreground uppercase">
              Appearance
            </p>

            <ThemeToggle variant="full" />
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-5">
            <DashboardNavigation
              role={role}
              onNavigate={() => setOpen(false)}
            />

            <div className="mt-auto space-y-2 border-t border-border pt-5">
              <Link
                href={details.switchHref}
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "w-full justify-start border-border bg-card/60",
                )}
              >
                <SwitchIcon aria-hidden="true" />
                {details.switchLabel}
              </Link>

              <Link
                href="/"
                onClick={() => setOpen(false)}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "lg",
                  }),
                  "w-full justify-start text-muted-foreground hover:text-foreground",
                )}
              >
                <ExternalLink aria-hidden="true" />
                Return to website
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}