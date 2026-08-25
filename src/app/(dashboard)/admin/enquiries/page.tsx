import type { Metadata } from "next";

import Link from "next/link";

import {
  Clock3,
  Eye,
  Inbox,
  MessageSquareCheck,
  XCircle,
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
    "Contact Enquiries",
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
    case "NEW":
      return "border-brand-gold/30 bg-brand-gold/10 text-brand-gold";

    case "IN_PROGRESS":
      return "border-sky-500/30 bg-sky-500/10 text-sky-500";

    case "REPLIED":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-500";

    case "CLOSED":
      return "border-border bg-muted text-muted-foreground";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
}


export default async function AdminEnquiriesPage() {

  const [
    newCount,
    activeCount,
    repliedCount,
    enquiries,
  ] =
    await Promise.all([
      prisma.enquiry.count({
        where: {
          status:
            "NEW",
        },
      }),

      prisma.enquiry.count({
        where: {
          status:
            "IN_PROGRESS",
        },
      }),

      prisma.enquiry.count({
        where: {
          status:
            "REPLIED",
        },
      }),

      prisma.enquiry.findMany({
        orderBy: {
          createdAt:
            "desc",
        },

        take: 20,

        select: {
          id: true,

          referenceCode: true,

          contactName: true,

          contactEmail: true,

          subject: true,

          category: true,

          status: true,

          createdAt: true,

          user: {
            select: {
              name: true,
              email: true,
            },
          },

          vehicle: {
            select: {
              make: true,
              model: true,
              year: true,
            },
          },
        },
      }),
    ]);


  return (
    <div className="space-y-8">

      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Customer communication
        </p>


        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          Contact enquiries
        </h1>


        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          Review and manage real customer enquiries submitted through the Tavin Motors website.
        </p>

      </header>


      <section className="grid gap-4 sm:grid-cols-3">

        <Card>
          <CardContent className="p-5">

            <Inbox className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              New
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {newCount}
            </p>

          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-5">

            <Clock3 className="size-5 text-sky-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              In progress
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {activeCount}
            </p>

          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-5">

            <MessageSquareCheck className="size-5 text-emerald-500" />

            <p className="mt-4 text-sm text-muted-foreground">
              Replied
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {repliedCount}
            </p>

          </CardContent>
        </Card>

      </section>


      <section className="grid gap-5 lg:grid-cols-2">

        {enquiries.map(
          (
            enquiry,
          ) => (

            <article
              key={
                enquiry.id
              }
              className="rounded-2xl border border-border bg-card/70 p-5"
            >

              <div className="flex items-start justify-between gap-4">

                <div>

                  <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                    {
                      enquiry.referenceCode
                    }
                  </p>


                  <h2 className="mt-2 text-lg font-semibold">
                    {
                      enquiry.subject
                    }
                  </h2>


                  <p className="mt-1 text-sm text-muted-foreground">
                    {
                      enquiry.contactName ??
                      enquiry.user.name
                    }
                  </p>

                </div>


                <Badge
                  variant="outline"
                  className={cn(
                    statusStyle(
                      enquiry.status,
                    ),
                  )}
                >
                  {
                    formatStatus(
                      enquiry.status,
                    )
                  }
                </Badge>

              </div>


              <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

                <div>
                  <p className="text-xs text-muted-foreground">
                    Category
                  </p>

                  <p>
                    {
                      enquiry.category
                    }
                  </p>
                </div>


                <div>
                  <p className="text-xs text-muted-foreground">
                    Submitted
                  </p>

                  <p>
                    {
                      enquiry.createdAt.toLocaleDateString(
                        "en-KE",
                      )
                    }
                  </p>
                </div>


                {enquiry.vehicle && (
                  <div className="col-span-2">

                    <p className="text-xs text-muted-foreground">
                      Vehicle
                    </p>

                    <p>
                      {
                        enquiry.vehicle.year
                      }{" "}
                      {
                        enquiry.vehicle.make
                      }{" "}
                      {
                        enquiry.vehicle.model
                      }
                    </p>

                  </div>
                )}

              </div>


              <Link
                href={`/admin/enquiries/${enquiry.id}`}
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

                Review enquiry
              </Link>

            </article>

          ),
        )}

      </section>

    </div>
  );
}