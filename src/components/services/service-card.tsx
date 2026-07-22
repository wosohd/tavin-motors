import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BatteryCharging,
  CarFront,
  CircleGauge,
  ScanLine,
  Sparkles,
  Wrench,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AutoService } from "@/types/service";

type ServiceCardProps = {
  service: AutoService;
  number: number;
};

const serviceIcons: Record<AutoService["icon"], LucideIcon> = {
  diagnostics: ScanLine,
  maintenance: Wrench,
  inspection: CarFront,
  detailing: Sparkles,
  electrical: BatteryCharging,
  tyres: CircleGauge,
};

export function ServiceCard({
  service,
  number,
}: ServiceCardProps) {
  const Icon = serviceIcons[service.icon];

  return (
    <article className="group flex h-full flex-col border border-white/10 bg-card/65 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:bg-card">
      <div className="flex items-start justify-between gap-5">
        <div className="grid size-12 place-items-center border border-brand-gold/25 bg-brand-gold/[0.055]">
          <Icon className="size-5 text-brand-gold" />
        </div>

        <span className="font-display text-xs tracking-[0.16em] text-muted-foreground">
          {String(number).padStart(2, "0")}
        </span>
      </div>

      <h2 className="mt-7 text-xl font-semibold tracking-[-0.025em]">
        {service.title}
      </h2>

      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {service.shortDescription}
      </p>

      <div className="mt-6 border-t border-white/10 pt-5">
        <p className="text-[0.65rem] tracking-[0.16em] text-brand-gold uppercase">
          Estimated service time
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          {service.duration}
        </p>
      </div>

      <Link
        href="#book-service"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "mt-6 w-full border-white/10 bg-white/[0.035] group-hover:border-brand-gold/30",
        )}
      >
        Book This Service
        <ArrowRight className="size-4" />
      </Link>
    </article>
  );
}