import {
  BadgeCheck,
  CalendarCheck2,
  CalendarDays,
  CarFront,
  CircleUserRound,
  Clock3,
  FileText,
  Inbox,
  PackageCheck,
  PackageSearch,
  PanelsTopLeft,
  ShieldAlert,
  ShieldCheck,
  Ship,
  UsersRound,
  Warehouse,
} from "lucide-react";

import type { AdminModuleConfig } from "@/components/dashboard/admin-module-page";

export const inventoryAdminConfig: AdminModuleConfig = {
  eyebrow: "Inventory management",
  title: "Vehicle inventory",
  description:
    "Review vehicles currently available through Tavin Motors, including featured, reserved and standard stock.",
  actionLabel: "Add vehicle",
  metrics: [
    {
      label: "Total inventory",
      value: "24",
      detail: "Vehicles currently recorded",
      icon: Warehouse,
    },
    {
      label: "Featured vehicles",
      value: "6",
      detail: "Highlighted on the website",
      icon: BadgeCheck,
    },
    {
      label: "Reserved vehicles",
      value: "4",
      detail: "Awaiting customer completion",
      icon: CarFront,
    },
  ],
  records: [
    {
      id: "TVM-024",
      title: "Toyota Harrier 2021",
      subtitle:
        "Premium SUV listed in Nairobi.",
      status: "Featured",
      statusTone: "gold",
      fields: [
        {
          label: "Price",
          value: "KES 4,850,000",
        },
        {
          label: "Mileage",
          value: "42,000 km",
        },
        {
          label: "Location",
          value: "Nairobi",
        },
        {
          label: "Transmission",
          value: "Automatic",
        },
      ],
    },
    {
      id: "TVM-019",
      title: "BMW X3 2020",
      subtitle:
        "Graphite luxury crossover.",
      status: "Available",
      statusTone: "green",
      fields: [
        {
          label: "Price",
          value: "KES 5,950,000",
        },
        {
          label: "Mileage",
          value: "51,000 km",
        },
        {
          label: "Location",
          value: "Nairobi",
        },
        {
          label: "Transmission",
          value: "Automatic",
        },
      ],
    },
    {
      id: "TVM-016",
      title: "Mercedes-Benz C200 2019",
      subtitle:
        "Silver executive saloon.",
      status: "Reserved",
      statusTone: "burgundy",
      fields: [
        {
          label: "Price",
          value: "KES 4,200,000",
        },
        {
          label: "Mileage",
          value: "58,000 km",
        },
        {
          label: "Location",
          value: "Mombasa",
        },
        {
          label: "Transmission",
          value: "Automatic",
        },
      ],
    },
    {
      id: "TVM-011",
      title: "Mazda CX-5 2020",
      subtitle:
        "Burgundy family crossover.",
      status: "Available",
      statusTone: "green",
      fields: [
        {
          label: "Price",
          value: "KES 3,750,000",
        },
        {
          label: "Mileage",
          value: "46,000 km",
        },
        {
          label: "Location",
          value: "Nakuru",
        },
        {
          label: "Transmission",
          value: "Automatic",
        },
      ],
    },
  ],
};

export const incomingAdminConfig: AdminModuleConfig = {
  eyebrow: "Logistics",
  title: "Incoming vehicles",
  description:
    "Track vehicles being sourced, shipped, cleared and prepared for delivery or public inventory.",
  actionLabel: "Add incoming vehicle",
  metrics: [
    {
      label: "Incoming vehicles",
      value: "8",
      detail: "Across all logistics stages",
      icon: Ship,
    },
    {
      label: "In shipping",
      value: "4",
      detail: "Currently in international transit",
      icon: PackageSearch,
    },
    {
      label: "At clearance",
      value: "2",
      detail: "Awaiting local processing",
      icon: PackageCheck,
    },
  ],
  records: [
    {
      id: "IMP-2084",
      title: "Toyota Land Cruiser Prado 2021",
      subtitle:
        "Customer import from Japan.",
      status: "Shipping",
      statusTone: "blue",
      fields: [
        {
          label: "Origin",
          value: "Japan",
        },
        {
          label: "Estimated arrival",
          value: "18 Aug 2026",
        },
        {
          label: "Destination",
          value: "Mombasa",
        },
        {
          label: "Customer",
          value: "James Kariuki",
        },
      ],
    },
    {
      id: "IMP-2077",
      title: "Subaru Forester 2020",
      subtitle:
        "Tavin Motors inventory sourcing.",
      status: "Sourcing",
      statusTone: "gold",
      fields: [
        {
          label: "Origin",
          value: "Japan",
        },
        {
          label: "Estimated arrival",
          value: "Pending",
        },
        {
          label: "Destination",
          value: "Nairobi",
        },
        {
          label: "Customer",
          value: "Inventory",
        },
      ],
    },
    {
      id: "IMP-2069",
      title: "Audi Q5 2019",
      subtitle:
        "Premium customer order.",
      status: "Clearing",
      statusTone: "burgundy",
      fields: [
        {
          label: "Origin",
          value: "United Kingdom",
        },
        {
          label: "Estimated release",
          value: "10 Aug 2026",
        },
        {
          label: "Destination",
          value: "Nairobi",
        },
        {
          label: "Customer",
          value: "Mercy Njeri",
        },
      ],
    },
  ],
};

