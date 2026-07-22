import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BatteryCharging,
  CarFront,
  Check,
  CircleGauge,
  ScanLine,
  Sparkles,
  Wrench,
} from "lucide-react";

import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { buttonVariants } from "@/components/ui/button";
import { autoServices } from "@/data/services";
import { cn } from "@/lib/utils";
import type { AutoService } from "@/types/service";

const serviceIcons: Record<AutoService["icon"], LucideIcon> = {
  diagnostics: ScanLine,
  maintenance: Wrench,
  inspection: CarFront,
  detailing: Sparkles,
  electrical: BatteryCharging,
  tyres: CircleGauge,
};

export function ServicesPreviewSection() {
  const featuredServices = autoServices.slice(0, 3);

  return (
    <section
      id="services-preview"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="absolute top-0 left-0 size-[28rem] rounded-full bg-brand-gold/5 blur-[140px]" />

      <div className="tm-container relative py-16 sm:py-20 lg:py-24">
        <HomeSectionHeading
          eyebrow="Tavin Auto Care"
          title="Professional vehicle care beyond the sale."
          description="Support your vehicle through diagnostics, preventive maintenance and careful pre-purchase inspections."
          action={
            <Link
              href="/services"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-12 border-white/15 bg-white/5 hover:border-brand-gold/35 hover:bg-brand-gold/5",
              )}
            >
              Explore All Services
              <ArrowRight className="size-4" />
            </Link>
          }
        />

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredServices.map((service, index) => {
            const Icon = serviceIcons[service.icon];

            return (
              <article
                key={service.id}
                className="group flex h-full flex-col border border-white/10 bg-card/65 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:bg-card"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="grid size-12 place-items-center border border-brand-gold/25 bg-brand-gold/[0.055]">
                    <Icon className="size-5 text-brand-gold" />
                  </div>

                  <span className="font-display text-xs tracking-[0.16em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 text-xl font-semibold tracking-[-0.025em]">
                  {service.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {service.shortDescription}
                </p>

                <div className="mt-6 border-y border-white/10 py-5">
                  <p className="text-[0.65rem] tracking-[0.16em] text-brand-gold uppercase">
                    Estimated service time
                  </p>

                  <p className="mt-2 text-xs text-muted-foreground">
                    {service.duration}
                  </p>
                </div>

                <div className="mt-5 space-y-3">
                  {service.features
                    .slice(0, 3)
                    .map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-gold/10">
                          <Check className="size-3 text-brand-gold" />
                        </span>

                        <span className="text-xs leading-5 text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                </div>

                <Link
                  href="/services#book-service"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "sm",
                    }),
                    "mt-7 w-full border-white/10 bg-white/[0.035] group-hover:border-brand-gold/30",
                  )}
                >
                  Request This Service
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid overflow-hidden border border-brand-gold/20 bg-brand-gold/[0.035] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-72 overflow-hidden border-b border-white/10 p-8 lg:border-r lg:border-b-0">
            <div className="carbon-grid absolute inset-0 opacity-20" />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_45%,rgb(183_154_92_/_14%),transparent_45%)]" />

            <div className="relative flex h-full flex-col justify-between">
              <div className="grid size-14 place-items-center border border-brand-gold/30 bg-black/30">
                <Wrench className="size-6 text-brand-gold" />
              </div>

              <div className="mt-16">
                <p className="tm-eyebrow">
                  Complete auto-care support
                </p>

                <p className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                  Care designed around your vehicle.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-9">
            <h3 className="text-2xl font-semibold tracking-[-0.03em]">
              Request an appointment online
            </h3>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Select the required service, provide your vehicle information
              and suggest a preferred appointment date. The Tavin Motors team
              will review the request and confirm availability.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Structured service requests",
                "Vehicle-specific information",
                "Preferred date selection",
                "Appointment confirmation",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border border-white/10 bg-black/15 p-3"
                >
                  <Check className="size-4 shrink-0 text-brand-gold" />

                  <span className="text-xs text-muted-foreground">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/services#book-service"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "mt-7 h-12 w-fit bg-primary px-7 hover:bg-primary/90",
              )}
            >
              Book Auto Care
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}