"use client";

import {
  useMemo,
  useState,
  type FormEvent,
} from "react";

import Link from "next/link";

import {
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";

import { PasswordField } from "@/components/auth/password-field";
import { authClient } from "@/lib/auth-client";

type SignUpFormProps = {
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

export function SignUpForm({
  callbackUrl,
}: SignUpFormProps) {
  const [
    pending,
    setPending,
  ] = useState(false);

  const [
    password,
    setPassword,
  ] = useState("");

  const strength = useMemo(
    () =>
      getPasswordScore(
        password,
      ),
    [password],
  );

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = new FormData(
      event.currentTarget,
    );

    const name = String(
      form.get("name") ?? "",
    ).trim();

    const email = String(
      form.get("email") ?? "",
    ).trim();

    const confirmPassword = String(
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

    setPending(true);

    try {
      const {
        error,
      } =
        await authClient.signUp.email({
          name,
          email,
          password,
          callbackURL:
            callbackUrl,
        });

      if (error) {
        toast.error(
          error.message ||
            "Unable to create your account.",
        );

        return;
      }

      toast.success(
        "Your Tavin Motors account is ready.",
      );

      window.location.assign(
        callbackUrl,
      );
    } catch {
      toast.error(
        "Something went wrong while creating your account.",
      );
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          Full name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          required
          minLength={2}
          autoComplete="name"
          placeholder="Your full name"
          className="h-12 w-full rounded-xl border border-border bg-background/75 px-4 text-sm outline-none transition placeholder:text-muted-foreground/65 focus:border-brand-burgundy/60 focus:ring-4 focus:ring-brand-burgundy/10 dark:focus:border-brand-gold/55 dark:focus:ring-brand-gold/10"
        />
      </div>

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
          required
          autoComplete="email"
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
          autoComplete="new-password"
          placeholder="Create a secure password"
          value={password}
          onChange={(event) =>
            setPassword(
              event.target.value,
            )
          }
        />

        {password.length > 0 && (
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
              uppercase letters, numbers,
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
          Confirm password
        </label>

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          required
          minLength={8}
          maxLength={128}
          autoComplete="new-password"
          placeholder="Repeat your password"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-burgundy px-5 text-sm font-semibold text-white shadow-lg transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-brand-gold dark:text-[#111318]"
      >
        {pending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create my Tavin account"
        )}
      </button>

      <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-muted/30 p-3 text-xs leading-5 text-muted-foreground">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-brand-burgundy dark:text-brand-gold" />

        One account gives you
        access to your personal
        vehicle activity and
        customer dashboard.
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={signInHref}
          className="font-semibold text-brand-burgundy transition hover:underline dark:text-brand-gold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}