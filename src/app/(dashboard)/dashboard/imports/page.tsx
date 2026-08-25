import Link from "next/link";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  Plus,
  Search,
  Ship,
  WalletCards,
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
  DashboardProgress,
} from "@/components/dashboard/dashboard-progress";

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


function formatDate(
  value: Date,
) {
  return value.toLocaleDateString(
    "en-KE",
    {
      day:
        "numeric",

      month:
        "short",

      year:
        "numeric",
    },
  );
}


function formatPrice(
  value: number,
) {
  return `KES ${value.toLocaleString(
    "en-KE",
  )}`;
}


function getProgress(
  status: string,
) {

  const progress: Record<
    string,
    number
  > = {

    SUBMITTED:
      10,

    REVIEWING:
      20,

    SOURCING:
      35,

    QUOTED:
      50,

    APPROVED:
      60,

    PURCHASED:
      70,

    SHIPPING:
      80,

    CLEARING:
      90,

    READY_FOR_DELIVERY:
      95,

    DELIVERED:
      100,

    CANCELLED:
      0,

  };


  return (
    progress[status] ??
    0
  );
}


function getNextStep(
  status: string,
) {

  const steps: Record<
    string,
    string
  > = {

    SUBMITTED:
      "Your request is awaiting review.",

    REVIEWING:
      "The Tavin Motors team is reviewing your requirements.",

    SOURCING:
      "Suitable vehicles are being sourced.",

    QUOTED:
      "Your vehicle quotation is ready for review.",

    APPROVED:
      "Purchase approval is being processed.",

    PURCHASED:
      "The vehicle has been purchased and is being prepared for shipment.",

    SHIPPING:
      "The vehicle is currently in transit.",

    CLEARING:
      "The vehicle is undergoing import clearance.",

    READY_FOR_DELIVERY:
      "Your vehicle is ready for delivery.",

    DELIVERED:
      "The import process has been completed.",

    CANCELLED:
      "This import request has been cancelled.",

  };


  return (
    steps[status] ??
    "Your request is being processed."
  );
}


