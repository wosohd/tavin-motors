"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

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
          "border border-white/10 bg-white/5 lg:hidden",
        )}
      >
        <Menu className="size-5" />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="w-[88%] border-l border-white/10 bg-background/98 p-0 backdrop-blur-2xl sm:max-w-sm"
      >
        <SheetHeader className="border-b border-white/10 p-6 text-left">
          <SheetTitle>
            <BrandMark />
          </SheetTitle>

          <SheetDescription className="sr-only">
            Tavin Motors website navigation
          </SheetDescription>
        </SheetHeader>

        <nav className="flex flex-col p-4">
          {siteConfig.mainNav.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between border-b border-white/10 px-3 py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-white"
            >
              <span className="flex items-center gap-3">
                <span className="w-5 text-xs text-brand-gold">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {item.title}
              </span>

              <ArrowUpRight className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
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