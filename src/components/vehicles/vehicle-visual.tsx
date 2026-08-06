import { CarFront } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Vehicle } from "@/types/vehicle";

type VehicleVisualProps = {
  vehicle: Vehicle;
  className?: string;
  compact?: boolean;
};

const toneStyles: Record<Vehicle["tone"], string> = {
  burgundy:
    "from-[#4c1018] via-[#171015] to-[#07090c] text-[#c74e58]",
  silver:
    "from-[#41464d] via-[#171a1f] to-[#07090c] text-[#d4d7dc]",
  graphite:
    "from-[#23272d] via-[#111419] to-[#050608] text-[#979da6]",
  gold:
    "from-[#4b3b20] via-[#17130e] to-[#07090c] text-[#c7a766]",
  blue:
    "from-[#122b43] via-[#101923] to-[#06080b] text-[#4c8fbd]",
  green:
    "from-[#12352a] via-[#101a17] to-[#060907] text-[#479878]",
};

export function VehicleVisual({
  vehicle,
  className,
  compact = false,
}: VehicleVisualProps) {
  return (
    <div
      className={cn(
        "group/visual relative isolate min-h-56 overflow-hidden bg-gradient-to-br",
        toneStyles[vehicle.tone],
        className,
      )}
    >
      <div className="carbon-grid absolute inset-0 -z-20 opacity-20" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-black/70 to-transparent" />

      <div className="absolute top-4 left-4 z-20 border border-white/10 bg-black/30 px-3 py-1 text-[0.62rem] tracking-[0.18em] text-white/70 uppercase backdrop-blur-md">
        {vehicle.stockCode}
      </div>

      <div className="absolute top-4 right-4 z-20 text-[0.62rem] tracking-[0.18em] text-white/50 uppercase">
        Tavin Selection
      </div>

      <div className="absolute inset-0 flex items-center justify-center px-8 pt-10">
        <div
          className={cn(
            "pointer-events-none absolute aspect-square rounded-full border border-current/10",
            compact
              ? "w-[55%] max-w-48"
              : "w-[58%] max-w-60",
          )}
        />

        <div
          className={cn(
            "pointer-events-none absolute aspect-square rounded-full border border-white/5",
            compact
              ? "w-[41%] max-w-36"
              : "w-[43%] max-w-44",
          )}
        />

        <CarFront
          aria-hidden="true"
          strokeWidth={0.8}
          className={cn(
            "relative z-10 h-auto max-h-[58%] drop-shadow-[0_28px_30px_rgb(0_0_0_/_70%)] transition-transform duration-500 group-hover/visual:scale-[1.04]",
            compact
              ? "w-[38%] max-w-36"
              : "w-[42%] max-w-52",
          )}
        />
      </div>

      <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-current/45 to-transparent" />

      <div className="absolute right-5 bottom-4 text-[0.6rem] tracking-[0.22em] text-white/35 uppercase">
        {vehicle.exteriorColor}
      </div>
    </div>
  );
}