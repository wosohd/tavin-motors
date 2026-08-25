import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CalendarDays,
  CarFront,
  Mail,
  Phone,
  Wrench,
} from "lucide-react";

import {
  AdminServiceBookingActions,
} from "@/components/dashboard/admin-service-booking-actions";

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
  title:
    "Review Service Booking",
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


export default async function ServiceBookingReviewPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const {
    id,
  } = await params;


  const booking =
    await prisma.serviceBooking.findUnique({
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


  if (!booking) {
    notFound();
  }


  return (
    <div className="space-y-8">

      <Link
        href="/admin/service-bookings"
        className={cn(
          buttonVariants({
            variant:
              "outline",
          }),
        )}
      >
        <ArrowLeft className="size-4" />

        Back to bookings
      </Link>



      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Service booking review
        </p>


        <div className="mt-4 flex flex-wrap items-center gap-3">

          <h1 className="text-3xl font-semibold tracking-[-0.035em]">
            {
              booking.serviceType
            }
          </h1>


          <Badge
            variant="outline"
          >
            {
              formatStatus(
                booking.status,
              )
            }
          </Badge>

        </div>


        <p className="mt-3 text-sm text-muted-foreground">
          Reference:
          {" "}
          {
            booking.referenceCode
          }
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
                booking.contactName ??
                booking.user.name
              }
            </p>


            <p className="flex items-center gap-2">
              <Mail className="size-4" />

              {
                booking.contactEmail ??
                booking.user.email
              }
            </p>


            {booking.contactPhone && (
              <p className="flex items-center gap-2">
                <Phone className="size-4" />

                {
                  booking.contactPhone
                }
              </p>
            )}

          </div>

        </div>




        <div className="rounded-2xl border border-border bg-card/70 p-6">

          <h2 className="text-lg font-semibold">
            Appointment details
          </h2>


          <div className="mt-5 space-y-4 text-sm">

            <p className="flex items-center gap-2">
              <CalendarDays className="size-4" />

              {
                booking.preferredDate.toLocaleDateString(
                  "en-KE",
                )
              }
            </p>


            <p>
              <strong>Time:</strong>{" "}
              {
                booking.preferredTime ??
                "Not specified"
              }
            </p>


            <p>
              <strong>Location:</strong>{" "}
              {
                booking.location ??
                "Not specified"
              }
            </p>

          </div>

        </div>


      </section>




      <section className="rounded-2xl border border-border bg-card/70 p-6">

        <h2 className="flex items-center gap-2 text-lg font-semibold">

          <CarFront className="size-5 text-brand-gold" />

          Vehicle information

        </h2>


        <div className="mt-5 grid gap-4 sm:grid-cols-2 text-sm">

          <p>
            <strong>Description:</strong>{" "}
            {
              booking.vehicleDescription
            }
          </p>


          <p>
            <strong>Registration:</strong>{" "}
            {
              booking.vehicleRegistration ??
              "Not provided"
            }
          </p>


          <p>
            <strong>Make:</strong>{" "}
            {
              booking.vehicleMake ??
              "Not provided"
            }
          </p>


          <p>
            <strong>Model:</strong>{" "}
            {
              booking.vehicleModel ??
              "Not provided"
            }
          </p>


        </div>

      </section>




      <section className="rounded-2xl border border-border bg-card/70 p-6">

        <h2 className="flex items-center gap-2 text-lg font-semibold">

          <Wrench className="size-5 text-brand-gold" />

          Customer notes

        </h2>


        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
          {
            booking.notes ??
            "No additional notes provided."
          }
        </p>

      </section>




      <AdminServiceBookingActions
        bookingId={
          booking.id
        }
      />

    </div>
  );
}