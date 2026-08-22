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
  LogOut,
  Sparkles,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import styles from "./auth-entry-actions.module.css";

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

export function AuthEntryActions() {
  const router =
    useRouter();

  const {
    data: session,
    isPending: sessionPending,
    refetch,
  } = authClient.useSession();

  const [
    signingOut,
    setSigningOut,
  ] = useState(false);

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

  if (sessionPending) {
    return (
      <div
        aria-hidden="true"
        className="h-11 w-28 animate-pulse rounded-full bg-muted/50"
      />
    );
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/dashboard"
          className="hidden items-center gap-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-brand-burgundy sm:inline-flex dark:hover:text-brand-gold"
        >
          <UserRound
            aria-hidden="true"
            className="size-4"
          />

          My Garage
        </Link>

        <button
          type="button"
          onClick={
            handleSignOut
          }
          disabled={
            signingOut
          }
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-brand-burgundy/30 bg-background/75 px-3.5 text-[0.68rem] font-bold tracking-[0.11em] text-brand-burgundy uppercase shadow-sm backdrop-blur-xl transition hover:border-brand-burgundy/55 hover:bg-brand-burgundy/5 disabled:cursor-not-allowed disabled:opacity-60 dark:border-brand-gold/30 dark:text-brand-gold dark:hover:border-brand-gold/55 dark:hover:bg-brand-gold/5"
        >
          <LogOut
            aria-hidden="true"
            className="size-3.5"
          />

          {signingOut
            ? "Leaving..."
            : "Sign Out"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        href="/sign-in"
        onClick={(event) =>
          handleAuthNavigation(
            event,
            "/sign-in",
          )
        }
        className="hidden text-xs font-semibold tracking-[0.13em] text-muted-foreground uppercase transition-colors hover:text-brand-burgundy focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-burgundy/40 sm:inline-flex dark:hover:text-brand-gold dark:focus-visible:ring-brand-gold/40"
      >
        Sign in
      </Link>

      <Link
        href="/sign-up"
        onClick={(event) =>
          handleAuthNavigation(
            event,
            "/sign-up",
          )
        }
        className={
          styles.getStarted
        }
      >
        <span
          className={
            styles.inner
          }
        >
          <Sparkles
            aria-hidden="true"
            className={
              styles.sparkle
            }
          />

          <span>
            Get Started
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className={
              styles.arrow
            }
          />
        </span>
      </Link>
    </div>
  );
}