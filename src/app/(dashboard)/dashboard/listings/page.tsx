import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  Eye,
  FilePenLine,
  MessageSquare,
  Plus,
  ReceiptText,
  Trash2,
} from "lucide-react";

import { DashboardDemoNotice } from "@/components/dashboard/dashboard-demo-notice";
import { DashboardPageHeader } from "@/components/dashboard/dashboard-page-header";
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
  marketplaceListings,
} from "@/data/dashboard";
import { formatVehiclePrice } from "@/data/vehicles";
import { formatDashboardDate } from "@/lib/dashboard";
import { cn } from "@/lib/utils";

export default function CustomerListingsPage() {
  const customerListings = marketplaceListings.filter(
    (listing) => listing.ownerName === currentCustomer.name,
  );

  const approvedListings = customerListings.filter(
    (listing) => listing.status === "APPROVED",
  ).length;

  const listingsUnderReview = customerListings.filter(
    (listing) =>
      listing.status === "PENDING_REVIEW" ||
      listing.status === "NEEDS_CHANGES",
  ).length;

  const totalEnquiries = customerListings.reduce(
    (total, listing) => total + listing.enquiries,
    0,
  );

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="My listings"
        description="Review vehicles you have submitted to the Tavin Motors marketplace and follow their approval and enquiry activity."
        actions={
          <Link
            href="/marketplace/sell"
            className={buttonVariants({
              size: "lg",
            })}
          >
            <Plus aria-hidden="true" />
            Create a listing
          </Link>
        }
      />

      <DashboardDemoNotice />

      <section
        aria-label="Listing overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-burgundy/30 text-brand-gold">
              <ReceiptText aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {customerListings.length}
              </p>

              <p className="text-sm text-muted-foreground">
                Total listings
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/10 text-emerald-300">
              <CarFront aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {approvedListings}
              </p>

              <p className="text-sm text-muted-foreground">
                Approved
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-500/10 text-amber-300">
              <FilePenLine aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {listingsUnderReview}
              </p>

              <p className="text-sm text-muted-foreground">
                Under review
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardContent className="flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-300">
              <MessageSquare aria-hidden="true" className="size-5" />
            </span>

            <div>
              <p className="text-2xl font-semibold text-white">
                {totalEnquiries}
              </p>

              <p className="text-sm text-muted-foreground">
                Buyer enquiries
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="customer-listings-heading">
        <div className="mb-5">
          <h2
            id="customer-listings-heading"
            className="text-xl font-semibold text-white"
          >
            Submitted vehicles
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor approval decisions, listing views and buyer interest.
          </p>
        </div>

        {customerListings.length > 0 ? (
          <div className="space-y-5">
            {customerListings.map((listing) => (
              <Card
                key={listing.id}
                className="border border-white/10 bg-white/[0.035] shadow-none"
              >
                <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <StatusBadge status={listing.status} />

                      <span className="text-xs text-muted-foreground">
                        Submitted{" "}
                        {formatDashboardDate(listing.submittedAt)}
                      </span>
                    </div>

                    <CardTitle className="text-xl text-white">
                      {listing.vehicleName}
                    </CardTitle>

                    <CardDescription className="mt-1">
                      {listing.registration
                        ? `Registration: ${listing.registration}`
                        : "Registration not provided"}
                    </CardDescription>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                      Asking price
                    </p>

                    <p className="mt-1 text-lg font-semibold text-white">
                      {formatVehiclePrice(listing.askingPrice)}
                    </p>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Eye
                          aria-hidden="true"
                          className="size-4 text-brand-gold"
                        />
                        Listing views
                      </span>

                      <span className="font-semibold text-white">
                        {listing.views}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 p-4">
                      <span className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MessageSquare
                          aria-hidden="true"
                          className="size-4 text-brand-gold"
                        />
                        Enquiries
                      </span>

                      <span className="font-semibold text-white">
                        {listing.enquiries}
                      </span>
                    </div>
                  </div>

                  {listing.reviewNote ? (
                    <div className="mt-4 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                      <p className="text-xs font-semibold tracking-[0.14em] text-amber-300 uppercase">
                        Review note
                      </p>

                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {listing.reviewNote}
                      </p>
                    </div>
                  ) : null}

                  <div className="mt-5 flex flex-col gap-2 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
                    <DemoActionButton
                      variant="outline"
                      size="lg"
                    >
                      <FilePenLine aria-hidden="true" />
                      Edit listing
                    </DemoActionButton>

                    <DemoActionButton
                      variant="ghost"
                      size="lg"
                      className="text-muted-foreground hover:text-red-300"
                    >
                      <Trash2 aria-hidden="true" />
                      Withdraw
                    </DemoActionButton>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border border-dashed border-white/15 bg-white/[0.025] shadow-none">
            <CardContent className="flex flex-col items-center px-6 py-14 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-white/5 text-brand-gold">
                <CarFront aria-hidden="true" className="size-6" />
              </span>

              <h2 className="mt-5 text-lg font-semibold text-white">
                No vehicle listings yet
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                Submit a vehicle to the Tavin Motors marketplace and follow its
                review status from this page.
              </p>

              <Link
                href="/marketplace/sell"
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "mt-6",
                )}
              >
                Create your first listing
                <ArrowRight aria-hidden="true" />
              </Link>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}