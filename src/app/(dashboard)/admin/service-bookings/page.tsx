import type { Metadata } from "next";

import Link from "next/link";

import {
  CalendarCheck2,
  Clock3,
  Eye,
  XCircle,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";


export const metadata: Metadata = {
  title:
    "Service Bookings",
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


function statusStyle(
  status: string,
) {
  switch (status) {
    case "PENDING":
      return "border-brand-gold/30 bg-brand-gold/10 text-brand-gold";

    case "CONFIRMED":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-500";

    case "IN_PROGRESS":
      return "border-sky-500/30 bg-sky-500/10 text-sky-500";

    case "COMPLETED":
      return "border-blue-500/30 bg-blue-500/10 text-blue-500";

    case "CANCELLED":
      return "border-red-500/30 bg-red-500/10 text-red-500";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
}


export default async function AdminServiceBookingsPage() {

  const [
    pendingCount,
    activeCount,
    completedCount,
    bookings,
  ] =
    await Promise.all([

      prisma.serviceBooking.count({
        where: {
          status:
            "PENDING",
        },
      }),

      prisma.serviceBooking.count({
        where: {
          status: {
            in: [
              "CONFIRMED",
              "IN_PROGRESS",
            ],
          },
        },
      }),

      prisma.serviceBooking.count({
        where: {
          status:
            "COMPLETED",
        },
      }),


      prisma.serviceBooking.findMany({

        orderBy: {
          createdAt:
            "desc",
        },

        take: 20,

        select: {

          id: true,

          referenceCode: true,

          contactName: true,

          contactEmail: true,

          serviceType: true,

          vehicleDescription: true,

          vehicleMake: true,

          vehicleModel: true,

          preferredDate: true,

          preferredTime: true,

          location: true,

          status: true,

          createdAt: true,


          user: {
            select: {
              name: true,
              email: true,
            },
          },

        },

      }),

    ]);


  return (

    <div className="space-y-8">


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Auto care operations
        </p>


        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Service bookings
        </h1>


        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Manage customer service appointments, workshop progress and completed vehicle care requests.
        </p>

      </header>



      <section className="grid gap-4 sm:grid-cols-3">


        <Card>
          <CardContent className="p-5">

            <Clock3 className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              Pending
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {pendingCount}
            </p>

          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-5">

            <CalendarCheck2 className="size-5 text-emerald-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Active bookings
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {activeCount}
            </p>

          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-5">

            <XCircle className="size-5 text-blue-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Completed
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {completedCount}
            </p>

          </CardContent>
        </Card>


      </section>




      <section className="grid gap-5 lg:grid-cols-2">


        {bookings.map(
          (
            booking,
          ) => (

            <article
              key={
                booking.id
              }
              className="rounded-2xl border border-border bg-card/70 p-5"
            >


              <div className="flex items-start justify-between gap-4">


                <div>

                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {
                      booking.referenceCode
                    }
                  </p>


                  <h2 className="mt-2 text-lg font-semibold">
                    {
                      booking.serviceType
                    }
                  </h2>


                  <p className="mt-1 text-sm text-muted-foreground">
                    {
                      booking.contactName ??
                      booking.user.name
                    }
                  </p>

                </div>



                <Badge
                  variant="outline"
                  className={cn(
                    statusStyle(
                      booking.status,
                    ),
                  )}
                >
                  {
                    formatStatus(
                      booking.status,
                    )
                  }
                </Badge>


              </div>




              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">


                <div>

                  <p className="text-xs text-muted-foreground">
                    Vehicle
                  </p>

                  <p>
                    {
                      booking.vehicleDescription
                    }
                  </p>

                </div>


                <div>

                  <p className="text-xs text-muted-foreground">
                    Appointment
                  </p>

                  <p>
                    {
                      booking.preferredDate.toLocaleDateString(
                        "en-KE",
                      )
                    }
                  </p>

                </div>


                <div>

                  <p className="text-xs text-muted-foreground">
                    Time
                  </p>

                  <p>
                    {
                      booking.preferredTime ??
                      "Not specified"
                    }
                  </p>

                </div>


                <div>

                  <p className="text-xs text-muted-foreground">
                    Location
                  </p>

                  <p>
                    {
                      booking.location ??
                      "Not specified"
                    }
                  </p>

                </div>


              </div>



              <Link
                href={`/admin/service-bookings/${booking.id}`}
                className={cn(
                  buttonVariants({
                    variant:
                      "outline",
                    size:
                      "sm",
                  }),
                  "mt-5 w-full",
                )}
              >

                <Eye className="size-4" />

                Review booking

              </Link>


            </article>

          ),
        )}


      </section>


    </div>

  );
}