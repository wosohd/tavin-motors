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


const updateSchema =
  z.object({

    status:
      z.enum([
        "CONFIRMED",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED",
      ]),

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
     * Verify authenticated user
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
          status:401,
        },
      );

    }



    /*
     * Verify admin role
     */
    const admin =
      await prisma.user.findUnique({
        where:{
          id:
            session.user.id,
        },

        select:{
          role:true,
          banned:true,
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
          status:403,
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
      updateSchema.safeParse(
        body,
      );


    if (!parsed.success) {

      return NextResponse.json(
        {
          message:
            "Invalid booking status.",
        },
        {
          status:400,
        },
      );

    }



    const booking =
      await prisma.serviceBooking.findUnique({
        where:{
          id,
        },

        select:{
          id:true,
        },
      });



    if (!booking) {

      return NextResponse.json(
        {
          message:
            "Service booking not found.",
        },
        {
          status:404,
        },
      );

    }



    const now =
      new Date();



    const updated =
      await prisma.serviceBooking.update({

        where:{
          id,
        },


        data:{

          status:
            parsed.data.status,


          confirmedAt:
            parsed.data.status ===
            "CONFIRMED"
              ? now
              : undefined,


          completedAt:
            parsed.data.status ===
            "COMPLETED"
              ? now
              : undefined,


          cancelledAt:
            parsed.data.status ===
            "CANCELLED"
              ? now
              : undefined,

        },


        select:{
          id:true,
          referenceCode:true,
          status:true,
          confirmedAt:true,
          completedAt:true,
          cancelledAt:true,
        },

      });



    return NextResponse.json({

      message:
        "Service booking updated successfully.",

      booking:
        updated,

    });



  } catch(error) {

    console.error(
      "Service booking update failed:",
      error,
    );


    return NextResponse.json(
      {
        message:
          "Unable to update service booking.",
      },
      {
        status:500,
      },
    );

  }

}