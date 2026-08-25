import Link from "next/link";

import {
  ArrowRight,
  Heart,
  MessagesSquare,
  Ship,
  Wrench,
} from "lucide-react";

import { headers } from "next/headers";

import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DashboardProgress } from "@/components/dashboard/dashboard-progress";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";

import { VehicleVisual } from "@/components/vehicles/vehicle-visual";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

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


const statIcons = [
  Heart,
  Ship,
  Wrench,
  MessagesSquare,
] as const;


function formatPrice(
  value: number,
) {
  return `KES ${value.toLocaleString("en-KE")}`;
}


function formatDate(
  value: Date,
) {
  return value.toLocaleDateString(
    "en-KE",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    },
  );
}


function formatDateTime(
  value: Date,
) {
  return value.toLocaleString(
    "en-KE",
    {
      dateStyle: "medium",
      timeStyle: "short",
    },
  );
}


function getImportProgress(
  status: string,
) {
  const progressMap: Record<
    string,
    number
  > = {
    SUBMITTED: 10,
    REVIEWING: 20,
    SOURCING: 35,
    QUOTED: 50,
    APPROVED: 60,
    PURCHASED: 70,
    SHIPPING: 80,
    CLEARING: 90,
    READY_FOR_DELIVERY: 95,
    DELIVERED: 100,
    CANCELLED: 0,
  };

  return (
    progressMap[status] ??
    0
  );
}


function getImportNextStep(
  status: string,
) {
  const nextSteps: Record<
    string,
    string
  > = {
    SUBMITTED:
      "Request received and awaiting review.",
    REVIEWING:
      "The Tavin Motors team is reviewing your requirements.",
    SOURCING:
      "Suitable vehicles are being sourced.",
    QUOTED:
      "Your quotation is ready for review.",
    APPROVED:
      "Purchase approval is being processed.",
    PURCHASED:
      "Vehicle purchased and preparing for shipment.",
    SHIPPING:
      "Vehicle is currently in transit.",
    CLEARING:
      "Vehicle is undergoing clearance.",
    READY_FOR_DELIVERY:
      "Vehicle is ready for final delivery.",
    DELIVERED:
      "Vehicle has been delivered.",
    CANCELLED:
      "This import request has been cancelled.",
  };

  return (
    nextSteps[status] ??
    "Your request is being processed."
  );
}


