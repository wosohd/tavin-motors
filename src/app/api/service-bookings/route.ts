import {
  NextResponse,
} from "next/server";

import {
  auth,
} from "@/lib/auth";

import {
  prisma,
} from "@/lib/prisma";

import {
  createReferenceCode,
} from "@/lib/reference-code";

import {
  serviceBookingSchema,
} from "@/lib/validations/service-booking";

function parsePreferredDate(
  value: string,
) {
  /*
   * The browser date input supplies
   * YYYY-MM-DD without a timezone.
   *
   * Store it at midday UTC so the
   * intended calendar date remains
   * stable when displayed across
   * common timezones.
   */
  const date =
    new Date(
      `${value}T12:00:00.000Z`,
    );

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return null;
  }

  return date;
}

export async function POST(
  request: Request,
) {
  try {
    /*
     * Server-side authentication
     * is the actual security
     * boundary.
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
            "Authentication is required to submit a service booking.",
        },
        {
          status: 401,
        },
      );
    }

    let body: unknown;

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          message:
            "The request body is invalid.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Validate the submitted data
     * again on the server.
     */
    const parsed =
      serviceBookingSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "Please check your service booking information and try again.",
        },
        {
          status: 400,
        },
      );
    }

    const values =
      parsed.data;

    const preferredDate =
      parsePreferredDate(
        values.preferredDate,
      );

    if (!preferredDate) {
      return NextResponse.json(
        {
          message:
            "Please select a valid preferred service date.",
        },
        {
          status: 400,
        },
      );
    }

    const referenceCode =
      createReferenceCode(
        "SVC",
      );

    const serviceBooking =
      await prisma.serviceBooking.create({
        data: {
          userId:
            session.user.id,

          referenceCode,

          contactName:
            values.fullName,

          contactPhone:
            values.phone,

          contactEmail:
            values.email ||
            null,

          serviceType:
            values.service,

          vehicleDescription:
            values.vehicle,

          vehicleRegistration:
            values.registration ||
            null,

          preferredDate,

          preferredTime:
            values.preferredTime,

          notes:
            values.message ||
            null,

          status:
            "PENDING",
        },

        select: {
          id: true,
          referenceCode: true,
          serviceType: true,
          preferredDate: true,
          preferredTime: true,
          status: true,
          createdAt: true,
        },
      });

    return NextResponse.json(
      {
        message:
          "Service booking submitted successfully.",

        serviceBooking,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Service booking submission failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to submit your service booking right now. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}