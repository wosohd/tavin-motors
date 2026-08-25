import type { Metadata } from "next";

import { prisma } from "@/lib/prisma";

import { toPublicVehicle } from "@/lib/vehicle-adapter";

import { PageHero } from "@/components/shared/page-hero";
import { VehicleBrowser } from "@/components/vehicles/vehicle-browser";


export const metadata: Metadata = {
  title:
    "Vehicles in Stock",

  description:
    "Explore premium vehicles currently available from Tavin Motors.",
};


export default async function VehiclesPage() {

  const vehicles =
    await prisma.vehicle.findMany({
      where: {
        status:
          "IN_STOCK",

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

      orderBy: [
        {
          featured:
            "desc",
        },

        {
          createdAt:
            "desc",
        },
      ],
    });


  const publicVehicles =
    vehicles.map(
      (vehicle) =>
        toPublicVehicle(vehicle),
    );


  return (
    <>
      <PageHero
        eyebrow="Tavin Motors Inventory"
        title="Premium vehicles, ready for the road."
        description="Explore carefully selected vehicles currently available from Tavin Motors. Search and refine the collection by make, body type and price."
      >

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">

          <p>
            <strong className="text-white">
              {
                publicVehicles.length
              }
            </strong>{" "}
            vehicles available
          </p>


          <p>
            <strong className="text-white">
              Verified
            </strong>{" "}
            vehicle information
          </p>


          <p>
            <strong className="text-white">
              Flexible
            </strong>{" "}
            enquiry options
          </p>

        </div>

      </PageHero>



      <section className="tm-container py-14 sm:py-16 lg:py-20">

        <VehicleBrowser
          vehicles={
            publicVehicles
          }
        />

      </section>

    </>
  );
}