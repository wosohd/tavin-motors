import Link from "next/link";

import {
  ArrowRight,
  CarFront,
  Inbox,
  ShieldCheck,
  Ship,
  UsersRound,
  Wrench,
} from "lucide-react";

import {
  DashboardPageHeader,
} from "@/components/dashboard/dashboard-page-header";

import {
  DashboardStatCard,
} from "@/components/dashboard/dashboard-stat-card";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";

import type {
  DashboardStat,
} from "@/types/dashboard";

export const dynamic =
  "force-dynamic";

function formatStatus(
  value: string,
) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (character) =>
        character.toUpperCase(),
    );
}

function formatDateTime(
  value: Date,
) {
  return new Intl.DateTimeFormat(
    "en-KE",
    {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone:
        "Africa/Nairobi",
    },
  ).format(value);
}

export default async function AdminDashboardPage() {
  /*
   * All dashboard figures below
   * are now calculated directly
   * from PostgreSQL.
   */
  const [
    totalVehicles,
    publishedVehicles,

    pendingMarketplace,

    activeImports,

    openEnquiries,

    activeServiceBookings,

    totalUsers,

    recentMarketplace,
    recentImports,
    recentBookings,
    recentEnquiries,
  ] =
    await Promise.all([
      prisma.vehicle.count(),

      prisma.vehicle.count({
        where: {
          published: true,
        },
      }),

      prisma.marketplaceListing.count({
        where: {
          status:
            "PENDING_REVIEW",
        },
      }),

      prisma.importRequest.count({
        where: {
          status: {
            notIn: [
              "DELIVERED",
              "CANCELLED",
            ],
          },
        },
      }),

      prisma.enquiry.count({
        where: {
          status: {
            in: [
              "NEW",
              "IN_PROGRESS",
            ],
          },
        },
      }),

      prisma.serviceBooking.count({
        where: {
          status: {
            in: [
              "PENDING",
              "CONFIRMED",
              "IN_PROGRESS",
            ],
          },
        },
      }),

      prisma.user.count(),

      prisma.marketplaceListing.findMany({
        orderBy: {
          createdAt:
            "desc",
        },

        take: 5,

        select: {
          id: true,
          referenceCode: true,
          make: true,
          model: true,
          year: true,
          status: true,
          createdAt: true,
        },
      }),

      prisma.importRequest.findMany({
        orderBy: {
          submittedAt:
            "desc",
        },

        take: 5,

        select: {
          id: true,
          referenceCode: true,
          make: true,
          model: true,
          status: true,
          submittedAt: true,
        },
      }),

      prisma.serviceBooking.findMany({
        orderBy: {
          createdAt:
            "desc",
        },

        take: 5,

        select: {
          id: true,
          referenceCode: true,
          serviceType: true,
          status: true,
          createdAt: true,
        },
      }),

      prisma.enquiry.findMany({
        orderBy: {
          createdAt:
            "desc",
        },

        take: 5,

        select: {
          id: true,
          referenceCode: true,
          subject: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  const stats: DashboardStat[] =
    [
      {
        label:
          "Published inventory",

        value:
          publishedVehicles.toString(),

        detail:
          `${totalVehicles} total vehicle records`,
      },

      {
        label:
          "Moderation queue",

        value:
          pendingMarketplace.toString(),

        detail:
          "Marketplace listings awaiting review",
      },

      {
        label:
          "Active imports",

        value:
          activeImports.toString(),

        detail:
          "Import requests currently in progress",
      },

      {
        label:
          "Open enquiries",

        value:
          openEnquiries.toString(),

        detail:
          "Customer enquiries requiring attention",
      },

      {
        label:
          "Service workload",

        value:
          activeServiceBookings.toString(),

        detail:
          "Pending, confirmed or active bookings",
      },

      {
        label:
          "Registered users",

        value:
          totalUsers.toString(),

        detail:
          "Tavin Motors customer and staff accounts",
      },
    ];

  const statIcons = [
    CarFront,
    ShieldCheck,
    Ship,
    Inbox,
    Wrench,
    UsersRound,
  ] as const;

  const operationalQueue = [
    {
      title:
        "Marketplace moderation",

      value:
        pendingMarketplace,

      description:
        "Submitted vehicles awaiting administrative review.",

      href:
        "/admin/marketplace",
    },

    {
      title:
        "Import requests",

      value:
        activeImports,

      description:
        "Customer import cases still in progress.",

      href:
        "/admin/imports",
    },

    {
      title:
        "Service bookings",

      value:
        activeServiceBookings,

      description:
        "Bookings requiring scheduling or workshop action.",

      href:
        "/admin/service-bookings",
    },

    {
      title:
        "Customer enquiries",

      value:
        openEnquiries,

      description:
        "New or active customer conversations.",

      href:
        "/admin/enquiries",
    },
  ];

  /*
   * Combine activity from several
   * business tables into one live
   * operations feed.
   */
  const recentActivity = [
    ...recentMarketplace.map(
      (listing) => ({
        id:
          `marketplace-${listing.id}`,

        title:
          `${listing.year} ${listing.make} ${listing.model}`,

        reference:
          listing.referenceCode ??
          "Marketplace listing",

        status:
          formatStatus(
            listing.status,
          ),

        date:
          listing.createdAt,

        href:
          "/admin/marketplace",

        type:
          "Marketplace",
      }),
    ),

    ...recentImports.map(
      (request) => {
        const vehicle =
          [
            request.make,
            request.model,
          ]
            .filter(Boolean)
            .join(" ");

        return {
          id:
            `import-${request.id}`,

          title:
            vehicle ||
            "Vehicle import request",

          reference:
            request.referenceCode,

          status:
            formatStatus(
              request.status,
            ),

          date:
            request.submittedAt,

          href:
            "/admin/imports",

          type:
            "Import",
        };
      },
    ),

    ...recentBookings.map(
      (booking) => ({
        id:
          `service-${booking.id}`,

        title:
          booking.serviceType,

        reference:
          booking.referenceCode,

        status:
          formatStatus(
            booking.status,
          ),

        date:
          booking.createdAt,

        href:
          "/admin/service-bookings",

        type:
          "Service",
      }),
    ),

    ...recentEnquiries.map(
      (enquiry) => ({
        id:
          `enquiry-${enquiry.id}`,

        title:
          enquiry.subject,

        reference:
          enquiry.referenceCode,

        status:
          formatStatus(
            enquiry.status,
          ),

        date:
          enquiry.createdAt,

        href:
          "/admin/enquiries",

        type:
          "Enquiry",
      }),
    ),
  ]
    .sort(
      (
        first,
        second,
      ) =>
        second.date.getTime() -
        first.date.getTime(),
    )
    .slice(0, 8);

  return (
    <div className="space-y-8">
      <DashboardPageHeader
        eyebrow="Administrator dashboard"
        title="Tavin Motors operations"
        description="Monitor live inventory, marketplace submissions, imports, service demand, customer enquiries and platform accounts from one operational view."
        actions={
          <Link
            href="/admin/marketplace"
            className={
              buttonVariants({
                size: "lg",
              })
            }
          >
            Review marketplace

            <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="flex items-center gap-2 border border-emerald-500/20 bg-emerald-500/[0.05] px-4 py-3">
        <span className="size-2 rounded-full bg-emerald-400" />

        <p className="text-xs font-medium text-muted-foreground">
          Live operational data
          from PostgreSQL
        </p>
      </div>

      <section
        aria-label="Administrative overview"
        className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
      >
        {stats.map(
          (
            stat,
            index,
          ) => (
            <DashboardStatCard
              key={
                stat.label
              }
              stat={
                stat
              }
              icon={
                statIcons[
                  index
                ]
              }
            />
          ),
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">
              Operational queue
            </CardTitle>

            <CardDescription>
              Current workloads requiring administrative attention.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            {operationalQueue.map(
              (
                item,
              ) => (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className="group flex items-center justify-between gap-4 border border-white/10 bg-black/15 p-4 transition-colors hover:border-brand-gold/25 hover:bg-brand-gold/[0.025]"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-semibold">
                        {
                          item.value
                        }
                      </span>

                      <p className="font-medium">
                        {
                          item.title
                        }
                      </p>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground">
                      {
                        item.description
                      }
                    </p>
                  </div>

                  <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-gold" />
                </Link>
              ),
            )}
          </CardContent>
        </Card>

        <Card className="border border-white/10 bg-white/[0.035] shadow-none">
          <CardHeader>
            <CardTitle className="text-xl">
              Recent activity
            </CardTitle>

            <CardDescription>
              Latest customer activity recorded across the Tavin Motors platform.
            </CardDescription>
          </CardHeader>

          <CardContent>
            {recentActivity.length >
            0 ? (
              <div className="divide-y divide-white/10">
                {recentActivity.map(
                  (
                    activity,
                  ) => (
                    <Link
                      key={
                        activity.id
                      }
                      href={
                        activity.href
                      }
                      className="group flex flex-col gap-3 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="border-brand-gold/25 text-brand-gold"
                          >
                            {
                              activity.type
                            }
                          </Badge>

                          <Badge
                            variant="secondary"
                          >
                            {
                              activity.status
                            }
                          </Badge>
                        </div>

                        <p className="mt-3 truncate text-sm font-semibold">
                          {
                            activity.title
                          }
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {
                            activity.reference
                          }
                          {" · "}
                          {formatDateTime(
                            activity.date,
                          )}
                        </p>
                      </div>

                      <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-brand-gold" />
                    </Link>
                  ),
                )}
              </div>
            ) : (
              <div className="flex min-h-56 items-center justify-center border border-dashed border-white/10 text-center">
                <p className="text-sm text-muted-foreground">
                  No operational activity has been recorded yet.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <Card className="border border-brand-gold/20 bg-brand-gold/[0.035] shadow-none">
        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">
              Administration is now connected to live platform data
            </p>

            <p className="mt-2 max-w-3xl text-xs leading-6 text-muted-foreground">
              These totals are calculated directly from the same PostgreSQL records created by customer marketplace submissions, import requests, service bookings, enquiries, vehicle inventory and account registrations.
            </p>
          </div>

          <Link
            href="/admin/marketplace"
            className={cn(
              buttonVariants({
                variant:
                  "outline",
              }),
              "shrink-0 border-brand-gold/25",
            )}
          >
            Open operations

            <ArrowRight className="size-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}