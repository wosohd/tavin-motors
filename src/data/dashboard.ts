import type {
  ContentRecord,
  DashboardStat,
  DashboardUserRecord,
  EnquiryRecord,
  ImportRequestRecord,
  IncomingVehicleRecord,
  MarketplaceListingRecord,
  SavedVehicleRecord,
  ServiceBookingRecord,
} from "@/types/dashboard";

export const currentCustomer = {
  id: "customer-001",
  name: "Joseph Otachi",
  firstName: "Joseph",
  email: "joseph.otachi@example.com",
  phone: "+254 712 345 678",
  location: "Nairobi, Kenya",
  joinedAt: "2026-04-18",
} as const;

export const customerDashboardStats = [
  {
    label: "Saved vehicles",
    value: "4",
    detail: "Two prices changed this month",
    trend: "+1 this week",
    trendDirection: "up",
  },
  {
    label: "Active import requests",
    value: "2",
    detail: "One request is now in shipping",
    trend: "On schedule",
    trendDirection: "neutral",
  },
  {
    label: "Service bookings",
    value: "2",
    detail: "Next visit is 29 July 2026",
    trend: "1 confirmed",
    trendDirection: "neutral",
  },
  {
    label: "Open enquiries",
    value: "2",
    detail: "Latest response received today",
    trend: "1 awaiting reply",
    trendDirection: "down",
  },
] satisfies DashboardStat[];

export const adminDashboardStats = [
  {
    label: "Vehicles in stock",
    value: "6",
    detail: "Three vehicles are featured",
    trend: "+2 this month",
    trendDirection: "up",
  },
  {
    label: "Incoming vehicles",
    value: "2",
    detail: "Next arrival expected in August",
    trend: "1 at 68%",
    trendDirection: "neutral",
  },
  {
    label: "Moderation queue",
    value: "3",
    detail: "One listing needs urgent review",
    trend: "+1 today",
    trendDirection: "up",
  },
  {
    label: "Open customer requests",
    value: "8",
    detail: "Imports, services and enquiries",
    trend: "3 awaiting action",
    trendDirection: "down",
  },
] satisfies DashboardStat[];

export const savedVehicles = [
  {
    id: "saved-001",
    vehicleId: "tm-001",
    savedAt: "2026-07-22",
  },
  {
    id: "saved-002",
    vehicleId: "tm-003",
    savedAt: "2026-07-18",
  },
  {
    id: "saved-003",
    vehicleId: "tm-004",
    savedAt: "2026-07-12",
  },
  {
    id: "saved-004",
    vehicleId: "tm-007",
    savedAt: "2026-07-08",
  },
] satisfies SavedVehicleRecord[];

export const marketplaceListings = [
  {
    id: "listing-001",
    ownerName: currentCustomer.name,
    vehicleName: "2018 Toyota Mark X 250G",
    registration: "KDK 482R",
    submittedAt: "2026-07-20",
    askingPrice: 3250000,
    status: "PENDING_REVIEW",
    views: 0,
    enquiries: 0,
  },
  {
    id: "listing-002",
    ownerName: currentCustomer.name,
    vehicleName: "2017 Mazda Axela 15S",
    registration: "KCN 194F",
    submittedAt: "2026-06-28",
    askingPrice: 2150000,
    status: "APPROVED",
    views: 184,
    enquiries: 7,
  },
  {
    id: "listing-003",
    ownerName: "Faith Wanjiru",
    vehicleName: "2019 Subaru XV Hybrid",
    registration: "KDJ 771P",
    submittedAt: "2026-07-23",
    askingPrice: 3950000,
    status: "PENDING_REVIEW",
    views: 0,
    enquiries: 0,
  },
  {
    id: "listing-004",
    ownerName: "Brian Otieno",
    vehicleName: "2016 Volkswagen Golf TSI",
    registration: "KCM 528A",
    submittedAt: "2026-07-22",
    askingPrice: 1850000,
    status: "NEEDS_CHANGES",
    views: 0,
    enquiries: 0,
    reviewNote: "Add a clear dashboard photo and verify the mileage.",
  },
  {
    id: "listing-005",
    ownerName: "Mercy Njeri",
    vehicleName: "2020 Toyota RAV4 Adventure",
    submittedAt: "2026-07-21",
    askingPrice: 5450000,
    status: "PENDING_REVIEW",
    views: 0,
    enquiries: 0,
  },
] satisfies MarketplaceListingRecord[];

export const importRequests: ImportRequestRecord[] = [
  {
    id: "import-001",
    customerName: currentCustomer.name,
    vehicleName: "2022 Lexus RX 450h F Sport",
    sourceMarket: "Japan",
    budget: 9800000,
    submittedAt: "2026-06-14",
    status: "SHIPPING",
    progress: 64,
    nextStep: "Vessel arrival and port-clearance preparation",
    assignedTo: "Sir Clevin",
  },
  {
    id: "import-002",
    customerName: currentCustomer.name,
    vehicleName: "2021 Mercedes-Benz GLC 220d AMG Line",
    sourceMarket: "United Kingdom",
    budget: 8500000,
    submittedAt: "2026-07-18",
    status: "OPTIONS_SHARED",
    progress: 26,
    nextStep: "Review the three shortlisted vehicles",
    assignedTo: "Kevin Maina",
  },
  {
    id: "import-003",
    customerName: "Lucy Achieng",
    vehicleName: "2023 Toyota Land Cruiser Prado TX-L",
    sourceMarket: "Japan",
    budget: 14500000,
    submittedAt: "2026-07-22",
    status: "SOURCING",
    progress: 12,
    nextStep: "Confirm preferred exterior and interior colours",
    assignedTo: "Sir Clevin",
  },
  {
    id: "import-004",
    customerName: "Peter Kibet",
    vehicleName: "2021 BMW X5 xDrive30d M Sport",
    sourceMarket: "United Kingdom",
    budget: 13200000,
    submittedAt: "2026-07-10",
    status: "AWAITING_DEPOSIT",
    progress: 38,
    nextStep: "Receive the sourcing deposit",
    assignedTo: "Kevin Maina",
  },
];

