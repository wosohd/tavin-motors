import type { Metadata } from "next";

import Link from "next/link";

import {
  Clock3,
  Eye,
  FileCheck2,
  ShieldAlert,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";

export const metadata: Metadata = {
  title:
    "Marketplace Moderation",
};

function formatStatus(
  status: string,
) {
  return status
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter) =>
        letter.toUpperCase(),
    );
}

function statusStyle(
  status: string,
) {
  switch (status) {
    case "PENDING_REVIEW":
      return "border-brand-gold/30 bg-brand-gold/10 text-brand-gold";

    case "APPROVED":
      return "border-emerald-600/25 bg-emerald-600/10 text-emerald-600";

    case "REJECTED":
      return "border-red-600/25 bg-red-600/10 text-red-600";

    case "CHANGES_REQUESTED":
      return "border-sky-600/25 bg-sky-600/10 text-sky-600";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export default async function AdminMarketplacePage() {
  const [
    pendingCount,
    approvedCount,
    changesCount,
    listings,
  ] =
    await Promise.all([
      prisma.marketplaceListing.count({
        where: {
          status:
            "PENDING_REVIEW",
        },
      }),

      prisma.marketplaceListing.count({
        where: {
          status:
            "APPROVED",
        },
      }),

      prisma.marketplaceListing.count({
        where: {
          status:
            "CHANGES_REQUESTED",
        },
      }),

      prisma.marketplaceListing.findMany({
        orderBy: {
          createdAt:
            "desc",
        },

        take: 20,

        select: {
          id: true,

          referenceCode: true,

          make: true,
          model: true,
          year: true,

          askingPrice: true,

          location: true,

          status: true,

          submittedAt: true,

          contactName: true,

          seller: {
            select: {
              name: true,
              email: true,
            },
          },

          images: {
            select: {
              url: true,
              isPrimary: true,
            },

            orderBy: {
              sortOrder:
                "asc",
            },
          },
        },
      }),
    ]);

  return (
    <div className="space-y-8">
      <header className="border-b border-border pb-7">
        <p className="tm-eyebrow">
          Marketplace moderation
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Customer listings
        </h1>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Review real customer vehicle submissions before approving them for public marketplace visibility.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <ShieldAlert className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              Pending review
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {pendingCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <FileCheck2 className="size-5 text-emerald-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Approved
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {approvedCount}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <Clock3 className="size-5 text-sky-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Changes requested
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {changesCount}
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        {listings.map(
          (
            listing,
          ) => {
            const primaryImage =
              listing.images.find(
                (
                  image,
                ) =>
                  image.isPrimary,
              ) ??
              listing.images[0];

            return (
              <article
                key={
                  listing.id
                }
                className="overflow-hidden rounded-2xl border border-border bg-card/70"
              >
                {primaryImage && (
                  <img
                    src={
                      primaryImage.url
                    }
                    alt={`${listing.year} ${listing.make} ${listing.model}`}
                    className="h-56 w-full object-cover"
                  />
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                        {
                          listing.referenceCode ??
                          "No reference"
                        }
                      </p>

                      <h2 className="mt-2 text-lg font-semibold">
                        {listing.year}{" "}
                        {listing.make}{" "}
                        {listing.model}
                      </h2>
                    </div>

                    <Badge
                      variant="outline"
                      className={cn(
                        statusStyle(
                          listing.status,
                        ),
                      )}
                    >
                      {
                        formatStatus(
                          listing.status,
                        )
                      }
                    </Badge>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Seller
                      </p>

                      <p>
                        {
                          listing.contactName ??
                          listing.seller.name
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Price
                      </p>

                      <p>
                        KES{" "}
                        {listing.askingPrice.toLocaleString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Location
                      </p>

                      <p>
                        {
                          listing.location
                        }
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Images
                      </p>

                      <p>
                        {
                          listing.images.length
                        }
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/marketplace/${listing.id}`}
                    className={cn(
                      buttonVariants({
                        size:
                          "sm",
                      }),
                      "mt-5 w-full",
                    )}
                  >
                    <Eye className="size-4" />

                    Review listing
                  </Link>
                </div>
              </article>
            );
          },
        )}
      </section>
    </div>
  );
}