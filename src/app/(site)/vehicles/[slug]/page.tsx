import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Car,
  Check,
  Fuel,
  Gauge,
  MapPin,
  MessageCircle,
  Palette,
  Settings2,
  ShieldCheck,
} from "lucide-react";

import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { VehicleVisual } from "@/components/vehicles/vehicle-visual";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  formatMileage,
  formatVehiclePrice,
  getRelatedVehicles,
  getVehicleBySlug,
  vehicles,
} from "@/data/vehicles";
import { cn } from "@/lib/utils";

type VehiclePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return vehicles.map((vehicle) => ({
    slug: vehicle.slug,
  }));
}

export async function generateMetadata({
  params,
}: VehiclePageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: "Vehicle Not Found",
    };
  }

  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: vehicle.description,
  };
}

const statusLabels = {
  IN_STOCK: "Available Now",
  INCOMING: "Incoming Vehicle",
  IMPORTABLE: "Available to Import",
  MARKETPLACE: "Local Marketplace",
} as const;

export default async function VehicleDetailsPage({
  params,
}: VehiclePageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const relatedVehicles = getRelatedVehicles(vehicle);

  const specifications = [
    {
      icon: CalendarDays,
      label: "Year",
      value: vehicle.year.toString(),
    },
    {
      icon: Gauge,
      label: "Mileage",
      value: `${formatMileage(vehicle.mileage)} km`,
    },
    {
      icon: Fuel,
      label: "Fuel",
      value: vehicle.fuelType,
    },
    {
      icon: Settings2,
      label: "Transmission",
      value: vehicle.transmission,
    },
    {
      icon: Car,
      label: "Body type",
      value: vehicle.bodyType,
    },
    {
      icon: ShieldCheck,
      label: "Drivetrain",
      value: vehicle.drivetrain,
    },
    {
      icon: Palette,
      label: "Exterior",
      value: vehicle.exteriorColor,
    },
    {
      icon: MapPin,
      label: "Location",
      value: vehicle.location,
    },
  ];

  return (
    <>
      <section className="border-b border-white/10 bg-black/20">
        <div className="tm-container py-6">
          <Link
            href="/vehicles"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-white"
          >
            <ArrowLeft className="size-4" />
            Back to inventory
          </Link>
        </div>
      </section>

      <section className="tm-container py-10 sm:py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <VehicleVisual
            vehicle={vehicle}
            className="min-h-[28rem] border border-white/10 lg:min-h-[38rem]"
          />

          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-primary text-white">
                {statusLabels[vehicle.status]}
              </Badge>

              <Badge
                variant="outline"
                className="border-brand-gold/30 text-brand-gold"
              >
                {vehicle.stockCode}
              </Badge>
            </div>

            <h1 className="mt-6 text-4xl leading-tight font-semibold tracking-[-0.045em] sm:text-5xl">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>

            <p className="mt-2 text-lg text-muted-foreground">
              {vehicle.trim}
            </p>

            <p className="mt-7 text-base leading-8 text-muted-foreground">
              {vehicle.description}
            </p>

            <Separator className="my-7 bg-white/10" />

            <div>
              <p className="text-xs tracking-[0.18em] text-muted-foreground uppercase">
                Vehicle price
              </p>

              <p className="mt-2 text-3xl font-semibold text-white">
                {formatVehiclePrice(vehicle.price)}
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/contact?vehicle=${vehicle.slug}`}
                className={cn(
                  buttonVariants({
                    size: "lg",
                  }),
                  "h-12 bg-primary shadow-[0_0_28px_rgb(164_32_42_/_20%)] hover:bg-primary/90",
                )}
              >
                <MessageCircle className="size-4" />
                Enquire About Vehicle
              </Link>

              <Link
                href="/import-a-car"
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                  }),
                  "h-12 border-white/15 bg-white/5",
                )}
              >
                Request Similar Import
              </Link>
            </div>

            <div className="mt-7 border border-brand-gold/20 bg-brand-gold/[0.04] p-5">
              <div className="flex items-start gap-3">
                <BadgeCheck className="mt-0.5 size-5 shrink-0 text-brand-gold" />

                <div>
                  <p className="text-sm font-semibold">
                    Tavin Motors demonstration listing
                  </p>

                  <p className="mt-1 text-xs leading-6 text-muted-foreground">
                    Vehicle information and pricing currently represent
                    demonstration content for the client presentation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="tm-container py-14 sm:py-16">
          <p className="tm-eyebrow">Vehicle specification</p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
            Essential details
          </h2>

          <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {specifications.map((specification) => {
              const Icon = specification.icon;

              return (
                <div
                  key={specification.label}
                  className="bg-background p-5"
                >
                  <Icon className="size-5 text-brand-gold" />

                  <p className="mt-5 text-xs tracking-[0.16em] text-muted-foreground uppercase">
                    {specification.label}
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    {specification.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="tm-eyebrow">Equipment</p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
              Selected features
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-muted-foreground">
              A concise overview of the comfort, technology and safety
              equipment available with this vehicle.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {vehicle.features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 border border-white/10 bg-white/[0.025] p-4"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-brand-gold/10">
                  <Check className="size-3.5 text-brand-gold" />
                </span>

                <span className="text-sm text-muted-foreground">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {relatedVehicles.length > 0 && (
        <section className="border-t border-white/10 bg-black/20">
          <div className="tm-container py-14 sm:py-16 lg:py-20">
            <p className="tm-eyebrow">You may also like</p>

            <div className="mt-4 flex items-end justify-between gap-6">
              <h2 className="text-3xl font-semibold tracking-[-0.035em]">
                Related vehicles
              </h2>

              <Link
                href="/vehicles"
                className="hidden text-sm text-brand-gold hover:text-white sm:block"
              >
                View all vehicles
              </Link>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedVehicles.map((relatedVehicle) => (
                <VehicleCard
                  key={relatedVehicle.id}
                  vehicle={relatedVehicle}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}