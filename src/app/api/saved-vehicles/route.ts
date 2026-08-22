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
  savedVehicleActionSchema,
} from "@/lib/validations/saved-vehicle";

/*
 * GET supports two uses:
 *
 * /api/saved-vehicles
 *   → return all vehicles saved by
 *     the authenticated customer.
 *
 * /api/saved-vehicles?vehicleSlug=...
 *   → determine whether one vehicle
 *     is currently saved.
 */
export async function GET(
  request: Request,
) {
  try {
    const session =
      await auth.api.getSession({
        headers:
          request.headers,
      });

    if (!session?.user) {
      return NextResponse.json(
        {
          message:
            "Authentication is required to view saved vehicles.",
        },
        {
          status: 401,
        },
      );
    }

    const url =
      new URL(
        request.url,
      );

    const vehicleSlug =
      url.searchParams
        .get(
          "vehicleSlug",
        )
        ?.trim();

    /*
     * If a slug was supplied,
     * return only the save state
     * for that particular vehicle.
     */
    if (vehicleSlug) {
      const vehicle =
        await prisma.vehicle.findUnique({
          where: {
            slug:
              vehicleSlug,
          },

          select: {
            id: true,
            slug: true,
            published: true,
          },
        });

      if (
        !vehicle ||
        !vehicle.published
      ) {
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

      const savedVehicle =
        await prisma.savedVehicle.findUnique({
          where: {
            userId_vehicleId: {
              userId:
                session.user.id,

              vehicleId:
                vehicle.id,
            },
          },

          select: {
            id: true,
            createdAt: true,
          },
        });

      return NextResponse.json({
        saved:
          Boolean(
            savedVehicle,
          ),

        savedVehicle:
          savedVehicle ?? null,
      });
    }

    /*
     * No slug was supplied.
     *
     * Return the customer's
     * complete saved-vehicle
     * collection. This response
     * will power the dashboard
     * during the final sub-step.
     */
    const savedVehicles =
      await prisma.savedVehicle.findMany({
        where: {
          userId:
            session.user.id,
        },

        orderBy: {
          createdAt:
            "desc",
        },

        select: {
          id: true,
          createdAt: true,

          vehicle: {
            select: {
              id: true,
              slug: true,
              stockCode: true,

              make: true,
              model: true,
              trim: true,
              year: true,

              mileage: true,
              price: true,

              fuelType: true,
              transmission: true,

              exteriorColor: true,

              status: true,
              tone: true,

              published: true,
            },
          },
        },
      });

    return NextResponse.json({
      savedVehicles,
    });
  } catch (error) {
    console.error(
      "Saved vehicle lookup failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to load saved vehicles right now.",
      },
      {
        status: 500,
      },
    );
  }
}

/*
 * POST
 *
 * Save a vehicle for the current
 * authenticated customer.
 */
export async function POST(
  request: Request,
) {
  try {
    const session =
      await auth.api.getSession({
        headers:
          request.headers,
      });

    if (!session?.user) {
      return NextResponse.json(
        {
          message:
            "Authentication is required to save a vehicle.",
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

    const parsed =
      savedVehicleActionSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "The selected vehicle is invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const vehicle =
      await prisma.vehicle.findUnique({
        where: {
          slug:
            parsed.data
              .vehicleSlug,
        },

        select: {
          id: true,
          slug: true,
          make: true,
          model: true,
          year: true,
          published: true,
        },
      });

    if (
      !vehicle ||
      !vehicle.published
    ) {
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

    /*
     * The database already has a
     * unique userId + vehicleId
     * constraint.
     *
     * Upsert makes the action
     * idempotent: clicking Save
     * twice cannot create duplicate
     * records.
     */
    const savedVehicle =
      await prisma.savedVehicle.upsert({
        where: {
          userId_vehicleId: {
            userId:
              session.user.id,

            vehicleId:
              vehicle.id,
          },
        },

        update: {},

        create: {
          userId:
            session.user.id,

          vehicleId:
            vehicle.id,
        },

        select: {
          id: true,
          createdAt: true,

          vehicle: {
            select: {
              id: true,
              slug: true,
              make: true,
              model: true,
              year: true,
            },
          },
        },
      });

    return NextResponse.json(
      {
        message:
          "Vehicle saved successfully.",

        saved: true,

        savedVehicle,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "Save vehicle failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to save this vehicle right now.",
      },
      {
        status: 500,
      },
    );
  }
}

/*
 * DELETE
 *
 * Remove one vehicle from the
 * authenticated customer's
 * saved collection.
 */
export async function DELETE(
  request: Request,
) {
  try {
    const session =
      await auth.api.getSession({
        headers:
          request.headers,
      });

    if (!session?.user) {
      return NextResponse.json(
        {
          message:
            "Authentication is required to remove a saved vehicle.",
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

    const parsed =
      savedVehicleActionSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "The selected vehicle is invalid.",
        },
        {
          status: 400,
        },
      );
    }

    const vehicle =
      await prisma.vehicle.findUnique({
        where: {
          slug:
            parsed.data
              .vehicleSlug,
        },

        select: {
          id: true,
        },
      });

    if (!vehicle) {
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

    /*
     * deleteMany makes removal
     * idempotent. It is safe even
     * if the vehicle was already
     * removed in another tab.
     */
    await prisma.savedVehicle.deleteMany({
      where: {
        userId:
          session.user.id,

        vehicleId:
          vehicle.id,
      },
    });

    return NextResponse.json({
      message:
        "Vehicle removed from saved vehicles.",

      saved: false,
    });
  } catch (error) {
    console.error(
      "Remove saved vehicle failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to remove this saved vehicle right now.",
      },
      {
        status: 500,
      },
    );
  }
}