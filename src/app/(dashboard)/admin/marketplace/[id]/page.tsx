import type { Metadata } from "next";

import {
  notFound,
} from "next/navigation";

import Link from "next/link";

import {
  ArrowLeft,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  AdminMarketplaceActions,
} from "@/components/dashboard/admin-marketplace-actions";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";


export const metadata: Metadata = {
  title:
    "Review Marketplace Listing",
};


export default async function MarketplaceReviewPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const {
    id,
  } =
    await params;


  const listing =
    await prisma.marketplaceListing.findUnique({
      where: {
        id,
      },

      include: {
        images: {
          orderBy: {
            sortOrder:
              "asc",
          },
        },

        seller: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });


  if (!listing) {
    notFound();
  }


  return (
    <div className="space-y-8">


      <Link
        href="/admin/marketplace"
        className={cn(
          buttonVariants({
            variant:
              "outline",
          }),
        )}
      >
        <ArrowLeft className="size-4" />
        Back to marketplace
      </Link>



      <header>

        <p className="tm-eyebrow">
          Marketplace review
        </p>


        <h1 className="mt-4 text-4xl font-semibold">
          {listing.year}{" "}
          {listing.make}{" "}
          {listing.model}
        </h1>


        <Badge
          className="mt-4"
        >
          {listing.status}
        </Badge>

      </header>



      <section className="grid gap-6 lg:grid-cols-3">

        {listing.images.map(
          (
            image,
          ) => (
            <img
              key={
                image.id
              }
              src={
                image.url
              }
              alt={
                listing.model
              }
              className="h-64 w-full rounded-xl object-cover"
            />
          ),
        )}

      </section>



      <section className="rounded-xl border border-border p-6">

        <h2 className="text-xl font-semibold">
          Seller information
        </h2>


        <p className="mt-3">
          {
            listing.seller.name
          }
        </p>


        <p>
          {
            listing.seller.email
          }
        </p>

      </section>



      <section className="rounded-xl border border-border p-6">

        <h2 className="text-xl font-semibold">
          Vehicle details
        </h2>


        <p className="mt-4">
          Asking price:
          {" "}
          KES{" "}
          {
            listing.askingPrice.toLocaleString()
          }
        </p>


        <p>
          Mileage:
          {" "}
          {
            listing.mileage.toLocaleString()
          }
          km
        </p>


        <p>
          Location:
          {" "}
          {
            listing.location
          }
        </p>


        <p className="mt-4 text-muted-foreground">
          {
            listing.description
          }
        </p>

      </section>



      <AdminMarketplaceActions
        listingId={
          listing.id
        }
      />

    </div>
  );
}