export const marketplaceAdminConfig: AdminModuleConfig = {
  eyebrow: "Marketplace moderation",
  title: "Customer listings",
  description:
    "Review customer vehicle submissions before approving them for publication on the marketplace.",
  actionLabel: "Create listing",
  metrics: [
    {
      label: "Pending review",
      value: "6",
      detail: "Listings requiring moderation",
      icon: ShieldAlert,
    },
    {
      label: "Approved",
      value: "18",
      detail: "Published customer listings",
      icon: ShieldCheck,
    },
    {
      label: "Changes requested",
      value: "3",
      detail: "Returned to vehicle owners",
      icon: FileText,
    },
  ],
  records: [
    {
      id: "MKT-1028",
      title: "Mazda Demio 2018",
      subtitle:
        "Submitted by Joseph Otachi.",
      status: "Pending review",
      statusTone: "gold",
      fields: [
        {
          label: "Asking price",
          value: "KES 1,180,000",
        },
        {
          label: "Mileage",
          value: "81,000 km",
        },
        {
          label: "Location",
          value: "Nairobi",
        },
        {
          label: "Submitted",
          value: "Today",
        },
      ],
    },
    {
      id: "MKT-1022",
      title: "Nissan X-Trail 2017",
      subtitle:
        "Submitted by John Otieno.",
      status: "Changes requested",
      statusTone: "red",
      fields: [
        {
          label: "Asking price",
          value: "KES 2,050,000",
        },
        {
          label: "Mileage",
          value: "96,000 km",
        },
        {
          label: "Location",
          value: "Kisumu",
        },
        {
          label: "Issue",
          value: "Images required",
        },
      ],
    },
    {
      id: "MKT-1018",
      title: "Toyota Fielder 2016",
      subtitle:
        "Submitted by Grace Wanjiku.",
      status: "Approved",
      statusTone: "green",
      fields: [
        {
          label: "Asking price",
          value: "KES 1,520,000",
        },
        {
          label: "Mileage",
          value: "103,000 km",
        },
        {
          label: "Location",
          value: "Nakuru",
        },
        {
          label: "Approved",
          value: "Yesterday",
        },
      ],
    },
  ],
};

export const importsAdminConfig: AdminModuleConfig = {
  eyebrow: "Vehicle sourcing",
  title: "Import enquiries",
  description:
    "Manage personalised vehicle requests from initial enquiry through sourcing, quotation and delivery.",
  actionLabel: "New import request",
  metrics: [
    {
      label: "Active requests",
      value: "5",
      detail: "Imports currently in progress",
      icon: PackageSearch,
    },
    {
      label: "New enquiries",
      value: "3",
      detail: "Awaiting first response",
      icon: Inbox,
    },
    {
      label: "Quoted requests",
      value: "7",
      detail: "Customers reviewing quotations",
      icon: FileText,
    },
  ],
  records: [
    {
      id: "REQ-3081",
      title: "Toyota Harrier 2021",
      subtitle:
        "Requested by Brian Kamau.",
      status: "New",
      statusTone: "gold",
      fields: [
        {
          label: "Budget",
          value: "KES 4,500,000",
        },
        {
          label: "Preferred origin",
          value: "Japan",
        },
        {
          label: "Submitted",
          value: "Today",
        },
        {
          label: "Assigned to",
          value: "Unassigned",
        },
      ],
    },
    {
      id: "REQ-3074",
      title: "Land Cruiser Prado 2020",
      subtitle:
        "Requested by Ann Muthoni.",
      status: "In progress",
      statusTone: "blue",
      fields: [
        {
          label: "Budget",
          value: "KES 7,800,000",
        },
        {
          label: "Preferred origin",
          value: "Japan",
        },
        {
          label: "Submitted",
          value: "3 days ago",
        },
        {
          label: "Assigned to",
          value: "Sir Clevin",
        },
      ],
    },
    {
      id: "REQ-3068",
      title: "Mercedes-Benz GLC 2019",
      subtitle:
        "Requested by Sheila Achieng.",
      status: "Quoted",
      statusTone: "green",
      fields: [
        {
          label: "Budget",
          value: "KES 6,200,000",
        },
        {
          label: "Preferred origin",
          value: "United Kingdom",
        },
        {
          label: "Submitted",
          value: "5 days ago",
        },
        {
          label: "Assigned to",
          value: "Sir Clevin",
        },
      ],
    },
  ],
};

