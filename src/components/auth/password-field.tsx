"use client";

import {
  forwardRef,
  useState,
} from "react";

import {
  Eye,
  EyeOff,
} from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type PasswordFieldProps =
  Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "type"
  >;

export const PasswordField =
  forwardRef<
    HTMLInputElement,
    PasswordFieldProps
  >(function PasswordField(
    {
      className,
      ...props
    },
    ref,
  ) {
    const [
      visible,
      setVisible,
    ] = useState(false);

    return (
      <div className="relative">
        <input
          ref={ref}
          type={
            visible
              ? "text"
              : "password"
          }
          className={cn(
            "h-12 w-full rounded-xl border border-border bg-background/75 px-4 pr-12 text-sm text-foreground outline-none backdrop-blur-md transition",
            "placeholder:text-muted-foreground/65",
            "focus:border-brand-burgundy/60 focus:ring-4 focus:ring-brand-burgundy/10",
            "dark:focus:border-brand-gold/55 dark:focus:ring-brand-gold/10",
            className,
          )}
          {...props}
        />

        <button
          type="button"
          onClick={() => {
            setVisible(
              (current) =>
                !current,
            );
          }}
          aria-label={
            visible
              ? "Hide password"
              : "Show password"
          }
          title={
            visible
              ? "Hide password"
              : "Show password"
          }
          className="absolute inset-y-0 right-0 grid w-12 place-items-center text-muted-foreground transition hover:text-brand-burgundy dark:hover:text-brand-gold"
        >
          {visible ? (
            <motion.span
              className="grid place-items-center"
              animate={{
                scaleY: [
                  1,
                  1,
                  0.08,
                  1,
                  1,
                ],
              }}
              transition={{
                duration: 0.42,
                repeat: Infinity,
                repeatDelay: 1.55,
                ease: "easeInOut",
              }}
            >
              <Eye
                aria-hidden="true"
                className="size-5"
              />
            </motion.span>
          ) : (
            <EyeOff
              aria-hidden="true"
              className="size-5"
            />
          )}
        </button>
      </div>
    );
  });