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

import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DemoActionButton } from "@/components/dashboard/demo-action-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  currentCustomer,
  serviceBookings,
} from "@/data/dashboard";
import { getServiceById } from "@/data/services";
import { formatDashboardDateTime } from "@/lib/dashboard";

export default function ServiceBookingsPage() {
  const customerBookings = serviceBookings
    .filter(
      (booking) => booking.customerName === currentCustomer.name,
    )
    .sort(
      (firstBooking, secondBooking) =>
        new Date(secondBooking.scheduledFor).getTime() -
        new Date(firstBooking.scheduledFor).getTime(),
    );

  const scheduledBookings = customerBookings.filter(
    (booking) =>
      booking.status === "REQUESTED" ||
      booking.status === "CONFIRMED",
  ).length;

  const bookingsInProgress = customerBookings.filter(
    (booking) => booking.status === "IN_PROGRESS",
  ).length;

  const completedBookings = customerBookings.filter(
    (booking) => booking.status === "COMPLETED",
  ).length;

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Service bookings"
        description="Review your auto-care appointments, monitor their status and manage upcoming service requests."
        actions={
          <DemoActionButton size="lg">
            <Plus aria-hidden="true" />
            Book a service
          </DemoActionButton>
        }
      />

      <DashboardDemoNotice />

      <section
        aria-label="Service booking overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-burgundy/30 text-brand-gold">
              <CalendarDays aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {customerBookings.length}
              </p>

              <p className="text-sm text-muted-foreground">
                Total bookings
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-300">
              <CalendarClock aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {scheduledBookings}
              </p>

              <p className="text-sm text-muted-foreground">
                Scheduled
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-300">
              <Wrench aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {bookingsInProgress}
              </p>

              <p className="text-sm text-muted-foreground">
                In progress
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300">
              <CheckCircle2 aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {completedBookings}
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
            className="text-xl font-semibold text-white"
          >
            Your appointments
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            View scheduled dates, assigned services and the current status of
            each booking.
          </p>
        </div>

        {customerBookings.length > 0 ? (
          <div className="space-y-6">
            {customerBookings.map((booking) => {
              const service = getServiceById(booking.serviceId);

              const canManageBooking =
                booking.status === "REQUESTED" ||
                booking.status === "CONFIRMED";

              const isCompleted = booking.status === "COMPLETED";

              const isCancelled = booking.status === "CANCELLED";

              return (
                <Card
                  key={booking.id}
                  className="border border-white/10 bg-white/[0.035] shadow-none"
                >
                  <CardHeader className="gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <StatusBadge status={booking.status} />

                        <span className="text-xs text-muted-foreground">
                          Booking ID: {booking.id}
                        </span>
                      </div>

                      <CardTitle className="text-xl text-white">
                        {service?.title ?? "Auto-care service"}
                      </CardTitle>

                      <CardDescription className="mt-1">
                        Scheduled for{" "}
                        {formatDashboardDateTime(
                          booking.scheduledFor,
                        )}
                      </CardDescription>
                    </div>

                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-burgundy/30 text-brand-gold">
                      <Wrench aria-hidden="true" className="size-5" />
                    </span>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CarFront
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Vehicle
                        </span>

                        <p className="mt-2 font-medium text-white">
                          {booking.vehicleName}
                        </p>

                        {booking.registration ? (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Registration: {booking.registration}
                          </p>
                        ) : null}
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Appointment
                        </span>

                        <p className="mt-2 font-medium text-white">
                          {formatDashboardDateTime(
                            booking.scheduledFor,
                          )}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-black/20 p-4 sm:col-span-2 xl:col-span-1">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock3
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Current status
                        </span>

                        <div className="mt-2">
                          <StatusBadge status={booking.status} />
                        </div>
                      </div>
                    </div>

                    {canManageBooking ? (
                      <div className="mt-4 rounded-xl border border-blue-400/20 bg-blue-400/5 p-4">
                        <p className="text-xs font-semibold tracking-[0.14em] text-blue-300 uppercase">
                          Appointment management
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          You can request a new appointment time or contact the
                          service team before this booking begins.
                        </p>
                      </div>
                    ) : null}

                    {booking.status === "IN_PROGRESS" ? (
                      <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                        <p className="text-xs font-semibold tracking-[0.14em] text-amber-300 uppercase">
                          Service underway
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          The vehicle is currently being attended to by the
                          Tavin Motors auto-care team.
                        </p>
                      </div>
                    ) : null}

                    {isCompleted ? (
                      <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                        <p className="text-xs font-semibold tracking-[0.14em] text-emerald-300 uppercase">
                          Service completed
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          This appointment has been completed. Service reports
                          and invoices will become available when the backend
                          is connected.
                        </p>
                      </div>
                    ) : null}

                    {isCancelled ? (
                      <div className="mt-4 rounded-xl border border-red-400/20 bg-red-400/5 p-4">
                        <p className="flex items-center gap-2 text-xs font-semibold tracking-[0.14em] text-red-300 uppercase">
                          <XCircle aria-hidden="true" className="size-4" />
                          Booking cancelled
                        </p>

                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          This appointment is no longer active. You can submit
                          another service request when ready.
                        </p>
                      </div>
                    ) : null}

                    <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                      <DemoActionButton
                        variant="outline"
                        size="lg"
                      >
                        <MessageSquare aria-hidden="true" />
                        Contact service team
                      </DemoActionButton>

                      {canManageBooking ? (
                        <DemoActionButton
                          variant="ghost"
                          size="lg"
                          className="text-muted-foreground hover:text-white"
                        >
                          <RefreshCcw aria-hidden="true" />
                          Reschedule
                        </DemoActionButton>
                      ) : null}

                      {isCompleted || isCancelled ? (
                        <DemoActionButton
                          variant="ghost"
                          size="lg"
                          className="text-muted-foreground hover:text-white"
                        >
                          <Plus aria-hidden="true" />
                          Book again
                        </DemoActionButton>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border border-dashed border-white/15 bg-white/[0.025] shadow-none">
            <CardContent className="flex flex-col items-center px-6 py-14 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-white/5 text-brand-gold">
                <Wrench aria-hidden="true" className="size-6" />
              </span>

              <h2 className="mt-5 text-lg font-semibold text-white">
                No service bookings yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Request maintenance, diagnostics or vehicle-care support and
                manage your appointment from this page.
              </p>

              <DemoActionButton size="lg" className="mt-6">
                <Plus aria-hidden="true" />
                Book your first service
              </DemoActionButton>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}