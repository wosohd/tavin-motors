"use client";

import {
  useState,
  type MouseEvent,
} from "react";

import Link from "next/link";
import {
  useRouter,
} from "next/navigation";

import {
  ArrowUpRight,
  LogIn,
  LogOut,
  Menu,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

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
import { authClient } from "@/lib/auth-client";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

function getCurrentCallbackUrl() {
  if (
    typeof window ===
    "undefined"
  ) {
    return "/";
  }

  return (
    window.location.pathname +
    window.location.search +
    window.location.hash
  );
}

export function MobileNav() {
  const [
    open,
    setOpen,
  ] = useState(false);

  const [
    signingOut,
    setSigningOut,
  ] = useState(false);

  const router =
    useRouter();

  const {
    data: session,
    isPending: sessionPending,
    refetch,
  } = authClient.useSession();

  function closeMenu() {
    setOpen(false);
  }

  function handleAuthNavigation(
    event:
      MouseEvent<HTMLAnchorElement>,
    destination:
      | "/sign-in"
      | "/sign-up",
  ) {
    event.preventDefault();

    const callbackUrl =
      getCurrentCallbackUrl();

    closeMenu();

    router.push(
      `${destination}?callbackUrl=${encodeURIComponent(
        callbackUrl,
      )}`,
    );
  }

  async function handleSignOut() {
    if (signingOut) {
      return;
    }

    setSigningOut(true);

    try {
      await authClient.signOut();

      await refetch();

      closeMenu();

      router.refresh();

      toast.success(
        "You have signed out of Tavin Motors.",
      );
    } catch {
      toast.error(
        "Unable to sign out. Please try again.",
      );
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={setOpen}
    >
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
        <Menu
          aria-hidden="true"
          className="size-5"
        />
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex h-svh w-[88%] flex-col overflow-hidden border-l border-border bg-background/98 p-0 backdrop-blur-2xl sm:max-w-sm"
      >
        <SheetHeader className="shrink-0 border-b border-border p-6 text-left">
          <SheetTitle>
            <BrandMark />
          </SheetTitle>

          <SheetDescription className="sr-only">
            Tavin Motors website navigation
          </SheetDescription>
        </SheetHeader>

        <div className="shrink-0 border-b border-border p-4">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Your Tavin account
          </p>

          {sessionPending ? (
            <div className="h-12 animate-pulse rounded-xl bg-muted/50" />
          ) : session?.user ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-gold/10 text-brand-gold">
                  <UserRound
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {session.user.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    Signed in
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={
                  handleSignOut
                }
                disabled={
                  signingOut
                }
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-brand-burgundy/30 bg-background/75 px-3 text-sm font-semibold text-brand-burgundy transition-colors hover:bg-brand-burgundy/5 disabled:opacity-60 dark:border-brand-gold/30 dark:text-brand-gold dark:hover:bg-brand-gold/5"
              >
                <LogOut
                  aria-hidden="true"
                  className="size-4"
                />

                {signingOut
                  ? "Signing out..."
                  : "Sign Out"}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/sign-in"
                onClick={(event) =>
                  handleAuthNavigation(
                    event,
                    "/sign-in",
                  )
                }
                className="flex min-h-12 items-center justify-center gap-2 rounded-xl border border-border bg-card/70 px-3 text-sm font-semibold text-foreground transition-colors hover:border-brand-burgundy/35 hover:bg-brand-burgundy/5 dark:hover:border-brand-gold/35 dark:hover:bg-brand-gold/5"
              >
                <LogIn
                  aria-hidden="true"
                  className="size-4 text-brand-burgundy dark:text-brand-gold"
                />

                Sign In
              </Link>

              <Link
                href="/sign-up"
                onClick={(event) =>
                  handleAuthNavigation(
                    event,
                    "/sign-up",
                  )
                }
                className="group relative flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-xl border border-brand-gold/35 bg-brand-burgundy px-3 text-sm font-semibold text-white shadow-[0_8px_28px_rgb(117_30_41_/_18%)] transition hover:brightness-110 dark:bg-brand-gold dark:text-[#111318]"
              >
                <Sparkles
                  aria-hidden="true"
                  className="size-4 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                />

                Get Started
              </Link>
            </div>
          )}
        </div>

        <div className="shrink-0 border-b border-border p-4">
          <p className="mb-3 text-xs font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            Appearance
          </p>

          <ThemeToggle variant="full" />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col p-4"
          >
            {session?.user && (
              <Link
                href="/dashboard"
                onClick={closeMenu}
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
            )}

            {siteConfig.mainNav.map(
              (
                item,
                index,
              ) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-center justify-between border-b border-border px-3 py-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="flex items-center gap-3">
                    <span className="w-5 text-xs text-brand-gold">
                      {String(
                        index + 1,
                      ).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    {item.title}
                  </span>

                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                  />
                </Link>
              ),
            )}
          </nav>
        </div>

        <div className="shrink-0 border-t border-border bg-background/95 p-4">
          <Link
            href="/import-a-car"
            onClick={closeMenu}
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "w-full bg-primary hover:bg-primary/90",
            )}
          >
            Request an Import

            <ArrowUpRight
              aria-hidden="true"
              className="size-4"
            />
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}