export const serviceBookings: ServiceBookingRecord[] = [
  {
    id: "booking-001",
    customerName: currentCustomer.name,
    vehicleName: "2018 Toyota Mark X 250G",
    registration: "KDK 482R",
    serviceId: "service-001",
    scheduledFor: "2026-07-29T09:30:00+03:00",
    status: "CONFIRMED",
  },
  {
    id: "booking-002",
    customerName: currentCustomer.name,
    vehicleName: "2017 Mazda Axela 15S",
    registration: "KCN 194F",
    serviceId: "service-004",
    scheduledFor: "2026-08-05T08:00:00+03:00",
    status: "REQUESTED",
  },
  {
    id: "booking-003",
    customerName: "James Kariuki",
    vehicleName: "2020 Toyota Harrier Premium",
    registration: "KDG 412C",
    serviceId: "service-002",
    scheduledFor: "2026-07-27T10:00:00+03:00",
    status: "CONFIRMED",
  },
  {
    id: "booking-004",
    customerName: "Mary Atieno",
    vehicleName: "2019 Mercedes-Benz C180",
    registration: "KCY 903M",
    serviceId: "service-003",
    scheduledFor: "2026-07-28T14:00:00+03:00",
    status: "REQUESTED",
  },
];

export const enquiries: EnquiryRecord[] = [
  {
    id: "enquiry-001",
    customerName: currentCustomer.name,
    subject: "Trade-in valuation for Toyota Mark X",
    createdAt: "2026-07-23T11:42:00+03:00",
    channel: "WEBSITE",
    status: "REPLIED",
  },
  {
    id: "enquiry-002",
    customerName: currentCustomer.name,
    subject: "Financing options for the Mazda CX-5",
    createdAt: "2026-07-24T08:15:00+03:00",
    channel: "WHATSAPP",
    status: "OPEN",
  },
  {
    id: "enquiry-003",
    customerName: "Samuel Mutua",
    subject: "Availability of the 2021 Toyota Harrier",
    createdAt: "2026-07-24T09:05:00+03:00",
    channel: "PHONE",
    status: "OPEN",
  },
  {
    id: "enquiry-004",
    customerName: "Rachel Chebet",
    subject: "Request for a pre-purchase inspection",
    createdAt: "2026-07-23T16:26:00+03:00",
    channel: "EMAIL",
    status: "REPLIED",
  },
];

export const incomingVehicleRecords = [
  {
    id: "incoming-001",
    vehicleId: "tm-007",
    origin: "Japan",
    estimatedArrival: "2026-08-19",
    stage: "IN_TRANSIT",
    reservations: 3,
  },
  {
    id: "incoming-002",
    vehicleId: "tm-008",
    origin: "United Kingdom",
    estimatedArrival: "2026-09-11",
    stage: "PURCHASED",
    reservations: 1,
  },
] satisfies IncomingVehicleRecord[];

export const dashboardUsers = [
  {
    id: "user-001",
    name: currentCustomer.name,
    email: currentCustomer.email,
    role: "CUSTOMER",
    status: "ACTIVE",
    joinedAt: currentCustomer.joinedAt,
  },
  {
    id: "user-002",
    name: "Faith Wanjiru",
    email: "faith.wanjiru@example.com",
    role: "SELLER",
    status: "PENDING_VERIFICATION",
    joinedAt: "2026-07-19",
  },
  {
    id: "user-003",
    name: "Brian Otieno",
    email: "brian.otieno@example.com",
    role: "SELLER",
    status: "ACTIVE",
    joinedAt: "2026-06-22",
  },
  {
    id: "user-004",
    name: "Sir Clevin",
    email: "amina@tavinmotors.example",
    role: "ADMINISTRATOR",
    status: "ACTIVE",
    joinedAt: "2026-03-03",
  },
] satisfies DashboardUserRecord[];

export const contentRecords = [
  {
    id: "content-001",
    area: "Homepage",
    title: "Homepage hero and primary call to action",
    status: "PUBLISHED",
    updatedAt: "2026-07-22T14:30:00+03:00",
  },
  {
    id: "content-002",
    area: "About",
    title: "Company story, mission and values",
    status: "NEEDS_REVIEW",
    updatedAt: "2026-07-18T10:12:00+03:00",
  },
  {
    id: "content-003",
    area: "Testimonials",
    title: "Customer experience highlights",
    status: "DRAFT",
    updatedAt: "2026-07-16T09:20:00+03:00",
  },
  {
    id: "content-004",
    area: "Contact",
    title: "Business contact details and opening hours",
    status: "NEEDS_REVIEW",
    updatedAt: "2026-07-21T16:05:00+03:00",
  },
] satisfies ContentRecord[];