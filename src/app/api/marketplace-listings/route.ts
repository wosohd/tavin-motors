import {
  randomUUID,
} from "node:crypto";

import {
  NextResponse,
} from "next/server";

import {
  auth,
} from "@/lib/auth";

import {
  deleteCloudinaryImage,
  uploadMarketplaceImage,
} from "@/lib/cloudinary";

import {
  prisma,
} from "@/lib/prisma";

import {
  createReferenceCode,
} from "@/lib/reference-code";

import {
  sellVehicleSchema,
} from "@/lib/validations/sell-vehicle";

export const runtime =
  "nodejs";

const allowedImageTypes =
  new Set([
    "image/jpeg",
    "image/png",
    "image/webp",
  ]);

const maximumImageSize =
  5 * 1024 * 1024;

function getFormString(
  formData: FormData,
  field: string,
) {
  const value =
    formData.get(
      field,
    );

  return typeof value ===
    "string"
    ? value
    : "";
}

function createListingSlug({
  make,
  model,
  year,
}: {
  make: string;
  model: string;
  year: string;
}) {
  const base =
    `${year}-${make}-${model}`
      .toLowerCase()
      .trim()
      .replace(
        /[^a-z0-9]+/g,
        "-",
      )
      .replace(
        /^-+|-+$/g,
        "",
      );

  const suffix =
    randomUUID()
      .replaceAll(
        "-",
        "",
      )
      .slice(
        0,
        8,
      )
      .toLowerCase();

  return `${base}-${suffix}`;
}

function parseRequiredInteger(
  value: string,
) {
  const number =
    Number(value);

  if (
    !Number.isSafeInteger(
      number,
    )
  ) {
    return null;
  }

  return number;
}

