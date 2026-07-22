import {
  BadgeCheck,
  Quote,
  Star,
} from "lucide-react";

import { HomeSectionHeading } from "@/components/home/home-section-heading";

const testimonials = [
  {
    label: "Demonstration customer 01",
    service: "Assisted vehicle import",
    quote:
      "The proposed process made it easy to understand how sourcing, inspection, shipping and delivery would be handled from one place.",
  },
  {
    label: "Demonstration customer 02",
    service: "Vehicle marketplace",
    quote:
      "The structured listing information and moderation approach created a clearer way to compare vehicles offered by local sellers.",
  },
  {
    label: "Demonstration customer 03",
    service: "Auto-care services",
    quote:
      "The booking flow was straightforward and made it easy to communicate the vehicle concern before requesting an appointment.",
  },
];

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-b border-white/10"
    >
      <div className="absolute right-0 bottom-0 size-[28rem] rounded-full bg-brand-gold/5 blur-[140px]" />

      <div className="tm-container relative py-16 sm:py-20 lg:py-24">
        <HomeSectionHeading
          eyebrow="Customer Experience Preview"
          title="How the Tavin Motors experience should feel."
          description="These sample testimonials demonstrate the intended review layout. They must be replaced by verified customer feedback before production launch."
          centered
        />

        <div className="mx-auto mt-8 flex w-fit items-center gap-2 border border-brand-gold/25 bg-brand-gold/[0.045] px-4 py-2">
          <BadgeCheck className="size-4 text-brand-gold" />

          <span className="text-xs text-muted-foreground">
            Demonstration content — not genuine customer reviews
          </span>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.label}
              className="relative flex h-full flex-col overflow-hidden border border-white/10 bg-card/65 p-6 transition-colors hover:border-brand-gold/30"
            >
              <Quote className="size-8 text-brand-gold/70" />

              <div
                aria-label="Demonstration five-star rating"
                className="mt-7 flex items-center gap-1"
              >
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <Star
                    key={`${testimonial.label}-${starIndex}`}
                    className="size-3.5 fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              <blockquote className="mt-6 flex-1 text-base leading-8 text-muted-foreground">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-8 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold">
                      {testimonial.label}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {testimonial.service}
                    </p>
                  </div>

                  <span className="text-xs text-brand-gold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </div>

              <div className="absolute top-0 right-0 h-px w-24 bg-gradient-to-l from-brand-gold/70 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}