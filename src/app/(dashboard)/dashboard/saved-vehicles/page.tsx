import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function SavedVehiclesPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Saved vehicles"
        description="Review vehicles you have saved and return to their full specifications whenever you are ready."
      />

      <DashboardDemoNotice />

      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <h2 className="text-lg font-semibold text-white">
          Your saved vehicles
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Saved vehicle records will be displayed here using the current
          demonstration inventory.
        </p>
      </section>
    </div>
  );
}