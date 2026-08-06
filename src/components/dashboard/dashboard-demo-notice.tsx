import { FlaskConical } from "lucide-react";

export function DashboardDemoNotice() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-3 text-sm text-muted-foreground shadow-sm">
      <FlaskConical
        aria-hidden="true"
        className="mt-0.5 size-4 shrink-0 text-brand-gold"
      />

      <p className="leading-6">
        <span className="font-semibold text-foreground">
          Demonstration mode:
        </span>{" "}
        records and actions on this dashboard are simulated until
        authentication, database storage and role permissions are connected.
      </p>
    </div>
  );
}