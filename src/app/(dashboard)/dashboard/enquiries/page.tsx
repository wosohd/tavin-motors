import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function CustomerEnquiriesPage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Enquiries"
        description="Track questions and requests submitted to the Tavin Motors customer-support team."
      />

      <DashboardDemoNotice />

      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <h2 className="text-lg font-semibold text-white">
          Your recent enquiries
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Open, replied and closed customer enquiries will be displayed here.
        </p>
      </section>
    </div>
  );
}