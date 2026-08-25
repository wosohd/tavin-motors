import {
  BellRing,
  KeyRound,
  Mail,
  MapPin,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import {
  headers,
} from "next/headers";

import {
  redirect,
} from "next/navigation";

import {
  auth,
} from "@/lib/auth";

import {
  prisma,
} from "@/lib/prisma";

import {
  DashboardPageHeader,
} from "@/components/dashboard/dashboard-page-header";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


function getInitials(
  name: string,
) {

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(
      (part) =>
        part
          .charAt(0)
          .toUpperCase(),
    )
    .join("");

}


function formatMemberDate(
  value: Date,
) {

  return value.toLocaleDateString(
    "en-KE",
    {
      month:
        "long",

      year:
        "numeric",
    },
  );

}


const fieldClassName =
  "h-11 w-full rounded-lg border border-input bg-background/80 px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10";


export default async function CustomerProfilePage() {

  const session =
    await auth.api.getSession({
      headers:
        await headers(),
    });


  if (!session?.user) {

    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/dashboard/profile",
      )}`,
    );

  }


  const profile =
    await prisma.userProfile.findUnique({
      where: {
        userId:
          session.user.id,
      },
    });


  const customerNames =
    session.user.name
      .trim()
      .split(/\s+/);


  const firstName =
    customerNames[0] ??
    "";


  const lastName =
    customerNames
      .slice(1)
      .join(" ");


  const initials =
    getInitials(
      session.user.name,
    );


  return (

    <div className="space-y-8">


      <DashboardPageHeader
        eyebrow="Customer dashboard"
        title="Profile settings"
        description="Review your personal information, communication preferences and account security settings."
      />



      <Card className="border border-border bg-card/80 shadow-sm">

        <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">

          <div className="flex items-center gap-4">

            <span className="grid size-16 shrink-0 place-items-center rounded-full border border-brand-gold/25 bg-brand-burgundy/10 text-xl font-semibold text-brand-gold dark:bg-brand-burgundy/30">

              {
                initials ||
                "TM"
              }

            </span>


            <div>

              <h2 className="text-xl font-semibold text-foreground">

                {
                  session.user.name
                }

              </h2>


              <p className="mt-1 text-sm text-muted-foreground">
                Tavin Motors customer
              </p>


              <p className="mt-1 text-xs text-muted-foreground">

                Member since{" "}

                {
                  formatMemberDate(
                    session.user.createdAt
                      ? new Date(
                          session.user.createdAt,
                        )
                      : new Date(),
                  )
                }

              </p>

            </div>

          </div>


          <div className="rounded-xl border border-emerald-600/20 bg-emerald-500/10 px-4 py-3 dark:border-emerald-400/20">

            <p className="flex items-center gap-2 text-sm font-medium text-emerald-700 dark:text-emerald-300">

              <ShieldCheck className="size-4" />

              Account active

            </p>

          </div>

        </CardContent>

      </Card>




      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">


        <Card className="border border-border bg-card/80 shadow-sm">

          <CardHeader>

            <CardTitle className="flex items-center gap-3 text-xl text-foreground">

              <span className="grid size-10 place-items-center rounded-xl border border-brand-gold/20 bg-brand-burgundy/10 text-brand-gold dark:bg-brand-burgundy/30">

                <UserRound className="size-5" />

              </span>

              Personal information

            </CardTitle>


            <CardDescription>
              Information associated with your Tavin Motors account.
            </CardDescription>

          </CardHeader>


          <CardContent>

            <div className="space-y-5">


              <div className="grid gap-5 sm:grid-cols-2">

                <div className="space-y-2">

                  <label
                    htmlFor="first-name"
                    className="text-sm font-medium text-foreground"
                  >
                    First name
                  </label>


                  <input
                    id="first-name"
                    name="firstName"
                    type="text"
                    defaultValue={
                      firstName
                    }
                    autoComplete="given-name"
                    className={
                      fieldClassName
                    }
                    readOnly
                  />

                </div>



                <div className="space-y-2">

                  <label
                    htmlFor="last-name"
                    className="text-sm font-medium text-foreground"
                  >
                    Last name
                  </label>


                  <input
                    id="last-name"
                    name="lastName"
                    type="text"
                    defaultValue={
                      lastName
                    }
                    autoComplete="family-name"
                    className={
                      fieldClassName
                    }
                    readOnly
                  />

                </div>

              </div>



              <div className="space-y-2">

                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >

                  <Mail className="size-4 text-brand-gold" />

                  Email address

                </label>


                <input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={
                    session.user.email
                  }
                  autoComplete="email"
                  className={
                    fieldClassName
                  }
                  readOnly
                />

              </div>



              <div className="space-y-2">

                <label
                  htmlFor="phone"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >

                  <Phone className="size-4 text-brand-gold" />

                  Phone number

                </label>


                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  defaultValue={
                    profile?.phone ??
                    ""
                  }
                  autoComplete="tel"
                  className={
                    fieldClassName
                  }
                  readOnly
                />

              </div>



              <div className="space-y-2">

                <label
                  htmlFor="county"
                  className="flex items-center gap-2 text-sm font-medium text-foreground"
                >

                  <MapPin className="size-4 text-brand-gold" />

                  County or location

                </label>


                <input
                  id="county"
                  name="county"
                  type="text"
                  defaultValue={
                    profile?.county ??
                    profile?.city ??
                    ""
                  }
                  autoComplete="address-level1"
                  className={
                    fieldClassName
                  }
                  readOnly
                />

              </div>


              <div className="rounded-xl border border-border bg-muted/40 p-4">

                <p className="text-sm font-medium text-foreground">
                  Profile information
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Profile editing will be connected to the customer profile API during the final account-management pass.
                </p>

              </div>

            </div>

          </CardContent>

        </Card>




        <div className="space-y-6">


          <Card className="border border-border bg-card/80 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-3 text-lg text-foreground">

                <BellRing className="size-5 text-brand-gold" />

                Contact preferences

              </CardTitle>


              <CardDescription>
                Your preferred contact channel.
              </CardDescription>

            </CardHeader>


            <CardContent>

              <div className="rounded-xl border border-border bg-muted/40 p-4">

                <p className="text-xs tracking-[0.14em] text-muted-foreground uppercase">
                  Preferred contact
                </p>

                <p className="mt-2 font-medium text-foreground">

                  {
                    profile?.preferredContact ??
                    "Not specified"
                  }

                </p>

              </div>

            </CardContent>

          </Card>




          <Card className="border border-border bg-card/80 shadow-sm">

            <CardHeader>

              <CardTitle className="flex items-center gap-3 text-lg text-foreground">

                <KeyRound className="size-5 text-brand-gold" />

                Account security

              </CardTitle>


              <CardDescription>
                Authentication and account security.
              </CardDescription>

            </CardHeader>


            <CardContent className="space-y-4">

              <div className="rounded-xl border border-border bg-muted/40 p-4">

                <p className="text-sm font-medium text-foreground">
                  Email verification
                </p>


                <p className="mt-1 text-xs leading-5 text-muted-foreground">

                  {
                    session.user.emailVerified
                      ? "Your email address is verified."
                      : "Your email address has not yet been verified."
                  }

                </p>

              </div>


              <div className="rounded-xl border border-border bg-muted/40 p-4">

                <p className="text-sm font-medium text-foreground">
                  Password
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Password management is handled through the Tavin Motors authentication system.
                </p>

              </div>


              <div className="flex items-center gap-2 rounded-xl border border-emerald-600/20 bg-emerald-500/10 p-4 text-sm text-emerald-700 dark:text-emerald-300">

                <ShieldCheck className="size-4" />

                Account security is active.

              </div>

            </CardContent>

          </Card>


        </div>


      </section>

    </div>

  );
}