export default async function CustomerImportsPage() {

  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });


  if (!session?.user) {

    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/dashboard/imports",
      )}`,
    );

  }


  const customerImports =
    await prisma.importRequest.findMany({

      where: {
        userId:
          session.user.id,
      },

      orderBy: {
        createdAt:
          "desc",
      },

    });


  const completedImports =
    customerImports.filter(
      (request) =>
        request.status ===
        "DELIVERED",
    ).length;


  const activeImports =
    customerImports.filter(
      (request) =>
        request.status !==
        "DELIVERED" &&
        request.status !==
        "CANCELLED",
    ).length;


  const averageProgress =
    customerImports.length > 0
      ? Math.round(
          customerImports.reduce(
            (
              total,
              request,
            ) =>
              total +
              getProgress(
                request.status,
              ),
            0,
          ) /
            customerImports.length,
        )
      : 0;


  const budgets =
    customerImports.filter(
      (request) =>
        request.budgetMin !== null ||
        request.budgetMax !== null,
    );


  return (

    <div className="space-y-8">


      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Import requests"
        description="Track your vehicle sourcing, quotation, shipping and clearance progress from one place."
        actions={

          <Link
            href="/import-a-car"
            className={buttonVariants({
              size:
                "lg",
            })}
          >

            <Plus />

            Start a new request

          </Link>

        }
      />



      <section
        aria-label="Import request overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >


        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <FileText className="size-5 text-brand-gold" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  customerImports.length
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Total requests
              </p>

            </div>

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <Ship className="size-5 text-sky-600" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  activeImports
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Active requests
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
                  completedImports
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Delivered
              </p>

            </div>

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <Search className="size-5 text-amber-600" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  averageProgress
                }%

              </p>

              <p className="text-sm text-muted-foreground">
                Average progress
              </p>

            </div>

          </CardContent>

        </Card>


      </section>



      {
        budgets.length >
        0 && (

          <Card className="border border-border bg-card/80 shadow-sm">

            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

              <div className="flex items-center gap-4">

                <span className="grid size-12 place-items-center rounded-xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">

                  <WalletCards className="size-5" />

                </span>


                <div>

                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Budget information
                  </p>


                  <p className="mt-1 text-sm font-medium">
                    Budget ranges are based on your submitted import requirements.
                  </p>

                </div>

              </div>

            </CardContent>

          </Card>

        )
      }



      <section aria-labelledby="import-requests-heading">

        <div className="mb-5">

          <h2
            id="import-requests-heading"
            className="text-xl font-semibold"
          >
            Your vehicle imports
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Follow each request through its current import stage.
          </p>

        </div>


        {
          customerImports.length >
          0 ? (

            <div className="space-y-6">

              {
                customerImports.map(
                  (
                    request,
                  ) => {

                    const progress =
                      getProgress(
                        request.status,
                      );


                    return (

                      <Card
                        key={
                          request.id
                        }
                        className="border border-border bg-card/80 shadow-sm"
                      >

                        <CardHeader className="gap-5 lg:flex-row lg:items-start lg:justify-between">

                          <div>

                            <div className="mb-3 flex flex-wrap items-center gap-3">

                              <StatusBadge
                                status={
                                  request.status
                                }
                              />

                              <span className="text-xs text-muted-foreground">

                                {
                                  request.referenceCode
                                }

                              </span>

                            </div>


                            <CardTitle className="text-xl">

                              {
                                request.make ??
                                "Vehicle"
                              }{" "}

                              {
                                request.model ??
                                "Import request"
                              }

                            </CardTitle>


                            <CardDescription className="mt-1">

                              Submitted{" "}

                              {
                                formatDate(
                                  request.submittedAt,
                                )
                              }

                            </CardDescription>

                          </div>


                          <div className="lg:text-right">

                            <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                              Budget
                            </p>


                            <p className="mt-1 text-lg font-semibold">

                              {
                                request.budgetMax
                                  ? formatPrice(
                                      request.budgetMax,
                                    )
                                  : request.budgetMin
                                    ? `From ${formatPrice(
                                        request.budgetMin,
                                      )}`
                                    : "Not specified"
                              }

                            </p>

                          </div>

                        </CardHeader>



                        <CardContent>


                          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">


                            <div className="rounded-xl border border-border bg-muted/40 p-4">

                              <span className="flex items-center gap-2 text-xs text-muted-foreground">

                                <MapPin className="size-4 text-brand-gold" />

                                Preferred origin

                              </span>


                              <p className="mt-2 font-medium">

                                {
                                  request.preferredOrigin ??
                                  "Not specified"
                                }

                              </p>

                            </div>



                            <div className="rounded-xl border border-border bg-muted/40 p-4">

                              <span className="flex items-center gap-2 text-xs text-muted-foreground">

                                <CalendarDays className="size-4 text-brand-gold" />

                                Submitted

                              </span>


                              <p className="mt-2 font-medium">

                                {
                                  formatDate(
                                    request.submittedAt,
                                  )
                                }

                              </p>

                            </div>



                            <div className="rounded-xl border border-border bg-muted/40 p-4 sm:col-span-2 xl:col-span-1">

                              <span className="flex items-center gap-2 text-xs text-muted-foreground">

                                <Search className="size-4 text-brand-gold" />

                                Timeline

                              </span>


                              <p className="mt-2 font-medium">

                                {
                                  request.timeline ??
                                  "Not specified"
                                }

                              </p>

                            </div>

                          </div>



                          <div className="mt-5 rounded-xl border border-border bg-muted/40 p-5">

                            <DashboardProgress
                              value={
                                progress
                              }
                              label={
                                getNextStep(
                                  request.status,
                                )
                              }
                            />


                            <div className="mt-4 flex items-start gap-3 border-t border-border pt-4">

                              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold">

                                <ArrowRight className="size-4" />

                              </span>


                              <div>

                                <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                                  Current stage
                                </p>


                                <p className="mt-1 text-sm font-medium">

                                  {
                                    getNextStep(
                                      request.status,
                                    )
                                  }

                                </p>

                              </div>

                            </div>

                          </div>



                          {
                            request.quotationAmount !== null && (

                              <div className="mt-4 rounded-xl border border-emerald-600/20 bg-emerald-500/10 p-4">

                                <p className="text-xs font-semibold tracking-[0.14em] text-emerald-700 uppercase">
                                  Quotation available
                                </p>


                                <p className="mt-2 text-lg font-semibold">

                                  {
                                    formatPrice(
                                      request.quotationAmount,
                                    )
                                  }

                                </p>


                                {
                                  request.quotationNotes && (

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">

                                      {
                                        request.quotationNotes
                                      }

                                    </p>

                                  )
                                }

                              </div>

                            )
                          }


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

                <Ship className="size-7 text-brand-gold" />

                <h2 className="mt-5 text-lg font-semibold">
                  No import requests yet
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Tell the Tavin Motors team what vehicle you are looking for and follow the sourcing and delivery process from this page.
                </p>

                <Link
                  href="/import-a-car"
                  className={cn(
                    buttonVariants({
                      size:
                        "lg",
                    }),
                    "mt-6",
                  )}
                >
                  Start an import request
                  <ArrowRight />
                </Link>

              </CardContent>

            </Card>

          )
        }

      </section>

    </div>
  );
}