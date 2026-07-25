import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function ServiceBookingsPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Service bookings"
        description="Review scheduled auto-care appointments and track the status of each service request."
      />

      <DashboardDemoNotice />

      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <h2 className="text-lg font-semibold text-white">
          Your service appointments
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Requested, confirmed, ongoing and completed service bookings will
          appear here.
        </p>
      </section>
    </div>
  );
}