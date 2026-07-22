import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Car,
  Check,
  Clock3,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Palette,
  Settings2,
  ShieldCheck,
  Tag,
  UserRound,
} from "lucide-react";

import { MarketplaceListingCard } from "@/components/marketplace/marketplace-listing-card";
import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  formatListingDate,
  getMarketplaceListingBySlug,
  getRelatedMarketplaceListings,
  marketplaceListings,
} from "@/data/marketplace";
import {
  formatMileage,
  formatVehiclePrice,
} from "@/data/vehicles";
import { cn } from "@/lib/utils";

type MarketplaceListingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return marketplaceListings.map((listing) => ({
    slug: listing.slug,
  }));
}

export async function generateMetadata({
  params,
}: MarketplaceListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = getMarketplaceListingBySlug(slug);

  if (!listing) {
    return {
      title: "Marketplace Listing Not Found",
    };
  }

  return {
    title: `${listing.year} ${listing.make} ${listing.model} for Sale`,
    description: listing.description,
  };
}

export default async function MarketplaceListingPage({
  params,
}: MarketplaceListingPageProps) {
  const { slug } = await params;
  const listing = getMarketplaceListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const relatedListings =
    getRelatedMarketplaceListings(listing);

  const specifications = [
    {
      icon: CalendarDays,
      label: "Year",
      value: listing.year.toString(),
    },
    {
      icon: Gauge,
      label: "Mileage",
      value: `${formatMileage(listing.mileage)} km`,
    },
    {
      icon: Fuel,
      label: "Fuel",
      value: listing.fuelType,
    },
    {
      icon: Settings2,
      label: "Transmission",
      value: listing.transmission,
    },
    {
      icon: Car,
      label: "Body type",
      value: listing.bodyType,
    },
    {
      icon: ShieldCheck,
      label: "Drivetrain",
      value: listing.drivetrain,
    },
    {
      icon: Palette,
      label: "Exterior",
      value: listing.exteriorColor,
    },
    {
      icon: MapPin,
      label: "Location",
      value: listing.location,
    },
  ];

  return (
    <>
      <section className="border-b border-white/10 bg-black/20">
        <div className="tm-container py-6">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to marketplace
          </Link>
        </div>
      </section>

      <section className="tm-container py-10 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">
          <VehicleVisual
            vehicle={listing}
            className="min-h-[28rem] border border-white/10 lg:min-h-[38rem]"
          />

          <div>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-primary text-white">
                Local Marketplace
              </Badge>

              <Badge
                variant="outline"
                className="border-brand-gold/30 text-brand-gold"
              >
                {listing.condition}
              </Badge>

              {listing.seller.verified && (
                <Badge
                  variant="outline"
                  className="border-emerald-500/25 text-emerald-400"
                >
                  <BadgeCheck className="size-3.5" />
                  Verified Seller
                </Badge>
              )}
            </div>

            <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-[-0.045em] sm:text-5xl">
              {listing.year} {listing.make} {listing.model}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">
              {listing.trim}
            </p>

            <p className="mt-7 text-base leading-8 text-muted-foreground">
              {listing.description}
            </p>

            <div className="mt-7 border-y border-white/10 py-6">
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Seller price
              </p>

              <div className="mt-2 flex items-center gap-4">
                <p className="text-3xl font-semibold">
                  {formatVehiclePrice(listing.price)}
                </p>

                {listing.negotiable && (
                  <span className="text-sm text-brand-gold">
                    Negotiable
                  </span>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/contact?listing=${listing.slug}`}
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "h-12 bg-primary hover:bg-primary/90",
                )}
              >
                <MessageCircle className="size-4" />
                Enquire About Listing
              </Link>

              <Link
                href="/marketplace/sell"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-12 border-white/15 bg-white/5",
                )}
              >
                Sell Your Car
              </Link>
            </div>

            <div className="mt-7 border border-brand-gold/20 bg-brand-gold/[0.04] p-5">
              <p className="text-sm font-semibold">
                Important buyer notice
              </p>

              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                This is a third-party demonstration listing. Tavin
                Motors does not currently guarantee ownership,
                condition or seller claims. Buyers should inspect the
                vehicle and verify documentation before payment.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="tm-container py-14 sm:py-16">
          <p className="tm-eyebrow">
            Vehicle information
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
            Listing specifications
          </h2>

          <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {specifications.map((specification) => {
              const Icon = specification.icon;

              return (
                <div
                  key={specification.label}
                  className="bg-background p-5"
                >
                  <Icon className="size-5 text-brand-gold" />

                  <p className="mt-5 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {specification.label}
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {specification.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr]">
          <div>
            <p className="tm-eyebrow">
              Included equipment
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
              Seller-listed features
            </h2>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {listing.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 border border-white/10 bg-white/[0.025] p-4"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gold/10">
                    <Check className="size-3.5 text-brand-gold" />
                  </span>

                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit border border-white/10 bg-card/70 p-6">
            <div className="flex items-center gap-4">
              <div className="grid size-12 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/[0.055]">
                <UserRound className="size-5 text-brand-gold" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">
                    {listing.seller.displayName}
                  </h2>

                  {listing.seller.verified && (
                    <BadgeCheck className="size-4 text-emerald-400" />
                  )}
                </div>

                <p className="mt-1 text-xs text-muted-foreground">
                  {listing.seller.sellerType}
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-y border-white/10 py-5 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="size-4 text-brand-gold" />
                  Location
                </span>

                <span>{listing.seller.location}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Clock3 className="size-4 text-brand-gold" />
                  Member since
                </span>

                <span>{listing.seller.memberSince}</span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Tag className="size-4 text-brand-gold" />
                  Listings
                </span>

                <span>{listing.seller.listingsCount}</span>
              </div>
            </div>

            <p className="mt-5 text-xs leading-6 text-muted-foreground">
              {listing.seller.responseTime}
            </p>

            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Listed on {formatListingDate(listing.listedAt)}
            </p>
          </aside>
        </div>
      </section>

      {relatedListings.length > 0 && (
        <section className="border-t border-white/10 bg-black/20">
          <div className="tm-container py-14 sm:py-16 lg:py-20">
            <p className="tm-eyebrow">
              Explore more
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
              Related local listings
            </h2>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedListings.map((relatedListing) => (
                <MarketplaceListingCard
                  key={relatedListing.id}
                  listing={relatedListing}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}