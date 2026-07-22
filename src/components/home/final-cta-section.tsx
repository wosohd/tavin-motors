import Link from "next/link";
import {
  ArrowRight,
  CarFront,
  MessageCircle,
  Route,
} from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <section
      id="final-cta"
      className="relative isolate overflow-hidden border-b border-white/10"
    >
      <div className="carbon-grid absolute inset-0 -z-30 opacity-20" />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,#07090c_5%,rgb(104_24_32_/_32%)_52%,#07090c_100%)]" />

      <div className="absolute top-1/2 left-1/2 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-burgundy/20 blur-[160px]" />

      <div className="tm-container py-16 sm:py-20 lg:py-28">
        <div className="mx-auto max-w-5xl border border-brand-gold/20 bg-black/30 p-7 text-center backdrop-blur-xl sm:p-10 lg:p-14">
          <div className="mx-auto grid size-16 place-items-center border border-brand-gold/30 bg-brand-gold/[0.055]">
            <CarFront className="size-7 text-brand-gold" />
          </div>

          <p className="tm-eyebrow mt-8">
            Start your automotive journey
          </p>

          <h2 className="mx-auto mt-5 max-w-4xl text-4xl leading-tight font-semibold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
            Find the right vehicle or let us source it for you.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-8 text-muted-foreground sm:text-base">
            Browse vehicles currently available, explore local listings
            or submit your requirements for a personalised import
            consultation.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/vehicles"
              className={cn(
                buttonVariants({
                  size: "lg",
                }),
                "h-12 bg-primary px-7 shadow-[0_0_32px_rgb(164_32_42_/_22%)] hover:bg-primary/90",
              )}
            >
              <CarFront className="size-4" />
              Browse Vehicles
            </Link>

            <Link
              href="/import-a-car"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "h-12 border-brand-gold/30 bg-brand-gold/[0.045] px-7 hover:bg-brand-gold/10",
              )}
            >
              <Route className="size-4" />
              Request an Import
            </Link>
          </div>

          <div className="mt-8 border-t border-white/10 pt-7">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-brand-gold"
            >
              <MessageCircle className="size-4" />
              Have a question? Contact Tavin Motors
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}