import type { Metadata } from "next";

import { notFound } from "next/navigation";
import Link from "next/link";

import {
  ArrowLeft,
  Mail,
  Phone,
} from "lucide-react";

import {
  AdminEnquiryActions,
} from "@/components/dashboard/admin-enquiry-actions";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";


export const metadata: Metadata = {
  title: "Review Enquiry",
};


function formatStatus(
  status: string,
) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase(),
    );
}


export default async function AdminEnquiryReviewPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const {
    id,
  } = await params;


  const enquiry =
    await prisma.enquiry.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },

        vehicle: {
          select: {
            make: true,
            model: true,
            year: true,
            slug: true,
          },
        },

        assignedTo: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });


  if (!enquiry) {
    notFound();
  }


  return (
    <div className="space-y-8">

      <Link
        href="/admin/enquiries"
        className={cn(
          buttonVariants({
            variant:
              "outline",
          }),
        )}
      >
        <ArrowLeft className="size-4" />
        Back to enquiries
      </Link>


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Customer enquiry
        </p>


        <div className="mt-4 flex flex-wrap items-center gap-3">

          <h1 className="text-3xl font-semibold tracking-[-0.035em]">
            {enquiry.subject}
          </h1>


          <Badge
            variant="outline"
          >
            {formatStatus(
              enquiry.status,
            )}
          </Badge>

        </div>


        <p className="mt-3 text-sm text-muted-foreground">
          Reference:
          {" "}
          {enquiry.referenceCode}
        </p>

      </header>


      <section className="grid gap-6 lg:grid-cols-2">


        <div className="rounded-2xl border border-border bg-card/70 p-6">

          <h2 className="text-lg font-semibold">
            Customer details
          </h2>


          <div className="mt-5 space-y-4 text-sm">

            <p>
              <strong>Name:</strong>{" "}
              {
                enquiry.contactName ??
                enquiry.user.name
              }
            </p>


            <p className="flex items-center gap-2">
              <Mail className="size-4" />

              {
                enquiry.contactEmail ??
                enquiry.user.email
              }
            </p>


            {enquiry.contactPhone && (
              <p className="flex items-center gap-2">
                <Phone className="size-4" />

                {
                  enquiry.contactPhone
                }
              </p>
            )}


            <p>
              <strong>Preferred contact:</strong>{" "}
              {
                enquiry.preferredContactMethod ??
                "Not specified"
              }
            </p>

          </div>

        </div>


        <div className="rounded-2xl border border-border bg-card/70 p-6">

          <h2 className="text-lg font-semibold">
            Enquiry details
          </h2>


          <div className="mt-5 space-y-4 text-sm">

            <p>
              <strong>Category:</strong>{" "}
              {
                enquiry.category
              }
            </p>


            <p>
              <strong>Submitted:</strong>{" "}
              {
                enquiry.createdAt.toLocaleString(
                  "en-KE",
                )
              }
            </p>


            {enquiry.vehicle && (
              <p>
                <strong>Vehicle:</strong>{" "}
                {
                  enquiry.vehicle.year
                }{" "}
                {
                  enquiry.vehicle.make
                }{" "}
                {
                  enquiry.vehicle.model
                }
              </p>
            )}

          </div>

        </div>


      </section>


      <section className="rounded-2xl border border-border bg-card/70 p-6">

        <h2 className="text-lg font-semibold">
          Customer message
        </h2>


        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
          {
            enquiry.message
          }
        </p>

      </section>


      <AdminEnquiryActions
        enquiryId={
          enquiry.id
        }

        currentStatus={
          enquiry.status
        }
      />

    </div>
  );
}