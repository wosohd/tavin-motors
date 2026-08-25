import type { Metadata } from "next";

import Link from "next/link";

import {
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

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
    "User Management",
};



function roleLabel(
  role: string | null,
) {
  return role === "admin"
    ? "Administrator"
    : "Customer";
}



export default async function AdminUsersPage() {


  const [
    totalUsers,
    adminUsers,
    users,
  ] =
    await Promise.all([


      prisma.user.count(),


      prisma.user.count({
        where:{
          role:
            "admin",
        },
      }),



      prisma.user.findMany({

        orderBy:{
          createdAt:
            "desc",
        },


        take:50,


        include:{
          profile:true,
        },

      }),

    ]);



  return (

    <div className="space-y-8">


      <header className="border-b border-border pb-7">

        <p className="tm-eyebrow">
          Account administration
        </p>


        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
          User Management
        </h1>


        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          Manage registered customers and administrator accounts.
        </p>

      </header>




      <section className="grid gap-4 sm:grid-cols-3">


        <Card>

          <CardContent className="p-5">

            <UsersRound className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              Total users
            </p>


            <p className="mt-2 text-3xl font-semibold">
              {
                totalUsers
              }
            </p>

          </CardContent>

        </Card>




        <Card>

          <CardContent className="p-5">

            <ShieldCheck className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              Administrators
            </p>


            <p className="mt-2 text-3xl font-semibold">
              {
                adminUsers
              }
            </p>

          </CardContent>

        </Card>




        <Card>

          <CardContent className="p-5">

            <UserRound className="size-5 text-brand-gold" />

            <p className="mt-4 text-sm text-muted-foreground">
              Customers
            </p>


            <p className="mt-2 text-3xl font-semibold">
              {
                totalUsers -
                adminUsers
              }
            </p>

          </CardContent>

        </Card>


      </section>





      <section className="grid gap-5 lg:grid-cols-2">


        {
          users.map(
            (user) => (

              <article

                key={
                  user.id
                }

                className="rounded-2xl border border-border bg-card/70 p-5"

              >

                <div className="flex items-start justify-between gap-4">


                  <div>

                    <p className="text-lg font-semibold">

                      {
                        user.name
                      }

                    </p>


                    <p className="mt-1 text-sm text-muted-foreground">

                      {
                        user.email
                      }

                    </p>

                  </div>



                  <Badge variant="outline">

                    {
                      roleLabel(
                        user.role,
                      )
                    }

                  </Badge>


                </div>




                <div className="mt-5 grid gap-3 text-sm">


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
                      Account status:
                    </strong>{" "}

                    {
                      user.banned
                        ? "Restricted"
                        : "Active"
                    }

                  </p>


                  {
                    user.profile && (

                      <p>

                        <strong>
                          Location:
                        </strong>{" "}

                        {
                          user.profile.city ??
                          "Not provided"
                        }

                      </p>

                    )
                  }


                </div>



                <Link

                  href={`/admin/users/${user.id}`}

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

                  View user

                </Link>


              </article>

            ),
          )
        }


      </section>


    </div>

  );
}