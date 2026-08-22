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
  importRequestSchema,
} from "@/lib/validations/import-request";

function resolveBudget(
  budget: string,
) {
  switch (budget) {
    case "below-3m":
      return {
        budgetMin: null,
        budgetMax: 3_000_000,
      };

    case "3m-5m":
      return {
        budgetMin: 3_000_000,
        budgetMax: 5_000_000,
      };

    case "5m-8m":
      return {
        budgetMin: 5_000_000,
        budgetMax: 8_000_000,
      };

    case "8m-12m":
      return {
        budgetMin: 8_000_000,
        budgetMax: 12_000_000,
      };

    case "above-12m":
      return {
        budgetMin: 12_000_000,
        budgetMax: null,
      };

    default:
      return {
        budgetMin: null,
        budgetMax: null,
      };
  }
}

function resolvePreferredYear(
  value: string,
) {
  if (
    !value ||
    value === "flexible"
  ) {
    return null;
  }

  const year =
    Number(value);

  if (
    !Number.isInteger(year)
  ) {
    return null;
  }

  return year;
}

export async function POST(
  request: Request,
) {
  try {
    /*
     * This is the actual security
     * boundary. The browser-side
     * session check is only UX.
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
            "Authentication is required to submit an import request.",
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
     * Never trust validation that
     * happened in the browser.
     * Validate everything again.
     */
    const parsed =
      importRequestSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "Please check the import request information and try again.",
        },
        {
          status: 400,
        },
      );
    }

    const values =
      parsed.data;

    const {
      budgetMin,
      budgetMax,
    } =
      resolveBudget(
        values.budget,
      );

    const referenceCode =
      createReferenceCode(
        "IMP",
      );

    const importRequest =
      await prisma.importRequest.create({
        data: {
          userId:
            session.user.id,

          referenceCode,

          contactName:
            values.fullName,

          contactPhone:
            values.phone,

          contactEmail:
            values.email || null,

          vehicleDescription:
            values.makeModel,

          preferredYear:
            resolvePreferredYear(
              values.yearFrom,
            ),

          budgetMin,
          budgetMax,

          preferredOrigin:
            values.origin,

          timeline:
            values.timeline,

          notes:
            values.notes || null,

          status:
            "SUBMITTED",
        },

        select: {
          id: true,
          referenceCode: true,
          status: true,
          submittedAt: true,
        },
      });

    return NextResponse.json(
      {
        message:
          "Import request submitted successfully.",

        importRequest,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Import request submission failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to submit the import request right now. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}