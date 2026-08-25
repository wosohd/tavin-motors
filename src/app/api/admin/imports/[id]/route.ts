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
        "REVIEWING",
        "SOURCING",
        "QUOTED",
        "APPROVED",
        "PURCHASED",
        "SHIPPING",
        "CLEARING",
        "READY_FOR_DELIVERY",
        "DELIVERED",
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
            "Invalid import status.",
        },
        {
          status:400,
        },
      );

    }



    const existing =
      await prisma.importRequest.findUnique({
        where:{
          id,
        },

        select:{
          id:true,
        },
      });



    if (!existing) {

      return NextResponse.json(
        {
          message:
            "Import request not found.",
        },
        {
          status:404,
        },
      );

    }



    const now =
      new Date();



    const updated =
      await prisma.importRequest.update({

        where:{
          id,
        },


        data:{

          status:
            parsed.data.status,


          quotedAt:
            parsed.data.status ===
            "QUOTED"
              ? now
              : undefined,


          completedAt:
            parsed.data.status ===
            "DELIVERED"
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
          quotedAt:true,
          completedAt:true,
          cancelledAt:true,
        },

      });



    return NextResponse.json({

      message:
        "Import request updated successfully.",

      request:
        updated,

    });


  } catch(error) {

    console.error(
      "Import request update failed:",
      error,
    );


    return NextResponse.json(
      {
        message:
          "Unable to update import request.",
      },
      {
        status:500,
      },
    );

  }

}