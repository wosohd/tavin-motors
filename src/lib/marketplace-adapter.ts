import type { MarketplaceListing } from "@/types/marketplace";


type DatabaseMarketplaceListing = {
  id: string;
  sellerId: string;

  contactName: string | null;
  contactEmail: string | null;
  contactPhone: string | null;

  referenceCode: string | null;
  slug: string;

  make: string;
  model: string;
  trim: string | null;

  year: number;
  mileage: number;
  askingPrice: number;

  fuelType: string;
  transmission: string;
  exteriorColor: string;
  bodyType: string | null;
  engineSize: string | null;

  location: string;
  condition: string | null;
  ownership: string | null;
  description: string | null;

  negotiable: boolean;

  status:
    | "DRAFT"
    | "PENDING_REVIEW"
    | "APPROVED"
    | "CHANGES_REQUESTED"
    | "REJECTED"
    | "SOLD"
    | "ARCHIVED";

  moderationNote: string | null;

  submittedAt: Date | null;
  publishedAt: Date | null;

  createdAt: Date;
  updatedAt: Date;

  seller: {
    id: string;
    name: string;
    emailVerified: boolean;
    createdAt: Date;
    role: string | null;
    profile: {
      city: string | null;
      county: string | null;
    } | null;

    _count: {
      marketplaceListings: number;
    };
  };

  images: {
    id: string;
    url: string;
    publicId: string | null;
    isPrimary: boolean;
    sortOrder: number;
  }[];
};


export function toPublicMarketplaceListing(
  listing: DatabaseMarketplaceListing,
): MarketplaceListing {

  return {

    id:
      listing.id,

    slug:
      listing.slug,

    make:
      listing.make,

    model:
      listing.model,

    trim:
      listing.trim ??
      "",

    year:
      listing.year,

    price:
      listing.askingPrice,

    mileage:
      listing.mileage,

    transmission:
      listing.transmission as MarketplaceListing["transmission"],

    fuelType:
      listing.fuelType as MarketplaceListing["fuelType"],

    bodyType:
      (listing.bodyType ??
        "SUV") as MarketplaceListing["bodyType"],

    engine:
      listing.engineSize ??
      "",

    drivetrain:
      "",

    exteriorColor:
      listing.exteriorColor,

    interiorColor:
      "",

    location:
      listing.location,

    stockCode:
      listing.referenceCode ??
      listing.slug,

    status:
      "MARKETPLACE",

    featured:
      false,

    description:
      listing.description ??
      "",

    features:
      [],

    tone:
      "graphite",

    condition:
      listing.condition ??
      "Not specified",

    county:
      listing.seller.profile?.county ??
      listing.location,

    negotiable:
      listing.negotiable,

    listedAt:
      (
        listing.publishedAt ??
        listing.submittedAt ??
        listing.createdAt
      ).toISOString(),

    ownership:
      listing.ownership ??
      "Not specified",

    seller: {

      id:
        listing.seller.id,

      displayName:
        listing.seller.name,

      sellerType:
        listing.seller.role === "admin"
          ? "Dealer"
          : "Private Seller",

      verified:
        listing.seller.emailVerified,

      memberSince:
        listing.seller.createdAt.toLocaleDateString(
          "en-KE",
          {
            month:
              "long",
            year:
              "numeric",
          },
        ),

      location:
        listing.seller.profile?.city ??
        listing.location,

      responseTime:
        "Contact seller through Tavin Motors",

      listingsCount:
        listing.seller._count.marketplaceListings,

    },

    moderationNote:
      listing.moderationNote,

    images:
      listing.images,

  };
}