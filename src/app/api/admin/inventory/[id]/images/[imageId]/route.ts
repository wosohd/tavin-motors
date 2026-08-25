import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { deleteCloudinaryImage } from "@/lib/cloudinary";


export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      imageId:string;
    }>;
  },
) {

  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });


  if (!session?.user) {
    return NextResponse.json(
      {},
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
    admin.banned
  ) {
    return NextResponse.json(
      {},
      {
        status:403,
      },
    );
  }


  const {
    imageId,
  } =
    await params;


  const image =
    await prisma.vehicleImage.findUnique({
      where:{
        id:
          imageId,
      },
    });


  if (!image) {
    return NextResponse.json(
      {},
      {
        status:404,
      },
    );
  }


  if (image.publicId) {
    await deleteCloudinaryImage(
      image.publicId,
    );
  }


  await prisma.vehicleImage.delete({
    where:{
      id:
        imageId,
    },
  });


  return NextResponse.json({
    message:
      "Vehicle image deleted.",
  });
}