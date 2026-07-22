import type { Metadata } from "next";

import { AboutPreviewSection } from "@/components/home/about-preview-section";
import { FeaturedVehiclesSection } from "@/components/home/featured-vehicles-section";
import { FinalCtaSection } from "@/components/home/final-cta-section";
import { HeroSection } from "@/components/home/hero-section";
import { ImportPreviewSection } from "@/components/home/import-preview-section";
import { IncomingPreviewSection } from "@/components/home/incoming-preview-section";
import { MarketplacePreviewSection } from "@/components/home/marketplace-preview-section";
import { ServicesPreviewSection } from "@/components/home/services-preview-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyTavinSection } from "@/components/home/why-tavin-section";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Premium Cars, Imports and Auto Care",
  description: siteConfig.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedVehiclesSection />
      <IncomingPreviewSection />
      <ImportPreviewSection />
      <MarketplacePreviewSection />
      <ServicesPreviewSection />
      <WhyTavinSection />
      <TestimonialsSection />
      <AboutPreviewSection />
      <FinalCtaSection />
    </>
  );
}