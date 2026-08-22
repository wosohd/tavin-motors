import {
  headers,
} from "next/headers";

import Link from "next/link";

import {
  redirect,
} from "next/navigation";

import {
  ArrowRight,
  Heart,
  HeartOff,
} from "lucide-react";

import {
  DashboardPageHeader,
} from "@/components/dashboard/dashboard-page-header";

import {
  RemoveSavedVehicleButton,
} from "@/components/dashboard/remove-saved-vehicle-button";

import {
  VehicleVisual,
} from "@/components/vehicles/vehicle-visual";

import {
  Badge,
} from "@/components/ui/badge";

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
  formatVehiclePrice,
  getVehicleById,
} from "@/data/vehicles";

import {
  auth,
} from "@/lib/auth";

import {
  formatDashboardDate,
} from "@/lib/dashboard";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";

export const dynamic =
  "force-dynamic";

export default async function SavedVehiclesPage() {
  /*
   * The dashboard must never rely
   * on browser state to determine
   * which customer's records are
   * displayed.
   *
   * Resolve the authenticated user
   * on the server.
   */
  const requestHeaders =
    await headers();

  const session =
    await auth.api.getSession({
      headers:
        requestHeaders,
    });

  if (!session?.user) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/dashboard/saved-vehicles",
      )}`,
    );
  }

  /*
   * PostgreSQL is now the source of
   * truth for the customer's saved
   * vehicle collection.
   */
  const savedRecords =
    await prisma.savedVehicle.findMany({
      where: {
        userId:
          session.user.id,
      },

      orderBy: {
        createdAt:
          "desc",
      },

      select: {
        id: true,
        vehicleId: true,
        createdAt: true,

        vehicle: {
          select: {
            id: true,
            slug: true,
            published: true,
          },
        },
      },
    });

  /*
   * Public inventory presentation
   * still comes from the existing
   * approved catalogue during this
   * phase.
   *
   * The synced PostgreSQL vehicle
   * IDs intentionally match those
   * catalogue IDs.
   */
  const savedVehicleDetails =
    savedRecords
      .map(
        (record) => {
          const vehicle =
            getVehicleById(
              record.vehicleId,
            );

          if (
            !vehicle ||
            !record.vehicle
              .published
          ) {
            return null;
          }

          return {
            record,
            vehicle,
          };
        },
      )
      .filter(
        (
          item,
        ): item is NonNullable<
          typeof item
        > =>
          item !== null,
      );

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Saved vehicles"
        description="Review the vehicles you have saved to your Tavin Motors account and return to them whenever you are ready to make an enquiry."
        actions={
          <Link
            href="/vehicles"
            className={
              buttonVariants({
                size:
                  "lg",
              })
            }
          >
            Browse vehicles
          </Link>
        }
      />

      <section
        aria-label="Saved vehicle overview"
        className="grid gap-4 sm:grid-cols-2"
      >
        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-burgundy/30 text-brand-gold">
              <Heart className="size-5 fill-current" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {
                  savedVehicleDetails.length
                }
              </p>

              <p className="mt-1 text-xs tracking-[0.14em] text-muted-foreground uppercase">
                Saved vehicles
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/5 text-brand-gold">
              <HeartOff className="size-5" />
            </span>

            <div>
              <p className="text-sm font-semibold text-white">
                Your shortlist
              </p>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Save or remove vehicles at any time before making an enquiry.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card className="border border-white/10 bg-white/[0.035] shadow-none">
        <CardHeader>
          <CardTitle className="text-xl text-white">
            Your saved vehicles
          </CardTitle>

          <CardDescription>
            Compare vehicles from your shortlist and open the full vehicle page when you are ready to continue.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {savedVehicleDetails.length >
          0 ? (
            <div className="grid gap-6 xl:grid-cols-2">
              {savedVehicleDetails.map(
                ({
                  record,
                  vehicle,
                }) => {
                  const vehicleName =
                    `${vehicle.year} ${vehicle.make} ${vehicle.model}`;

                  return (
                    <article
                      key={
                        record.id
                      }
                      className="overflow-hidden rounded-xl border border-white/10 bg-black/20"
                    >
                      <VehicleVisual
                        vehicle={
                          vehicle
                        }
                        className="min-h-56 border-b border-white/10"
                      />

                      <div className="p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge
                                variant="outline"
                                className="border-brand-gold/30 text-brand-gold"
                              >
                                {
                                  vehicle.stockCode
                                }
                              </Badge>

                              <Badge className="bg-brand-burgundy/30 text-brand-gold">
                                Saved
                              </Badge>
                            </div>

                            <h2 className="mt-4 text-lg font-semibold text-white">
                              {
                                vehicleName
                              }
                            </h2>

                            <p className="mt-1 text-sm text-muted-foreground">
                              {
                                vehicle.trim
                              }
                            </p>
                          </div>

                          <Heart
                            aria-hidden="true"
                            className="size-5 fill-brand-gold text-brand-gold"
                          />
                        </div>

                        <p className="mt-5 text-2xl font-semibold text-white">
                          {formatVehiclePrice(
                            vehicle.price,
                          )}
                        </p>

                        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                          <div className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                            <p className="text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
                              Mileage
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                              {vehicle.mileage.toLocaleString(
                                "en-KE",
                              )}{" "}
                              km
                            </p>
                          </div>

                          <div className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                            <p className="text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
                              Transmission
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                              {
                                vehicle.transmission
                              }
                            </p>
                          </div>

                          <div className="rounded-lg border border-white/10 bg-white/[0.025] p-3">
                            <p className="text-[0.68rem] tracking-[0.14em] text-muted-foreground uppercase">
                              Fuel
                            </p>

                            <p className="mt-1 text-sm font-medium text-white">
                              {
                                vehicle.fuelType
                              }
                            </p>
                          </div>
                        </div>

                        <p className="mt-5 text-xs text-muted-foreground">
                          Saved{" "}
                          {formatDashboardDate(
                            record.createdAt.toISOString(),
                          )}
                        </p>

                        <div className="mt-5 flex flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                          <RemoveSavedVehicleButton
                            vehicleSlug={
                              vehicle.slug
                            }
                            vehicleName={
                              vehicleName
                            }
                          />

                          <Link
                            href={`/vehicles/${vehicle.slug}`}
                            className={cn(
                              buttonVariants({
                                variant:
                                  "ghost",
                                size:
                                  "sm",
                              }),
                              "text-brand-gold",
                            )}
                          >
                            View details

                            <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </div>
                    </article>
                  );
                },
              )}
            </div>
          ) : (
            <div className="flex min-h-72 flex-col items-center justify-center border border-dashed border-white/15 bg-black/15 px-6 py-12 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-brand-burgundy/25 text-brand-gold">
                <HeartOff className="size-6" />
              </span>

              <h2 className="mt-5 text-lg font-semibold text-white">
                No saved vehicles yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                Browse the Tavin Motors inventory and use the Save Vehicle button to build your shortlist.
              </p>

              <Link
                href="/vehicles"
                className={cn(
                  buttonVariants({
                    size:
                      "lg",
                  }),
                  "mt-6",
                )}
              >
                Browse vehicles

                <ArrowRight className="size-4" />
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}