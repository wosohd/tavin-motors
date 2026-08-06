import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { enquiriesAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "Contact Enquiries",
};

export default function AdminEnquiriesPage() {
  return (
    <AdminModulePage
      config={enquiriesAdminConfig}
    />
  );
}