import type { Metadata } from "next";
import {
  BadgeCheck,
  CircleDollarSign,
  FileCheck2,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Marketplace Rules",
  description:
    "Review the proposed listing, buyer-safety and seller-conduct rules for the Tavin Motors marketplace.",
};

const rules = [
  {
    icon: FileCheck2,
    title: "Accurate information",
    description:
      "Sellers must provide truthful vehicle specifications, mileage, condition, ownership and price information.",
  },
  {
    icon: BadgeCheck,
    title: "Ownership authority",
    description:
      "A seller must own the vehicle or have clear authority from the legal owner to advertise it.",
  },
  {
    icon: TriangleAlert,
    title: "Known issues",
    description:
      "Material mechanical, structural or documentation concerns should not be intentionally concealed.",
  },
  {
    icon: CircleDollarSign,
    title: "Safe payment",
    description:
      "Buyers should not transfer funds before verifying the vehicle, seller identity and ownership documents.",
  },
  {
    icon: ShieldAlert,
    title: "Moderation",
    description:
      "Tavin Motors may reject, suspend or remove listings that appear misleading, duplicated, suspicious or incomplete.",
  },
];

export default function MarketplaceRulesPage() {
  return (
    <>
      <PageHero
        eyebrow="Marketplace standards"
        title="Clear rules for safer local listings."
        description="These proposed marketplace rules explain the expected conduct of sellers and important precautions for buyers."
      />

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-5 md:grid-cols-2">
          {rules.map((rule, index) => {
            const Icon = rule.icon;

            return (
              <article
                key={rule.title}
                className="border border-white/10 bg-white/[0.025] p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="grid size-11 place-items-center border border-brand-gold/25 bg-brand-gold/[0.045]">
                    <Icon className="size-5 text-brand-gold" />
                  </div>

                  <span className="text-xs text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h2 className="mt-7 text-xl font-semibold">
                  {rule.title}
                </h2>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {rule.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 border border-brand-gold/20 bg-brand-gold/[0.04] p-6">
          <h2 className="text-lg font-semibold">
            Draft policy notice
          </h2>

          <p className="mt-3 text-sm leading-7 text-muted-foreground">
            These marketplace guidelines explain how listings are reviewed,
published and managed on the Tavin Motors platform.
          </p>
        </div>
      </section>
    </>
  );
}