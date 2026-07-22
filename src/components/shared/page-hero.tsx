import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  className,
  children,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-white/10",
        className,
      )}
    >
      <div className="carbon-grid absolute inset-0 -z-30 opacity-25" />

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,#07090c_10%,rgb(104_24_32_/_24%)_55%,#07090c_100%)]" />

      <div className="absolute -top-32 right-[8%] -z-10 size-96 rounded-full bg-brand-burgundy/20 blur-[140px]" />

      <div className="tm-container py-20 sm:py-24 lg:py-28">
        <div className="max-w-4xl">
          <p className="tm-eyebrow">{eyebrow}</p>

          <h1 className="mt-5 max-w-3xl text-4xl leading-[1.04] font-semibold tracking-[-0.045em] sm:text-5xl lg:text-7xl">
            {title}
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
            {description}
          </p>

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );
}