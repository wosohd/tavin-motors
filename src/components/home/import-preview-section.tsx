import Link from "next/link";

import {
  ArrowRight,
  BadgeCheck,
  ClipboardList,
  SearchCheck,
  ShieldCheck,
  Ship,
} from "lucide-react";

import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import { prisma } from "@/lib/prisma";
import { toPublicVehicle } from "@/lib/vehicle-adapter";
import { cn } from "@/lib/utils";


const importSteps = [
  {
    icon: ClipboardList,
    title: "Share requirements",
    description:
      "Tell us your preferred model, year, features and estimated budget.",
  },
  {
    icon: SearchCheck,
    title: "Vehicle sourcing",
    description:
      "Suitable options are identified from trusted international markets.",
  },
  {
    icon: ShieldCheck,
    title: "Inspect and approve",
    description:
      "Vehicle details and condition are reviewed before purchase approval.",
  },
  {
    icon: Ship,
    title: "Ship and deliver",
    description:
      "Shipping, clearance support and final handover complete the journey.",
  },
];


export async function ImportPreviewSection() {

  const databaseVehicle =
    await prisma.vehicle.findFirst({

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


  const importOpportunity =
    databaseVehicle
      ? toPublicVehicle(
          databaseVehicle,
        )
      : null;


  return (

    <section
      id="import-preview"
      className="relative overflow-hidden border-b border-white/10"
    >

      <div className="absolute top-1/2 left-0 size-[26rem] -translate-y-1/2 rounded-full bg-brand-gold/5 blur-[140px]" />


      <div className="tm-container relative py-16 sm:py-20 lg:py-24">


        <HomeSectionHeading

          eyebrow="Assisted Vehicle Import"

          title="Your ideal vehicle, sourced beyond borders."

          description="Tavin Motors guides customers through vehicle sourcing, inspection, purchase coordination, shipping and local clearance support."

        />



        <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">


          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">


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
                    className="relative bg-background p-6"
                  >

                    <span className="absolute top-5 right-5 text-[0.65rem] tracking-[0.16em] text-brand-gold">

                      {
                        String(
                          index + 1,
                        ).padStart(
                          2,
                          "0",
                        )
                      }

                    </span>


                    <div className="grid size-11 place-items-center border border-brand-gold/25 bg-brand-gold/[0.045]">

                      <Icon className="size-5 text-brand-gold" />

                    </div>


                    <h3 className="mt-6 text-lg font-semibold">

                      {
                        step.title
                      }

                    </h3>


                    <p className="mt-3 text-sm leading-7 text-muted-foreground">

                      {
                        step.description
                      }

                    </p>


                  </article>

                );

              },
            )}

          </div>




          {importOpportunity ? (

            <article className="overflow-hidden border border-brand-gold/20 bg-card/70">

              <div className="grid h-full md:grid-cols-[1.05fr_0.95fr]">


                <Link

                  href={`/vehicles/${importOpportunity.slug}`}

                  aria-label={`View ${importOpportunity.year} ${importOpportunity.make} ${importOpportunity.model}`}

                >

                  <VehicleVisual

                    vehicle={
                      importOpportunity
                    }

                    className="h-full min-h-80"

                  />

                </Link>




                <div className="flex flex-col p-6 sm:p-8">


                  <div className="flex flex-wrap items-center gap-2">


                    <Badge className="bg-primary text-white">

                      Available to Import

                    </Badge>



                    <Badge
                      variant="outline"
                      className="border-brand-gold/30 text-brand-gold"
                    >

                      International sourcing

                    </Badge>


                  </div>




                  <p className="tm-eyebrow mt-7">

                    Featured Opportunity

                  </p>




                  <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">

                    {
                      importOpportunity.year
                    }{" "}
                    {
                      importOpportunity.make
                    }{" "}
                    {
                      importOpportunity.model
                    }

                  </h3>




                  <p className="mt-1 text-sm text-muted-foreground">

                    {
                      importOpportunity.trim
                    }

                  </p>




                  <p className="mt-5 text-sm leading-7 text-muted-foreground">

                    {
                      importOpportunity.description
                    }

                  </p>




                  <div className="mt-6 border-y border-white/10 py-5">


                    <p className="text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">

                      Demonstration landed price

                    </p>



                    <p className="mt-2 text-2xl font-semibold">

                      KES{" "}

                      {
                        importOpportunity.price.toLocaleString()
                      }

                    </p>


                  </div>





                  <div className="mt-5 flex items-start gap-3">


                    <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand-gold" />



                    <p className="text-xs leading-6 text-muted-foreground">

                      Final sourcing availability, inspection information and landed quotation will be confirmed before purchase.

                    </p>


                  </div>




                  <div className="mt-auto grid gap-3 pt-7 sm:grid-cols-2">


                    <Link

                      href="/import-a-car"

                      className={cn(
                        buttonVariants({
                          size:
                            "lg",
                        }),
                        "h-12 bg-primary hover:bg-primary/90",
                      )}

                    >

                      Start an Import

                      <ArrowRight className="size-4" />

                    </Link>




                    <Link

                      href={`/vehicles/${importOpportunity.slug}`}

                      className={cn(
                        buttonVariants({
                          variant:
                            "outline",
                          size:
                            "lg",
                        }),
                        "h-12 border-white/15 bg-white/5",
                      )}

                    >

                      View Vehicle

                    </Link>


                  </div>


                </div>


              </div>


            </article>


          ) : (


            <div className="grid min-h-96 place-items-center border border-dashed border-white/15 bg-white/[0.025] p-8 text-center">


              <div>


                <p className="text-lg font-semibold">

                  Custom import assistance

                </p>



                <p className="mt-3 text-sm leading-7 text-muted-foreground">

                  Submit your preferred vehicle requirements and receive guided sourcing assistance.

                </p>



                <Link

                  href="/import-a-car"

                  className={cn(
                    buttonVariants({
                      size:
                        "lg",
                    }),
                    "mt-6 bg-primary hover:bg-primary/90",
                  )}

                >

                  Request an Import

                </Link>


              </div>


            </div>


          )}



        </div>




        <div className="mt-8 flex flex-col items-start justify-between gap-5 border border-white/10 bg-white/[0.025] p-6 sm:flex-row sm:items-center">


          <div>

            <p className="font-semibold">

              Cannot find the exact vehicle you want?

            </p>


            <p className="mt-2 text-sm leading-7 text-muted-foreground">

              Share your specifications and let the team prepare a personalised sourcing direction.

            </p>


          </div>



          <Link

            href="/import-a-car"

            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-brand-gold transition-colors hover:text-white"

          >

            Submit Your Requirements

            <ArrowRight className="size-4" />

          </Link>


        </div>


      </div>


    </section>

  );
}