import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { inventoryAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Inventory Management",
};

export default function AdminInventoryPage() {
  return (
    <AdminModulePage
      config={inventoryAdminConfig}
    />
  );
}