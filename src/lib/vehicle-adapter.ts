import type { Vehicle } from "@/types/vehicle";


type DatabaseVehicle = {
  id: string;

  slug: string;

  stockCode: string;

  make: string;

  model: string;

  trim: string | null;

  year: number;

  price: number;

  mileage: number;

  fuelType: string;

  transmission: string;

  exteriorColor: string;

  interiorColor: string | null;

  bodyType: string | null;

  engineSize: string | null;

  driveType: string | null;

  location: string | null;

  description: string | null;

  status:
    | "IN_STOCK"
    | "INCOMING"
    | "IMPORTABLE"
    | "MARKETPLACE";

  featured: boolean;

  published: boolean;

  images: {
    id: string;
    url: string;
    publicId: string | null;
    isPrimary: boolean;
    sortOrder: number;
  }[];
};


export function toPublicVehicle(
  vehicle: DatabaseVehicle,
): Vehicle {

  return {

    id:
      vehicle.id,

    images:
      vehicle.images,

    slug:
      vehicle.slug,

    make:
      vehicle.make,

    model:
      vehicle.model,

    trim:
      vehicle.trim ?? "",

    year:
      vehicle.year,

    price:
      vehicle.price,

    mileage:
      vehicle.mileage,

    transmission:
      vehicle.transmission as Vehicle["transmission"],

    fuelType:
      vehicle.fuelType as Vehicle["fuelType"],

    bodyType:
      (vehicle.bodyType ??
        "SUV") as Vehicle["bodyType"],

    engine:
      vehicle.engineSize ?? "",

    drivetrain:
      vehicle.driveType ?? "",

    exteriorColor:
      vehicle.exteriorColor,

    interiorColor:
      vehicle.interiorColor ?? "",

    location:
      vehicle.location ?? "",

    stockCode:
      vehicle.stockCode,

    status:
      vehicle.status,

    featured:
      vehicle.featured,

    description:
      vehicle.description ?? "",

    features:
      [],

    tone:
      "graphite",

  };
}