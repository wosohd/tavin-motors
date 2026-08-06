"use client";

import { useSyncExternalStore } from "react";
import {
  Monitor,
  Moon,
  Sun,
  type LucideIcon,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const themeOptions = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
] as const satisfies ReadonlyArray<{
  value: "light" | "dark" | "system";
  label: string;
  icon: LucideIcon;
}>;

type ThemeMode = (typeof themeOptions)[number]["value"];

type ThemeToggleProps = {
  variant?: "icon" | "full";
  className?: string;
};

function subscribeToMount() {
  return () => undefined;
}

function useHasMounted() {
  return useSyncExternalStore(
    subscribeToMount,
    () => true,
    () => false,
  );
}

export function ThemeToggle({
  variant = "icon",
  className,
}: ThemeToggleProps) {
  const mounted = useHasMounted();
  const { theme, setTheme } = useTheme();

  const currentTheme: ThemeMode =
    theme === "light" ||
    theme === "dark" ||
    theme === "system"
      ? theme
      : "system";

  const currentIndex = themeOptions.findIndex(
    (option) => option.value === currentTheme,
  );

  const currentOption =
    themeOptions[currentIndex] ?? themeOptions[2];

  const nextOption =
    themeOptions[
      (currentIndex + 1) % themeOptions.length
    ] ?? themeOptions[0];

  if (!mounted) {
    if (variant === "full") {
      return (
        <div
          aria-label="Theme controls loading"
          className={cn(
            "grid grid-cols-3 gap-2 rounded-xl border border-border bg-card/60 p-1.5",
            className,
          )}
        >
          {themeOptions.map((option) => {
            const Icon = option.icon;

            return (
              <Button
                key={option.value}
                type="button"
                variant="ghost"
                size="sm"
                disabled
                className="gap-2"
              >
                <Icon
                  aria-hidden="true"
                  className="size-4"
                />
                {option.label}
              </Button>
            );
          })}
        </div>
      );
    }

    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        disabled
        aria-label="Theme control loading"
        className={cn(
          "border-border bg-card/70",
          className,
        )}
      >
        <Monitor
          aria-hidden="true"
          className="size-4"
        />
      </Button>
    );
  }

  if (variant === "full") {
    return (
      <div
        role="group"
        aria-label="Choose website theme"
        className={cn(
          "grid grid-cols-3 gap-2 rounded-xl border border-border bg-card/60 p-1.5",
          className,
        )}
      >
        {themeOptions.map((option) => {
          const Icon = option.icon;
          const active =
            option.value === currentTheme;

          return (
            <Button
              key={option.value}
              type="button"
              variant={
                active ? "outline" : "ghost"
              }
              size="sm"
              aria-pressed={active}
              onClick={() =>
                setTheme(option.value)
              }
              className={cn(
                "gap-2",
                active &&
                  "border-brand-gold/40 bg-brand-gold/10 text-foreground",
              )}
            >
              <Icon
                aria-hidden="true"
                className="size-4"
              />
              {option.label}
            </Button>
          );
        })}
      </div>
    );
  }

  const CurrentIcon = currentOption.icon;

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={`Current theme: ${currentOption.label}. Switch to ${nextOption.label}.`}
      title={`Theme: ${currentOption.label}`}
      onClick={() =>
        setTheme(nextOption.value)
      }
      className={cn(
        "border-border bg-card/70 text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <CurrentIcon
        aria-hidden="true"
        className="size-4"
      />
    </Button>
  );
}