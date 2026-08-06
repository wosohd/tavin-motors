import Link from "next/link";
import {
  ArrowRight,
  Heart,
  MessagesSquare,
  Ship,
  Wrench,
} from "lucide-react";

import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DashboardProgress } from "@/components/dashboard/dashboard-progress";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { StatusBadge } from "@/components/dashboard/status-badge";
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
import {
  currentCustomer,
  customerDashboardStats,
  enquiries,
  importRequests,
  savedVehicles,
  serviceBookings,
} from "@/data/dashboard";
import { getServiceById } from "@/data/services";
import {
  formatVehiclePrice,
  getVehicleById,
} from "@/data/vehicles";
import {
  formatDashboardDate,
  formatDashboardDateTime,
} from "@/lib/dashboard";
import { cn } from "@/lib/utils";

const statIcons = [
  Heart,
  Ship,
  Wrench,
  MessagesSquare,
] as const;

export default function CustomerDashboardPage() {
  const customerImports = importRequests.filter(
    (request) =>
      request.customerName === currentCustomer.name,
  );

  const customerBookings = serviceBookings.filter(
    (booking) =>
      booking.customerName === currentCustomer.name,
  );

  const customerEnquiries = enquiries.filter(
    (enquiry) =>
      enquiry.customerName === currentCustomer.name,
  );

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
    )
    .slice(0, 2);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title={`Welcome back, ${currentCustomer.firstName}`}
        description="Track your saved vehicles, import requests, service bookings and conversations with the Tavin Motors team."
        actions={
          <>
            <Link
              href="/vehicles"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
              })}
            >
              Browse vehicles
            </Link>

            <Link
              href="/import-a-car"
              className={buttonVariants({
                size: "lg",
              })}
            >
              Start an import request
            </Link>
          </>
        }
      />

      <DashboardDemoNotice />

      <section
        aria-label="Account overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        {customerDashboardStats.map(
          (stat, index) => (
            <DashboardStatCard
              key={stat.label}
              stat={stat}
              icon={statIcons[index]}
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
                Follow each request from sourcing to
                delivery.
              </CardDescription>
            </div>

            <Link
              href="/dashboard/imports"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-brand-gold hover:text-brand-gold",
              )}
            >
              View all
              <ArrowRight aria-hidden="true" />
            </Link>
          </CardHeader>

          <CardContent className="space-y-4">
            {customerImports.map((request) => (
              <article
                key={request.id}
                className="rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:bg-muted/60"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-semibold text-foreground">
                      {request.vehicleName}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {request.sourceMarket} · Submitted{" "}
                      {formatDashboardDate(
                        request.submittedAt,
                      )}
                    </p>
                  </div>

                  <StatusBadge
                    status={request.status}
                  />
                </div>

                <DashboardProgress
                  value={request.progress}
                  label={request.nextStep}
                  className="mt-5"
                />
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Upcoming service
            </CardTitle>

            <CardDescription>
              Your next scheduled auto-care visit.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {customerBookings
              .slice(0, 1)
              .map((booking) => {
                const service = getServiceById(
                  booking.serviceId,
                );

                return (
                  <article
                    key={booking.id}
                    className="rounded-xl border border-border bg-muted/40 p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <span className="grid size-11 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">
                        <Wrench
                          aria-hidden="true"
                          className="size-5"
                        />
                      </span>

                      <StatusBadge
                        status={booking.status}
                      />
                    </div>

                    <h2 className="mt-5 text-lg font-semibold text-foreground">
                      {service?.title ??
                        "Auto-care service"}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {booking.vehicleName}
                    </p>

                    <div className="mt-5 border-t border-border pt-4">
                      <p className="text-xs tracking-[0.16em] text-brand-gold uppercase">
                        Appointment
                      </p>

                      <p className="mt-2 font-medium text-foreground">
                        {formatDashboardDateTime(
                          booking.scheduledFor,
                        )}
                      </p>
                    </div>

                    <Link
                      href="/dashboard/service-bookings"
                      className={cn(
                        buttonVariants({
                          variant: "outline",
                          size: "lg",
                        }),
                        "mt-5 w-full",
                      )}
                    >
                      Manage bookings
                    </Link>
                  </article>
                );
              })}
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
                Continue comparing vehicles from your
                shortlist.
              </CardDescription>
            </div>

            <Link
              href="/dashboard/saved-vehicles"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  size: "sm",
                }),
                "text-brand-gold hover:text-brand-gold",
              )}
            >
              View all
              <ArrowRight aria-hidden="true" />
            </Link>
          </CardHeader>

          <CardContent className="grid gap-4 md:grid-cols-2">
            {savedVehicleDetails.map(
              ({ record, vehicle }) => (
                <article
                  key={record.id}
                  className="overflow-hidden rounded-xl border border-border bg-muted/40 transition-colors hover:bg-muted/60"
                >
                  <VehicleVisual
                    vehicle={vehicle}
                    compact
                    className="aspect-[16/9]"
                  />

                  <div className="p-4">
                    <Badge
                      variant="outline"
                      className="border-brand-gold/30 bg-brand-gold/10 text-brand-gold"
                    >
                      Saved{" "}
                      {formatDashboardDate(
                        record.savedAt,
                      )}
                    </Badge>

                    <h2 className="mt-3 font-semibold text-foreground">
                      {vehicle.year} {vehicle.make}{" "}
                      {vehicle.model}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {vehicle.trim}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-border pt-4">
                      <span className="font-semibold text-foreground">
                        {formatVehiclePrice(
                          vehicle.price,
                        )}
                      </span>

                      <Link
                        href={`/vehicles/${vehicle.slug}`}
                        className={buttonVariants({
                          variant: "outline",
                          size: "sm",
                        })}
                      >
                        View vehicle
                      </Link>
                    </div>
                  </div>
                </article>
              ),
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
                  variant: "ghost",
                  size: "sm",
                }),
                "text-brand-gold hover:text-brand-gold",
              )}
            >
              View all
              <ArrowRight aria-hidden="true" />
            </Link>
          </CardHeader>

          <CardContent className="space-y-3">
            {customerEnquiries.map((enquiry) => (
              <article
                key={enquiry.id}
                className="rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:bg-muted/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">
                      {enquiry.subject}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {enquiry.channel} ·{" "}
                      {formatDashboardDateTime(
                        enquiry.createdAt,
                      )}
                    </p>
                  </div>

                  <StatusBadge
                    status={enquiry.status}
                  />
                </div>
              </article>
            ))}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}