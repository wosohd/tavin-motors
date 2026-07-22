export type ServiceIcon =
  | "diagnostics"
  | "maintenance"
  | "inspection"
  | "detailing"
  | "electrical"
  | "tyres";

export type AutoService = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  duration: string;
  icon: ServiceIcon;
  features: string[];
};