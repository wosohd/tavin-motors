import type { AutoService } from "@/types/service";

export const autoServices: AutoService[] = [
  {
    id: "service-001",
    slug: "computer-diagnostics",
    title: "Computer Diagnostics",
    shortDescription:
      "Identify warning lights, electronic faults and vehicle-performance issues.",
    description:
      "A structured diagnostic assessment designed to identify electronic, sensor and performance-related faults before repairs begin.",
    duration: "Approximately 45–90 minutes",
    icon: "diagnostics",
    features: [
      "Diagnostic fault-code scan",
      "Dashboard warning-light assessment",
      "Engine and transmission checks",
      "Sensor-system review",
      "Diagnostic findings summary",
    ],
  },
  {
    id: "service-002",
    slug: "scheduled-maintenance",
    title: "Scheduled Maintenance",
    shortDescription:
      "Routine servicing designed to protect reliability and long-term performance.",
    description:
      "Preventive maintenance based on the vehicle's condition, mileage and manufacturer service requirements.",
    duration: "Approximately 1–3 hours",
    icon: "maintenance",
    features: [
      "Engine-oil and filter service",
      "Fluid-level inspection",
      "Brake-system checks",
      "Battery and charging review",
      "General safety inspection",
    ],
  },
  {
    id: "service-003",
    slug: "pre-purchase-inspection",
    title: "Pre-Purchase Inspection",
    shortDescription:
      "Receive an independent condition assessment before purchasing a vehicle.",
    description:
      "A detailed vehicle review intended to help a buyer understand visible mechanical, electrical and structural concerns.",
    duration: "Approximately 1–2 hours",
    icon: "inspection",
    features: [
      "Exterior and interior condition review",
      "Engine-bay assessment",
      "Road-test observations",
      "Diagnostic scan",
      "Buyer-oriented inspection report",
    ],
  },
  {
    id: "service-004",
    slug: "detailing-and-protection",
    title: "Detailing and Protection",
    shortDescription:
      "Restore presentation and protect interior and exterior vehicle surfaces.",
    description:
      "Professional cleaning and finishing services designed to enhance appearance and support long-term surface protection.",
    duration: "Approximately 3–8 hours",
    icon: "detailing",
    features: [
      "Exterior wash and decontamination",
      "Interior deep cleaning",
      "Paint enhancement options",
      "Leather and trim treatment",
      "Protective finishing options",
    ],
  },
  {
    id: "service-005",
    slug: "electrical-and-battery",
    title: "Electrical and Battery Care",
    shortDescription:
      "Assess battery health, charging performance and common electrical faults.",
    description:
      "Testing and inspection for starting, charging, lighting and other common automotive electrical concerns.",
    duration: "Approximately 45–120 minutes",
    icon: "electrical",
    features: [
      "Battery-health test",
      "Alternator and charging review",
      "Starting-system inspection",
      "Lighting-system checks",
      "Basic electrical fault assessment",
    ],
  },
  {
    id: "service-006",
    slug: "tyres-and-wheel-care",
    title: "Tyres and Wheel Care",
    shortDescription:
      "Support safe handling through tyre, pressure and wheel-condition checks.",
    description:
      "A practical tyre and wheel assessment focused on road safety, wear patterns and vehicle handling.",
    duration: "Approximately 45–90 minutes",
    icon: "tyres",
    features: [
      "Tyre-condition inspection",
      "Pressure adjustment",
      "Wheel-balance review",
      "Wear-pattern assessment",
      "Replacement recommendations",
    ],
  },
];

export function getServiceById(id: string) {
  return autoServices.find((service) => service.id === id);
}

export function getServiceBySlug(slug: string) {
  return autoServices.find((service) => service.slug === slug);
}