import type { Metadata } from "next";
import {
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/shared/page-hero";
import { getVehicleBySlug } from "@/data/vehicles";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Tavin Motors about available vehicles, import assistance, local listings and auto-care services.",
};

type ContactPageProps = {
  searchParams: Promise<{
    vehicle?: string | string[];
  }>;
};

const contactItems = [
  {
    icon: Phone,
    title: "Call or WhatsApp",
    value: "Contact number to be confirmed",
    note: "Final business number will be added before launch.",
  },
  {
    icon: Mail,
    title: "Email",
    value: "Business email to be confirmed",
    note: "A branded contact email will be connected later.",
  },
  {
    icon: MapPin,
    title: "Visit",
    value: "Showroom location to be confirmed",
    note: "The final map and directions will be added after approval.",
  },
  {
    icon: Clock3,
    title: "Business hours",
    value: "Operating hours to be confirmed",
    note: "Opening and appointment hours will be supplied by the client.",
  },
];

export default async function ContactPage({
  searchParams,
}: ContactPageProps) {
  const resolvedSearchParams = await searchParams;

  const vehicleSlug = Array.isArray(
    resolvedSearchParams.vehicle,
  )
    ? resolvedSearchParams.vehicle[0]
    : resolvedSearchParams.vehicle;

  const vehicle = vehicleSlug
    ? getVehicleBySlug(vehicleSlug)
    : undefined;

  const vehicleName = vehicle
    ? `${vehicle.year} ${vehicle.make} ${vehicle.model} ${vehicle.trim}`
    : undefined;

  const defaultSubject = vehicleName
    ? `Enquiry about ${vehicleName}`
    : "";

  const defaultMessage = vehicleName
    ? `Hello Tavin Motors, I would like more information about the ${vehicleName}, stock code ${vehicle?.stockCode}.`
    : "";

  return (
    <>
      <PageHero
        eyebrow="Contact Tavin Motors"
        title="Let’s discuss your next vehicle."
        description="Contact us about available inventory, incoming vehicles, personalised imports, local marketplace listings or auto-care services."
      >
        {vehicleName && (
          <div className="inline-flex items-center gap-2 border border-brand-gold/25 bg-brand-gold/[0.045] px-4 py-2 text-xs text-muted-foreground">
            <MessageCircle className="size-4 text-brand-gold" />
            Enquiring about: {vehicleName}
          </div>
        )}
      </PageHero>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
          {contactItems.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.title}
                className="bg-background p-6"
              >
                <Icon className="size-6 text-brand-gold" />

                <h2 className="mt-7 text-lg font-semibold">
                  {item.title}
                </h2>

                <p className="mt-3 text-sm text-white">
                  {item.value}
                </p>

                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  {item.note}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="tm-container py-14 sm:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div>
              <p className="tm-eyebrow">
                Talk to our team
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Tell us how we can assist
              </h2>

              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                The contact form supports general questions and
                vehicle-specific enquiries. When opened from a vehicle
                page, the relevant vehicle information is entered
                automatically.
              </p>

              <div className="mt-8 border border-brand-gold/20 bg-brand-gold/[0.035] p-5">
                <p className="text-sm font-semibold">
                  Client information required
                </p>

                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Before production launch, replace all placeholder
                  contact details with the approved phone number,
                  WhatsApp number, business email, showroom location,
                  business hours and map coordinates.
                </p>
              </div>
            </div>

            <ContactForm
              defaultSubject={defaultSubject}
              defaultMessage={defaultMessage}
              defaultEnquiryType={
                vehicleName ? "vehicle" : ""
              }
            />
          </div>
        </div>
      </section>
    </>
  );
}