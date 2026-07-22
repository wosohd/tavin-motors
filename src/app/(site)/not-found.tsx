import Link from "next/link";
import { ArrowLeft, CarFront } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFoundPage() {
  return (
    <section className="tm-container flex min-h-[70vh] items-center justify-center py-20 text-center">
      <div className="max-w-xl">
        <div className="mx-auto grid size-20 place-items-center border border-brand-gold/25 bg-brand-gold/5">
          <CarFront className="size-9 text-brand-gold" />
        </div>

        <p className="tm-eyebrow mt-7">404 — Route not found</p>

        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
          This road leads nowhere.
        </h1>

        <p className="mt-5 leading-7 text-muted-foreground">
          The vehicle or page you requested is unavailable, may have been
          moved or does not exist.
        </p>

        <Link
          href="/vehicles"
          className={cn(
            buttonVariants({
              size: "lg",
            }),
            "mt-8 bg-primary hover:bg-primary/90",
          )}
        >
          <ArrowLeft className="size-4" />
          Browse Vehicles
        </Link>
      </div>
    </section>
  );
}