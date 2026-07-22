import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Route,
  ShieldCheck,
  Store,
  Wrench,
} from "lucide-react";

import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const platformStrengths = [
  {
    icon: CarFront,
    number: "01",
    title: "Carefully presented inventory",
    description:
      "Explore organised vehicle information, specifications, pricing and availability through a refined digital experience.",
  },
  {
    icon: Route,
    number: "02",
    title: "Guided import assistance",
    description:
      "Receive support through sourcing, inspection, purchase coordination, shipping and local clearance.",
  },
  {
    icon: Store,
    number: "03",
    title: "Moderated local marketplace",
    description:
      "Discover private and dealer advertisements through a marketplace designed around structured listing review.",
  },
  {
    icon: Wrench,
    number: "04",
    title: "Care beyond the purchase",
    description:
      "Access diagnostics, preventive maintenance, inspections and other practical vehicle-care services.",
  },
];

const trustIndicators = [
  {
    value: "4",
    label: "Integrated automotive areas",
    description: "Sales, imports, marketplace and auto care",
  },
  {
    value: "3+",
    label: "International sourcing markets",
    description: "Demonstration import-market coverage",
  },
  {
    value: "6",
    label: "Auto-care categories",
    description: "Structured service-request options",
  },
  {
    value: "1",
    label: "Connected platform",
    description: "One consistent customer experience",
  },
];

export function WhyTavinSection() {
  return (
    <section
      id="why-tavin"
      className="relative overflow-hidden border-b border-white/10 bg-black/20"
    >
      <div className="carbon-grid absolute inset-0 opacity-10" />

      <div className="absolute top-0 left-1/2 size-[34rem] -translate-x-1/2 rounded-full bg-brand-burgundy/10 blur-[150px]" />

      <div className="tm-container relative py-16 sm:py-20 lg:py-24">
        <HomeSectionHeading
          eyebrow="Why Tavin Motors"
          title="One platform for the complete automotive journey."
          description="Tavin Motors brings vehicle discovery, assisted importing, local selling and professional vehicle care into one consistent experience."
          action={
            <Link
              href="/about"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-12 border-white/15 bg-white/5 hover:border-brand-gold/35 hover:bg-brand-gold/5",
              )}
            >
              Learn About Tavin
              <ArrowRight className="size-4" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">
          {platformStrengths.map((strength) => {
            const Icon = strength.icon;

            return (
              <article
                key={strength.title}
                className="group relative bg-background p-6 transition-colors hover:bg-card"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="grid size-12 place-items-center border border-brand-gold/25 bg-brand-gold/[0.045]">
                    <Icon className="size-5 text-brand-gold" />
                  </div>

                  <span className="text-xs tracking-[0.16em] text-brand-gold">
                    {strength.number}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-semibold tracking-[-0.025em]">
                  {strength.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {strength.description}
                </p>

                <div className="mt-7 h-px w-12 bg-brand-gold/35 transition-all duration-300 group-hover:w-full" />
              </article>
            );
          })}
        </div>

        <div className="mt-10 overflow-hidden border border-brand-gold/20 bg-brand-gold/[0.035]">
          <div className="grid lg:grid-cols-[0.68fr_1.32fr]">
            <div className="relative flex min-h-72 flex-col justify-between overflow-hidden border-b border-white/10 p-7 sm:p-9 lg:border-r lg:border-b-0">
              <div className="absolute -top-20 -left-20 size-64 rounded-full bg-brand-burgundy/20 blur-[100px]" />

              <div className="relative">
                <div className="grid size-13 place-items-center border border-brand-gold/30 bg-black/25">
                  <ShieldCheck className="size-6 text-brand-gold" />
                </div>

                <p className="tm-eyebrow mt-8">
                  Platform foundation
                </p>

                <h3 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                  Designed around clarity and confidence.
                </h3>
              </div>

              <div className="relative mt-12 flex items-start gap-3">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand-gold" />

                <p className="text-xs leading-6 text-muted-foreground">
                  These indicators describe the current demonstration
                  platform and do not represent historical company
                  performance claims.
                </p>
              </div>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-2">
              {trustIndicators.map((indicator) => (
                <article
                  key={indicator.label}
                  className="bg-background p-7"
                >
                  <p className="font-display text-4xl font-semibold tracking-[-0.05em] text-brand-gold">
                    {indicator.value}
                  </p>

                  <h4 className="mt-5 text-base font-semibold">
                    {indicator.label}
                  </h4>

                  <p className="mt-2 text-xs leading-6 text-muted-foreground">
                    {indicator.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}