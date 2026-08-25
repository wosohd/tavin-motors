import Link from "next/link";
import { ArrowRight, BadgeCheck } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { toPublicVehicle } from "@/lib/vehicle-adapter";
import { cn } from "@/lib/utils";

import { HomeSectionHeading } from "@/components/home/home-section-heading";
import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { buttonVariants } from "@/components/ui/button";


export async function FeaturedVehiclesSection() {

  const vehicles =
    await prisma.vehicle.findMany({
      where: {
        featured: true,
        published: true,
        status: "IN_STOCK",
      },

      include: {
        images: {
          orderBy: {
            sortOrder:
              "asc",
          },
        },
      },

      take: 3,

      orderBy: {
        createdAt:
          "desc",
      },
    });


  const featuredVehicles =
    vehicles.map(
      (vehicle) =>
        toPublicVehicle(vehicle),
    );


  return (
    <section
      id="featured-vehicles"
      className="relative border-b border-white/10"
    >

      <div className="tm-container py-16 sm:py-20 lg:py-24">

        <HomeSectionHeading
          eyebrow="Featured Inventory"
          title="Selected vehicles, ready to drive."
          description="Explore a carefully presented selection from the current Tavin Motors inventory."
          action={
            <Link
              href="/vehicles"
              className={cn(
                buttonVariants({
                  variant:"outline",
                  size:"lg",
                }),
                "h-12 border-white/15 bg-white/5 hover:border-brand-gold/35 hover:bg-brand-gold/5",
              )}
            >
              Browse All Inventory
              <ArrowRight className="size-4" />
            </Link>
          }
        />


        <div className="mt-10 flex items-start gap-3 border border-brand-gold/20 bg-brand-gold/[0.035] p-4">

          <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand-gold" />

          <p className="text-xs leading-6 text-muted-foreground">
            Vehicle information is managed through the live Tavin Motors inventory system.
          </p>

        </div>


        {featuredVehicles.length > 0 ? (

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {featuredVehicles.map(
              (vehicle) => (

                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                />

              ),
            )}

          </div>

        ) : (

          <div className="mt-8 border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center">

            <p className="text-sm text-muted-foreground">
              Featured vehicles will appear here after they are selected.
            </p>

          </div>

        )}

      </div>

    </section>
  );
}