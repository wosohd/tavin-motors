export type DashboardRole = "customer" | "admin";

export type DashboardStat = {
  label: string;
  value: string;
  detail: string;
  trend?: string;
  trendDirection?: "up" | "down" | "neutral";
};

export type SavedVehicleRecord = {
  id: string;
  vehicleId: string;
  savedAt: string;
};

export type MarketplaceListingStatus =
  | "DRAFT"
  | "PENDING_REVIEW"
  | "APPROVED"
  | "NEEDS_CHANGES"
  | "REJECTED";

export type MarketplaceListingRecord = {
  id: string;
  ownerName: string;
  vehicleName: string;
  registration?: string;
  submittedAt: string;
  askingPrice: number;
  status: MarketplaceListingStatus;
  views: number;
  enquiries: number;
  reviewNote?: string;
};

export type ImportRequestStatus =
  | "SOURCING"
  | "OPTIONS_SHARED"
  | "AWAITING_DEPOSIT"
  | "SHIPPING"
  | "PORT_CLEARANCE"
  | "COMPLETED";

export type ImportRequestRecord = {
  id: string;
  customerName: string;
  vehicleName: string;
  sourceMarket: string;
  budget: number;
  submittedAt: string;
  status: ImportRequestStatus;
  progress: number;
  nextStep: string;
  assignedTo?: string;
};

export type ServiceBookingStatus =
  | "REQUESTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export type ServiceBookingRecord = {
  id: string;
  customerName: string;
  vehicleName: string;
  registration?: string;
  serviceId: string;
  scheduledFor: string;
  status: ServiceBookingStatus;
};

export type EnquiryChannel =
  | "WEBSITE"
  | "PHONE"
  | "WHATSAPP"
  | "EMAIL";

export type EnquiryStatus = "OPEN" | "REPLIED" | "CLOSED";

export type EnquiryRecord = {
  id: string;
  customerName: string;
  subject: string;
  createdAt: string;
  channel: EnquiryChannel;
  status: EnquiryStatus;
};

export type IncomingVehicleStage =
  | "PURCHASED"
  | "IN_TRANSIT"
  | "PORT_CLEARANCE"
  | "READY_SOON";

export type IncomingVehicleRecord = {
  id: string;
  vehicleId: string;
  origin: string;
  estimatedArrival: string;
  stage: IncomingVehicleStage;
  reservations: number;
};

export type DashboardUserRole =
  | "CUSTOMER"
  | "SELLER"
  | "ADMINISTRATOR";

export type DashboardUserStatus =
  | "ACTIVE"
  | "PENDING_VERIFICATION"
  | "SUSPENDED";

export type DashboardUserRecord = {
  id: string;
  name: string;
  email: string;
  role: DashboardUserRole;
  status: DashboardUserStatus;
  joinedAt: string;
};

export type ContentStatus =
  | "PUBLISHED"
  | "DRAFT"
  | "NEEDS_REVIEW";

export type ContentRecord = {
  id: string;
  area: string;
  title: string;
  status: ContentStatus;
  updatedAt: string;
};