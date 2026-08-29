import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Car,
  Check,
  Clock3,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Palette,
  Settings2,
  ShieldCheck,
  Tag,
  UserRound,
} from "lucide-react";

import { MarketplaceListingCard } from "@/components/marketplace/marketplace-listing-card";
import { VehicleVisual } from "@/components/vehicles/vehicle-visual";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";

import {
  prisma,
} from "@/lib/prisma";

import {
  toPublicMarketplaceListing,
} from "@/lib/marketplace-adapter";

import {
  formatMileage,
  formatVehiclePrice,
} from "@/lib/vehicle-format";

import {
  cn,
} from "@/lib/utils";


type MarketplaceListingPageProps = {
  params: Promise<{
    slug: string;
  }>;
};



export async function generateStaticParams() {

  const listings =
    await prisma.marketplaceListing.findMany({

      where: {
        status:
          "APPROVED",
      },

      select: {
        slug:
          true,
      },

    });


  return listings.map(
    (listing) => ({
      slug:
        listing.slug,
    }),
  );
}



export async function generateMetadata({
  params,
}: MarketplaceListingPageProps): Promise<Metadata> {

  const {
    slug,
  } =
    await params;


  const databaseListing =
    await prisma.marketplaceListing.findFirst({

      where: {
        slug,

        status:
          "APPROVED",
      },


      include: {

        seller: {

          include: {

            profile:
              true,

            _count: {

              select: {

                marketplaceListings:
                  true,

              },

            },

          },

        },


        images: {

          orderBy: {

            sortOrder:
              "asc",

          },

        },

      },

    });



  if (!databaseListing) {

    return {

      title:
        "Marketplace Listing Not Found",

    };

  }



  const listing =
    toPublicMarketplaceListing(
      databaseListing,
    );



  return {

    title:
      `${listing.year} ${listing.make} ${listing.model} for Sale`,

    description:
      listing.description,

  };

}



