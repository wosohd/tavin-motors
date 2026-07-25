"use client";

import type { ComponentProps } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

type DemoActionButtonProps = ComponentProps<typeof Button> & {
  confirmationTitle?: string;
  confirmationDescription?: string;
};

export function DemoActionButton({
  confirmationTitle = "Demo action recorded",
  confirmationDescription =
    "No information was permanently changed because this dashboard is using mock data.",
  onClick,
  ...props
}: DemoActionButtonProps) {
  return (
    <Button
      {...props}
      onClick={(event) => {
        onClick?.(event);

        if (!event.defaultPrevented) {
          toast.success(confirmationTitle, {
            description: confirmationDescription,
          });
        }
      }}
    />
  );
}