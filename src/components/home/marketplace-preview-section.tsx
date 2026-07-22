import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";

import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { MarketplaceListingCard } from "@/components/marketplace/marketplace-listing-card";
import { buttonVariants } from "@/components/ui/button";
import { marketplaceListings } from "@/data/marketplace";
import { cn } from "@/lib/utils";

export function MarketplacePreviewSection() {
  const featuredListings = marketplaceListings
    .filter((listing) => listing.featured)
    .slice(0, 3);

  return (
    <section
      id="marketplace-preview"
      className="relative overflow-hidden border-b border-white/10 bg-black/20"
    >
      <div className="carbon-grid absolute inset-0 opacity-10" />

      <div className="absolute top-1/2 right-0 size-[30rem] -translate-y-1/2 rounded-full bg-brand-burgundy/10 blur-[140px]" />

      <div className="tm-container relative py-16 sm:py-20 lg:py-24">
        <HomeSectionHeading
          eyebrow="Local Vehicle Marketplace"
          title="Discover vehicles offered by local sellers."
          description="Browse moderated private and dealer listings through a marketplace designed to make local vehicle discovery more organised and transparent."
          action={
            <Link
              href="/marketplace"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-12 border-white/15 bg-white/5 hover:border-brand-gold/35 hover:bg-brand-gold/5",
              )}
            >
              Browse Marketplace
              <ArrowRight className="size-4" />
            </Link>
          }
        />

        <div className="mt-10 flex items-start gap-3 border border-brand-gold/20 bg-brand-gold/[0.035] p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand-gold" />

          <div>
            <p className="text-sm font-medium">
              Moderated marketplace experience
            </p>

            <p className="mt-1 text-xs leading-6 text-muted-foreground">
              Seller listings remain separate from official Tavin Motors
              inventory and will require administrative review before
              publication.
            </p>
          </div>
        </div>

        {featuredListings.length > 0 ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredListings.map((listing) => (
              <MarketplaceListingCard
                key={listing.id}
                listing={listing}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center">
            <p className="text-sm text-muted-foreground">
              Featured marketplace listings will appear here after
              approval.
            </p>
          </div>
        )}

        <div className="mt-10 grid gap-6 border border-white/10 bg-white/[0.025] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-brand-gold" />

              <p className="tm-eyebrow">
                Selling a vehicle?
              </p>
            </div>

            <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">
              Submit your car for marketplace review
            </h3>

            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Provide vehicle details, pricing and photographs. The
              advertisement will enter the moderation queue before becoming
              publicly visible.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/marketplace-rules"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-12 border-white/15 bg-white/5",
              )}
            >
              Review the Rules
            </Link>

            <Link
              href="/marketplace/sell"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "h-12 bg-primary px-7 shadow-[0_0_28px_rgb(164_32_42_/_18%)] hover:bg-primary/90",
              )}
            >
              Sell Your Car
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}