import "dotenv/config";

import {
  vehicles,
} from "../src/data/vehicles";

import {
  prisma,
} from "../src/lib/prisma";

async function main() {
  console.log(
    `Synchronising ${vehicles.length} Tavin Motors vehicles...`,
  );

  for (
    const vehicle of vehicles
  ) {
    await prisma.vehicle.upsert({
      where: {
        slug:
          vehicle.slug,
      },

      update: {
        stockCode:
          vehicle.stockCode,

        make:
          vehicle.make,

        model:
          vehicle.model,

        trim:
          vehicle.trim ??
          null,

        year:
          vehicle.year,

        mileage:
          vehicle.mileage,

        price:
          vehicle.price,

        fuelType:
          vehicle.fuelType,

        transmission:
          vehicle.transmission,

        exteriorColor:
          vehicle.exteriorColor,

        interiorColor:
          vehicle.interiorColor ??
          null,

        bodyType:
          vehicle.bodyType ??
          null,

        engineSize:
          vehicle.engine ??
          null,

        driveType:
          vehicle.drivetrain ??
          null,

        status:
          vehicle.status,

        tone:
          vehicle.tone,

        location:
          vehicle.location ??
          null,

        description:
          vehicle.description ??
          null,

        featured:
          vehicle.featured,

        published:
          true,
      },

      create: {
        /*
         * Preserve the current
         * catalogue ID wherever
         * possible.
         */
        id:
          vehicle.id,

        stockCode:
          vehicle.stockCode,

        slug:
          vehicle.slug,

        make:
          vehicle.make,

        model:
          vehicle.model,

        trim:
          vehicle.trim ??
          null,

        year:
          vehicle.year,

        mileage:
          vehicle.mileage,

        price:
          vehicle.price,

        fuelType:
          vehicle.fuelType,

        transmission:
          vehicle.transmission,

        exteriorColor:
          vehicle.exteriorColor,

        interiorColor:
          vehicle.interiorColor ??
          null,

        bodyType:
          vehicle.bodyType ??
          null,

        engineSize:
          vehicle.engine ??
          null,

        driveType:
          vehicle.drivetrain ??
          null,

        status:
          vehicle.status,

        tone:
          vehicle.tone,

        location:
          vehicle.location ??
          null,

        description:
          vehicle.description ??
          null,

        featured:
          vehicle.featured,

        published:
          true,
      },
    });

    console.log(
      `✓ ${vehicle.stockCode} — ${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    );
  }

  console.log(
    `Vehicle synchronisation complete: ${vehicles.length} vehicles.`,
  );
}

main()
  .catch(
    (error) => {
      console.error(
        "Vehicle synchronisation failed:",
        error,
      );

      process.exitCode =
        1;
    },
  )
  .finally(
    async () => {
      await prisma.$disconnect();
    },
  );