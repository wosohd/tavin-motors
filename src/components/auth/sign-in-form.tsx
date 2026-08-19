"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import {
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";
import { toast } from "sonner";

import { PasswordField } from "@/components/auth/password-field";
import { authClient } from "@/lib/auth-client";

type SignInFormProps = {
  callbackUrl: string;
};

export function SignInForm({
  callbackUrl,
}: SignInFormProps) {
  const [
    pending,
    setPending,
  ] = useState(false);

  const [
    rememberMe,
    setRememberMe,
  ] = useState(true);

  async function handleSubmit(
    event:
      React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form =
      new FormData(
        event.currentTarget,
      );

    const email =
      String(
        form.get("email") ?? "",
      ).trim();

    const password =
      String(
        form.get("password") ?? "",
      );

    setPending(true);

    try {
      const {
        error,
      } =
        await authClient.signIn.email({
          email,
          password,
          rememberMe,
          callbackURL:
            callbackUrl,
        });

      if (error) {
        toast.error(
          error.message ||
            "Unable to sign in.",
        );
        return;
      }

      toast.success(
        "Welcome back to Tavin Motors.",
      );

      window.location.assign(
        callbackUrl,
      );
    } catch {
      toast.error(
        "Something went wrong while signing in.",
      );
    } finally {
      setPending(false);
    }
  }

  const signUpHref =
    callbackUrl === "/dashboard"
      ? "/sign-up"
      : `/sign-up?callbackUrl=${encodeURIComponent(
          callbackUrl,
        )}`;

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
          Email address
        </label>

        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          className="h-12 w-full rounded-xl border border-border bg-background/75 px-4 text-sm outline-none transition placeholder:text-muted-foreground/65 focus:border-brand-burgundy/60 focus:ring-4 focus:ring-brand-burgundy/10 dark:focus:border-brand-gold/55 dark:focus:ring-brand-gold/10"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          Password
        </label>

        <PasswordField
          id="password"
          name="password"
          required
          minLength={8}
          maxLength={128}
          autoComplete="current-password"
          placeholder="Enter your password"
        />
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          checked={rememberMe}
          onChange={(event) =>
            setRememberMe(
              event.target.checked,
            )
          }
          className="size-4 accent-[#751e29]"
        />

        Keep me signed in
      </label>

      <button
        type="submit"
        disabled={pending}
        className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-burgundy px-5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-brand-gold dark:text-[#111318]"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Signing in...
          </>
        ) : (
          "Enter your garage"
        )}
      </button>

      <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/30 p-3 text-xs leading-5 text-muted-foreground">
        <LockKeyhole className="mt-0.5 size-4 shrink-0 text-brand-burgundy dark:text-brand-gold" />

        Your account is used for saved
        vehicles, enquiries, service bookings
        and import requests.
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New to Tavin Motors?{" "}
        <Link
          href={signUpHref}
          className="font-semibold text-brand-burgundy transition hover:underline dark:text-brand-gold"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}