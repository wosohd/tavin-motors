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


const enquiryUpdateSchema =
  z.object({
    status: z.enum([
      "IN_PROGRESS",
      "REPLIED",
      "CLOSED",
    ]),

    adminNotes:
      z.string()
        .trim()
        .max(
          1000,
          "Admin notes are too long.",
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
     * Confirm authenticated user.
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


    /*
     * Confirm administrator role.
     */
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
      admin.banned === true
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
      enquiryUpdateSchema.safeParse(
        body,
      );


    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "Invalid enquiry update.",
        },
        {
          status: 400,
        },
      );
    }


    const existing =
      await prisma.enquiry.findUnique({
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
            "Enquiry not found.",
        },
        {
          status: 404,
        },
      );
    }


    const now =
      new Date();


    const updated =
      await prisma.enquiry.update({
        where: {
          id,
        },

        data: {
          status:
            parsed.data.status,

          adminNotes:
            parsed.data.adminNotes ??
            undefined,

          repliedAt:
            parsed.data.status ===
            "REPLIED"
              ? now
              : undefined,

          closedAt:
            parsed.data.status ===
            "CLOSED"
              ? now
              : undefined,
        },

        select: {
          id: true,
          referenceCode: true,
          status: true,
          adminNotes: true,
          repliedAt: true,
          closedAt: true,
        },
      });


    return NextResponse.json({
      message:
        "Enquiry updated successfully.",

      enquiry:
        updated,
    });


  } catch (error) {

    console.error(
      "Enquiry update failed:",
      error,
    );


    return NextResponse.json(
      {
        message:
          "Unable to update enquiry.",
      },
      {
        status: 500,
      },
    );

  }
}