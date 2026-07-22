import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Eye,
  Route,
  Store,
  Target,
  Wrench,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const companyAreas = [
  {
    icon: CarFront,
    title: "Vehicle sales",
  },
  {
    icon: Route,
    title: "Assisted imports",
  },
  {
    icon: Store,
    title: "Local marketplace",
  },
  {
    icon: Wrench,
    title: "Auto care",
  },
];

export function AboutPreviewSection() {
  return (
    <section
      id="about-preview"
      className="relative overflow-hidden border-b border-white/10 bg-black/20"
    >
      <div className="carbon-grid absolute inset-0 opacity-10" />

      <div className="absolute top-1/2 left-1/3 size-[32rem] -translate-y-1/2 rounded-full bg-brand-burgundy/10 blur-[150px]" />

      <div className="tm-container relative py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative min-h-[34rem] overflow-hidden border border-white/10 bg-card/65 p-7 sm:p-9">
            <div className="carbon-grid absolute inset-0 opacity-20" />

            <div className="absolute top-[12%] left-1/2 size-72 -translate-x-1/2 rounded-full border border-brand-gold/10" />

            <div className="absolute top-[20%] left-1/2 size-52 -translate-x-1/2 rounded-full border border-white/5" />

            <div className="relative flex h-full min-h-[29rem] flex-col justify-between">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="tm-eyebrow">
                    Tavin Motors
                  </p>

                  <p className="mt-3 text-sm text-muted-foreground">
                    A connected automotive platform
                  </p>
                </div>

                <span className="border border-brand-gold/25 bg-black/20 px-3 py-1 text-[0.62rem] tracking-[0.16em] text-brand-gold uppercase">
                  Our Direction
                </span>
              </div>

              <div className="my-12 grid place-items-center">
                <CarFront
                  strokeWidth={0.75}
                  className="size-44 text-brand-silver drop-shadow-[0_28px_35px_rgb(0_0_0_/_75%)] sm:size-52"
                />
              </div>

              <div className="grid grid-cols-2 gap-px overflow-hidden border border-white/10 bg-white/10">
                {companyAreas.map((area) => {
                  const Icon = area.icon;

                  return (
                    <div
                      key={area.title}
                      className="flex items-center gap-3 bg-background/85 p-4"
                    >
                      <Icon className="size-4 shrink-0 text-brand-gold" />

                      <span className="text-xs text-muted-foreground">
                        {area.title}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <p className="tm-eyebrow">
              About Tavin Motors
            </p>

            <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
              Building a modern automotive destination.
            </h2>

            <p className="mt-6 text-base leading-8 text-muted-foreground">
              Tavin Motors is being developed as an integrated platform
              where customers can discover vehicles, request personalised
              import assistance, advertise cars within the local market and
              access professional automotive care.
            </p>

            <p className="mt-5 text-sm leading-8 text-muted-foreground">
              The brand combines a premium digital experience with clear
              customer journeys, organised vehicle information and
              practical support beyond the initial sale.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="border border-white/10 bg-white/[0.025] p-5">
                <Target className="size-5 text-brand-gold" />

                <p className="mt-5 text-xs tracking-[0.16em] text-brand-gold uppercase">
                  Mission
                </p>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Simplify confident vehicle discovery, importing,
                  selling and ownership.
                </p>
              </article>

              <article className="border border-white/10 bg-white/[0.025] p-5">
                <Eye className="size-5 text-brand-gold" />

                <p className="mt-5 text-xs tracking-[0.16em] text-brand-gold uppercase">
                  Vision
                </p>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  Become a trusted modern destination for automotive
                  services and mobility.
                </p>
              </article>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "h-12 bg-primary px-7 hover:bg-primary/90",
                )}
              >
                Read Our Story
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-12 border-white/15 bg-white/5",
                )}
              >
                Contact the Team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}