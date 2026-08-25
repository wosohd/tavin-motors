import type { Metadata } from "next";
import type { ReactNode } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description:
    "Manage saved vehicles, marketplace listings, import requests, service bookings, enquiries and your Tavin Motors account.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function CustomerDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  /*
   * Protect the entire customer
   * dashboard route tree.
   */
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(
        "/dashboard",
      )}`,
    );
  }

  /*
   * Determine the authenticated
   * user's real role directly from
   * PostgreSQL.
   *
   * Normal customers should never
   * be offered access to the admin
   * dashboard.
   *
   * An administrator may still use
   * the customer dashboard using
   * the same account.
   */
  const account = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },

    select: {
      role: true,
      banned: true,
    },
  });

  const canAccessAdmin =
    account?.role === "admin" &&
    account.banned !== true;

  return (
    <DashboardShell
      role="customer"
      canAccessAdmin={canAccessAdmin}
    >
      {children}
    </DashboardShell>
  );
}