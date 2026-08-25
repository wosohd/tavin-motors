import type { Metadata } from "next";

import Link from "next/link";

import {
  Anchor,
  BadgeCheck,
  CarFront,
  ClipboardCheck,
  Ship,
} from "lucide-react";

import { PageHero } from "@/components/shared/page-hero";
import { IncomingVehicleCard } from "@/components/vehicles/incoming-vehicle-card";
import { buttonVariants } from "@/components/ui/button";

import {
  prisma,
} from "@/lib/prisma";

import {
  toPublicVehicle,
} from "@/lib/vehicle-adapter";

import {
  cn,
} from "@/lib/utils";


export const metadata: Metadata = {
  title: "Incoming Vehicles",
  description:
    "Track premium vehicles currently being shipped and prepared for arrival at Tavin Motors.",
};


const journeyStages = [
  {
    icon: ClipboardCheck,
    title: "Purchased and verified",
    description:
      "The vehicle has been sourced, inspected and confirmed for purchase.",
  },
  {
    icon: Ship,
    title: "Shipping preparation",
    description:
      "Export documentation and international shipping arrangements are completed.",
  },
  {
    icon: Anchor,
    title: "Port and clearance",
    description:
      "The vehicle arrives at port and proceeds through customs clearance.",
  },
  {
    icon: CarFront,
    title: "Ready for collection",
    description:
      "Final checks are completed before showroom display or customer collection.",
  },
];


export default async function IncomingVehiclesPage() {

  const databaseVehicles =
    await prisma.vehicle.findMany({

      where: {
        status:
          "INCOMING",

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


  const incomingVehicles =
    databaseVehicles.map(
      (vehicle) =>
        toPublicVehicle(
          vehicle,
        ),
    );


  return (

    <>

      <PageHero

        eyebrow="Arriving soon"

        title="Premium vehicles already on the way."

        description="Explore vehicles currently purchased, awaiting shipment or in transit. Register your interest before they reach the showroom."

      >

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">

          <p>

            <strong className="text-white">

              {
                incomingVehicles.length
              }

            </strong>{" "}

            vehicles currently tracked

          </p>


          <p>

            <strong className="text-white">
              Transparent
            </strong>{" "}

            arrival progress

          </p>


          <p>

            <strong className="text-white">
              Early
            </strong>{" "}

            reservation enquiries

          </p>

        </div>

      </PageHero>



      <section className="tm-container py-14 sm:py-16 lg:py-20">

        {incomingVehicles.length >
        0 ? (

          <div className="grid gap-6">

            {incomingVehicles.map(
              (vehicle) => (

                <IncomingVehicleCard
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

        ) : (

          <div className="border border-dashed border-white/15 bg-white/[0.025] px-6 py-20 text-center">

            <CarFront className="mx-auto size-8 text-brand-gold" />

            <h2 className="mt-5 text-xl font-semibold">
              No incoming vehicles currently listed
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
              Check back soon or submit a custom import request for the vehicle you want.
            </p>

            <Link
              href="/import-a-car"
              className={cn(
                buttonVariants({
                  size:
                    "lg",
                }),
                "mt-6",
              )}
            >
              Request a Custom Import
            </Link>

          </div>

        )}

      </section>



      <section className="border-y border-white/10 bg-white/[0.018]">

        <div className="tm-container py-14 sm:py-16 lg:py-20">

          <div className="max-w-2xl">

            <p className="tm-eyebrow">
              Import journey
            </p>


            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              From international purchase to local delivery
            </h2>


            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Every incoming vehicle moves through a structured sourcing, shipping and clearance process.
            </p>

          </div>



          <div className="mt-10 grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2 xl:grid-cols-4">

            {journeyStages.map(
              (
                stage,
                index,
              ) => {

                const Icon =
                  stage.icon;


                return (

                  <article
                    key={
                      stage.title
                    }
                    className="relative bg-background p-6"
                  >

                    <span className="absolute top-5 right-5 text-xs text-brand-gold">

                      {
                        String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )
                      }

                    </span>


                    <Icon className="size-6 text-brand-gold" />


                    <h3 className="mt-8 text-lg font-semibold">
                      {stage.title}
                    </h3>


                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {stage.description}
                    </p>

                  </article>

                );

              },
            )}

          </div>

        </div>

      </section>



      <section className="tm-container py-14 sm:py-16 lg:py-20">

        <div className="relative overflow-hidden border border-brand-gold/20 bg-brand-gold/[0.045] p-7 sm:p-10">

          <div className="absolute -top-28 right-0 size-72 rounded-full bg-brand-burgundy/25 blur-[100px]" />


          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

            <div className="max-w-2xl">

              <div className="flex items-center gap-2">

                <BadgeCheck className="size-5 text-brand-gold" />

                <p className="tm-eyebrow">
                  Early interest
                </p>

              </div>


              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
                Looking for a different vehicle?
              </h2>


              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Submit your requirements and let Tavin Motors source a vehicle suited to your preferences, budget and intended use.
              </p>

            </div>


            <Link
              href="/import-a-car"
              className={cn(
                buttonVariants({
                  size:
                    "lg",
                }),
                "h-12 shrink-0 bg-primary px-7 hover:bg-primary/90",
              )}
            >

              Request a Custom Import

            </Link>

          </div>

        </div>

      </section>

    </>

  );
}