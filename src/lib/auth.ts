import "dotenv/config";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  appName: "Tavin Motors",

  baseURL:
    process.env.BETTER_AUTH_URL,

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),

    nextCookies(),
  ],
});