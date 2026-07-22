import type { Metadata } from "next";
import Link from "next/link";
import {
  BadgeCheck,
  FileCheck2,
  ShieldAlert,
  UserRoundCheck,
} from "lucide-react";

import { MarketplaceBrowser } from "@/components/marketplace/marketplace-browser";
import { PageHero } from "@/components/shared/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { marketplaceListings } from "@/data/marketplace";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Local Vehicle Marketplace",
  description:
    "Browse moderated local vehicle listings or submit your own car for sale through Tavin Motors.",
};

const marketplacePrinciples = [
  {
    icon: FileCheck2,
    title: "Listings reviewed",
    description:
      "Submitted adverts remain pending until the Tavin Motors team reviews the information.",
  },
  {
    icon: UserRoundCheck,
    title: "Seller identification",
    description:
      "Production accounts will support seller information and verification checks.",
  },
  {
    icon: ShieldAlert,
    title: "Buyer responsibility",
    description:
      "Buyers should independently inspect vehicles and verify ownership before payment.",
  },
];

export default function MarketplacePage() {
  return (
    <>
      <PageHero
        eyebrow="Tavin Local Marketplace"
        title="Discover vehicles available within the local market."
        description="Browse private and dealer listings through a moderated platform designed to make local vehicle discovery clearer and more convenient."
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/marketplace/sell"
            className={cn(
              buttonVariants({
                size: "lg",
              }),
              "h-12 bg-primary px-7 hover:bg-primary/90",
            )}
          >
            Sell Your Car
          </Link>

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
            Marketplace Rules
          </Link>
        </div>
      </PageHero>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <MarketplaceBrowser listings={marketplaceListings} />
      </section>

      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="tm-container py-14 sm:py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <BadgeCheck className="size-5 text-brand-gold" />

              <p className="tm-eyebrow">
                Marketplace approach
              </p>
            </div>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              A moderated local selling experience
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The final platform will review advertisements before
              publication and provide tools for reporting misleading
              or suspicious listings.
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {marketplacePrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="bg-background p-7"
                >
                  <Icon className="size-6 text-brand-gold" />

                  <h3 className="mt-7 text-xl font-semibold">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}