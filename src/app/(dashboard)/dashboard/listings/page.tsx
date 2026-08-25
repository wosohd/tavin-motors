import Link from "next/link";

import {
  ArrowRight,
  CarFront,
  Eye,
  FilePenLine,
  Plus,
  ReceiptText,
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


function formatPrice(
  value: number,
) {
  return `KES ${value.toLocaleString(
    "en-KE",
  )}`;
}


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


export default async function CustomerListingsPage() {

  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });


  if (!session?.user) {

    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/dashboard/listings",
      )}`,
    );

  }


  const customerListings =
    await prisma.marketplaceListing.findMany({

      where: {
        sellerId:
          session.user.id,
      },

      include: {
        images: {
          orderBy: {
            sortOrder:
              "asc",
          },
        },
      },

      orderBy: {
        createdAt:
          "desc",
      },

    });


  const approvedListings =
    customerListings.filter(
      (listing) =>
        listing.status ===
        "APPROVED",
    ).length;


  const listingsUnderReview =
    customerListings.filter(
      (listing) =>
        listing.status ===
          "PENDING_REVIEW" ||
        listing.status ===
          "CHANGES_REQUESTED",
    ).length;


  return (

    <div className="space-y-8">


      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="My listings"
        description="Review vehicles you have submitted to the Tavin Motors marketplace and follow their moderation status."
        actions={

          <Link
            href="/marketplace/sell"
            className={buttonVariants({
              size:
                "lg",
            })}
          >

            <Plus />

            Create a listing

          </Link>

        }
      />



      <section
        aria-label="Listing overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >


        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <ReceiptText className="size-5 text-brand-gold" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  customerListings.length
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Total listings
              </p>

            </div>

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <CarFront className="size-5 text-emerald-600" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  approvedListings
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Approved
              </p>

            </div>

          </CardContent>

        </Card>



        <Card className="border border-border bg-card/80 shadow-sm">

          <CardContent className="flex items-center gap-4 p-5">

            <FilePenLine className="size-5 text-amber-600" />

            <div>

              <p className="text-2xl font-semibold">

                {
                  listingsUnderReview
                }

              </p>

              <p className="text-sm text-muted-foreground">
                Under review
              </p>

            </div>

          </CardContent>

        </Card>


      </section>




      <section aria-labelledby="customer-listings-heading">

        <div className="mb-5">

          <h2
            id="customer-listings-heading"
            className="text-xl font-semibold"
          >
            Submitted vehicles
          </h2>


          <p className="mt-1 text-sm text-muted-foreground">
            Monitor moderation decisions and marketplace publication status.
          </p>

        </div>



        {
          customerListings.length >
          0 ? (

            <div className="space-y-5">

              {
                customerListings.map(
                  (
                    listing,
                  ) => (

                    <Card
                      key={
                        listing.id
                      }
                      className="border border-border bg-card/80 shadow-sm"
                    >

                      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">

                        <div>

                          <div className="mb-3 flex flex-wrap items-center gap-3">

                            <StatusBadge
                              status={
                                listing.status
                              }
                            />

                            <span className="text-xs text-muted-foreground">

                              Submitted{" "}

                              {
                                formatDate(
                                  listing.submittedAt ??
                                  listing.createdAt,
                                )
                              }

                            </span>

                          </div>


                          <CardTitle className="text-xl">

                            {
                              listing.year
                            }{" "}

                            {
                              listing.make
                            }{" "}

                            {
                              listing.model
                            }

                          </CardTitle>


                          <CardDescription className="mt-1">

                            {
                              listing.referenceCode ??
                              listing.slug
                            }

                          </CardDescription>

                        </div>



                        <div className="sm:text-right">

                          <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                            Asking price
                          </p>


                          <p className="mt-1 text-lg font-semibold">

                            {
                              formatPrice(
                                listing.askingPrice,
                              )
                            }

                          </p>

                        </div>

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
                                listing.year
                              }{" "}

                              {
                                listing.make
                              }{" "}

                              {
                                listing.model
                              }

                            </p>

                          </div>



                          <div className="rounded-xl border border-border bg-muted/40 p-4">

                            <span className="flex items-center gap-2 text-xs text-muted-foreground">

                              <Eye className="size-4 text-brand-gold" />

                              Images

                            </span>


                            <p className="mt-2 font-medium">

                              {
                                listing.images.length
                              }{" "}

                              {
                                listing.images.length ===
                                1
                                  ? "image"
                                  : "images"
                              }

                            </p>

                          </div>



                          <div className="rounded-xl border border-border bg-muted/40 p-4">

                            <span className="text-xs text-muted-foreground">
                              Location
                            </span>


                            <p className="mt-2 font-medium">

                              {
                                listing.location
                              }

                            </p>

                          </div>

                        </div>



                        {
                          listing.moderationNote && (

                            <div className="mt-4 rounded-xl border border-amber-600/20 bg-amber-500/10 p-4">

                              <p className="text-xs font-semibold tracking-[0.14em] text-amber-700 uppercase">
                                Review note
                              </p>


                              <p className="mt-2 text-sm leading-6 text-muted-foreground">

                                {
                                  listing.moderationNote
                                }

                              </p>

                            </div>

                          )
                        }



                        <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">


                          {
                            listing.slug && (

                              <Link
                                href={`/marketplace/${listing.slug}`}
                                className={cn(
                                  buttonVariants({
                                    variant:
                                      "outline",
                                    size:
                                      "lg",
                                  }),
                                )}
                              >

                                <Eye />

                                View listing

                              </Link>

                            )
                          }



                          <Link
                            href="/marketplace/sell"
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

                            Create another listing

                          </Link>


                        </div>


                      </CardContent>

                    </Card>

                  ),
                )
              }

            </div>

          ) : (

            <Card className="border border-dashed border-border bg-card/60 shadow-sm">

              <CardContent className="flex flex-col items-center px-6 py-14 text-center">

                <CarFront className="size-7 text-brand-gold" />

                <h2 className="mt-5 text-lg font-semibold">
                  No vehicle listings yet
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                  Submit a vehicle to the Tavin Motors marketplace and follow its review status from this page.
                </p>

                <Link
                  href="/marketplace/sell"
                  className={cn(
                    buttonVariants({
                      size:
                        "lg",
                    }),
                    "mt-6",
                  )}
                >

                  Create your first listing

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