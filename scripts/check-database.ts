import "dotenv/config";

import { prisma } from "../src/lib/prisma";

async function main() {
  const [
    users,
    vehicles,
    listings,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.vehicle.count(),
    prisma.marketplaceListing.count(),
  ]);

  console.log(
    "Tavin Motors database connection successful.",
  );

  console.log({
    users,
    vehicles,
    listings,
  });
}

main()
  .catch((error) => {
    console.error(
      "Database connection failed:",
      error,
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });