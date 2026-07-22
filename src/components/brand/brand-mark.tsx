import Link from "next/link";

type BrandMarkProps = {
  showText?: boolean;
};

export function BrandMark({ showText = true }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label="Tavin Motors homepage"
      className="group inline-flex items-center gap-3"
    >
      <span className="relative grid size-11 place-items-center overflow-hidden border border-brand-gold/40 bg-black/40 shadow-[0_0_28px_rgb(164_32_42_/_18%)]">
        <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

        <span className="font-display metallic-text text-sm font-extrabold tracking-[-0.08em]">
          TM
        </span>
      </span>

      {showText && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-base font-semibold tracking-[0.24em] text-white">
            TAVIN
          </span>

          <span className="mt-1 text-[0.58rem] font-medium tracking-[0.38em] text-brand-gold">
            MOTORS
          </span>
        </span>
      )}
    </Link>
  );
}