export const serviceBookingsAdminConfig: AdminModuleConfig = {
  eyebrow: "Auto care operations",
  title: "Service bookings",
  description:
    "Coordinate vehicle diagnostics, maintenance, inspections and repair appointments.",
  actionLabel: "Add booking",
  metrics: [
    {
      label: "Scheduled",
      value: "7",
      detail: "Upcoming confirmed appointments",
      icon: CalendarDays,
    },
    {
      label: "Pending",
      value: "3",
      detail: "Awaiting workshop confirmation",
      icon: Clock3,
    },
    {
      label: "Completed",
      value: "21",
      detail: "Services completed this month",
      icon: CalendarCheck2,
    },
  ],
  records: [
    {
      id: "SRV-5028",
      title: "Toyota Axio diagnostics",
      subtitle:
        "Booking for Joseph Otachi.",
      status: "Confirmed",
      statusTone: "green",
      fields: [
        {
          label: "Date",
          value: "8 Aug 2026",
        },
        {
          label: "Time",
          value: "9:00 AM",
        },
        {
          label: "Location",
          value: "Nairobi workshop",
        },
        {
          label: "Service",
          value: "Diagnostics",
        },
      ],
    },
    {
      id: "SRV-5025",
      title: "BMW X1 inspection",
      subtitle:
        "Booking for Peter Otieno.",
      status: "Pending",
      statusTone: "gold",
      fields: [
        {
          label: "Date",
          value: "10 Aug 2026",
        },
        {
          label: "Time",
          value: "11:30 AM",
        },
        {
          label: "Location",
          value: "Nairobi workshop",
        },
        {
          label: "Service",
          value: "Inspection",
        },
      ],
    },
    {
      id: "SRV-5019",
      title: "Subaru Forester maintenance",
      subtitle:
        "Booking for Mercy Njeri.",
      status: "Completed",
      statusTone: "blue",
      fields: [
        {
          label: "Date",
          value: "4 Aug 2026",
        },
        {
          label: "Time",
          value: "2:00 PM",
        },
        {
          label: "Location",
          value: "Nairobi workshop",
        },
        {
          label: "Service",
          value: "Scheduled maintenance",
        },
      ],
    },
  ],
};

export const enquiriesAdminConfig: AdminModuleConfig = {
  eyebrow: "Customer communication",
  title: "Contact enquiries",
  description:
    "Review and respond to general vehicle, financing, trade-in and website enquiries.",
  actionLabel: "New enquiry",
  metrics: [
    {
      label: "Unread",
      value: "8",
      detail: "Messages awaiting review",
      icon: Inbox,
    },
    {
      label: "In progress",
      value: "5",
      detail: "Assigned conversations",
      icon: Clock3,
    },
    {
      label: "Replied",
      value: "19",
      detail: "Responses sent this month",
      icon: BadgeCheck,
    },
  ],
  records: [
    {
      id: "ENQ-8042",
      title: "Toyota Harrier availability",
      subtitle:
        "Message from Kevin Ouma.",
      status: "Unread",
      statusTone: "burgundy",
      fields: [
        {
          label: "Channel",
          value: "Website form",
        },
        {
          label: "Received",
          value: "12 minutes ago",
        },
        {
          label: "Category",
          value: "Vehicle enquiry",
        },
        {
          label: "Assigned to",
          value: "Unassigned",
        },
      ],
    },
    {
      id: "ENQ-8038",
      title: "Vehicle financing options",
      subtitle:
        "Message from Lucy Wambui.",
      status: "Replied",
      statusTone: "green",
      fields: [
        {
          label: "Channel",
          value: "Website form",
        },
        {
          label: "Received",
          value: "Yesterday",
        },
        {
          label: "Category",
          value: "Financing",
        },
        {
          label: "Assigned to",
          value: "Sir Clevin",
        },
      ],
    },
    {
      id: "ENQ-8035",
      title: "Trade-in request",
      subtitle:
        "Message from Martin Kiptoo.",
      status: "In progress",
      statusTone: "blue",
      fields: [
        {
          label: "Channel",
          value: "Website form",
        },
        {
          label: "Received",
          value: "2 days ago",
        },
        {
          label: "Category",
          value: "Trade-in",
        },
        {
          label: "Assigned to",
          value: "Sir Clevin",
        },
      ],
    },
  ],
};

