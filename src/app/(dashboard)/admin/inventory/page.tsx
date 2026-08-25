import type { Metadata } from "next";

import Link from "next/link";

import {
  CarFront,
  Eye,
  Star,
  Warehouse,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  buttonVariants,
} from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  prisma,
} from "@/lib/prisma";

import {
  cn,
} from "@/lib/utils";


export const metadata: Metadata = {
  title:
    "Inventory Management",
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


function statusStyle(
  status: string,
) {
  switch (status) {

    case "IN_STOCK":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-500";

    case "INCOMING":
      return "border-sky-500/30 bg-sky-500/10 text-sky-500";

    case "IMPORTABLE":
      return "border-brand-gold/30 bg-brand-gold/10 text-brand-gold";

    case "MARKETPLACE":
      return "border-purple-500/30 bg-purple-500/10 text-purple-500";

    default:
      return "border-border bg-muted text-muted-foreground";

  }
}


export default async function AdminInventoryPage() {

  const [
    totalVehicles,
    featuredVehicles,
    incomingVehicles,
    vehicles,
  ] =
    await Promise.all([


      prisma.vehicle.count(),


      prisma.vehicle.count({
        where:{
          featured:true,
        },
      }),


      prisma.vehicle.count({
        where:{
          status:
            "INCOMING",
        },
      }),


      prisma.vehicle.findMany({

        orderBy:[
          {
            createdAt:
              "desc",
          },
        ],


        take:30,


        select:{

          id:true,

          stockCode:true,

          slug:true,

          make:true,

          model:true,

          trim:true,

          year:true,

          mileage:true,

          price:true,

          status:true,

          featured:true,

          published:true,

          images:{
            select:{
              url:true,
              isPrimary:true,
            },

            orderBy:{
              sortOrder:
                "asc",
            },
          },

        },

      }),

    ]);



  return (

    <div className="space-y-8">


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Inventory management
        </p>


        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Vehicle inventory
        </h1>


        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Manage vehicles currently available through Tavin Motors inventory.
        </p>

      </header>




      <section className="grid gap-4 sm:grid-cols-3">


        <Card>
          <CardContent className="p-5">

            <Warehouse className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              Total vehicles
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {totalVehicles}
            </p>

          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-5">

            <Star className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              Featured
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {featuredVehicles}
            </p>

          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-5">

            <CarFront className="size-5 text-sky-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Incoming
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {incomingVehicles}
            </p>

          </CardContent>
        </Card>


      </section>





      <section className="grid gap-5 lg:grid-cols-2">


        {vehicles.map(
          (
            vehicle,
          ) => {

            const image =
              vehicle.images.find(
                (
                  item,
                ) =>
                  item.isPrimary,
              ) ??
              vehicle.images[0];


            return (

              <article
                key={
                  vehicle.id
                }
                className="overflow-hidden rounded-2xl border border-border bg-card/70"
              >


                {image && (
                  <img
                    src={
                      image.url
                    }
                    alt={`${vehicle.make} ${vehicle.model}`}
                    className="h-56 w-full object-cover"
                  />
                )}



                <div className="p-5">


                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                        {
                          vehicle.stockCode
                        }
                      </p>


                      <h2 className="mt-2 text-lg font-semibold">

                        {
                          vehicle.year
                        }{" "}
                        {
                          vehicle.make
                        }{" "}
                        {
                          vehicle.model
                        }

                      </h2>

                    </div>


                    <Badge
                      variant="outline"
                      className={cn(
                        statusStyle(
                          vehicle.status,
                        ),
                      )}
                    >
                      {
                        formatStatus(
                          vehicle.status,
                        )
                      }
                    </Badge>


                  </div>




                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">


                    <div>
                      <p className="text-xs text-muted-foreground">
                        Price
                      </p>

                      <p>
                        KES{" "}
                        {
                          vehicle.price.toLocaleString()
                        }
                      </p>
                    </div>



                    <div>
                      <p className="text-xs text-muted-foreground">
                        Mileage
                      </p>

                      <p>
                        {
                          vehicle.mileage.toLocaleString()
                        }{" "}
                        km
                      </p>
                    </div>



                    <div>
                      <p className="text-xs text-muted-foreground">
                        Featured
                      </p>

                      <p>
                        {
                          vehicle.featured
                            ? "Yes"
                            : "No"
                        }
                      </p>
                    </div>



                    <div>
                      <p className="text-xs text-muted-foreground">
                        Published
                      </p>

                      <p>
                        {
                          vehicle.published
                            ? "Yes"
                            : "No"
                        }
                      </p>
                    </div>


                  </div>



                  <Link
                    href={`/admin/inventory/${vehicle.id}`}
                    className={cn(
                      buttonVariants({
                        variant:
                          "outline",
                        size:
                          "sm",
                      }),
                      "mt-5 w-full",
                    )}
                  >

                    <Eye className="size-4" />

                    Review vehicle

                  </Link>


                </div>

              </article>

            );

          },
        )}


      </section>


    </div>

  );
}