"use client";

import { useState } from "react";
import { RotateCcw, Search, SlidersHorizontal } from "lucide-react";

import { VehicleCard } from "@/components/vehicles/vehicle-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { Vehicle } from "@/types/vehicle";

type VehicleBrowserProps = {
  vehicles: Vehicle[];
};

const priceOptions = [
  {
    label: "Any price",
    value: "all",
  },
  {
    label: "Up to KES 5.5M",
    value: "5500000",
  },
  {
    label: "Up to KES 6.5M",
    value: "6500000",
  },
  {
    label: "Up to KES 7.5M",
    value: "7500000",
  },
  {
    label: "Up to KES 10M",
    value: "10000000",
  },
];

export function VehicleBrowser({
  vehicles,
}: VehicleBrowserProps) {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("all");
  const [bodyType, setBodyType] = useState("all");
  const [maximumPrice, setMaximumPrice] = useState("all");

  const makes = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.make)),
  ).sort();

  const bodyTypes = Array.from(
    new Set(vehicles.map((vehicle) => vehicle.bodyType)),
  ).sort();

  const normalizedSearch = search.trim().toLowerCase();

  const filteredVehicles = vehicles.filter((vehicle) => {
    const searchableText = [
      vehicle.make,
      vehicle.model,
      vehicle.trim,
      vehicle.year.toString(),
      vehicle.fuelType,
      vehicle.bodyType,
      vehicle.transmission,
      vehicle.exteriorColor,
    ]
      .join(" ")
      .toLowerCase();

    const matchesSearch =
      normalizedSearch === "" ||
      searchableText.includes(normalizedSearch);

    const matchesMake =
      make === "all" || vehicle.make === make;

    const matchesBodyType =
      bodyType === "all" || vehicle.bodyType === bodyType;

    const matchesPrice =
      maximumPrice === "all" ||
      vehicle.price <= Number(maximumPrice);

    return (
      matchesSearch &&
      matchesMake &&
      matchesBodyType &&
      matchesPrice
    );
  });

  function resetFilters() {
    setSearch("");
    setMake("all");
    setBodyType("all");
    setMaximumPrice("all");
  }

  return (
    <div>
      <div className="tm-panel p-4 sm:p-5">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <SlidersHorizontal className="size-4 text-brand-gold" />

          <p className="text-xs font-semibold tracking-[0.18em] uppercase">
            Refine your search
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
          <label className="relative">
            <span className="sr-only">Search vehicles</span>

            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.currentTarget.value)
              }
              placeholder="Search make, model or year"
              className="h-11 border-white/10 bg-black/25 pl-10"
            />
          </label>

          <label>
            <span className="sr-only">Filter by make</span>

            <select
              value={make}
              onChange={(event) =>
                setMake(event.currentTarget.value)
              }
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50"
            >
              <option value="all">All makes</option>

              {makes.map((vehicleMake) => (
                <option key={vehicleMake} value={vehicleMake}>
                  {vehicleMake}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filter by body type</span>

            <select
              value={bodyType}
              onChange={(event) =>
                setBodyType(event.currentTarget.value)
              }
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50"
            >
              <option value="all">All body types</option>

              {bodyTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">
              Filter by maximum price
            </span>

            <select
              value={maximumPrice}
              onChange={(event) =>
                setMaximumPrice(event.currentTarget.value)
              }
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50"
            >
              {priceOptions.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            className="h-11 border-white/10 bg-white/5"
          >
            <RotateCcw className="size-4" />
            Reset
          </Button>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium">
            {filteredVehicles.length}{" "}
            {filteredVehicles.length === 1
              ? "vehicle"
              : "vehicles"}{" "}
            found
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            Demonstration inventory for the Tavin Motors client
            preview.
          </p>
        </div>
      </div>

      {filteredVehicles.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredVehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-white/15 bg-white/[0.025] px-6 py-20 text-center">
          <Search className="mx-auto size-8 text-brand-gold" />

          <h2 className="mt-5 text-xl font-semibold">
            No matching vehicles
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Adjust your filters or reset the search to view the
            complete inventory.
          </p>

          <Button
            type="button"
            variant="outline"
            onClick={resetFilters}
            className="mt-6 border-white/10 bg-white/5"
          >
            <RotateCcw className="size-4" />
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}