export default async function CustomerDashboardPage() {

  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });


  if (!session?.user) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/dashboard",
      )}`,
    );
  }


  const userId =
    session.user.id;


  const [
    savedVehicleCount,
    importCount,
    serviceBookingCount,
    enquiryCount,

    activeImports,

    upcomingBooking,

    recentSavedVehicles,

    recentEnquiries,
  ] = await Promise.all([

    prisma.savedVehicle.count({
      where: {
        userId,
      },
    }),

    prisma.importRequest.count({
      where: {
        userId,
      },
    }),

    prisma.serviceBooking.count({
      where: {
        userId,
      },
    }),

    prisma.enquiry.count({
      where: {
        userId,
      },
    }),

    prisma.importRequest.findMany({
      where: {
        userId,

        status: {
          not: "CANCELLED",
        },
      },

      orderBy: {
        createdAt:
          "desc",
      },

      take: 3,
    }),

    prisma.serviceBooking.findFirst({
      where: {
        userId,

        status: {
          in: [
            "PENDING",
            "CONFIRMED",
            "IN_PROGRESS",
          ],
        },
      },

      orderBy: {
        preferredDate:
          "asc",
      },
    }),

    prisma.savedVehicle.findMany({
      where: {
        userId,
      },

      include: {
        vehicle: {
          include: {
            images: {
              orderBy: {
                sortOrder:
                  "asc",
              },
            },
          },
        },
      },

      orderBy: {
        createdAt:
          "desc",
      },

      take: 2,
    }),

    prisma.enquiry.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt:
          "desc",
      },

      take: 3,
    }),

  ]);


  const stats = [
    {
      label:
        "Saved vehicles",

      value:
        savedVehicleCount.toString(),

      detail:
        "Vehicles currently on your shortlist.",

    },

    {
      label:
        "Import requests",

      value:
        importCount.toString(),

      detail:
        "Vehicle sourcing requests submitted.",

    },

    {
      label:
        "Service bookings",

      value:
        serviceBookingCount.toString(),

      detail:
        "Auto-care appointments linked to your account.",

    },

    {
      label:
        "Enquiries",

      value:
        enquiryCount.toString(),

      detail:
        "Conversations submitted to Tavin Motors.",

    },
  ];


  return (

    <div className="space-y-8">

      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title={`Welcome back, ${session.user.name}`}
        description="Track your saved vehicles, import requests, service bookings and conversations with the Tavin Motors team."
        actions={
          <>
            <Link
              href="/vehicles"
              className={buttonVariants({
                variant:
                  "outline",
                size:
                  "lg",
              })}
            >
              Browse vehicles
            </Link>

            <Link
              href="/import-a-car"
              className={buttonVariants({
                size:
                  "lg",
              })}
            >
              Start an import request
            </Link>
          </>
        }
      />


      <section
        aria-label="Account overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >

        {stats.map(
          (
            stat,
            index,
          ) => (

            <DashboardStatCard
              key={
                stat.label
              }
              stat={
                stat
              }
              icon={
                statIcons[index]
              }
            />

          ),
        )}

      </section>



      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">

        <Card className="border border-border bg-card/80 shadow-sm">

          <CardHeader className="flex items-start justify-between gap-4">

            <div>

              <CardTitle className="text-xl text-foreground">
                Active import requests
              </CardTitle>

              <CardDescription>
                Follow your requests through the import process.
              </CardDescription>

            </div>


            <Link
              href="/dashboard/imports"
              className={cn(
                buttonVariants({
                  variant:
                    "ghost",
                  size:
                    "sm",
                }),
                "text-brand-gold hover:text-brand-gold",
              )}
            >
              View all
              <ArrowRight />
            </Link>

          </CardHeader>


          <CardContent className="space-y-4">

            {activeImports.length > 0 ? (

              activeImports.map(
                (
                  request,
                ) => {

                  const progress =
                    getImportProgress(
                      request.status,
                    );


                  return (

                    <article
                      key={
                        request.id
                      }
                      className="rounded-xl border border-border bg-muted/40 p-4"
                    >

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <p className="font-semibold text-foreground">

                            {
                              request.make ??
                              "Vehicle"
                            }{" "}

                            {
                              request.model ??
                              "Import request"
                            }

                          </p>


                          <p className="mt-1 text-xs text-muted-foreground">

                            {
                              request.referenceCode
                            }{" "}
                            · Submitted{" "}
                            {
                              formatDate(
                                request.submittedAt,
                              )
                            }

                          </p>

                        </div>


                        <StatusBadge
                          status={
                            request.status
                          }
                        />

                      </div>


                      <DashboardProgress
                        value={
                          progress
                        }
                        label={
                          getImportNextStep(
                            request.status,
                          )
                        }
                        className="mt-5"
                      />

                    </article>

                  );

                },
              )

            ) : (

              <div className="rounded-xl border border-dashed border-border p-8 text-center">

                <p className="font-medium">
                  No active import requests
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Start an import request when you are ready.
                </p>

              </div>

            )}

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardHeader>

            <CardTitle className="text-xl text-foreground">
              Upcoming service
            </CardTitle>

            <CardDescription>
              Your next scheduled auto-care appointment.
            </CardDescription>

          </CardHeader>


          <CardContent>

            {upcomingBooking ? (

              <article className="rounded-xl border border-border bg-muted/40 p-5">

                <div className="flex items-center justify-between gap-4">

                  <span className="grid size-11 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">

                    <Wrench className="size-5" />

                  </span>


                  <StatusBadge
                    status={
                      upcomingBooking.status
                    }
                  />

                </div>


                <h2 className="mt-5 text-lg font-semibold text-foreground">

                  {
                    upcomingBooking.serviceType
                  }

                </h2>


                <p className="mt-1 text-sm text-muted-foreground">

                  {
                    upcomingBooking.vehicleDescription
                  }

                </p>


                <div className="mt-5 border-t border-border pt-4">

                  <p className="text-xs tracking-[0.16em] text-brand-gold uppercase">
                    Appointment
                  </p>

                  <p className="mt-2 font-medium text-foreground">

                    {
                      formatDateTime(
                        upcomingBooking.preferredDate,
                      )
                    }

                    {
                      upcomingBooking.preferredTime
                        ? ` · ${upcomingBooking.preferredTime}`
                        : ""
                    }

                  </p>

                </div>


                <Link
                  href="/dashboard/service-bookings"
                  className={cn(
                    buttonVariants({
                      variant:
                        "outline",
                      size:
                        "lg",
                    }),
                    "mt-5 w-full",
                  )}
                >
                  Manage bookings
                </Link>

              </article>

            ) : (

              <div className="rounded-xl border border-dashed border-border p-8 text-center">

                <Wrench className="mx-auto size-7 text-brand-gold" />

                <p className="mt-4 font-medium">
                  No upcoming service booking
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Book an auto-care service when you need one.
                </p>

              </div>

            )}

          </CardContent>

        </Card>

      </section>



      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">


        <Card className="border border-border bg-card/80 shadow-sm">

          <CardHeader className="flex items-start justify-between gap-4">

            <div>

              <CardTitle className="text-xl text-foreground">
                Recently saved vehicles
              </CardTitle>

              <CardDescription>
                Continue comparing vehicles from your shortlist.
              </CardDescription>

            </div>


            <Link
              href="/dashboard/saved-vehicles"
              className={cn(
                buttonVariants({
                  variant:
                    "ghost",
                  size:
                    "sm",
                }),
                "text-brand-gold hover:text-brand-gold",
              )}
            >
              View all
              <ArrowRight />
            </Link>

          </CardHeader>


          <CardContent className="grid gap-4 md:grid-cols-2">

            {recentSavedVehicles.length > 0 ? (

              recentSavedVehicles.map(
                (
                  record,
                ) => {

                  const vehicle =
                    record.vehicle;


                  return (

                    <article
                      key={
                        record.id
                      }
                      className="overflow-hidden rounded-xl border border-border bg-muted/40"
                    >

                      <VehicleVisual
                        vehicle={{
                          id:
                            vehicle.id,

                          slug:
                            vehicle.slug,

                          make:
                            vehicle.make,

                          model:
                            vehicle.model,

                          trim:
                            vehicle.trim ??
                            "",

                          year:
                            vehicle.year,

                          price:
                            vehicle.price,

                          mileage:
                            vehicle.mileage,

                          transmission:
                            vehicle.transmission as
                              "Automatic" |
                              "Manual",

                          fuelType:
                            vehicle.fuelType as
                              "Petrol" |
                              "Diesel" |
                              "Hybrid" |
                              "Electric",

                          bodyType:
                            (vehicle.bodyType ??
                              "SUV") as
                              "SUV" |
                              "Sedan" |
                              "Hatchback" |
                              "Pickup" |
                              "Coupe",

                          engine:
                            vehicle.engineSize ??
                            "",

                          drivetrain:
                            vehicle.driveType ??
                            "",

                          exteriorColor:
                            vehicle.exteriorColor,

                          interiorColor:
                            vehicle.interiorColor ??
                            "",

                          location:
                            vehicle.location ??
                            "",

                          stockCode:
                            vehicle.stockCode,

                          status:
                            vehicle.status,

                          featured:
                            vehicle.featured,

                          description:
                            vehicle.description ??
                            "",

                          features:
                            [],

                          tone:
                            "graphite",

                          images:
                            vehicle.images,
                        }}
                        compact
                        className="aspect-[16/9]"
                      />


                      <div className="p-4">

                        <Badge
                          variant="outline"
                          className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
                        >
                          Saved{" "}
                          {
                            formatDate(
                              record.createdAt,
                            )
                          }
                        </Badge>


                        <h2 className="mt-3 font-semibold text-foreground">

                          {
                            vehicle.year
                          }{" "}

                          {
                            vehicle.make
                          }{" "}

                          {
                            vehicle.model
                          }

                        </h2>


                        <p className="mt-1 text-sm text-muted-foreground">

                          {
                            vehicle.trim ??
                            ""
                          }

                        </p>


                        <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">

                          <span className="font-semibold text-foreground">

                            {
                              formatPrice(
                                vehicle.price,
                              )
                            }

                          </span>


                          <Link
                            href={`/vehicles/${vehicle.slug}`}
                            className={buttonVariants({
                              variant:
                                "outline",
                              size:
                                "sm",
                            })}
                          >
                            View vehicle
                          </Link>

                        </div>

                      </div>

                    </article>

                  );

                },
              )

            ) : (

              <div className="md:col-span-2 rounded-xl border border-dashed border-border p-8 text-center">

                <Heart className="mx-auto size-7 text-brand-gold" />

                <p className="mt-4 font-medium">
                  No saved vehicles yet
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Save vehicles from the inventory to build your shortlist.
                </p>

                <Link
                  href="/vehicles"
                  className={cn(
                    buttonVariants({
                      size:
                        "lg",
                    }),
                    "mt-5",
                  )}
                >
                  Browse vehicles
                </Link>

              </div>

            )}

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardHeader className="flex items-start justify-between gap-4">

            <div>

              <CardTitle className="text-xl text-foreground">
                Recent enquiries
              </CardTitle>

              <CardDescription>
                Latest conversations with our team.
              </CardDescription>

            </div>


            <Link
              href="/dashboard/enquiries"
              className={cn(
                buttonVariants({
                  variant:
                    "ghost",
                  size:
                    "sm",
                }),
                "text-brand-gold hover:text-brand-gold",
              )}
            >
              View all
              <ArrowRight />
            </Link>

          </CardHeader>


          <CardContent className="space-y-3">

            {recentEnquiries.length > 0 ? (

              recentEnquiries.map(
                (
                  enquiry,
                ) => (

                  <article
                    key={
                      enquiry.id
                    }
                    className="rounded-xl border border-border bg-muted/40 p-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="min-w-0">

                        <p className="font-medium text-foreground">

                          {
                            enquiry.subject
                          }

                        </p>


                        <p className="mt-1 text-xs text-muted-foreground">

                          {
                            enquiry.referenceCode
                          }{" "}
                          ·{" "}
                          {
                            formatDateTime(
                              enquiry.createdAt,
                            )
                          }

                        </p>

                      </div>


                      <StatusBadge
                        status={
                          enquiry.status
                        }
                      />

                    </div>

                  </article>

                ),
              )

            ) : (

              <div className="rounded-xl border border-dashed border-border p-8 text-center">

                <MessagesSquare className="mx-auto size-7 text-brand-gold" />

                <p className="mt-4 font-medium">
                  No enquiries yet
                </p>

                <p className="mt-2 text-sm text-muted-foreground">
                  Contact Tavin Motors when you need assistance.
                </p>

              </div>

            )}

          </CardContent>

        </Card>


      </section>

    </div>

  );
}