import "dotenv/config";

import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

import {
  sendPasswordResetEmail,
} from "@/lib/email";
import { prisma } from "@/lib/prisma";

function getTrustedOrigins() {
  const configuredOrigins =
    process.env.BETTER_AUTH_TRUSTED_ORIGINS
      ?.split(",")
      .map((origin) => origin.trim())
      .filter(Boolean) ?? [];

  const origins = [
    process.env.BETTER_AUTH_URL,
    ...configuredOrigins,
  ].filter(
    (origin): origin is string =>
      Boolean(origin),
  );

  return [...new Set(origins)];
}

export const auth = betterAuth({
  appName: "Tavin Motors",

  baseURL:
    process.env.BETTER_AUTH_URL,

  trustedOrigins:
    getTrustedOrigins(),

  database: prismaAdapter(
    prisma,
    {
      provider: "postgresql",
    },
  ),

  emailAndPassword: {
    enabled: true,

    autoSignIn: false,

    revokeSessionsOnPasswordReset:
      true,

    resetPasswordTokenExpiresIn:
      60 * 60,

   sendResetPassword: async (
  {
    user,
    url,
  },
  request,
) => {
  const resetUrl =
    new URL(url);

  const requestOrigin =
    request?.headers.get(
      "origin",
    );

  if (requestOrigin) {
    const origin =
      new URL(
        requestOrigin,
      );

    resetUrl.protocol =
      origin.protocol;

    resetUrl.host =
      origin.host;
  }

  void sendPasswordResetEmail({
    to: user.email,
    name:
      user.name ||
      "Tavin Motors customer",
    resetUrl:
      resetUrl.toString(),
  }).catch((error) => {
    console.error(
      "Password reset email failed:",
      error,
    );
  });
},

    onPasswordReset: async ({
      user,
    }) => {
      console.info(
        `Password reset completed for user ${user.id}.`,
      );
    },
  },

  plugins: [
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),

    nextCookies(),
  ],
});