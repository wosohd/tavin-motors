import Link from "next/link";
import { Phone, UserRound } from "lucide-react";

import { BrandMark } from "@/components/brand/brand-mark";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-2xl">
      <div className="tm-container flex h-20 items-center justify-between">
        <BrandMark />

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 lg:flex"
        >
          {siteConfig.mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
              }),
              "hidden text-muted-foreground hover:text-foreground xl:inline-flex",
            )}
          >
            <Phone aria-hidden="true" className="size-4" />
            Contact
          </Link>

          <ThemeToggle
            variant="icon"
            className="hidden lg:inline-flex"
          />

          <Link
            href="/dashboard"
            aria-label="Open customer dashboard"
            title="Customer dashboard"
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "icon",
              }),
              "hidden border-border bg-card/70 sm:inline-flex",
            )}
          >
            <UserRound aria-hidden="true" className="size-4" />
          </Link>

          <Link
            href="/import-a-car"
            className={cn(
              buttonVariants({
                size: "sm",
              }),
              "hidden bg-primary px-5 shadow-[0_0_24px_rgb(164_32_42_/_18%)] hover:bg-primary/90 md:inline-flex",
            )}
          >
            Import a Car
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}