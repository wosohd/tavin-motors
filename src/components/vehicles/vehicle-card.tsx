import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Fuel,
  Gauge,
  Settings2,
} from "lucide-react";

import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatMileage,
  formatVehiclePrice,
} from "@/data/vehicles";
import type { Vehicle } from "@/types/vehicle";

type VehicleCardProps = {
  vehicle: Vehicle;
};

const statusLabels: Record<Vehicle["status"], string> = {
  IN_STOCK: "In Stock",
  INCOMING: "Incoming",
  IMPORTABLE: "Available to Import",
  MARKETPLACE: "Local Market",
};

export function VehicleCard({
  vehicle,
}: VehicleCardProps) {
  return (
    <article className="group overflow-hidden border border-white/10 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-[0_24px_80px_rgb(0_0_0_/_32%)]">
      <Link
        href={`/vehicles/${vehicle.slug}`}
        aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
        className="block"
      >
        <VehicleVisual
          vehicle={vehicle}
          compact
          className="aspect-[16/10]"
        />
      </Link>

      <div className="p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Badge
              variant="outline"
              className="border-brand-gold/30 bg-brand-gold/5 text-brand-gold"
            >
              {statusLabels[vehicle.status]}
            </Badge>

            <h2 className="mt-4 text-xl font-semibold tracking-[-0.025em]">
              {vehicle.year} {vehicle.make}{" "}
              {vehicle.model}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {vehicle.trim}
            </p>
          </div>

          <ArrowUpRight
            aria-hidden="true"
            className="mt-1 size-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-gold"
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-white/10 py-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <CalendarDays
              aria-hidden="true"
              className="size-3.5 text-brand-gold"
            />
            {vehicle.year}
          </span>

          <span className="flex items-center gap-2">
            <Gauge
              aria-hidden="true"
              className="size-3.5 text-brand-gold"
            />
            {formatMileage(vehicle.mileage)} km
          </span>

          <span className="flex items-center gap-2">
            <Fuel
              aria-hidden="true"
              className="size-3.5 text-brand-gold"
            />
            {vehicle.fuelType}
          </span>

          <span className="flex items-center gap-2">
            <Settings2
              aria-hidden="true"
              className="size-3.5 text-brand-gold"
            />
            {vehicle.transmission}
          </span>
        </div>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-[0.65rem] tracking-[0.17em] text-muted-foreground uppercase">
              Asking price
            </p>

            <p className="mt-1 text-lg font-semibold text-foreground">
              {formatVehiclePrice(vehicle.price)}
            </p>
          </div>

          <Link
            href={`/vehicles/${vehicle.slug}`}
            className={cn(
              buttonVariants({
                variant: "outline",
                size: "sm",
              }),
              "border-white/10 bg-white/5 hover:border-brand-gold/30 hover:bg-brand-gold/5",
            )}
          >
            View Car
          </Link>
        </div>
      </div>
    </article>
  );
}