import type { Metadata } from "next";

import { DashboardShell } from "@/components/dashboard/dashboard-shell";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer dashboard demonstration for Tavin Motors.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CustomerDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardShell role="customer">{children}</DashboardShell>;
}