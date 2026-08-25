import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CarFront,
  Mail,
  Phone,
  Ship,
} from "lucide-react";

import {
  AdminImportActions,
} from "@/components/dashboard/admin-import-actions";

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
  title: "Review Import Request",
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


export default async function ImportReviewPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const {
    id,
  } = await params;


  const request =
    await prisma.importRequest.findUnique({
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
      },
    });


  if (!request) {
    notFound();
  }


  return (
    <div className="space-y-8">

      <Link
        href="/admin/imports"
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
        )}
      >
        <ArrowLeft className="size-4" />

        Back to imports
      </Link>



      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Vehicle sourcing
        </p>


        <div className="mt-4 flex flex-wrap items-center gap-3">

          <h1 className="text-3xl font-semibold tracking-[-0.035em]">
            Import Request
          </h1>


          <Badge variant="outline">
            {formatStatus(
              request.status,
            )}
          </Badge>

        </div>


        <p className="mt-3 text-sm text-muted-foreground">
          Reference:
          {" "}
          {request.referenceCode}
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
                request.contactName ??
                request.user.name
              }
            </p>


            <p className="flex items-center gap-2">
              <Mail className="size-4" />

              {
                request.contactEmail ??
                request.user.email
              }
            </p>


            {request.contactPhone && (
              <p className="flex items-center gap-2">
                <Phone className="size-4" />

                {
                  request.contactPhone
                }
              </p>
            )}

          </div>

        </div>




        <div className="rounded-2xl border border-border bg-card/70 p-6">

          <h2 className="flex items-center gap-2 text-lg font-semibold">

            <CarFront className="size-5 text-brand-gold" />

            Vehicle request

          </h2>


          <div className="mt-5 space-y-3 text-sm">

            <p>
              <strong>Vehicle:</strong>{" "}
              {
                request.vehicleDescription ??
                "Not specified"
              }
            </p>


            <p>
              <strong>Make:</strong>{" "}
              {
                request.make ??
                "Flexible"
              }
            </p>


            <p>
              <strong>Model:</strong>{" "}
              {
                request.model ??
                "Flexible"
              }
            </p>


            <p>
              <strong>Year:</strong>{" "}
              {
                request.preferredYear ??
                "Flexible"
              }
            </p>

          </div>

        </div>


      </section>




      <section className="rounded-2xl border border-border bg-card/70 p-6">

        <h2 className="flex items-center gap-2 text-lg font-semibold">

          <Ship className="size-5 text-brand-gold" />

          Import preferences

        </h2>


        <div className="mt-5 grid gap-4 sm:grid-cols-2 text-sm">

          <p>
            <strong>Origin:</strong>{" "}
            {
              request.preferredOrigin ??
              "Not specified"
            }
          </p>


          <p>
            <strong>Color:</strong>{" "}
            {
              request.preferredColor ??
              "Not specified"
            }
          </p>


          <p>
            <strong>Fuel:</strong>{" "}
            {
              request.fuelType ??
              "Not specified"
            }
          </p>


          <p>
            <strong>Transmission:</strong>{" "}
            {
              request.transmission ??
              "Not specified"
            }
          </p>


          <p>
            <strong>Timeline:</strong>{" "}
            {
              request.timeline ??
              "Not specified"
            }
          </p>

        </div>

      </section>




      <section className="rounded-2xl border border-border bg-card/70 p-6">

        <h2 className="text-lg font-semibold">
          Budget and notes
        </h2>


        <div className="mt-5 space-y-4 text-sm">

          <p>
            <strong>Budget:</strong>{" "}
            {request.budgetMin?.toLocaleString() ??
              "?"}
            {" - "}
            {request.budgetMax?.toLocaleString() ??
              "?"}
            {" KES"}
          </p>


          <p className="whitespace-pre-wrap text-muted-foreground">
            {
              request.notes ??
              "No additional notes."
            }
          </p>

        </div>

      </section>




      {(request.quotationAmount ||
        request.quotationNotes) && (

        <section className="rounded-2xl border border-brand-gold/20 bg-brand-gold/[0.04] p-6">

          <h2 className="text-lg font-semibold">
            Existing quotation
          </h2>


          <p className="mt-3 text-sm">
            Amount:
            {" "}
            {
              request.quotationAmount?.toLocaleString()
            }
            {" KES"}
          </p>


          <p className="mt-2 text-sm text-muted-foreground">
            {
              request.quotationNotes
            }
          </p>

        </section>

      )}




      <AdminImportActions
        requestId={
          request.id
        }
      />

    </div>
  );
}