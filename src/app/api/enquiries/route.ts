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
  contactSchema,
} from "@/lib/validations/contact";

import type {
  EnquiryCategory,
} from "@/generated/prisma/enums";

function resolveCategory(
  enquiryType: string,
): EnquiryCategory {
  switch (enquiryType) {
    case "vehicle":
      return "VEHICLE";

    case "import":
      return "IMPORT";

    case "marketplace":
      return "MARKETPLACE";

    case "service":
      return "SERVICE";

    case "partnership":
      return "PARTNERSHIP";

    case "general":
    default:
      return "GENERAL";
  }
}

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
            "Authentication is required to submit an enquiry.",
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
      contactSchema.safeParse(
        body,
      );

    if (!parsed.success) {
      return NextResponse.json(
        {
          message:
            "Please check your enquiry information and try again.",
        },
        {
          status: 400,
        },
      );
    }

    const values =
      parsed.data;

    const referenceCode =
      createReferenceCode(
        "ENQ",
      );

    const enquiry =
      await prisma.enquiry.create({
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

          preferredContactMethod:
            values.preferredMethod,

          category:
            resolveCategory(
              values.enquiryType,
            ),

          subject:
            values.subject,

          message:
            values.message,

          status:
            "NEW",
        },

        select: {
          id: true,
          referenceCode: true,
          category: true,
          status: true,
          createdAt: true,
        },
      });

    return NextResponse.json(
      {
        message:
          "Enquiry submitted successfully.",

        enquiry,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "Enquiry submission failed:",
      error,
    );

    return NextResponse.json(
      {
        message:
          "Unable to submit your enquiry right now. Please try again.",
      },
      {
        status: 500,
      },
    );
  }
}