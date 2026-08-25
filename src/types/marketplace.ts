import type { Vehicle } from "@/types/vehicle";


export type MarketplaceSeller = {
  id: string;

  displayName: string;

  sellerType: string;

  verified: boolean;

  memberSince: string;

  location: string;

  responseTime: string;

  listingsCount: number;
};


export type MarketplaceListing =
  Vehicle & {

    status: "MARKETPLACE";

    condition: string;

    county: string;

    negotiable: boolean;

    listedAt: string;

    ownership: string;

    seller: MarketplaceSeller;

    moderationNote?: string | null;

    images?: {
      id: string;
      url: string;
      publicId?: string | null;
      isPrimary: boolean;
      sortOrder: number;
    }[];

  };