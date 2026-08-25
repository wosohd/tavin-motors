import Link from "next/link";

import {
  CalendarClock,
  CalendarDays,
  CarFront,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Plus,
  RefreshCcw,
  Wrench,
  XCircle,
} from "lucide-react";

import {
  headers,
} from "next/headers";

import {
  redirect,
} from "next/navigation";

import {
  auth,
} from "@/lib/auth";

import {
  prisma,
} from "@/lib/prisma";

import {
  DashboardPageHeader,
} from "@/components/dashboard/dashboard-page-header";

import {
  StatusBadge,
} from "@/components/dashboard/status-badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  cn,
} from "@/lib/utils";


function formatDateTime(
  date: Date,
  time?: string | null,
) {

  const formatted =
    date.toLocaleDateString(
      "en-KE",
      {
        weekday:
          "short",

        day:
          "numeric",

        month:
          "short",

        year:
          "numeric",
      },
    );


  return time
    ? `${formatted} · ${time}`
    : formatted;
}


export default async function ServiceBookingsPage() {

  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });


  if (!session?.user) {

    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/dashboard/service-bookings",
      )}`,
    );

  }


  const customerBookings =
    await prisma.serviceBooking.findMany({

      where: {
        userId:
          session.user.id,
      },

      orderBy: {
        preferredDate:
          "asc",
      },

    });


  const scheduledBookings =
    customerBookings.filter(
      (booking) =>
        booking.status ===
          "PENDING" ||
        booking.status ===
          "CONFIRMED",
    ).length;


  const bookingsInProgress =
    customerBookings.filter(
      (booking) =>
        booking.status ===
        "IN_PROGRESS",
    ).length;


  const completedBookings =
    customerBookings.filter(
      (booking) =>
        booking.status ===
        "COMPLETED",
    ).length;


  return (

    <div className="space-y-8">


      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Service bookings"
        description="Review your auto-care appointments, monitor their status and manage upcoming service requests."
        actions={

          <Link
            href="/services"
            className={buttonVariants({
              size:
                "lg",
            })}
          >

            <Plus />

            Book a service

          </Link>

        }
      />



      <section
        aria-label="Service booking overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >


        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <CalendarDays className="size-5 text-brand-gold" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  customerBookings.length
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Total bookings
              </p>

            </div>

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <CalendarClock className="size-5 text-sky-600" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  scheduledBookings
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Scheduled
              </p>

            </div>

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <Wrench className="size-5 text-amber-600" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  bookingsInProgress
                }

              </p>

              <p className="text-sm text-muted-foreground">
                In progress
              </p>

            </div>

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <CheckCircle2 className="size-5 text-emerald-600" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  completedBookings
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Completed
              </p>

            </div>

          </CardContent>

        </Card>


      </section>




      <section aria-labelledby="service-bookings-heading">

        <div className="mb-5">

          <h2
            id="service-bookings-heading"
            className="text-xl font-semibold"
          >
            Your appointments
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            View scheduled dates, vehicle details and the current status of each booking.
          </p>

        </div>



        {
          customerBookings.length >
          0 ? (

            <div className="space-y-6">

              {
                customerBookings.map(
                  (
                    booking,
                  ) => {

                    const canManage =
                      booking.status ===
                        "PENDING" ||
                      booking.status ===
                        "CONFIRMED";


                    const isCompleted =
                      booking.status ===
                      "COMPLETED";


                    const isCancelled =
                      booking.status ===
                      "CANCELLED";


                    return (

                      <Card
                        key={
                          booking.id
                        }
                        className="border border-border bg-card/80 shadow-sm"
                      >

                        <CardHeader className="gap-5 lg:flex-row lg:items-start lg:justify-between">

                          <div>

                            <div className="mb-3 flex flex-wrap items-center gap-3">

                              <StatusBadge
                                status={
                                  booking.status
                                }
                              />


                              <span className="text-xs text-muted-foreground">

                                {
                                  booking.referenceCode
                                }

                              </span>

                            </div>


                            <CardTitle className="text-xl">

                              {
                                booking.serviceType
                              }

                            </CardTitle>


                            <CardDescription className="mt-1">

                              Scheduled for{" "}

                              {
                                formatDateTime(
                                  booking.preferredDate,
                                  booking.preferredTime,
                                )
                              }

                            </CardDescription>

                          </div>


                          <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold">

                            <Wrench className="size-5" />

                          </span>

                        </CardHeader>



                        <CardContent>


                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">


                            <div className="rounded-xl border border-border bg-muted/40 p-4">

                              <span className="flex items-center gap-2 text-xs text-muted-foreground">

                                <CarFront className="size-4 text-brand-gold" />

                                Vehicle

                              </span>


                              <p className="mt-2 font-medium">

                                {
                                  booking.vehicleDescription
                                }

                              </p>


                              {
                                booking.vehicleRegistration && (

                                  <p className="mt-1 text-xs text-muted-foreground">

                                    Registration:{" "}

                                    {
                                      booking.vehicleRegistration
                                    }

                                  </p>

                                )
                              }

                            </div>



                            <div className="rounded-xl border border-border bg-muted/40 p-4">

                              <span className="flex items-center gap-2 text-xs text-muted-foreground">

                                <CalendarDays className="size-4 text-brand-gold" />

                                Appointment

                              </span>


                              <p className="mt-2 font-medium">

                                {
                                  formatDateTime(
                                    booking.preferredDate,
                                    booking.preferredTime,
                                  )
                                }

                              </p>

                            </div>



                            <div className="rounded-xl border border-border bg-muted/40 p-4 sm:col-span-2 xl:col-span-1">

                              <span className="flex items-center gap-2 text-xs text-muted-foreground">

                                <Clock3 className="size-4 text-brand-gold" />

                                Current status

                              </span>


                              <div className="mt-2">

                                <StatusBadge
                                  status={
                                    booking.status
                                  }
                                />

                              </div>

                            </div>

                          </div>



                          {
                            booking.location && (

                              <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">

                                <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                                  Service location
                                </p>


                                <p className="mt-2 text-sm font-medium">

                                  {
                                    booking.location
                                  }

                                </p>

                              </div>

                            )
                          }



                          {
                            booking.notes && (

                              <div className="mt-4 rounded-xl border border-border bg-muted/40 p-4">

                                <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                                  Booking notes
                                </p>


                                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted-foreground">

                                  {
                                    booking.notes
                                  }

                                </p>

                              </div>

                            )
                          }



                          {
                            booking.status ===
                            "IN_PROGRESS" && (

                              <div className="mt-4 rounded-xl border border-amber-600/20 bg-amber-500/10 p-4">

                                <p className="text-xs font-semibold tracking-[0.14em] text-amber-700 uppercase">
                                  Service underway
                                </p>


                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                  Your vehicle is currently being attended to by the Tavin Motors auto-care team.
                                </p>

                              </div>

                            )
                          }



                          {
                            isCompleted && (

                              <div className="mt-4 rounded-xl border border-emerald-600/20 bg-emerald-500/10 p-4">

                                <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase">
                                  Service completed
                                </p>


                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                  This appointment has been completed.
                                </p>

                              </div>

                            )
                          }



                          {
                            isCancelled && (

                              <div className="mt-4 rounded-xl border border-red-600/20 bg-red-500/10 p-4">

                                <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-red-700 uppercase">

                                  <XCircle className="size-4" />

                                  Booking cancelled

                                </p>


                                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                  This appointment is no longer active.
                                </p>

                              </div>

                            )
                          }



                          <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">


                            <Link
                              href="/contact"
                              className={cn(
                                buttonVariants({
                                  variant:
                                    "outline",
                                  size:
                                    "lg",
                                }),
                              )}
                            >

                              <MessageSquare />

                              Contact service team

                            </Link>


                            {
                              canManage && (

                                <Link
                                  href="/services"
                                  className={cn(
                                    buttonVariants({
                                      variant:
                                        "ghost",
                                      size:
                                        "lg",
                                    }),
                                  )}
                                >

                                  <RefreshCcw />

                                  Request another time

                                </Link>

                              )
                            }


                            {
                              (isCompleted ||
                                isCancelled) && (

                                <Link
                                  href="/services"
                                  className={cn(
                                    buttonVariants({
                                      variant:
                                        "ghost",
                                      size:
                                        "lg",
                                    }),
                                  )}
                                >

                                  <Plus />

                                  Book again

                                </Link>

                              )
                            }

                          </div>


                        </CardContent>

                      </Card>

                    );

                  },
                )
              }

            </div>

          ) : (

            <Card className="border border-dashed border-border bg-card/60 shadow-sm">

              <CardContent className="flex flex-col items-center px-6 py-14 text-center">

                <Wrench className="size-7 text-brand-gold" />

                <h2 className="mt-5 text-lg font-semibold">
                  No service bookings yet
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Request maintenance, diagnostics or vehicle-care support and manage your appointment from this page.
                </p>

                <Link
                  href="/services"
                  className={cn(
                    buttonVariants({
                      size:
                        "lg",
                    }),
                    "mt-6",
                  )}
                >

                  <Plus />

                  Book your first service

                </Link>

              </CardContent>

            </Card>

          )
        }

      </section>

    </div>
  );
}