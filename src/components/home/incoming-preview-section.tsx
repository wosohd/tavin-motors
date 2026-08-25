import Link from "next/link";

import {
  ArrowRight,
  CalendarClock,
  MapPin,
  Ship,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { toPublicVehicle } from "@/lib/vehicle-adapter";
import { cn } from "@/lib/utils";

import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";


export async function IncomingPreviewSection() {

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


      take:
        2,


      orderBy: {
        createdAt:
          "desc",
      },

    });


  const incomingVehicles =
    databaseVehicles.map(
      (vehicle) =>
        toPublicVehicle(vehicle),
    );


  return (
    <section
      id="incoming-preview"
      className="relative overflow-hidden border-b border-white/10 bg-black/20"
    >

      <div className="carbon-grid absolute inset-0 opacity-10" />

      <div className="absolute top-0 right-0 size-[30rem] rounded-full bg-brand-burgundy/10 blur-[140px]" />


      <div className="tm-container relative py-16 sm:py-20 lg:py-24">


        <HomeSectionHeading

          eyebrow="Arriving Soon"

          title="Track premium vehicles already on the way."

          description="View vehicles currently purchased, awaiting shipment or moving through the international import journey."

          action={

            <Link

              href="/incoming"

              className={cn(
                buttonVariants({
                  variant:
                    "outline",
                  size:
                    "lg",
                }),
                "h-12 border-white/15 bg-white/5 hover:border-brand-gold/35",
              )}

            >

              View Incoming Vehicles

              <ArrowRight className="size-4" />

            </Link>

          }

        />



        <div className="mt-10 grid gap-6 xl:grid-cols-2">


          {incomingVehicles.map(
            (vehicle) => {

              const progress =
                0;


              return (

                <article

                  key={
                    vehicle.id
                  }

                  className="group overflow-hidden border border-white/10 bg-card/65 transition-colors hover:border-brand-gold/30"

                >

                  <div className="grid h-full md:grid-cols-[0.88fr_1.12fr]">


                    <Link

                      href={`/vehicles/${vehicle.slug}`}

                      aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}

                    >

                      <VehicleVisual

                        vehicle={
                          vehicle
                        }

                        compact

                        className="h-full min-h-72"

                      />

                    </Link>



                    <div className="flex flex-col p-6">


                      <div className="flex items-center justify-between gap-3">

                        <Badge className="bg-primary text-white">

                          Incoming

                        </Badge>


                        <span className="text-[0.65rem] tracking-[0.16em] text-muted-foreground uppercase">

                          {
                            vehicle.stockCode
                          }

                        </span>


                      </div>



                      <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">

                        {
                          vehicle.year
                        }{" "}
                        {
                          vehicle.make
                        }{" "}
                        {
                          vehicle.model
                        }

                      </h3>



                      <p className="mt-1 text-sm text-muted-foreground">

                        {
                          vehicle.trim
                        }

                      </p>




                      <div className="mt-6 space-y-3 text-xs text-muted-foreground">


                        <p className="flex items-center gap-2">

                          <MapPin className="size-4 text-brand-gold" />

                          Origin: International

                        </p>



                        <p className="flex items-center gap-2">

                          <Ship className="size-4 text-brand-gold" />

                          Status:
                          {" "}
                          {
                            vehicle.location
                          }

                        </p>



                        <p className="flex items-center gap-2">

                          <CalendarClock className="size-4 text-brand-gold" />

                          Arrival date pending

                        </p>


                      </div>




                      <div className="mt-6">


                        <div className="flex items-center justify-between text-xs">

                          <span className="font-medium">

                            Import progress

                          </span>


                          <span className="text-brand-gold">

                            {
                              progress
                            }%

                          </span>


                        </div>



                        <div
                          role="progressbar"
                          aria-label={`${vehicle.make} ${vehicle.model} import progress`}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={progress}
                          className="mt-3 h-1.5 overflow-hidden bg-white/10"
                        >

                          <div

                            className="h-full bg-gradient-to-r from-brand-burgundy via-brand-red to-brand-gold"

                            style={{
                              width:
                                `${progress}%`,
                            }}

                          />

                        </div>


                      </div>




                      <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/10 pt-6">


                        <div>

                          <p className="text-[0.62rem] tracking-[0.16em] text-muted-foreground uppercase">

                            Expected price

                          </p>


                          <p className="mt-1 font-semibold">

                            KES{" "}
                            {
                              vehicle.price.toLocaleString()
                            }

                          </p>


                        </div>



                        <Link

                          href={`/vehicles/${vehicle.slug}`}

                          className={cn(
                            buttonVariants({
                              variant:
                                "outline",
                              size:
                                "sm",
                            }),
                            "border-white/10 bg-white/5",
                          )}

                        >

                          View Details

                        </Link>


                      </div>


                    </div>


                  </div>


                </article>

              );

            },
          )}


        </div>


      </div>


    </section>
  );
}