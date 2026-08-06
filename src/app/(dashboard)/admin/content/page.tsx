import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { contentAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Website Content",
};

export default function AdminContentPage() {
  return (
    <AdminModulePage
      config={contentAdminConfig}
    />
  );
}