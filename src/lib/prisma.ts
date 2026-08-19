import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/generated/prisma/client";

const databaseUrl =
  process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not configured.",
  );
}

const connectionUrl =
  new URL(databaseUrl);

const requiresTls =
  connectionUrl.searchParams.get(
    "sslmode",
  ) === "require";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({
  connectionString: databaseUrl,

  ...(requiresTls
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}