import Link from "next/link";

import {
  ArrowUpRight,
  CalendarClock,
  Gauge,
  MapPin,
  Ship,
} from "lucide-react";

import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import {
  formatMileage,
  formatVehiclePrice,
} from "@/lib/vehicle-format";

import { cn } from "@/lib/utils";

import type { Vehicle } from "@/types/vehicle";


type IncomingVehicleCardProps = {
  vehicle: Vehicle;
};


export function IncomingVehicleCard({
  vehicle,
}: IncomingVehicleCardProps) {

  const progress =
    vehicle.progress ?? 0;


  return (

    <article className="overflow-hidden border border-white/10 bg-card/70">

      <div className="grid lg:grid-cols-[0.9fr_1.1fr]">

        <Link
          href={`/vehicles/${vehicle.slug}`}
          aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}
          className="block"
        >

          <VehicleVisual
            vehicle={vehicle}
            compact
            className="h-full min-h-72"
          />

        </Link>



        <div className="flex flex-col p-6 sm:p-7">

          <div className="flex flex-wrap items-center justify-between gap-3">

            <Badge className="bg-primary text-white">
              Incoming Vehicle
            </Badge>


            <span className="text-xs tracking-[0.16em] text-muted-foreground uppercase">
              {vehicle.stockCode}
            </span>

          </div>



          <h2 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">

            {vehicle.year}{" "}
            {vehicle.make}{" "}
            {vehicle.model}

          </h2>


          <p className="mt-1 text-sm text-muted-foreground">
            {vehicle.trim}
          </p>



          <div className="mt-6 grid grid-cols-2 gap-3 text-xs text-muted-foreground">

            <span className="flex items-center gap-2">

              <Gauge className="size-4 text-brand-gold" />

              {formatMileage(vehicle.mileage)} km

            </span>


            <span className="flex items-center gap-2">

              <MapPin className="size-4 text-brand-gold" />

              International

            </span>


            <span className="flex items-center gap-2">

              <Ship className="size-4 text-brand-gold" />

              {vehicle.location || "Transit"}

            </span>


            <span className="flex items-center gap-2">

              <CalendarClock className="size-4 text-brand-gold" />

              Arrival pending

            </span>

          </div>



          <div className="mt-7">

            <div className="flex items-center justify-between text-xs">

              <span className="font-medium">
                Import progress
              </span>


              <span className="text-brand-gold">
                {progress}%
              </span>

            </div>


            <div
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label={`${vehicle.make} ${vehicle.model} import progress`}
              className="mt-3 h-1.5 overflow-hidden bg-white/10"
            >

              <div
                className="h-full bg-gradient-to-r from-brand-burgundy via-brand-red to-brand-gold transition-[width] duration-700"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>


            <div className="mt-3 flex justify-between text-[0.62rem] tracking-[0.11em] text-muted-foreground uppercase">

              <span>Purchased</span>
              <span>Shipping</span>
              <span>Arrival</span>

            </div>

          </div>



          <div className="mt-7 flex items-end justify-between gap-4 border-t border-white/10 pt-5">

            <div>

              <p className="text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">
                Expected price
              </p>


              <p className="mt-1 text-lg font-semibold">

                {formatVehiclePrice(
                  vehicle.price,
                )}

              </p>

            </div>


            <Link
              href={`/vehicles/${vehicle.slug}`}
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "sm",
                }),
                "border-white/10 bg-white/5 hover:border-brand-gold/30",
              )}
            >

              View Details

              <ArrowUpRight className="size-4" />

            </Link>

          </div>

        </div>

      </div>

    </article>
  );
}