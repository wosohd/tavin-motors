import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  FileText,
  MapPin,
  MessageSquare,
  Plus,
  Search,
  Ship,
  WalletCards,
} from "lucide-react";

import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
import { DashboardProgress } from "@/components/dashboard/dashboard-progress";
import { DemoActionButton } from "@/components/dashboard/demo-action-button";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  currentCustomer,
  importRequests,
} from "@/data/dashboard";
import { formatVehiclePrice } from "@/data/vehicles";
import { formatDashboardDate } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

export default function CustomerImportsPage() {
  const customerImports = importRequests.filter(
    (request) =>
      request.customerName === currentCustomer.name,
  );

  const completedImports = customerImports.filter(
    (request) => request.status === "COMPLETED",
  ).length;

  const activeImports = customerImports.filter(
    (request) => request.status !== "COMPLETED",
  ).length;

  const averageProgress =
    customerImports.length > 0
      ? Math.round(
          customerImports.reduce(
            (total, request) =>
              total + request.progress,
            0,
          ) / customerImports.length,
        )
      : 0;

  const totalBudget = customerImports.reduce(
    (total, request) => total + request.budget,
    0,
  );

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Import requests"
        description="Track your vehicle sourcing, payment, shipping and clearance progress from one place."
        actions={
          <Link
            href="/import-a-car"
            className={buttonVariants({
              size: "lg",
            })}
          >
            <Plus aria-hidden="true" />
            Start a new request
          </Link>
        }
      />

      <DashboardDemoNotice />

      <section
        aria-label="Import request overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">
              <FileText
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {customerImports.length}
              </p>

              <p className="text-sm text-muted-foreground">
                Total requests
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-sky-600/20 bg-sky-500/10 text-sky-700 dark:border-sky-400/20 dark:text-sky-300">
              <Ship
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {activeImports}
              </p>

              <p className="text-sm text-muted-foreground">
                Active requests
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-emerald-600/20 bg-emerald-500/10 text-emerald-700 dark:border-emerald-400/20 dark:text-emerald-300">
              <CheckCircle2
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {completedImports}
              </p>

              <p className="text-sm text-muted-foreground">
                Completed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border bg-card/80 shadow-sm">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-amber-600/20 bg-amber-500/10 text-amber-700 dark:border-amber-300/20 dark:text-amber-300">
              <Ship
                aria-hidden="true"
                className="size-5"
              />
            </span>

            <div>
              <p className="text-2xl font-semibold text-foreground">
                {averageProgress}%
              </p>

              <p className="text-sm text-muted-foreground">
                Average progress
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {customerImports.length > 0 ? (
        <>
          <Card className="border border-border bg-card/80 shadow-sm">
            <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
                  <WalletCards
                    aria-hidden="true"
                    className="size-5"
                  />
                </span>

                <div>
                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    Combined budget
                  </p>

                  <p className="mt-1 text-xl font-semibold text-foreground">
                    {formatVehiclePrice(totalBudget)}
                  </p>
                </div>
              </div>

              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                Budgets shown here are demonstration figures
                and do not represent invoices, deposits or
                final landed costs.
              </p>
            </CardContent>
          </Card>

          <section aria-labelledby="import-requests-heading">
            <div className="mb-5">
              <h2
                id="import-requests-heading"
                className="text-xl font-semibold text-foreground"
              >
                Your vehicle imports
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Follow each request through its current import
                stage.
              </p>
            </div>

            <div className="space-y-6">
              {customerImports.map((request) => (
                <Card
                  key={request.id}
                  className="border border-border bg-card/80 shadow-sm transition-colors hover:bg-card"
                >
                  <CardHeader className="gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <StatusBadge
                          status={request.status}
                        />

                        <span className="text-xs text-muted-foreground">
                          Request ID: {request.id}
                        </span>
                      </div>

                      <CardTitle className="text-xl text-foreground">
                        {request.vehicleName}
                      </CardTitle>

                      <CardDescription className="mt-1">
                        Imported from{" "}
                        {request.sourceMarket}
                      </CardDescription>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                        Target budget
                      </p>

                      <p className="mt-1 text-lg font-semibold text-foreground">
                        {formatVehiclePrice(
                          request.budget,
                        )}
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                      <div className="rounded-xl border border-border bg-muted/40 p-4">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <MapPin
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Source market
                        </span>

                        <p className="mt-2 font-medium text-foreground">
                          {request.sourceMarket}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-muted/40 p-4">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <CalendarDays
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Submitted
                        </span>

                        <p className="mt-2 font-medium text-foreground">
                          {formatDashboardDate(
                            request.submittedAt,
                          )}
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-muted/40 p-4 sm:col-span-2 xl:col-span-1">
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Search
                            aria-hidden="true"
                            className="size-4 text-brand-gold"
                          />
                          Assigned specialist
                        </span>

                        <p className="mt-2 font-medium text-foreground">
                          {request.assignedTo ??
                            "Assignment pending"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-border bg-muted/40 p-5">
                      <DashboardProgress
                        value={request.progress}
                        label={request.nextStep}
                      />

                      <div className="mt-4 flex items-start gap-3 border-t border-border pt-4">
                        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/25">
                          <ArrowRight
                            aria-hidden="true"
                            className="size-4"
                          />
                        </span>

                        <div>
                          <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                            Next step
                          </p>

                          <p className="mt-1 text-sm font-medium text-foreground">
                            {request.nextStep}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
                      <DemoActionButton
                        variant="outline"
                        size="lg"
                      >
                        <FileText aria-hidden="true" />
                        View request details
                      </DemoActionButton>

                      <DemoActionButton
                        variant="ghost"
                        size="lg"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <MessageSquare
                          aria-hidden="true"
                        />
                        Contact import team
                      </DemoActionButton>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      ) : (
        <Card className="border border-dashed border-border bg-card/60 shadow-sm">
          <CardContent className="flex flex-col items-center px-6 py-14 text-center">
            <span className="grid size-14 place-items-center rounded-full border border-brand-gold/20 bg-brand-gold/10 text-brand-gold">
              <Ship
                aria-hidden="true"
                className="size-6"
              />
            </span>

            <h2 className="mt-5 text-lg font-semibold text-foreground">
              No import requests yet
            </h2>

            <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Tell the Tavin Motors team what vehicle you are
              looking for and follow the sourcing and delivery
              process from this page.
            </p>

            <Link
              href="/import-a-car"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "mt-6",
              )}
            >
              Start an import request
              <ArrowRight aria-hidden="true" />
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}