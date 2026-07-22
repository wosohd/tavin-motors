export type VehicleStatus =
  | "IN_STOCK"
  | "INCOMING"
  | "IMPORTABLE"
  | "MARKETPLACE";

export type VehicleTone =
  | "burgundy"
  | "silver"
  | "graphite"
  | "gold"
  | "blue"
  | "green";

export type Vehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  trim: string;
  year: number;
  price: number;
  mileage: number;
  transmission: "Automatic" | "Manual";
  fuelType: "Petrol" | "Diesel" | "Hybrid" | "Electric";
  bodyType: "SUV" | "Sedan" | "Hatchback" | "Pickup" | "Coupe";
  engine: string;
  drivetrain: string;
  exteriorColor: string;
  interiorColor: string;
  location: string;
  stockCode: string;
  status: VehicleStatus;
  featured: boolean;
  description: string;
  features: string[];
  tone: VehicleTone;
  eta?: string;
  importOrigin?: string;
  progress?: number;
};