export default async function MarketplaceListingPage({
  params,
}: MarketplaceListingPageProps) {


  const {
    slug,
  } =
    await params;



  const databaseListing =
    await prisma.marketplaceListing.findFirst({

      where: {

        slug,

        status:
          "APPROVED",

      },


      include: {

        seller: {

          include: {

            profile:
              true,


            _count: {

              select: {

                marketplaceListings:
                  true,

              },

            },

          },

        },


        images: {

          orderBy: {

            sortOrder:
              "asc",

          },

        },

      },

    });



  if (!databaseListing) {

    notFound();

  }



  const listing =
    toPublicMarketplaceListing(
      databaseListing,
    );



  const databaseRelatedListings =
    await prisma.marketplaceListing.findMany({

      where: {

        status:
          "APPROVED",


        id: {

          not:
            databaseListing.id,

        },


        OR: [

          {
            make:
              databaseListing.make,
          },

          {
            bodyType:
              databaseListing.bodyType,
          },

        ],

      },


      include: {

        seller: {

          include: {

            profile:
              true,


            _count: {

              select: {

                marketplaceListings:
                  true,

              },

            },

          },

        },


        images: {

          orderBy: {

            sortOrder:
              "asc",

          },

        },

      },


      orderBy: {

        publishedAt:
          "desc",

      },


      take:
        3,

    });



  const relatedListings =
    databaseRelatedListings.map(
      (
        relatedListing,
      ) =>
        toPublicMarketplaceListing(
          relatedListing,
        ),
    );



  const specifications = [

    {
      icon:
        CalendarDays,

      label:
        "Year",

      value:
        listing.year.toString(),

    },


    {
      icon:
        Gauge,

      label:
        "Mileage",

      value:
        `${formatMileage(
          listing.mileage,
        )} km`,

    },


    {
      icon:
        Fuel,

      label:
        "Fuel",

      value:
        listing.fuelType,

    },


    {
      icon:
        Settings2,

      label:
        "Transmission",

      value:
        listing.transmission,

    },


    {
      icon:
        Car,

      label:
        "Body type",

      value:
        listing.bodyType,

    },


    {
      icon:
        ShieldCheck,

      label:
        "Drivetrain",

      value:
        listing.drivetrain ||
        "Not specified",

    },


    {
      icon:
        Palette,

      label:
        "Exterior",

      value:
        listing.exteriorColor,

    },


    {
      icon:
        MapPin,

      label:
        "Location",

      value:
        listing.location,

    },

  ];



  const listedDate =
    new Date(
      listing.listedAt,
    ).toLocaleDateString(
      "en-KE",
      {
        day:
          "numeric",

        month:
          "short",

        year:
          "numeric",

      },
    );



  return (

    <>

      <section className="border-b border-white/10 bg-black/20">

        <div className="tm-container py-6">

          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
          >

            <ArrowLeft className="size-4" />

            Back to marketplace

          </Link>

        </div>

      </section>



      <section className="tm-container py-10 sm:py-14">

        <div className="grid gap-10 lg:grid-cols-[1.12fr_0.88fr]">


          <VehicleVisual

            vehicle={
              listing
            }

            className="min-h-[28rem] border border-white/10"

          />



          <div>

            <div className="flex flex-wrap gap-2">

              <Badge className="bg-primary text-white">

                Marketplace

              </Badge>


              <Badge
                variant="outline"
                className="border-brand-gold/30 text-brand-gold"
              >

                {listing.condition}

              </Badge>



              {
                listing.seller.verified && (

                  <Badge
                    variant="outline"
                    className="border-emerald-500/25 text-emerald-400"
                  >

                    <BadgeCheck className="size-3.5" />

                    Verified Seller

                  </Badge>

                )
              }


            </div>



            <h1 className="mt-6 text-4xl font-semibold tracking-[-0.045em]">

              {listing.year}{" "}
              {listing.make}{" "}
              {listing.model}

            </h1>



            <p className="mt-2 text-lg text-muted-foreground">

              {listing.trim}

            </p>



            <p className="mt-6 leading-8 text-muted-foreground">

              {listing.description}

            </p>



            <div className="mt-7 border-y border-white/10 py-6">

              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">

                Seller price

              </p>


              <p className="mt-2 text-3xl font-semibold">

                {formatVehiclePrice(
                  listing.price,
                )}

              </p>

            </div>



            <Link

              href={`/contact?listing=${listing.slug}`}

              className={cn(

                buttonVariants({
                  size:
                    "lg",
                }),

                "mt-6 h-12 bg-primary hover:bg-primary/90",

              )}

            >

              <MessageCircle className="size-4" />

              Enquire About Listing

            </Link>



            <div className="mt-7 border border-brand-gold/20 bg-brand-gold/[0.04] p-5">

              <p className="text-sm font-semibold">

                Important buyer notice

              </p>


              <p className="mt-2 text-xs leading-6 text-muted-foreground">

                Marketplace vehicles are listed by independent sellers.
                Tavin Motors reviews listings before publication, but
                buyers should inspect vehicles, verify ownership documents
                and complete appropriate checks before purchase.

              </p>

            </div>


          </div>


        </div>

      </section>



      <section className="border-y border-white/10">

        <div className="tm-container py-14">


          <h2 className="text-3xl font-semibold">

            Listing specifications

          </h2>



          <div className="mt-8 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">

            {
              specifications.map(
                (
                  item,
                ) => {

                  const Icon =
                    item.icon;


                  return (

                    <div
                      key={
                        item.label
                      }
                      className="bg-background p-5"
                    >

                      <Icon className="size-5 text-brand-gold" />

                      <p className="mt-4 text-xs uppercase text-muted-foreground">

                        {item.label}

                      </p>


                      <p className="mt-2 font-medium">

                        {item.value}

                      </p>


                    </div>

                  );

                },
              )
            }


          </div>


        </div>

      </section>



      {
        relatedListings.length >
        0 && (

          <section className="tm-container py-14">

            <h2 className="text-3xl font-semibold">

              Related listings

            </h2>


            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {
                relatedListings.map(
                  (
                    relatedListing,
                  ) => (

                    <MarketplaceListingCard

                      key={
                        relatedListing.id
                      }

                      listing={
                        relatedListing
                      }

                    />

                  ),
                )
              }


            </div>


          </section>

        )
      }


    </>

  );

}