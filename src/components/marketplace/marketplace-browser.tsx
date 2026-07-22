"use client";

import { useState } from "react";
import {
  RotateCcw,
  Search,
  SlidersHorizontal,
} from "lucide-react";

import { MarketplaceListingCard } from "@/components/marketplace/marketplace-listing-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { MarketplaceListing } from "@/types/marketplace";

type MarketplaceBrowserProps = {
  listings: MarketplaceListing[];
};

const priceOptions = [
  {
    label: "Any price",
    value: "all",
  },
  {
    label: "Up to KES 2M",
    value: "2000000",
  },
  {
    label: "Up to KES 3M",
    value: "3000000",
  },
  {
    label: "Up to KES 5M",
    value: "5000000",
  },
  {
    label: "Up to KES 8M",
    value: "8000000",
  },
];

export function MarketplaceBrowser({
  listings,
}: MarketplaceBrowserProps) {
  const [search, setSearch] = useState("");
  const [make, setMake] = useState("all");
  const [bodyType, setBodyType] = useState("all");
  const [county, setCounty] = useState("all");
  const [maximumPrice, setMaximumPrice] = useState("all");
  const [sort, setSort] = useState("newest");

  const makes = Array.from(
    new Set(listings.map((listing) => listing.make)),
  ).sort();

  const bodyTypes = Array.from(
    new Set(listings.map((listing) => listing.bodyType)),
  ).sort();

  const counties = Array.from(
    new Set(listings.map((listing) => listing.county)),
  ).sort();

  const normalizedSearch = search.trim().toLowerCase();

  const filteredListings = [...listings]
    .filter((listing) => {
      const searchableText = [
        listing.make,
        listing.model,
        listing.trim,
        listing.year.toString(),
        listing.bodyType,
        listing.fuelType,
        listing.county,
        listing.condition,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        normalizedSearch === "" ||
        searchableText.includes(normalizedSearch);

      const matchesMake =
        make === "all" || listing.make === make;

      const matchesBodyType =
        bodyType === "all" || listing.bodyType === bodyType;

      const matchesCounty =
        county === "all" || listing.county === county;

      const matchesPrice =
        maximumPrice === "all" ||
        listing.price <= Number(maximumPrice);

      return (
        matchesSearch &&
        matchesMake &&
        matchesBodyType &&
        matchesCounty &&
        matchesPrice
      );
    })
    .sort((first, second) => {
      switch (sort) {
        case "price-low":
          return first.price - second.price;

        case "price-high":
          return second.price - first.price;

        case "mileage":
          return first.mileage - second.mileage;

        case "newest":
        default:
          return (
            new Date(second.listedAt).getTime() -
            new Date(first.listedAt).getTime()
          );
      }
    });

  function resetFilters() {
    setSearch("");
    setMake("all");
    setBodyType("all");
    setCounty("all");
    setMaximumPrice("all");
    setSort("newest");
  }

  return (
    <div>
      <div className="tm-panel p-4 sm:p-5">
        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <SlidersHorizontal className="size-4 text-brand-gold" />

          <p className="text-xs font-semibold tracking-[0.18em] uppercase">
            Search local listings
          </p>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <label className="relative xl:col-span-2">
            <span className="sr-only">
              Search marketplace listings
            </span>

            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.currentTarget.value)
              }
              placeholder="Search make, model, year or location"
              className="h-11 border-white/10 bg-black/25 pl-10"
            />
          </label>

          <label>
            <span className="sr-only">
              Sort marketplace listings
            </span>

            <select
              value={sort}
              onChange={(event) =>
                setSort(event.currentTarget.value)
              }
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none focus:border-brand-gold/50"
            >
              <option value="newest">
                Newest listings
              </option>

              <option value="price-low">
                Price: low to high
              </option>

              <option value="price-high">
                Price: high to low
              </option>

              <option value="mileage">
                Lowest mileage
              </option>
            </select>
          </label>

          <label>
            <span className="sr-only">
              Filter by make
            </span>

            <select
              value={make}
              onChange={(event) =>
                setMake(event.currentTarget.value)
              }
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none focus:border-brand-gold/50"
            >
              <option value="all">
                All makes
              </option>

              {makes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">
              Filter by body type
            </span>

            <select
              value={bodyType}
              onChange={(event) =>
                setBodyType(event.currentTarget.value)
              }
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none focus:border-brand-gold/50"
            >
              <option value="all">
                All body types
              </option>

              {bodyTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">
              Filter by location
            </span>

            <select
              value={county}
              onChange={(event) =>
                setCounty(event.currentTarget.value)
              }
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none focus:border-brand-gold/50"
            >
              <option value="all">
                All locations
              </option>

              {counties.map((item) => (
                <option key={item} value={item}>
                  {item}
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
              className="h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none focus:border-brand-gold/50"
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

      <div className="mt-8">
        <p className="text-sm font-medium">
          {filteredListings.length}{" "}
          {filteredListings.length === 1
            ? "listing"
            : "listings"}{" "}
          found
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          Marketplace listings remain subject to moderation and
          independent verification.
        </p>
      </div>

      {filteredListings.length > 0 ? (
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredListings.map((listing) => (
            <MarketplaceListingCard
              key={listing.id}
              listing={listing}
            />
          ))}
        </div>
      ) : (
        <div className="mt-6 border border-dashed border-white/15 bg-white/[0.025] px-6 py-20 text-center">
          <Search className="mx-auto size-8 text-brand-gold" />

          <h2 className="mt-5 text-xl font-semibold">
            No matching listings
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
            Adjust your marketplace filters or reset the search to
            view all available listings.
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