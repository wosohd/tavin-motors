import type { Metadata } from "next";
import {
  BadgeCheck,
  Clock3,
  ShieldCheck,
  Wrench,
} from "lucide-react";

import { ServiceBookingForm } from "@/components/forms/service-booking-form";
import { PageHero } from "@/components/shared/page-hero";
import { ServiceCard } from "@/components/services/service-card";
import { autoServices } from "@/data/services";

export const metadata: Metadata = {
  title: "Auto Care Services",
  description:
    "Explore diagnostics, maintenance, inspections, detailing and vehicle-care services from Tavin Motors.",
};

const servicePrinciples = [
  {
    icon: ShieldCheck,
    title: "Careful assessment",
    description:
      "Work begins with a clear understanding of the vehicle and the customer's concern.",
  },
  {
    icon: BadgeCheck,
    title: "Clear recommendations",
    description:
      "Customers receive understandable findings and recommended next steps.",
  },
  {
    icon: Clock3,
    title: "Appointment coordination",
    description:
      "Service timing is confirmed before the vehicle is received.",
  },
];

const commonQuestions = [
  {
    question: "Does submitting the form confirm my appointment?",
    answer:
      "No. It submits an appointment request. The Tavin Motors team will confirm the date and time after checking availability.",
  },
  {
    question: "Can I book a service for a vehicle not bought from Tavin Motors?",
    answer:
      "The final business policy will be confirmed by the client. The demonstration currently allows any customer to request a service.",
  },
  {
    question: "Are service prices displayed online?",
    answer:
      "Prices are not included in the current demo because the final service scope and pricing structure have not yet been approved.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Tavin Auto Care"
        title="Professional care beyond the sale."
        description="Support your vehicle through diagnostics, preventive maintenance, inspection, detailing and practical automotive-care services."
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <p>
            <strong className="text-white">
              {autoServices.length}
            </strong>{" "}
            service categories
          </p>

          <p>
            <strong className="text-white">
              Structured
            </strong>{" "}
            appointment requests
          </p>

          <p>
            <strong className="text-white">
              Customer-focused
            </strong>{" "}
            recommendations
          </p>
        </div>
      </PageHero>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2">
            <Wrench className="size-5 text-brand-gold" />

            <p className="tm-eyebrow">
              Our services
            </p>
          </div>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
            Vehicle care built around clarity
          </h2>

          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            The final services and pricing will be confirmed with the
            client. These categories demonstrate how the complete
            auto-care experience will appear.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {autoServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              number={index + 1}
            />
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.018]">
        <div className="tm-container py-14 sm:py-16 lg:py-20">
          <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-3">
            {servicePrinciples.map((principle) => {
              const Icon = principle.icon;

              return (
                <article
                  key={principle.title}
                  className="bg-background p-7"
                >
                  <Icon className="size-6 text-brand-gold" />

                  <h3 className="mt-7 text-xl font-semibold">
                    {principle.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {principle.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="tm-container py-14 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="tm-eyebrow">
              Book auto care
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
              Request your preferred appointment
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Provide basic vehicle information, select the service and
              suggest a preferred date. The team will contact the
              customer before confirming the appointment.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Select the appropriate service",
                "Share the vehicle information",
                "Choose a preferred date",
                "Receive confirmation from the team",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 border-b border-white/10 pb-3 text-sm text-muted-foreground"
                >
                  <span className="text-xs text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {item}
                </div>
              ))}
            </div>
          </div>

          <ServiceBookingForm services={autoServices} />
        </div>
      </section>

      <section className="border-t border-white/10 bg-black/20">
        <div className="tm-container py-14 sm:py-16 lg:py-20">
          <p className="tm-eyebrow">
            Common questions
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em]">
            Before booking
          </h2>

          <div className="mt-8 max-w-4xl space-y-3">
            {commonQuestions.map((item) => (
              <details
                key={item.question}
                className="group border border-white/10 bg-white/[0.025] p-5"
              >
                <summary className="cursor-pointer list-none pr-8 text-sm font-semibold">
                  {item.question}
                </summary>

                <p className="mt-4 border-t border-white/10 pt-4 text-sm leading-7 text-muted-foreground">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}