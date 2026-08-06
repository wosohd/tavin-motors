import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { marketplaceAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Marketplace Moderation",
};

export default function AdminMarketplacePage() {
  return (
    <AdminModulePage
      config={marketplaceAdminConfig}
    />
  );
}