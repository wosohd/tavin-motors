import type { Metadata } from "next";

import { PageHero } from "@/components/shared/page-hero";
import { VehicleBrowser } from "@/components/vehicles/vehicle-browser";
import { getVehiclesByStatus } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Vehicles in Stock",
  description:
    "Explore premium vehicles currently available from Tavin Motors.",
};

export default function VehiclesPage() {
  const inStockVehicles = getVehiclesByStatus("IN_STOCK");

  return (
    <>
      <PageHero
        eyebrow="Tavin Motors Inventory"
        title="Premium vehicles, ready for the road."
        description="Explore carefully selected vehicles currently available in our demonstration inventory. Search and refine the collection by make, body type and price."
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-white">
              {inStockVehicles.length}
            </strong>{" "}
            vehicles available
          </p>

          <p>
            <strong className="text-white">Verified</strong> vehicle
            information
          </p>

          <p>
            <strong className="text-white">Flexible</strong> enquiry
            options
          </p>
        </div>
      </PageHero>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <VehicleBrowser vehicles={inStockVehicles} />
      </section>
    </>
  );
}