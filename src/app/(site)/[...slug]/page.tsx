import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pageTitles: Record<string, string> = {
  vehicles: "Vehicles in Stock",
  incoming: "Incoming Vehicles",
  "import-a-car": "Import a Car",
  marketplace: "Local Marketplace",
  services: "Auto Care Services",
  about: "About Tavin Motors",
  contact: "Contact Tavin Motors",
  account: "Customer Account",
  privacy: "Privacy Policy",
  terms: "Terms and Conditions",
  "marketplace-rules": "Marketplace Rules",
};

type PlaceholderPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export default async function PlaceholderPage({
  params,
}: PlaceholderPageProps) {
  const { slug } = await params;
  const pageKey = slug[0] ?? "";
  const title = pageTitles[pageKey] ?? "Tavin Motors";

  return (
    <section className="tm-container flex min-h-[70vh] items-center py-20">
      <div className="max-w-3xl">
        <p className="tm-eyebrow">Phase 1 development</p>

        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          {title}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          This section has been connected to the Tavin Motors website structure
          and will be developed during the next Phase 1 milestone.
        </p>

        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
            }),
            "mt-8 border-white/15 bg-white/5",
          )}
        >
          <ArrowLeft className="size-4" />
          Return Home
        </Link>
      </div>
    </section>
  );
}