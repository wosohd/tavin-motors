import type { Metadata } from "next";

import { AdminModulePage } from "@/components/dashboard/admin-module-page";
import { usersAdminConfig } from "@/data/admin-demo";

export const metadata: Metadata = {
  title: "User Management",
};

export default function AdminUsersPage() {
  return (
    <AdminModulePage config={usersAdminConfig} />
  );
}