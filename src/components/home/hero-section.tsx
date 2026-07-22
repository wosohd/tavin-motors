import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  CheckCircle2,
  Search,
  ShieldCheck,
  Ship,
  Wrench,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const capabilities = [
  {
    icon: ShieldCheck,
    label: "Verified vehicle sourcing",
  },
  {
    icon: Ship,
    label: "End-to-end import support",
  },
  {
    icon: Wrench,
    label: "Professional auto care",
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="carbon-grid absolute inset-0 -z-30 opacity-35" />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,#07090c_0%,rgb(7_9_12_/_92%)_45%,rgb(7_9_12_/_45%)_100%)]" />

      <div className="absolute top-0 right-0 -z-10 h-[38rem] w-[38rem] rounded-full bg-brand-burgundy/20 blur-[140px]" />

      <div className="absolute bottom-0 left-1/2 -z-10 h-56 w-[38rem] -translate-x-1/2 bg-brand-gold/5 blur-[120px]" />

      <div className="tm-container grid min-h-[calc(100svh-5rem)] items-center gap-14 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 border border-brand-gold/25 bg-brand-gold/5 px-3 py-2">
            <span className="size-1.5 rounded-full bg-brand-gold shadow-[0_0_12px_var(--brand-gold)]" />

            <span className="tm-eyebrow">
              Premium automotive experience
            </span>
          </div>

          <h1 className="mt-7 text-5xl leading-[0.98] font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[5.4rem]">
            Drive beyond
            <span className="metallic-text block">the ordinary.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            Discover premium cars in stock, track incoming vehicles, request a
            personalised import and access trusted automotive care through one
            refined platform.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/vehicles"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "h-12 bg-primary px-6 shadow-[0_0_32px_rgb(164_32_42_/_22%)] hover:bg-primary/90",
              )}
            >
              Explore Vehicles
              <ArrowRight className="size-4" />
            </Link>

            <Link
              href="/import-a-car"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-12 border-white/15 bg-white/5 px-6 hover:border-brand-gold/40 hover:bg-brand-gold/5",
              )}
            >
              <Search className="size-4" />
              Find and Import
            </Link>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {capabilities.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 border-t border-white/10 pt-4"
                >
                  <Icon className="size-4 shrink-0 text-brand-gold" />

                  <span className="text-xs leading-5 text-muted-foreground">
                    {item.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute -inset-8 bg-brand-burgundy/20 blur-[100px]" />

          <div className="tm-panel relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_25%,rgb(183_154_92_/_15%),transparent_48%)]" />

            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_45%,rgb(255_255_255_/_4%)_46%,transparent_47%)] bg-[length:18px_18px]" />

            <div className="relative flex aspect-[4/3] flex-col justify-between p-7 sm:p-9">
              <div className="flex items-start justify-between">
                <div>
                  <p className="tm-eyebrow">Tavin Signature</p>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Premium mobility, carefully selected.
                  </p>
                </div>

                <span className="border border-white/10 bg-black/30 px-3 py-1 text-[0.65rem] tracking-[0.18em] text-brand-silver uppercase">
                  Est. 2026
                </span>
              </div>

              <div className="relative grid flex-1 place-items-center">
                <div className="absolute h-44 w-44 rounded-full border border-brand-gold/15" />
                <div className="absolute h-56 w-56 rounded-full border border-white/5" />

                <CarFront
                  strokeWidth={1}
                  className="relative size-44 text-brand-silver drop-shadow-[0_20px_30px_rgb(0_0_0_/_70%)] sm:size-52"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="border border-white/10 bg-black/20 p-4">
                  <CheckCircle2 className="size-4 text-brand-gold" />
                  <p className="mt-3 text-xs font-semibold tracking-[0.15em] uppercase">
                    Quality focused
                  </p>
                </div>

                <div className="border border-white/10 bg-black/20 p-4">
                  <Ship className="size-4 text-brand-gold" />
                  <p className="mt-3 text-xs font-semibold tracking-[0.15em] uppercase">
                    Import ready
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="gold-line mx-auto h-px w-4/5" />
        </div>
      </div>
    </section>
  );
}