import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  CarFront,
  Gauge,
  ImageIcon,
  MapPin,
  Settings2,
} from "lucide-react";

import {
  AdminVehicleEditor,
} from "@/components/dashboard/admin-vehicle-editor";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";

import { AdminVehicleImages } from "@/components/dashboard/admin-vehicle-images";


export const metadata: Metadata = {
  title: "Review Vehicle",
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


export default async function VehicleReviewPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const {
    id,
  } = await params;


  const vehicle =
    await prisma.vehicle.findUnique({
      where: {
        id,
      },

      include: {
        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });


  if (!vehicle) {
    notFound();
  }


  return (
    <div className="space-y-8">

      <Link
        href="/admin/inventory"
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
        )}
      >
        <ArrowLeft className="size-4" />

        Back to inventory
      </Link>


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Inventory management
        </p>


        <div className="mt-4 flex flex-wrap items-center gap-3">

          <h1 className="text-3xl font-semibold tracking-[-0.035em]">
            {vehicle.year}{" "}
            {vehicle.make}{" "}
            {vehicle.model}
          </h1>


          <Badge
            variant="outline"
          >
            {formatStatus(
              vehicle.status,
            )}
          </Badge>

        </div>


        <p className="mt-3 text-sm text-muted-foreground">
          Stock code:
          {" "}
          {vehicle.stockCode}
        </p>

      </header>



      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {vehicle.images.length > 0 ? (

          vehicle.images.map(
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
                alt={`${vehicle.make} ${vehicle.model}`}
                className="h-64 w-full rounded-2xl object-cover"
              />
            ),

          )

        ) : (

          <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border">

            <ImageIcon className="size-8 text-muted-foreground" />

          </div>

        )}

      </section>



      <section className="grid gap-6 lg:grid-cols-3">


        <div className="rounded-2xl border border-border bg-card/70 p-6">

          <CarFront className="size-5 text-brand-gold" />

          <h2 className="mt-4 font-semibold">
            Vehicle details
          </h2>


          <div className="mt-4 space-y-3 text-sm">

            <p>
              <strong>Make:</strong>{" "}
              {vehicle.make}
            </p>


            <p>
              <strong>Model:</strong>{" "}
              {vehicle.model}
            </p>


            <p>
              <strong>Trim:</strong>{" "}
              {vehicle.trim ?? "N/A"}
            </p>


            <p>
              <strong>Year:</strong>{" "}
              {vehicle.year}
            </p>

          </div>

        </div>




        <div className="rounded-2xl border border-border bg-card/70 p-6">

          <Gauge className="size-5 text-brand-gold" />

          <h2 className="mt-4 font-semibold">
            Performance
          </h2>


          <div className="mt-4 space-y-3 text-sm">

            <p>
              <strong>Mileage:</strong>{" "}
              {
                vehicle.mileage.toLocaleString()
              }{" "}
              km
            </p>


            <p>
              <strong>Fuel:</strong>{" "}
              {vehicle.fuelType}
            </p>


            <p>
              <strong>Transmission:</strong>{" "}
              {vehicle.transmission}
            </p>

          </div>

        </div>




        <div className="rounded-2xl border border-border bg-card/70 p-6">

          <Settings2 className="size-5 text-brand-gold" />

          <h2 className="mt-4 font-semibold">
            Publishing
          </h2>


          <div className="mt-4 space-y-3 text-sm">

            <p>
              <strong>Featured:</strong>{" "}
              {vehicle.featured
                ? "Yes"
                : "No"}
            </p>


            <p>
              <strong>Published:</strong>{" "}
              {vehicle.published
                ? "Yes"
                : "No"}
            </p>


            <p>
              <strong>Price:</strong>{" "}
              KES{" "}
              {
                vehicle.price.toLocaleString()
              }
            </p>

          </div>

        </div>


      </section>



      <section className="rounded-2xl border border-border bg-card/70 p-6">

        <h2 className="flex items-center gap-2 text-lg font-semibold">

          <MapPin className="size-5 text-brand-gold" />

          Description and location

        </h2>


        <p className="mt-4 text-sm text-muted-foreground">
          {
            vehicle.location ??
            "No location provided."
          }
        </p>


        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
          {
            vehicle.description ??
            "No description provided."
          }
        </p>

      </section>
      


      {/* Vehicle editing controls */}
      <AdminVehicleImages
  vehicleId={vehicle.id}
  images={
    vehicle.images.map(
      (image) => ({
        id: image.id,
        url: image.url,
        publicId: image.publicId,
        isPrimary: image.isPrimary,
      }),
    )
  }
/>
      <AdminVehicleEditor
        vehicle={{
          id: vehicle.id,

          price:
            vehicle.price,

          description:
            vehicle.description,

          location:
            vehicle.location,

          status:
            vehicle.status,

          featured:
            vehicle.featured,

          published:
            vehicle.published,
        }}
      />


    </div>
  );
}