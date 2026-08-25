import Link from "next/link";

import {
  ArrowUpRight,
  BadgeCheck,
  Fuel,
  Gauge,
  MapPin,
  Settings2,
} from "lucide-react";

import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import {
  formatMileage,
  formatVehiclePrice,
} from "@/lib/vehicle-format";

import { cn } from "@/lib/utils";

import type { MarketplaceListing } from "@/types/marketplace";


type MarketplaceListingCardProps = {
  listing: MarketplaceListing;
};


export function MarketplaceListingCard({
  listing,
}: MarketplaceListingCardProps) {

  return (

    <article className="group overflow-hidden border border-white/10 bg-card/70 transition-all duration-300 hover:-translate-y-1 hover:border-brand-gold/30 hover:shadow-[0_24px_80px_rgb(0_0_0_/_32%)]">

      <Link
        href={`/marketplace/${listing.slug}`}
        aria-label={`View ${listing.year} ${listing.make} ${listing.model}`}
        className="block"
      >

        <VehicleVisual
          vehicle={listing}
          compact
          className="aspect-[16/10]"
        />

      </Link>



      <div className="p-5 sm:p-6">

        <div className="flex flex-wrap items-center gap-2">

          <Badge
            variant="outline"
            className="border-brand-gold/30 bg-brand-gold/5 text-brand-gold"
          >
            {listing.condition}
          </Badge>


          {listing.seller.verified && (

            <Badge
              variant="outline"
              className="border-emerald-500/25 bg-emerald-500/5 text-emerald-400"
            >

              <BadgeCheck className="size-3.5" />

              Verified Seller

            </Badge>

          )}

        </div>



        <div className="mt-5 flex items-start justify-between gap-4">

          <div>

            <h2 className="text-xl font-semibold tracking-[-0.025em]">

              {listing.year}{" "}
              {listing.make}{" "}
              {listing.model}

            </h2>


            <p className="mt-1 text-sm text-muted-foreground">
              {listing.trim}
            </p>

          </div>


          <ArrowUpRight className="size-5 text-muted-foreground transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-brand-gold" />

        </div>



        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-white/10 py-4 text-xs text-muted-foreground">

          <span className="flex items-center gap-2">

            <Gauge className="size-3.5 text-brand-gold" />

            {formatMileage(listing.mileage)} km

          </span>


          <span className="flex items-center gap-2">

            <Fuel className="size-3.5 text-brand-gold" />

            {listing.fuelType}

          </span>


          <span className="flex items-center gap-2">

            <Settings2 className="size-3.5 text-brand-gold" />

            {listing.transmission}

          </span>


          <span className="flex items-center gap-2">

            <MapPin className="size-3.5 text-brand-gold" />

            {listing.county}

          </span>

        </div>



        <div className="mt-5">

          <div className="flex items-center justify-between gap-4">

            <div>

              <p className="text-[0.65rem] tracking-[0.17em] text-muted-foreground uppercase">
                Seller price
              </p>


              <p className="mt-1 text-lg font-semibold">

                {formatVehiclePrice(
                  listing.price,
                )}

              </p>

            </div>


            {listing.negotiable && (

              <span className="text-xs text-brand-gold">
                Negotiable
              </span>

            )}

          </div>



          <div className="mt-5 flex items-center justify-between gap-4 border-t border-white/10 pt-4">

            <div>

              <p className="text-xs font-medium">
                {listing.seller.displayName}
              </p>


              <p className="mt-1 text-[0.68rem] text-muted-foreground">
                {listing.seller.sellerType}
              </p>

            </div>


            <Link
              href={`/marketplace/${listing.slug}`}
              className={cn(
                buttonVariants({
                  variant:
                    "outline",
                  size:
                    "sm",
                }),
                "border-white/10 bg-white/5 hover:border-brand-gold/30",
              )}
            >

              View Listing

            </Link>

          </div>

        </div>

      </div>

    </article>

  );
}