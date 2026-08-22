"use client";

import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  AlertTriangle,
  CheckCircle2,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import {
  PasswordField,
} from "@/components/auth/password-field";
import { authClient } from "@/lib/auth-client";

type ResetPasswordFormProps = {
  token?: string;
  invalidToken: boolean;
  callbackUrl: string;
};

function getPasswordScore(
  password: string,
) {
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (/[A-Z]/.test(password)) {
    score += 1;
  }

  if (/[0-9]/.test(password)) {
    score += 1;
  }

  if (
    /[^A-Za-z0-9]/.test(password)
  ) {
    score += 1;
  }

  return score;
}

export function ResetPasswordForm({
  token,
  invalidToken,
  callbackUrl,
}: ResetPasswordFormProps) {
  const [
    password,
    setPassword,
  ] = useState("");

  const [
    pending,
    setPending,
  ] = useState(false);

  const [
    completed,
    setCompleted,
  ] = useState(false);

  const strength =
    useMemo(
      () =>
        getPasswordScore(
          password,
        ),
      [password],
    );

  const forgotPasswordHref =
    callbackUrl === "/dashboard"
      ? "/forgot-password"
      : `/forgot-password?callbackUrl=${encodeURIComponent(
          callbackUrl,
        )}`;

  const signInHref =
    callbackUrl === "/dashboard"
      ? "/sign-in?reset=success"
      : `/sign-in?reset=success&callbackUrl=${encodeURIComponent(
          callbackUrl,
        )}`;

  async function handleSubmit(
    event:
      FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!token) {
      return;
    }

    const form =
      new FormData(
        event.currentTarget,
      );

    const confirmPassword =
      String(
        form.get(
          "confirmPassword",
        ) ?? "",
      );

    if (
      password !==
      confirmPassword
    ) {
      toast.error(
        "Your passwords do not match.",
      );

      return;
    }

    if (strength < 2) {
      toast.error(
        "Please choose a stronger password.",
      );

      return;
    }

    setPending(true);

    try {
      const {
        error,
      } =
        await authClient
          .resetPassword({
            newPassword:
              password,
            token,
          });

      if (error) {
        toast.error(
          error.message ||
            "This reset link is invalid or has expired.",
        );

        return;
      }

      setCompleted(true);
    } catch {
      toast.error(
        "Unable to reset your password.",
      );
    } finally {
      setPending(false);
    }
  }

  if (
    invalidToken ||
    !token
  ) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" />

            <div>
              <h2 className="font-semibold">
                Reset link unavailable
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                This password-reset link
                is invalid, incomplete,
                or has expired.
              </p>
            </div>
          </div>
        </div>

        <Link
          href={forgotPasswordHref}
          className="flex h-12 items-center justify-center rounded-xl bg-brand-burgundy px-5 text-sm font-semibold text-white dark:bg-brand-gold dark:text-[#111318]"
        >
          Request a new reset link
        </Link>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-brand-gold/25 bg-brand-gold/5 p-5">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />

            <div>
              <h2 className="font-semibold">
                Password updated
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your password has been
                changed successfully.
                Sign in using your new
                password.
              </p>
            </div>
          </div>
        </div>

        <Link
          href={signInHref}
          className="flex h-12 items-center justify-center rounded-xl bg-brand-burgundy px-5 text-sm font-semibold text-white dark:bg-brand-gold dark:text-[#111318]"
        >
          Continue to sign in
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
          htmlFor="password"
          className="mb-2 block text-sm font-medium"
        >
          New password
        </label>

        <PasswordField
          id="password"
          name="password"
          required
          minLength={8}
          maxLength={128}
          autoComplete="new-password"
          placeholder="Create your new password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value,
            )
          }
        />

        {password && (
          <div className="mt-3">
            <div className="grid grid-cols-4 gap-1.5">
              {[
                1,
                2,
                3,
                4,
              ].map((level) => (
                <div
                  key={level}
                  className={`h-1 rounded-full transition ${
                    strength >= level
                      ? "bg-brand-burgundy dark:bg-brand-gold"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <p className="mt-2 text-xs text-muted-foreground">
              Use 8+ characters with
              uppercase letters, numbers
              and a symbol.
            </p>
          </div>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium"
        >
          Confirm new password
        </label>

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          maxLength={128}
          autoComplete="new-password"
          placeholder="Repeat your new password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-burgundy px-5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:opacity-60 dark:bg-brand-gold dark:text-[#111318]"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Updating password...
          </>
        ) : (
          "Set new password"
        )}
      </button>

      <div className="flex gap-2 rounded-xl border border-border/60 bg-muted/30 p-3 text-xs leading-5 text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-burgundy dark:text-brand-gold" />

        For your security, existing
        Tavin Motors sessions will be
        revoked after the password is
        reset.
      </div>
    </form>
  );
}