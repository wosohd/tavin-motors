"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Menu,
  UserRound,
} from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open navigation menu"
        className={cn(
          buttonVariants({
            variant: "ghost",
            size: "icon",
          }),
          "border border-border bg-card/70 lg:hidden",
        )}
      >
        <Menu aria-hidden="true" className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[88%] border-l border-border bg-background/98 p-0 backdrop-blur-2xl sm:max-w-sm"
      >
        <SheetHeader className="border-b border-border p-6 text-left">
          <SheetTitle>
            <BrandMark />
          </SheetTitle>

          <SheetDescription className="sr-only">
            Tavin Motors website navigation
          </SheetDescription>
        </SheetHeader>

        <div className="border-b border-border p-4">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Appearance
          </p>

          <ThemeToggle variant="full" />
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex flex-col p-4"
        >
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="group mb-3 flex items-center justify-between rounded-xl border border-brand-gold/25 bg-brand-burgundy/10 px-4 py-4 transition-colors hover:border-brand-gold/45 hover:bg-brand-burgundy/15"
          >
            <span className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-gold/10 text-brand-gold">
                <UserRound
                  aria-hidden="true"
                  className="size-5"
                />
              </span>

              <span>
                <span className="block text-sm font-semibold text-foreground">
                  Customer Dashboard
                </span>

                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  Manage your vehicles and requests
                </span>
              </span>
            </span>

            <ArrowUpRight
              aria-hidden="true"
              className="size-4 text-brand-gold transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>

          {siteConfig.mainNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-border px-3 py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                <span className="w-5 text-xs text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {item.title}
              </span>

              <ArrowUpRight
                aria-hidden="true"
                className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
              />
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-7">
          <Link
            href="/import-a-car"
            onClick={() => setOpen(false)}
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "w-full bg-primary hover:bg-primary/90",
            )}
          >
            Request an Import
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}