import type { Metadata } from "next";

import Link from "next/link";

import {
  Eye,
  Ship,
} from "lucide-react";

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


export const metadata: Metadata = {
  title:
    "Incoming Vehicles",
};


function formatStatus(
  status:string,
) {
  return status
    .replaceAll("_"," ")
    .toLowerCase()
    .replace(
      /\b\w/g,
      (letter)=>
        letter.toUpperCase(),
    );
}


export default async function AdminIncomingPage() {


  const vehicles =
    await prisma.vehicle.findMany({

      where:{
        status:
          "INCOMING",
      },

      include:{
        images:{
          orderBy:{
            sortOrder:
              "asc",
          },
        },
      },

      orderBy:{
        createdAt:
          "desc",
      },

    });



  return (

    <div className="space-y-8">


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Vehicle sourcing
        </p>


        <h1 className="mt-4 text-3xl font-semibold">
          Incoming Vehicles
        </h1>


        <p className="mt-3 text-sm text-muted-foreground">
          Monitor vehicles currently moving through the import and delivery pipeline.
        </p>

      </header>



      <section className="grid gap-5 lg:grid-cols-2">


        {
          vehicles.map(
            (vehicle)=> (

              <article
                key={
                  vehicle.id
                }
                className="rounded-2xl border border-border bg-card/70 p-5"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">

                      {
                        vehicle.stockCode
                      }

                    </p>


                    <h2 className="mt-2 text-xl font-semibold">

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



                  <Badge variant="outline">

                    {
                      formatStatus(
                        vehicle.status,
                      )
                    }

                  </Badge>


                </div>



                <div className="mt-5 flex items-center gap-3 text-sm text-muted-foreground">

                  <Ship className="size-4 text-brand-gold" />

                  {
                    vehicle.location ??
                    "International transit"
                  }

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


              </article>

            )
          )
        }


      </section>


    </div>

  );
}