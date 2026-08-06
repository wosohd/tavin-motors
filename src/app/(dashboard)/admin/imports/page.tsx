import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { importsAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Import Enquiries",
};

export default function AdminImportsPage() {
  return (
    <AdminModulePage
      config={importsAdminConfig}
    />
  );
}