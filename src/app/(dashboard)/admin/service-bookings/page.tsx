import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { serviceBookingsAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Service Bookings",
};

export default function AdminServiceBookingsPage() {
  return (
    <AdminModulePage
      config={serviceBookingsAdminConfig}
    />
  );
}