import type { Vehicle } from "@/types/vehicle";

export type MarketplaceSeller = {
  id: string;
  displayName: string;
  sellerType: "Private Seller" | "Dealer";
  verified: boolean;
  memberSince: string;
  location: string;
  responseTime: string;
  listingsCount: number;
};

export type MarketplaceListing = Vehicle & {
  status: "MARKETPLACE";
  condition: "Locally Used" | "Newly Imported" | "Brand New";
  county: string;
  negotiable: boolean;
  listedAt: string;
  ownership: "First Owner" | "Second Owner" | "Multiple Owners";
  seller: MarketplaceSeller;
};