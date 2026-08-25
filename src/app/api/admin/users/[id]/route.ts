import { NextResponse } from "next/server";

import { headers } from "next/headers";

import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";


const userActionSchema =
  z.object({

    action:
      z.enum([
        "PROMOTE_ADMIN",
        "REMOVE_ADMIN",
        "BAN",
        "UNBAN",
      ]),

    banReason:
      z.string()
        .trim()
        .max(
          500,
          "Ban reason too long.",
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



    const currentAdmin =
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
      currentAdmin?.role !== "admin" ||
      currentAdmin.banned
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
      userActionSchema.safeParse(
        body,
      );



    if (!parsed.success) {

      return NextResponse.json(
        {
          message:
            "Invalid user action.",
        },
        {
          status:400,
        },
      );

    }



    const targetUser =
      await prisma.user.findUnique({

        where:{
          id,
        },

        select:{
          id:true,
          role:true,
          banned:true,
        },

      });



    if (!targetUser) {

      return NextResponse.json(
        {
          message:
            "User not found.",
        },
        {
          status:404,
        },
      );

    }



    let updateData = {};



    switch (
      parsed.data.action
    ) {

      case "PROMOTE_ADMIN":

        updateData = {
          role:
            "admin",
        };

        break;



      case "REMOVE_ADMIN":

        updateData = {
          role:
            "user",
        };

        break;



      case "BAN":

        updateData = {

          banned:
            true,

          banReason:
            parsed.data.banReason ??
            "Restricted by administrator.",

        };

        break;



      case "UNBAN":

        updateData = {

          banned:
            false,

          banReason:
            null,

          banExpires:
            null,

        };

        break;

    }



    const updated =
      await prisma.user.update({

        where:{
          id,
        },

        data:
          updateData,

        select:{
          id:true,
          name:true,
          email:true,
          role:true,
          banned:true,
          banReason:true,
        },

      });



    return NextResponse.json({

      message:
        "User updated successfully.",

      user:
        updated,

    });



  } catch(error) {

    console.error(
      "User update failed:",
      error,
    );


    return NextResponse.json(
      {
        message:
          "Unable to update user.",
      },
      {
        status:500,
      },
    );

  }

}