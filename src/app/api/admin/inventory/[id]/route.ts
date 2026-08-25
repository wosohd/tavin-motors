import {
  NextResponse,
} from "next/server";

import {
  headers,
} from "next/headers";

import {
  z,
} from "zod";

import {
  auth,
} from "@/lib/auth";

import {
  prisma,
} from "@/lib/prisma";


const vehicleUpdateSchema =
  z.object({

    price:
      z.number()
        .int()
        .positive()
        .optional(),

    description:
      z.string()
        .max(
          3000,
          "Description is too long.",
        )
        .optional(),

    location:
      z.string()
        .max(
          100,
        )
        .optional(),

    status:
      z.enum([
        "IN_STOCK",
        "INCOMING",
        "IMPORTABLE",
        "MARKETPLACE",
      ])
      .optional(),

    featured:
      z.boolean()
        .optional(),

    published:
      z.boolean()
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
      vehicleUpdateSchema.safeParse(
        body,
      );


    if (!parsed.success) {

      return NextResponse.json(
        {
          message:
            "Invalid vehicle update.",
        },
        {
          status: 400,
        },
      );

    }



    const existing =
      await prisma.vehicle.findUnique({
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
            "Vehicle not found.",
        },
        {
          status: 404,
        },
      );

    }



    const updated =
      await prisma.vehicle.update({

        where: {
          id,
        },

        data: {
          ...parsed.data,
        },

        select: {
          id: true,
          stockCode: true,
          make: true,
          model: true,
          price: true,
          status: true,
          featured: true,
          published: true,
          updatedAt: true,
        },

      });



    return NextResponse.json({

      message:
        "Vehicle updated successfully.",

      vehicle:
        updated,

    });


  } catch(error) {

    console.error(
      "Vehicle update failed:",
      error,
    );


    return NextResponse.json(
      {
        message:
          "Unable to update vehicle.",
      },
      {
        status:500,
      },
    );

  }

}