import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type HomeSectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
  centered?: boolean;
  className?: string;
};

export function HomeSectionHeading({
  eyebrow,
  title,
  description,
  action,
  centered = false,
  className,
}: HomeSectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
        centered && "items-center text-center lg:flex-col lg:items-center",
        className,
      )}
    >
      <div
        className={cn(
          "max-w-3xl",
          centered && "mx-auto",
        )}
      >
        <p className="tm-eyebrow">{eyebrow}</p>

        <h2 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.04em] sm:text-4xl lg:text-5xl">
          {title}
        </h2>

        {description && (
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}