import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Car,
  ClipboardList,
  FileText,
  Mail,
  MapPin,
  Wrench,
} from "lucide-react";

import {
  AdminUserActions,
} from "@/components/dashboard/admin-user-actions";

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
  title: "User Details",
};


function roleLabel(
  role: string | null,
) {
  return role === "admin"
    ? "Administrator"
    : "Customer";
}


export default async function AdminUserDetailsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const {
    id,
  } = await params;


  const user =
    await prisma.user.findUnique({

      where: {
        id,
      },

      include: {

        profile: true,

        savedVehicles: true,

        enquiries: true,

        importRequests: true,

        serviceBookings: true,

        marketplaceListings: true,

      },

    });


  if (!user) {
    notFound();
  }


  return (

    <div className="space-y-8">


      <Link
        href="/admin/users"
        className={cn(
          buttonVariants({
            variant: "outline",
          }),
        )}
      >

        <ArrowLeft className="size-4" />

        Back to users

      </Link>



      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          User profile
        </p>


        <div className="mt-4 flex flex-wrap items-center gap-3">

          <h1 className="text-3xl font-semibold">
            {
              user.name
            }
          </h1>


          <Badge variant="outline">

            {
              roleLabel(
                user.role,
              )
            }

          </Badge>

        </div>


        <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">

          <Mail className="size-4" />

          {
            user.email
          }

        </p>

      </header>




      <section className="grid gap-6 lg:grid-cols-2">


        <article className="rounded-2xl border border-border bg-card/70 p-6">


          <h2 className="text-lg font-semibold">
            Account information
          </h2>


          <div className="mt-5 space-y-3 text-sm">


            <p>
              <strong>
                Email verified:
              </strong>{" "}

              {
                user.emailVerified
                  ? "Yes"
                  : "No"
              }

            </p>



            <p>
              <strong>
                Joined:
              </strong>{" "}

              {
                user.createdAt.toLocaleDateString(
                  "en-KE",
                )
              }

            </p>



            <p>
              <strong>
                Status:
              </strong>{" "}

              {
                user.banned
                  ? "Restricted"
                  : "Active"
              }

            </p>



            {
              user.banReason && (

                <p>
                  <strong>
                    Reason:
                  </strong>{" "}

                  {
                    user.banReason
                  }

                </p>

              )
            }


          </div>


        </article>





        <article className="rounded-2xl border border-border bg-card/70 p-6">


          <h2 className="flex items-center gap-2 text-lg font-semibold">

            <MapPin className="size-5 text-brand-gold" />

            Profile information

          </h2>


          <div className="mt-5 space-y-3 text-sm">


            <p>
              <strong>
                Phone:
              </strong>{" "}

              {
                user.profile?.phone ??
                "Not provided"
              }

            </p>



            <p>
              <strong>
                City:
              </strong>{" "}

              {
                user.profile?.city ??
                "Not provided"
              }

            </p>



            <p>
              <strong>
                County:
              </strong>{" "}

              {
                user.profile?.county ??
                "Not provided"
              }

            </p>



            <p>
              <strong>
                Address:
              </strong>{" "}

              {
                user.profile?.address ??
                "Not provided"
              }

            </p>


          </div>


        </article>


      </section>





      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">


        <article className="rounded-2xl border border-border bg-card/70 p-5">

          <Car className="size-5 text-brand-gold" />


          <p className="mt-4 text-sm text-muted-foreground">
            Saved vehicles
          </p>


          <p className="mt-2 text-3xl font-semibold">

            {
              user.savedVehicles.length
            }

          </p>

        </article>





        <article className="rounded-2xl border border-border bg-card/70 p-5">

          <FileText className="size-5 text-brand-gold" />


          <p className="mt-4 text-sm text-muted-foreground">
            Enquiries
          </p>


          <p className="mt-2 text-3xl font-semibold">

            {
              user.enquiries.length
            }

          </p>

        </article>





        <article className="rounded-2xl border border-border bg-card/70 p-5">

          <ClipboardList className="size-5 text-brand-gold" />


          <p className="mt-4 text-sm text-muted-foreground">
            Import requests
          </p>


          <p className="mt-2 text-3xl font-semibold">

            {
              user.importRequests.length
            }

          </p>

        </article>





        <article className="rounded-2xl border border-border bg-card/70 p-5">

          <Wrench className="size-5 text-brand-gold" />


          <p className="mt-4 text-sm text-muted-foreground">
            Service bookings
          </p>


          <p className="mt-2 text-3xl font-semibold">

            {
              user.serviceBookings.length
            }

          </p>

        </article>


      </section>




      <AdminUserActions

        userId={
          user.id
        }

        role={
          user.role
        }

        banned={
          user.banned
        }

      />


    </div>

  );
}