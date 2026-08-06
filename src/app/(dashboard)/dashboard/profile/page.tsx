import {
  BellRing,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DemoActionButton } from "@/components/dashboard/demo-action-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { currentCustomer } from "@/data/dashboard";

const demonstrationProfile = {
  email: "daniel.mwangi@example.com",
  phone: "+254 712 345 678",
  county: "Nairobi",
  preferredContact: "WhatsApp",
  joinedAt: "July 2026",
};

const fieldClassName =
  "h-11 w-full rounded-lg border border-input bg-background/80 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10";

export default function CustomerProfilePage() {
  const customerNames = currentCustomer.name
    .trim()
    .split(/\s+/);

  const firstName =
    customerNames[0] ?? currentCustomer.firstName;

  const lastName = customerNames
    .slice(1)
    .join(" ");

  const initials = customerNames
    .slice(0, 2)
    .map((name) =>
      name.charAt(0).toUpperCase(),
    )
    .join("");

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Profile settings"
        description="Review your personal information, communication preferences and account security settings."
      />

      <DashboardDemoNotice />

      <Card className="border border-border bg-card/80 shadow-sm">
        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4">
            <span className="grid size-16 shrink-0 place-items-center rounded-full border border-brand-gold/25 bg-brand-burgundy/10 text-xl font-semibold text-brand-gold dark:bg-brand-burgundy/30">
              {initials || "TM"}
            </span>

            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {currentCustomer.name}
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Tavin Motors customer
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                Member since{" "}
                {demonstrationProfile.joinedAt}
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-600/20 bg-emerald-500/10 px-4 py-3 dark:border-emerald-400/20">
            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">
              <ShieldCheck
                aria-hidden="true"
                className="size-4"
              />
              Demonstration account active
            </p>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <Card className="border border-border bg-card/80 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl text-foreground">
              <span className="grid size-10 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">
                <UserRound
                  aria-hidden="true"
                  className="size-5"
                />
              </span>

              Personal information
            </CardTitle>

            <CardDescription>
              Update the information associated with your
              customer account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="first-name"
                    className="text-sm font-medium text-foreground"
                  >
                    First name
                  </label>

                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    defaultValue={firstName}
                    autoComplete="given-name"
                    className={fieldClassName}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="last-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Last name
                  </label>

                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    defaultValue={lastName}
                    autoComplete="family-name"
                    className={fieldClassName}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <Mail
                    aria-hidden="true"
                    className="size-4 text-brand-gold"
                  />
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={
                    demonstrationProfile.email
                  }
                  autoComplete="email"
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <Phone
                    aria-hidden="true"
                    className="size-4 text-brand-gold"
                  />
                  Phone number
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={
                    demonstrationProfile.phone
                  }
                  autoComplete="tel"
                  className={fieldClassName}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="county"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >
                  <MapPin
                    aria-hidden="true"
                    className="size-4 text-brand-gold"
                  />
                  County or location
                </label>

                <input
                  id="county"
                  name="county"
                  type="text"
                  defaultValue={
                    demonstrationProfile.county
                  }
                  autoComplete="address-level1"
                  className={fieldClassName}
                />
              </div>

              <div className="flex justify-end border-t border-border pt-5">
                <DemoActionButton
                  type="button"
                  size="lg"
                >
                  <Save aria-hidden="true" />
                  Save profile changes
                </DemoActionButton>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border border-border bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <BellRing
                  aria-hidden="true"
                  className="size-5 text-brand-gold"
                />
                Contact preferences
              </CardTitle>

              <CardDescription>
                Choose how the Tavin Motors team should
                contact you.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="preferred-contact"
                  className="text-sm font-medium text-foreground"
                >
                  Preferred channel
                </label>

                <select
                  id="preferred-contact"
                  name="preferredContact"
                  defaultValue={
                    demonstrationProfile.preferredContact
                  }
                  className={fieldClassName}
                >
                  <option value="WhatsApp">
                    WhatsApp
                  </option>

                  <option value="Phone">
                    Phone call
                  </option>

                  <option value="Email">
                    Email
                  </option>

                  <option value="SMS">
                    SMS
                  </option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:bg-muted/60">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-0.5 size-4 accent-primary"
                  />

                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      Vehicle updates
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      Receive updates about saved vehicles
                      and new inventory.
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:bg-muted/60">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="mt-0.5 size-4 accent-primary"
                  />

                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      Import progress
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      Receive sourcing, shipping and
                      clearance notifications.
                    </span>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-border bg-muted/40 p-4 transition-colors hover:bg-muted/60">
                  <input
                    type="checkbox"
                    className="mt-0.5 size-4 accent-primary"
                  />

                  <span>
                    <span className="block text-sm font-medium text-foreground">
                      Marketing messages
                    </span>

                    <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                      Receive promotional news and
                      featured vehicle alerts.
                    </span>
                  </span>
                </label>
              </div>

              <DemoActionButton
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
              >
                <Save aria-hidden="true" />
                Save preferences
              </DemoActionButton>
            </CardContent>
          </Card>

          <Card className="border border-border bg-card/80 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg text-foreground">
                <KeyRound
                  aria-hidden="true"
                  className="size-5 text-brand-gold"
                />
                Account security
              </CardTitle>

              <CardDescription>
                Security controls will become active when
                authentication is connected.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-sm font-medium text-foreground">
                  Password
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Password management will be provided
                  through Better Auth during Phase 2.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <p className="text-sm font-medium text-foreground">
                  Two-factor authentication
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Additional account protection is planned
                  for the secured production dashboard.
                </p>
              </div>

              <DemoActionButton
                type="button"
                variant="outline"
                size="lg"
                className="w-full"
              >
                <ShieldCheck aria-hidden="true" />
                Review security
              </DemoActionButton>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}