export async function POST(
  request: Request,
) {
  const uploadedPublicIds:
    string[] = [];

  try {
    /*
     * Real server-side
     * authentication boundary.
     */
    const session =
      await auth.api.getSession({
        headers:
          request.headers,
      });

    if (!session?.user) {
      return NextResponse.json(
        {
          message:
            "Authentication is required to submit a marketplace listing.",
        },
        {
          status: 401,
        },
      );
    }

    let formData: FormData;

    try {
      formData =
        await request.formData();
    } catch {
      return NextResponse.json(
        {
          message:
            "The marketplace submission could not be read.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Reconstruct the exact
     * serialisable object expected
     * by the existing Zod schema.
     */
    const candidate = {
      fullName:
        getFormString(
          formData,
          "fullName",
        ),

      phone:
        getFormString(
          formData,
          "phone",
        ),

      email:
        getFormString(
          formData,
          "email",
        ),

      make:
        getFormString(
          formData,
          "make",
        ),

      model:
        getFormString(
          formData,
          "model",
        ),

      trim:
        getFormString(
          formData,
          "trim",
        ),

      year:
        getFormString(
          formData,
          "year",
        ),

      price:
        getFormString(
          formData,
          "price",
        ),

      mileage:
        getFormString(
          formData,
          "mileage",
        ),

      transmission:
        getFormString(
          formData,
          "transmission",
        ),

      fuelType:
        getFormString(
          formData,
          "fuelType",
        ),

      bodyType:
        getFormString(
          formData,
          "bodyType",
        ),

      location:
        getFormString(
          formData,
          "location",
        ),

      condition:
        getFormString(
          formData,
          "condition",
        ),

      ownership:
        getFormString(
          formData,
          "ownership",
        ),

      exteriorColor:
        getFormString(
          formData,
          "exteriorColor",
        ),

      registration:
        getFormString(
          formData,
          "registration",
        ),

      description:
        getFormString(
          formData,
          "description",
        ),

      negotiable:
        getFormString(
          formData,
          "negotiable",
        ) === "true",

      acceptTerms:
        getFormString(
          formData,
          "acceptTerms",
        ) === "true",
    };

    /*
     * Never trust the browser's
     * validation.
     */
    const parsed =
      sellVehicleSchema.safeParse(
        candidate,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "Please check the seller and vehicle information and try again.",
        },
        {
          status: 400,
        },
      );
    }

    const values =
      parsed.data;

    const images =
      formData
        .getAll(
          "images",
        )
        .filter(
          (
            value,
          ): value is File =>
            value instanceof
            File,
        );

    if (
      images.length < 3 ||
      images.length > 8
    ) {
      return NextResponse.json(
        {
          message:
            "Select between three and eight vehicle images.",
        },
        {
          status: 400,
        },
      );
    }

    for (
      const file of images
    ) {
      if (
        !allowedImageTypes.has(
          file.type,
        )
      ) {
        return NextResponse.json(
          {
            message:
              "Only JPG, PNG and WebP vehicle images are supported.",
          },
          {
            status: 400,
          },
        );
      }

      if (
        file.size >
        maximumImageSize
      ) {
        return NextResponse.json(
          {
            message:
              "Each vehicle image must be smaller than 5 MB.",
          },
          {
            status: 400,
          },
        );
      }
    }

    const year =
      parseRequiredInteger(
        values.year,
      );

    const mileage =
      parseRequiredInteger(
        values.mileage,
      );

    const askingPrice =
      parseRequiredInteger(
        values.price,
      );

    if (
      year === null ||
      mileage === null ||
      askingPrice === null
    ) {
      return NextResponse.json(
        {
          message:
            "The year, mileage or asking price is invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const uploadedImages =
      [];

    /*
     * Upload sequentially so the
     * server does not hold several
     * large image buffers at once.
     */
    for (
      const file of images
    ) {
      const upload =
        await uploadMarketplaceImage({
          file,
          userId:
            session.user.id,
        });

      uploadedPublicIds.push(
        upload.public_id,
      );

      uploadedImages.push({
        url:
          upload.secure_url,

        publicId:
          upload.public_id,
      });
    }

    const referenceCode =
      createReferenceCode(
        "MKT",
      );

    const slug =
      createListingSlug({
        make:
          values.make,

        model:
          values.model,

        year:
          values.year,
      });

    const listing =
      await prisma.marketplaceListing.create({
        data: {
          sellerId:
            session.user.id,

          referenceCode,

          slug,

          contactName:
            values.fullName,

          contactPhone:
            values.phone,

          contactEmail:
            values.email ||
            null,

          make:
            values.make,

          model:
            values.model,

          trim:
            values.trim ||
            null,

          year,

          mileage,

          askingPrice,

          fuelType:
            values.fuelType,

          transmission:
            values.transmission,

          exteriorColor:
            values.exteriorColor,

          bodyType:
            values.bodyType ||
            null,

          registration:
            values.registration ||
            null,

          location:
            values.location,

          condition:
            values.condition,

          ownership:
            values.ownership,

          description:
            values.description ||
            null,

          negotiable:
            values.negotiable,

          status:
            "PENDING_REVIEW",

          submittedAt:
            new Date(),

          images: {
            create:
              uploadedImages.map(
                (
                  image,
                  index,
                ) => ({
                  url:
                    image.url,

                  publicId:
                    image.publicId,

                  sortOrder:
                    index,

                  isPrimary:
                    index ===
                    0,

                  altText:
                    `${values.year} ${values.make} ${values.model}`,
                }),
              ),
          },
        },

        select: {
          id: true,
          referenceCode: true,
          slug: true,
          status: true,
          submittedAt: true,

          images: {
            select: {
              id: true,
              url: true,
              sortOrder: true,
              isPrimary: true,
            },

            orderBy: {
              sortOrder:
                "asc",
            },
          },
        },
      });

    return NextResponse.json(
      {
        message:
          "Marketplace listing submitted successfully.",

        listing,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    /*
     * If image upload succeeded
     * but PostgreSQL failed, remove
     * the orphaned Cloudinary
     * assets.
     */
    if (
      uploadedPublicIds.length >
      0
    ) {
      await Promise.allSettled(
        uploadedPublicIds.map(
          (
            publicId,
          ) =>
            deleteCloudinaryImage(
              publicId,
            ),
        ),
      );
    }

    console.error(
      "Marketplace listing submission failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to submit the marketplace listing right now. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}