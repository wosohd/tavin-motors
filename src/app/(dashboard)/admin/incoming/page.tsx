import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { incomingAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Incoming Vehicles",
};

export default function AdminIncomingPage() {
  return (
    <AdminModulePage
      config={incomingAdminConfig}
    />
  );
}