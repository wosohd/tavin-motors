import type { Metadata } from "next";

import {
  BadgeCheck,
  CarFront,
  ClipboardList,
  KeyRound,
  SearchCheck,
  ShieldCheck,
  Ship,
} from "lucide-react";

import { ImportRequestForm } from "@/components/forms/import-request-form";
import { PageHero } from "@/components/shared/page-hero";
import { VehicleCard } from "@/components/vehicles/vehicle-card";

import {
  prisma,
} from "@/lib/prisma";

import {
  toPublicVehicle,
} from "@/lib/vehicle-adapter";


export const metadata: Metadata = {
  title: "Import a Car",
  description:
    "Request personalised vehicle sourcing, inspection, shipping and import assistance from Tavin Motors.",
};


const importSteps = [
  {
    icon: ClipboardList,
    title: "Share your requirements",
    description:
      "Tell us your preferred make, model, year, features and estimated budget.",
  },
  {
    icon: SearchCheck,
    title: "Vehicle sourcing",
    description:
      "Suitable options are identified from trusted international markets and suppliers.",
  },
  {
    icon: ShieldCheck,
    title: "Inspection and approval",
    description:
      "Vehicle details and condition are reviewed before the customer approves the purchase.",
  },
  {
    icon: Ship,
    title: "Purchase and shipping",
    description:
      "After approval, purchasing, export documentation and shipping arrangements begin.",
  },
  {
    icon: BadgeCheck,
    title: "Clearance and preparation",
    description:
      "The vehicle proceeds through customs clearance, registration support and final checks.",
  },
  {
    icon: KeyRound,
    title: "Collection or delivery",
    description:
      "The customer receives the vehicle after the agreed completion and handover process.",
  },
];


const serviceBenefits = [
  "Personalised vehicle sourcing",
  "Vehicle-history and condition review",
  "Clear quotation before purchase",
  "Shipping-document coordination",
  "Import-progress communication",
  "Customs-clearance support",
];


export default async function ImportCarPage() {

  const databaseVehicles =
    await prisma.vehicle.findMany({

      where: {
        status:
          "IMPORTABLE",

        published:
          true,
      },

      include: {
        images: {
          orderBy: {
            sortOrder:
              "asc",
          },
        },
      },

      orderBy: {
        createdAt:
          "desc",
      },

    });


  const importableVehicles =
    databaseVehicles.map(
      (vehicle) =>
        toPublicVehicle(
          vehicle,
        ),
    );


  return (

    <>

      <PageHero

        eyebrow="Assisted vehicle import"

        title="Your ideal car, sourced beyond borders."

        description="Tell us what you are looking for and let Tavin Motors guide the process from international sourcing and inspection to shipping, clearance and delivery."

      >

        <div className="flex flex-wrap gap-3">

          {serviceBenefits
            .slice(0, 3)
            .map(
              (benefit) => (

                <span
                  key={
                    benefit
                  }
                  className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.035] px-3 py-2 text-xs text-muted-foreground"
                >

                  <BadgeCheck className="size-3.5 text-brand-gold" />

                  {benefit}

                </span>

              ),
            )}

        </div>

      </PageHero>



      <section className="tm-container py-14 sm:py-16 lg:py-20">

        <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">

          <div>

            <p className="tm-eyebrow">
              How it works
            </p>


            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              A guided import process
            </h2>


            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Tavin Motors guides customers through sourcing, inspection, purchase, shipping, clearance and final vehicle handover.
            </p>


            <div className="mt-9">

              {importSteps.map(
                (
                  step,
                  index,
                ) => {

                  const Icon =
                    step.icon;


                  return (

                    <article
                      key={
                        step.title
                      }
                      className="relative grid grid-cols-[3rem_1fr] gap-4 pb-8 last:pb-0"
                    >

                      {index <
                        importSteps.length -
                          1 && (

                        <div className="absolute top-11 bottom-0 left-[1.45rem] w-px bg-white/10" />

                      )}


                      <div className="relative z-10 grid size-12 place-items-center border border-brand-gold/25 bg-background">

                        <Icon className="size-5 text-brand-gold" />

                      </div>


                      <div className="pt-1">

                        <p className="text-[0.65rem] tracking-[0.18em] text-brand-gold uppercase">
                          Step{" "}
                          {index + 1}
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

                },
              )}

            </div>

          </div>


          <ImportRequestForm />

        </div>

      </section>



      <section className="border-y border-white/10 bg-white/[0.018]">

        <div className="tm-container py-14 sm:py-16 lg:py-20">

          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">

            <div>

              <p className="tm-eyebrow">
                Why import with us
              </p>


              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                Support throughout the journey
              </h2>


              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Customers receive a coordinated experience rather than managing sourcing, inspection, shipping and clearance independently.
              </p>

            </div>


            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">

              {serviceBenefits.map(
                (benefit) => (

                  <div
                    key={
                      benefit
                    }
                    className="flex items-center gap-3 bg-background p-5"
                  >

                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-gold/10">

                      <BadgeCheck className="size-4 text-brand-gold" />

                    </span>


                    <span className="text-sm text-muted-foreground">
                      {benefit}
                    </span>

                  </div>

                ),
              )}

            </div>

          </div>

        </div>

      </section>



      {importableVehicles.length >
        0 && (

        <section className="tm-container py-14 sm:py-16 lg:py-20">

          <div className="max-w-2xl">

            <div className="flex items-center gap-2">

              <CarFront className="size-5 text-brand-gold" />

              <p className="tm-eyebrow">
                Available opportunity
              </p>

            </div>


            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Vehicles currently available to import
            </h2>


            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Explore vehicles currently marked as available for assisted import through the Tavin Motors inventory system.
            </p>

          </div>


          <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {importableVehicles.map(
              (vehicle) => (

                <VehicleCard
                  key={
                    vehicle.id
                  }
                  vehicle={
                    vehicle
                  }
                />

              ),
            )}

          </div>

        </section>

      )}

    </>

  );
}