import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  Eye,
  Gem,
  Handshake,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Wrench,
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about the proposed Tavin Motors mission, vision, values and premium automotive-service approach.",
};

const companyAreas = [
  {
    icon: CarFront,
    title: "Vehicle sales",
    description:
      "Presenting carefully selected vehicles currently available for purchase.",
  },
  {
    icon: Route,
    title: "Assisted imports",
    description:
      "Helping customers source and import vehicles suited to their requirements.",
  },
  {
    icon: Users,
    title: "Local marketplace",
    description:
      "Creating a moderated space where local owners can advertise vehicles.",
  },
  {
    icon: Wrench,
    title: "Auto care",
    description:
      "Supporting customers with practical vehicle inspection and care services.",
  },
];

const companyValues = [
  {
    icon: ShieldCheck,
    title: "Transparency",
    description:
      "Clear vehicle information, processes and communication throughout the customer journey.",
  },
  {
    icon: Gem,
    title: "Quality",
    description:
      "A commitment to carefully presented vehicles and dependable automotive service.",
  },
  {
    icon: Handshake,
    title: "Customer partnership",
    description:
      "Listening carefully and helping each customer make a confident automotive decision.",
  },
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "Using modern digital experiences to simplify vehicle discovery, importing and ownership.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Tavin Motors"
        title="A modern automotive experience, built around trust."
        description="Tavin Motors is being developed as an integrated automotive platform for premium vehicle sales, assisted imports, local listings and professional vehicle care."
      >
        <div className="inline-flex items-center gap-2 border border-brand-gold/25 bg-brand-gold/[0.045] px-4 py-2 text-xs text-muted-foreground">
          <BadgeCheck className="size-4 text-brand-gold" />
          Company wording remains draft content pending client approval.
        </div>
      </PageHero>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="tm-eyebrow">
              Our direction
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              More than a conventional dealership
            </h2>
          </div>

          <div>
            <p className="text-lg leading-9 text-muted-foreground">
              The proposed Tavin Motors experience brings several parts
              of vehicle ownership into one refined platform. Customers
              can explore available inventory, discover incoming
              vehicles, request personalised import assistance, access
              a moderated local marketplace and arrange professional
              vehicle-care services.
            </p>

            <p className="mt-5 text-sm leading-8 text-muted-foreground">
              This page currently uses presentation-ready draft content.
              The company history, founders, physical location,
              certifications and operational milestones should only be
              added after the client supplies and approves those facts.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {companyAreas.map((area) => {
            const Icon = area.icon;

            return (
              <article
                key={area.title}
                className="bg-background p-6"
              >
                <Icon className="size-6 text-brand-gold" />

                <h3 className="mt-7 text-lg font-semibold">
                  {area.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {area.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="tm-container py-14 sm:py-16 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="relative overflow-hidden border border-white/10 bg-card/70 p-7 sm:p-9">
              <Target className="size-7 text-brand-gold" />

              <p className="tm-eyebrow mt-8">
                Our mission
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                Simplify confident vehicle ownership
              </h2>

              <p className="mt-5 text-sm leading-8 text-muted-foreground">
                To provide a transparent and customer-focused automotive
                experience that connects quality vehicle sales,
                personalised import support, trusted local listings and
                professional vehicle care.
              </p>

              <div className="absolute -right-20 -bottom-20 size-56 rounded-full bg-brand-burgundy/15 blur-[80px]" />
            </article>

            <article className="relative overflow-hidden border border-brand-gold/20 bg-brand-gold/[0.035] p-7 sm:p-9">
              <Eye className="size-7 text-brand-gold" />

              <p className="tm-eyebrow mt-8">
                Our vision
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                Become a trusted modern automotive destination
              </h2>

              <p className="mt-5 text-sm leading-8 text-muted-foreground">
                To build a recognised automotive platform where
                customers can discover, import, sell and care for
                vehicles through a consistent and high-quality digital
                and physical experience.
              </p>

              <div className="absolute -top-20 -right-20 size-56 rounded-full bg-brand-gold/10 blur-[80px]" />
            </article>
          </div>
        </div>
      </section>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="tm-eyebrow">
            What guides us
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Proposed company values
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            These values provide a strong initial brand direction and
            can be refined with the client before the production launch.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {companyValues.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="flex gap-5 border border-white/10 bg-white/[0.025] p-6"
              >
                <div className="grid size-11 shrink-0 place-items-center border border-brand-gold/25 bg-brand-gold/[0.045]">
                  <Icon className="size-5 text-brand-gold" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="tm-container py-14 sm:py-16 lg:py-20">
          <div className="relative overflow-hidden border border-brand-gold/20 bg-brand-gold/[0.04] p-7 sm:p-10">
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="tm-eyebrow">
                  Start your journey
                </p>

                <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                  Discover what Tavin Motors can help you find
                </h2>

                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  Browse available vehicles or submit your preferred
                  specifications for a personalised import consultation.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/vehicles"
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                    }),
                    "h-12 border-white/15 bg-white/5",
                  )}
                >
                  Browse Vehicles
                </Link>

                <Link
                  href="/import-a-car"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "h-12 bg-primary px-7 hover:bg-primary/90",
                  )}
                >
                  Import a Car
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}