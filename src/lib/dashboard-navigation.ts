import type { LucideIcon } from "lucide-react";
import {
  CalendarDays,
  CarFront,
  CircleUserRound,
  ClipboardCheck,
  Heart,
  Inbox,
  LayoutDashboard,
  MessagesSquare,
  PackageSearch,
  PanelsTopLeft,
  Settings2,
  ShieldCheck,
  Ship,
  UsersRound,
  Warehouse,
  Wrench,
} from "lucide-react";

import type { DashboardRole } from "@/types/dashboard";

export type DashboardNavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  exact?: boolean;
};

export const customerDashboardNavigation: DashboardNavigationItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Saved vehicles",
    href: "/dashboard/saved-vehicles",
    icon: Heart,
  },
  {
    label: "My listings",
    href: "/dashboard/listings",
    icon: CarFront,
  },
  {
    label: "Import requests",
    href: "/dashboard/imports",
    icon: Ship,
  },
  {
    label: "Service bookings",
    href: "/dashboard/service-bookings",
    icon: Wrench,
  },
  {
    label: "Enquiries",
    href: "/dashboard/enquiries",
    icon: MessagesSquare,
  },
  {
    label: "Profile settings",
    href: "/dashboard/profile",
    icon: Settings2,
  },
];

export const adminDashboardNavigation: DashboardNavigationItem[] = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    label: "Inventory",
    href: "/admin/inventory",
    icon: Warehouse,
  },
  {
    label: "Incoming vehicles",
    href: "/admin/incoming",
    icon: Ship,
  },
  {
    label: "Marketplace moderation",
    href: "/admin/marketplace",
    icon: ShieldCheck,
  },
  {
    label: "Import enquiries",
    href: "/admin/imports",
    icon: PackageSearch,
  },
  {
    label: "Service bookings",
    href: "/admin/service-bookings",
    icon: CalendarDays,
  },
  {
    label: "Contact enquiries",
    href: "/admin/enquiries",
    icon: Inbox,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: UsersRound,
  },
  {
    label: "Website content",
    href: "/admin/content",
    icon: PanelsTopLeft,
  },
];

export const dashboardRoleDetails: Record<
  DashboardRole,
  {
    label: string;
    accountDetail: string;
    accountIcon: LucideIcon;
    navigation: DashboardNavigationItem[];
    switchHref: string;
    switchLabel: string;
    switchIcon: LucideIcon;
  }
> = {
  customer: {
    label: "Customer portal",
    accountDetail: "Customer account",
    accountIcon: CircleUserRound,
    navigation: customerDashboardNavigation,
    switchHref: "/admin",
    switchLabel: "Admin dashboard",
    switchIcon: ClipboardCheck,
  },

  admin: {
    label: "Administration",
    accountDetail: "Administrator account",
    accountIcon: ShieldCheck,
    navigation: adminDashboardNavigation,
    switchHref: "/dashboard",
    switchLabel: "Customer dashboard",
    switchIcon: CircleUserRound,
  },
};