import {
  BadgeCheck,
  MessageSquareQuote,
} from "lucide-react";

import {
  HomeSectionHeading,
} from "@/components/home/home-section-heading";


export function TestimonialsSection() {

  return (

    <section
      id="testimonials"
      className="relative border-b border-white/10"
    >

      <div className="tm-container py-16 sm:py-20 lg:py-24">


        <HomeSectionHeading

          eyebrow="Customer experiences"

          title="Trusted service built around every vehicle journey."

          description="Verified customer experiences will appear here after launch as Tavin Motors builds its customer review community."

        />



        <div className="mt-10 border border-dashed border-white/15 bg-white/[0.025] px-6 py-16 text-center sm:px-10">


          <span className="mx-auto grid size-14 place-items-center rounded-full border border-brand-gold/25 bg-brand-gold/10 text-brand-gold">

            <MessageSquareQuote
              className="size-6"
              aria-hidden="true"
            />

          </span>



          <h2 className="mt-6 text-xl font-semibold text-foreground">

            Customer reviews coming soon

          </h2>



          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">

            We are preparing verified customer feedback from
            completed vehicle purchases, imports and auto-care
            experiences. Genuine customer stories will be shared
            here after launch.

          </p>



          <div className="mx-auto mt-6 inline-flex items-center gap-2 border border-emerald-600/20 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-700 dark:text-emerald-300">

            <BadgeCheck
              className="size-4"
              aria-hidden="true"
            />

            Verified reviews only

          </div>


        </div>


      </div>


    </section>

  );

}