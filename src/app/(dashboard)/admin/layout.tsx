import type { Metadata } from "next";
import type { ReactNode } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Administrator Dashboard",
  description:
    "Secure Tavin Motors administration dashboard for inventory, marketplace moderation, imports, services, enquiries and users.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  /*
   * Authentication is checked on
   * the server before any admin
   * dashboard content is rendered.
   */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/admin",
      )}`,
    );
  }

  /*
   * Read the role directly from
   * PostgreSQL instead of trusting
   * client state.
   *
   * This also means a role change
   * takes effect immediately.
   */
  const account =
    await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },

      select: {
        id: true,
        role: true,
        banned: true,
      },
    });

  /*
   * Only an active ADMIN account
   * can enter this route tree.
   *
   * This layout automatically
   * protects:
   *
   * /admin
   * /admin/inventory
   * /admin/incoming
   * /admin/marketplace
   * /admin/imports
   * /admin/service-bookings
   * /admin/enquiries
   * /admin/users
   * /admin/content
   */
  if (
    !account ||
    account.role !== "admin" ||
    account.banned === true
  ) {
    redirect("/dashboard");
  }

  return (
    <DashboardShell
  role="admin"
  user={{
    name: session.user.name,
    email: session.user.email,
  }}
>
  {children}
</DashboardShell>
  );
}