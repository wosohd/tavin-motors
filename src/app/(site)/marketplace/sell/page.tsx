import type { Metadata } from "next";
import {
  BadgeCheck,
  Camera,
  ClipboardCheck,
  FileSearch,
  Globe2,
} from "lucide-react";

import { SellVehicleForm } from "@/components/forms/sell-vehicle-form";
import { PageHero } from "@/components/shared/page-hero";

export const metadata: Metadata = {
  title: "Sell Your Car",
  description:
    "Submit your vehicle for moderation and local marketplace advertising through Tavin Motors.",
};

const submissionSteps = [
  {
    icon: ClipboardCheck,
    title: "Complete the listing",
    description:
      "Provide seller details, vehicle specifications, price and a clear description.",
  },
  {
    icon: Camera,
    title: "Add clear photographs",
    description:
      "Upload exterior, interior, dashboard and other useful vehicle photographs.",
  },
  {
    icon: FileSearch,
    title: "Administrative review",
    description:
      "The Tavin Motors team checks the submission before publication.",
  },
  {
    icon: Globe2,
    title: "Listing published",
    description:
      "Approved advertisements become visible in the local marketplace.",
  },
];

export default function SellVehiclePage() {
  return (
    <>
      <PageHero
        eyebrow="Sell through Tavin Motors"
        title="Present your vehicle to local buyers."
        description="Create a detailed vehicle advertisement and submit it for moderation before it appears in the Tavin Motors local marketplace."
      >
        <div className="inline-flex items-center gap-2 border border-brand-gold/25 bg-brand-gold/[0.045] px-4 py-2 text-xs text-muted-foreground">
          <BadgeCheck className="size-4 text-brand-gold" />
          Listings are reviewed before publication.
        </div>
      </PageHero>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <p className="tm-eyebrow">
              Submission process
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              From submission to publication
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              The production platform will connect this process to
              seller accounts, image storage and the private admin
              moderation dashboard.
            </p>

            <div className="mt-9">
              {submissionSteps.map((step, index) => {
                const Icon = step.icon;

                return (
                  <article
                    key={step.title}
                    className="relative grid grid-cols-[3rem_1fr] gap-4 pb-8 last:pb-0"
                  >
                    {index < submissionSteps.length - 1 && (
                      <div className="absolute top-11 bottom-0 left-[1.45rem] w-px bg-white/10" />
                    )}

                    <div className="relative z-10 grid size-12 place-items-center border border-brand-gold/25 bg-background">
                      <Icon className="size-5 text-brand-gold" />
                    </div>

                    <div className="pt-1">
                      <p className="text-[0.65rem] tracking-[0.18em] text-brand-gold uppercase">
                        Stage {index + 1}
                      </p>

                      <h3 className="mt-1 text-lg font-semibold">
                        {step.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <SellVehicleForm />
        </div>
      </section>
    </>
  );
}