export const usersAdminConfig: AdminModuleConfig = {
  eyebrow: "Access management",
  title: "Users",
  description:
    "Review customer and administrator demonstration accounts before role-based authentication is connected.",
  actionLabel: "Add user",
  metrics: [
    {
      label: "Total users",
      value: "42",
      detail: "Customer and administrator accounts",
      icon: UsersRound,
    },
    {
      label: "Active customers",
      value: "39",
      detail: "Customer demo profiles",
      icon: CircleUserRound,
    },
    {
      label: "Administrators",
      value: "3",
      detail: "Administrative demo profiles",
      icon: ShieldCheck,
    },
  ],
  records: [
    {
      id: "USR-0042",
      title: "Joseph Otachi",
      subtitle:
        "Customer demonstration account.",
      status: "Active",
      statusTone: "green",
      fields: [
        {
          label: "Role",
          value: "Customer",
        },
        {
          label: "Joined",
          value: "12 Jul 2026",
        },
        {
          label: "Saved vehicles",
          value: "4",
        },
        {
          label: "Listings",
          value: "2",
        },
      ],
    },
    {
      id: "USR-0038",
      title: "Grace Wanjiku",
      subtitle:
        "Customer marketplace account.",
      status: "Active",
      statusTone: "green",
      fields: [
        {
          label: "Role",
          value: "Customer",
        },
        {
          label: "Joined",
          value: "30 Jun 2026",
        },
        {
          label: "Saved vehicles",
          value: "2",
        },
        {
          label: "Listings",
          value: "1",
        },
      ],
    },
    {
      id: "USR-0029",
      title: "Peter Otieno",
      subtitle:
        "Customer account under review.",
      status: "Suspended",
      statusTone: "red",
      fields: [
        {
          label: "Role",
          value: "Customer",
        },
        {
          label: "Joined",
          value: "18 May 2026",
        },
        {
          label: "Saved vehicles",
          value: "1",
        },
        {
          label: "Listings",
          value: "0",
        },
      ],
    },
  ],
};

export const contentAdminConfig: AdminModuleConfig = {
  eyebrow: "Website management",
  title: "Website content",
  description:
    "Review homepage sections, featured collections, service notices and public website information.",
  actionLabel: "Add content",
  metrics: [
    {
      label: "Published sections",
      value: "4",
      detail: "Currently visible website content",
      icon: PanelsTopLeft,
    },
    {
      label: "Draft sections",
      value: "2",
      detail: "Content awaiting publication",
      icon: FileText,
    },
    {
      label: "Scheduled updates",
      value: "1",
      detail: "Future publication queued",
      icon: CalendarDays,
    },
  ],
  records: [
    {
      id: "CNT-HERO",
      title: "Homepage hero",
      subtitle:
        "Primary homepage message and actions.",
      status: "Published",
      statusTone: "green",
      fields: [
        {
          label: "Location",
          value: "Homepage",
        },
        {
          label: "Updated",
          value: "Today",
        },
        {
          label: "Type",
          value: "Hero section",
        },
        {
          label: "Owner",
          value: "Administration",
        },
      ],
    },
    {
      id: "CNT-FEATURED",
      title: "Featured vehicle collection",
      subtitle:
        "Vehicles highlighted on the homepage.",
      status: "Scheduled",
      statusTone: "blue",
      fields: [
        {
          label: "Location",
          value: "Homepage",
        },
        {
          label: "Publication",
          value: "9 Aug 2026",
        },
        {
          label: "Type",
          value: "Vehicle collection",
        },
        {
          label: "Owner",
          value: "Administration",
        },
      ],
    },
    {
      id: "CNT-IMPORT",
      title: "Vehicle import guide",
      subtitle:
        "Public explanation of the import process.",
      status: "Draft",
      statusTone: "gold",
      fields: [
        {
          label: "Location",
          value: "Import page",
        },
        {
          label: "Updated",
          value: "Yesterday",
        },
        {
          label: "Type",
          value: "Information section",
        },
        {
          label: "Owner",
          value: "Administration",
        },
      ],
    },
    {
      id: "CNT-SERVICE",
      title: "Auto care service banner",
      subtitle:
        "Promotional service and maintenance notice.",
      status: "Published",
      statusTone: "green",
      fields: [
        {
          label: "Location",
          value: "Services page",
        },
        {
          label: "Updated",
          value: "3 days ago",
        },
        {
          label: "Type",
          value: "Call to action",
        },
        {
          label: "Owner",
          value: "Administration",
        },
      ],
    },
  ],
};