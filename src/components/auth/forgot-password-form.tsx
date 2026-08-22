"use client";

import {
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  Mail,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

type ForgotPasswordFormProps = {
  callbackUrl: string;
};

export function ForgotPasswordForm({
  callbackUrl,
}: ForgotPasswordFormProps) {
  const [
    pending,
    setPending,
  ] = useState(false);

  const [
    submitted,
    setSubmitted,
  ] = useState(false);

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData =
      new FormData(
        event.currentTarget,
      );

    const email =
      String(
        formData.get("email") ??
          "",
      ).trim();

    setPending(true);

    try {
      const resetUrl =
        new URL(
          "/reset-password",
          window.location.origin,
        );

      resetUrl.searchParams.set(
        "callbackUrl",
        callbackUrl,
      );

      await authClient
        .requestPasswordReset({
          email,
          redirectTo:
            resetUrl.toString(),
        });

      /*
       * Deliberately show the same
       * response regardless of whether
       * the address exists.
       */
      setSubmitted(true);
    } finally {
      setPending(false);
    }
  }

  const signInHref =
    callbackUrl === "/dashboard"
      ? "/sign-in"
      : `/sign-in?callbackUrl=${encodeURIComponent(
          callbackUrl,
        )}`;

  if (submitted) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-brand-gold/25 bg-brand-gold/5 p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-gold/10 text-brand-gold">
              <CheckCircle2 className="size-5" />
            </span>

            <div>
              <h2 className="font-semibold">
                Check your email
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                If an account exists for
                that email address, we have
                sent password-reset
                instructions.
              </p>
            </div>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          The reset link expires after
          one hour. Check your spam or
          junk folder if it does not
          arrive shortly.
        </p>

        <Link
          href={signInHref}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/70 text-sm font-semibold transition hover:bg-muted"
        >
          <ArrowLeft className="size-4" />
          Return to sign in
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium"
        >
          Account email
        </label>

        <div className="relative">
          <Mail className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-12 w-full rounded-xl border border-border bg-background/75 pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground/65 focus:border-brand-burgundy/60 focus:ring-4 focus:ring-brand-burgundy/10 dark:focus:border-brand-gold/55 dark:focus:ring-brand-gold/10"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-burgundy px-5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-brand-gold dark:text-[#111318]"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Sending reset link...
          </>
        ) : (
          "Send reset link"
        )}
      </button>

      <p className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <Link
          href={signInHref}
          className="font-semibold text-brand-burgundy hover:underline dark:text-brand-gold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}