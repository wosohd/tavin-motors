import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";

export default function CustomerProfilePage() {
  return (
    <div className="space-y-6">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Profile settings"
        description="Review and manage the personal and contact information associated with your customer account."
      />

      <DashboardDemoNotice />

      <section className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">
        <h2 className="text-lg font-semibold text-white">
          Customer profile
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Profile details and account preferences will be managed from this
          page.
        </p>
      </section>
    </div>
  );
}