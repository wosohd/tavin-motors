import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function CustomerImportsPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Import requests"
        description="Follow your vehicle sourcing, shipping and clearance progress from one place."
      />

      <DashboardDemoNotice />

      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <h2 className="text-lg font-semibold text-white">
          Your import requests
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Import progress, current status and the next required action will
          appear here.
        </p>
      </section>
    </div>
  );
}