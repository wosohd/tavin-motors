import {
  NextResponse,
} from "next/server";

import {
  headers,
} from "next/headers";

import {
  prisma,
} from "@/lib/prisma";

import {
  auth,
} from "@/lib/auth";

import {
  z,
} from "zod";

const moderationSchema =
  z.object({
    status: z.enum([
      "APPROVED",
      "REJECTED",
      "CHANGES_REQUESTED",
    ]),

    moderationNote:
      z.string()
        .trim()
        .max(
          500,
          "Moderation note is too long.",
        )
        .optional(),
  });


export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  try {
    /*
     * Server-side admin protection.
     */
    const session =
      await auth.api.getSession({
        headers:
          await headers(),
      });

    if (!session?.user) {
      return NextResponse.json(
        {
          message:
            "Authentication required.",
        },
        {
          status: 401,
        },
      );
    }


    const admin =
      await prisma.user.findUnique({
        where: {
          id:
            session.user.id,
        },

        select: {
          role: true,
          banned: true,
        },
      });


    if (
      admin?.role !== "admin" ||
      admin.banned
    ) {
      return NextResponse.json(
        {
          message:
            "Administrator access required.",
        },
        {
          status: 403,
        },
      );
    }


    const {
      id,
    } =
      await params;


    const body =
      await request.json();


    const parsed =
      moderationSchema.safeParse(
        body,
      );


    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "Invalid moderation request.",
        },
        {
          status: 400,
        },
      );
    }


    const existing =
      await prisma.marketplaceListing.findUnique({
        where: {
          id,
        },

        select: {
          id: true,
        },
      });


    if (!existing) {
      return NextResponse.json(
        {
          message:
            "Marketplace listing not found.",
        },
        {
          status: 404,
        },
      );
    }


    const now =
      new Date();


    const updated =
      await prisma.marketplaceListing.update({
        where: {
          id,
        },

        data: {
          status:
            parsed.data.status,

          moderationNote:
            parsed.data
              .moderationNote ??
            null,

          reviewedAt:
            now,

          reviewedById:
            session.user.id,

          publishedAt:
            parsed.data.status ===
            "APPROVED"
              ? now
              : null,
        },

        select: {
          id: true,
          status: true,
          moderationNote: true,
          reviewedAt: true,
        },
      });


    return NextResponse.json({
      message:
        "Marketplace listing updated successfully.",

      listing:
        updated,
    });

  } catch (error) {
    console.error(
      "Marketplace moderation failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to update marketplace listing.",
      },
      {
        status: 500,
      },
    );
  }
}