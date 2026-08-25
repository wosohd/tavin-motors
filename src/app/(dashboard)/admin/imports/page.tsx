import type { Metadata } from "next";

import Link from "next/link";

import {
  Eye,
  FileText,
  PackageCheck,
  Search,
  Ship,
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
    "Import Requests",
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
    case "SUBMITTED":
      return "border-brand-gold/30 bg-brand-gold/10 text-brand-gold";

    case "REVIEWING":
    case "SOURCING":
      return "border-sky-500/30 bg-sky-500/10 text-sky-500";

    case "QUOTED":
    case "APPROVED":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-500";

    case "DELIVERED":
      return "border-blue-500/30 bg-blue-500/10 text-blue-500";

    case "CANCELLED":
      return "border-red-500/30 bg-red-500/10 text-red-500";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
}


export default async function AdminImportsPage() {

  const [
    submittedCount,
    activeCount,
    quotedCount,
    requests,
  ] =
    await Promise.all([


      prisma.importRequest.count({
        where:{
          status:
            "SUBMITTED",
        },
      }),


      prisma.importRequest.count({
        where:{
          status:{
            in:[
              "REVIEWING",
              "SOURCING",
              "PURCHASED",
              "SHIPPING",
              "CLEARING",
              "READY_FOR_DELIVERY",
            ],
          },
        },
      }),


      prisma.importRequest.count({
        where:{
          status:
            "QUOTED",
        },
      }),


      prisma.importRequest.findMany({

        orderBy:{
          submittedAt:
            "desc",
        },


        take:20,


        select:{

          id:true,

          referenceCode:true,

          contactName:true,

          vehicleDescription: true,

          contactEmail:true,


          make:true,

          model:true,

          preferredYear:true,


          budgetMin:true,

          budgetMax:true,


          preferredOrigin:true,

          status:true,


          submittedAt:true,


          user:{
            select:{
              name:true,
              email:true,
            },
          },

        },

      }),

    ]);



  return (

    <div className="space-y-8">


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Vehicle sourcing
        </p>


        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Import requests
        </h1>


        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Manage customer vehicle sourcing requests from initial enquiry through delivery.
        </p>

      </header>



      <section className="grid gap-4 sm:grid-cols-3">


        <Card>
          <CardContent className="p-5">

            <Search className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              New requests
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {submittedCount}
            </p>

          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-5">

            <Ship className="size-5 text-sky-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Active imports
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {activeCount}
            </p>

          </CardContent>
        </Card>



        <Card>
          <CardContent className="p-5">

            <FileText className="size-5 text-emerald-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Quotations
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {quotedCount}
            </p>

          </CardContent>
        </Card>


      </section>




      <section className="grid gap-5 lg:grid-cols-2">


        {requests.map(
          (
            request,
          ) => (

            <article
              key={
                request.id
              }
              className="rounded-2xl border border-border bg-card/70 p-5"
            >


              <div className="flex items-start justify-between gap-4">


                <div>

                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {
                      request.referenceCode
                    }
                  </p>


                  <h2 className="mt-2 text-lg font-semibold">
                    {
                      request.make ??
                      request.model ??
                      request.vehicleDescription ??
                      "Vehicle import request"
                    }
                  </h2>


                  <p className="mt-1 text-sm text-muted-foreground">
                    {
                      request.contactName ??
                      request.user.name
                    }
                  </p>

                </div>



                <Badge
                  variant="outline"
                  className={cn(
                    statusStyle(
                      request.status,
                    ),
                  )}
                >
                  {
                    formatStatus(
                      request.status,
                    )
                  }
                </Badge>


              </div>




              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                <div>
                  <p className="text-xs text-muted-foreground">
                    Vehicle
                  </p>

                  <p>
                    {
                      request.make ??
                      "Not specified"
                    }{" "}
                    {
                      request.model ??
                      ""
                    }
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted-foreground">
                    Year
                  </p>

                  <p>
                    {
                      request.preferredYear ??
                      "Flexible"
                    }
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted-foreground">
                    Origin
                  </p>

                  <p>
                    {
                      request.preferredOrigin ??
                      "Not specified"
                    }
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted-foreground">
                    Submitted
                  </p>

                  <p>
                    {
                      request.submittedAt.toLocaleDateString(
                        "en-KE",
                      )
                    }
                  </p>
                </div>

              </div>



              <Link
                href={`/admin/imports/${request.id}`}
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

                Review request

              </Link>


            </article>

          ),
        )}


      </section>


    </div>

  );
}