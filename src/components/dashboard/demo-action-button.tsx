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
  type = "button",
  ...props
}: DemoActionButtonProps) {
  return (
    <Button
      {...props}
      type={type}
      onClick={(event) => {
        onClick?.(event);

        if (event.defaultPrevented) {
          return;
        }

        toast.success(confirmationTitle, {
          description: confirmationDescription,
        });
      }}
    />
  );
}