import type {
  ReactNode,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  CarFront,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { AuthVisual } from "@/components/auth/auth-visual";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthShell({
  eyebrow,
  title,
  description,
  children,
}: AuthShellProps) {
  return (
    <main className="relative min-h-svh overflow-hidden bg-background text-foreground">
      <div className="absolute inset-x-0 top-0 h-72 lg:hidden">
        <AuthVisual />
      </div>

      <div className="relative mx-auto grid min-h-svh max-w-[1600px] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="relative hidden overflow-hidden border-r border-border/70 lg:flex lg:min-h-svh">
          <AuthVisual />

          <div className="relative z-10 flex w-full flex-col justify-between p-10 xl:p-14">
            <Link
              href="/"
              className="flex w-fit items-center gap-3"
            >
              <span className="grid size-11 place-items-center rounded-2xl border border-brand-burgundy/25 bg-background/60 text-brand-burgundy shadow-lg backdrop-blur-xl dark:border-brand-gold/25 dark:text-brand-gold">
                <CarFront className="size-5" />
              </span>

              <span>
                <span className="block text-sm font-semibold tracking-[0.18em] uppercase">
                  Tavin Motors
                </span>

                <span className="block text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
                  Drive beyond ordinary
                </span>
              </span>
            </Link>

            <div className="max-w-xl">
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-border/70 bg-background/55 px-4 py-2 text-xs font-medium backdrop-blur-xl">
                <Sparkles className="size-3.5 text-brand-burgundy dark:text-brand-gold" />
                Your private Tavin garage
              </div>

              <h2 className="text-4xl font-semibold tracking-[-0.045em] xl:text-6xl">
                One account.
                <span className="mt-2 block text-brand-burgundy dark:text-brand-gold">
                  Every journey.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground">
                Save vehicles, request imports,
                manage enquiries and keep your
                Tavin Motors experience in one
                secure place.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="size-4 text-brand-burgundy dark:text-brand-gold" />
              Secure account access
            </div>
          </div>
        </section>

        <section className="relative z-10 flex min-h-svh items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground lg:mb-10"
            >
              <ArrowLeft className="size-4" />
              Return to showroom
            </Link>

            <div className="rounded-[2rem] border border-border/70 bg-background/82 p-6 shadow-[0_30px_90px_rgb(0_0_0_/_10%)] backdrop-blur-2xl sm:p-8 dark:shadow-[0_30px_90px_rgb(0_0_0_/_35%)]">
              <div className="mb-7">
                <p className="text-xs font-semibold tracking-[0.18em] text-brand-burgundy uppercase dark:text-brand-gold">
                  {eyebrow}
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em]">
                  {title}
                </h1>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {description}
                </p>
              </div>

              {children}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}