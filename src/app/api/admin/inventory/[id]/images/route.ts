import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { uploadVehicleImage } from "@/lib/cloudinary";


export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
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


  const formData =
    await request.formData();


  const file =
    formData.get(
      "image",
    );


  if (!(file instanceof File)) {
    return NextResponse.json(
      {
        message:
          "No image provided.",
      },
      {
        status:400,
      },
    );
  }


  const upload =
    await uploadVehicleImage({
      file,
      vehicleId:
        id,
    });


  const imageCount =
    await prisma.vehicleImage.count({
      where:{
        vehicleId:
          id,
      },
    });


  const image =
    await prisma.vehicleImage.create({
      data:{
        vehicleId:
          id,

        url:
          upload.secure_url,

        publicId:
          upload.public_id,

        sortOrder:
          imageCount,

        isPrimary:
          imageCount === 0,
      },
    });


  return NextResponse.json({
    image,
  });
}