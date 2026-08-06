import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Gauge,
  Heart,
  HeartOff,
  Settings2,
} from "lucide-react";

import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DemoActionButton } from "@/components/dashboard/demo-action-button";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { savedVehicles } from "@/data/dashboard";
import {
  formatMileage,
  formatVehiclePrice,
  getVehicleById,
} from "@/data/vehicles";
import { formatDashboardDate } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

export default function SavedVehiclesPage() {
  const savedVehicleDetails = savedVehicles
    .map((record) => ({
      record,
      vehicle: getVehicleById(record.vehicleId),
    }))
    .filter(
      (
        item,
      ): item is {
        record: (typeof savedVehicles)[number];
        vehicle: NonNullable<
          ReturnType<typeof getVehicleById>
        >;
      } => Boolean(item.vehicle),
    );

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Saved vehicles"
        description="Review your shortlist, compare vehicle details and return to the full listing whenever you are ready."
        actions={
          <Link
            href="/vehicles"
            className={buttonVariants({
              size: "lg",
            })}
          >
            Browse vehicles
            <ArrowRight aria-hidden="true" />
          </Link>
        }
      />

      <DashboardDemoNotice />

      <Card className="border border-border bg-card/80 shadow-sm">
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">
              <Heart
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {savedVehicleDetails.length}
              </p>

              <p className="text-sm text-muted-foreground">
                {savedVehicleDetails.length === 1
                  ? "Vehicle in your shortlist"
                  : "Vehicles in your shortlist"}
              </p>
            </div>
          </div>

          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Your saved list currently uses demonstration data.
            Removing a vehicle will show the intended interaction,
            but it will not permanently change the records until
            the backend is connected.
          </p>
        </CardContent>
      </Card>

      <section aria-labelledby="saved-vehicles-heading">
        <div className="mb-5">
          <h2
            id="saved-vehicles-heading"
            className="text-xl font-semibold text-foreground"
          >
            Your saved vehicles
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Compare prices and specifications before making an
            enquiry.
          </p>
        </div>

        {savedVehicleDetails.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {savedVehicleDetails.map(
              ({ record, vehicle }) => (
                <Card
                  key={record.id}
                  className="overflow-hidden border border-border bg-card/80 py-0 shadow-sm transition-colors hover:bg-card"
                >
                  <VehicleVisual
                    vehicle={vehicle}
                    compact
                    className="aspect-[16/9]"
                  />

                  <CardHeader className="space-y-4 px-5 pt-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <Badge
                        variant="outline"
                        className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
                      >
                        <Heart
                          aria-hidden="true"
                          className="mr-1 size-3.5 fill-current"
                        />
                        Saved{" "}
                        {formatDashboardDate(
                          record.savedAt,
                        )}
                      </Badge>

                      <span className="text-sm font-semibold text-foreground">
                        {formatVehiclePrice(
                          vehicle.price,
                        )}
                      </span>
                    </div>

                    <div>
                      <CardTitle className="text-lg text-foreground">
                        {vehicle.year} {vehicle.make}{" "}
                        {vehicle.model}
                      </CardTitle>

                      <CardDescription className="mt-1">
                        {vehicle.trim}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="px-5 pb-5">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-border bg-muted/40 p-3">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Gauge
                            aria-hidden="true"
                            className="size-3.5 text-brand-gold"
                          />
                          Mileage
                        </span>

                        <p className="mt-1 text-sm font-medium text-foreground">
                          {formatMileage(
                            vehicle.mileage,
                          )}
                        </p>
                      </div>

                      <div className="rounded-lg border border-border bg-muted/40 p-3">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Settings2
                            aria-hidden="true"
                            className="size-3.5 text-brand-gold"
                          />
                          Transmission
                        </span>

                        <p className="mt-1 truncate text-sm font-medium text-foreground">
                          {vehicle.transmission}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row">
                      <Link
                        href={`/vehicles/${vehicle.slug}`}
                        className={cn(
                          buttonVariants({
                            variant: "outline",
                            size: "lg",
                          }),
                          "flex-1",
                        )}
                      >
                        View vehicle
                        <ArrowRight aria-hidden="true" />
                      </Link>

                      <DemoActionButton
                        variant="ghost"
                        size="lg"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <HeartOff aria-hidden="true" />
                        Remove
                      </DemoActionButton>
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        ) : (
          <Card className="border border-dashed border-border bg-card/60 shadow-sm">
            <CardContent className="flex flex-col items-center px-6 py-14 text-center">
              <span className="grid size-14 place-items-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                <CarFront
                  aria-hidden="true"
                  className="size-6"
                />
              </span>

              <h2 className="mt-5 text-lg font-semibold text-foreground">
                No saved vehicles yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Browse the Tavin Motors inventory and save
                vehicles you would like to compare or review
                later.
              </p>

              <Link
                href="/vehicles"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "mt-6",
                )}
              >
                Explore available vehicles
                <ArrowRight aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}