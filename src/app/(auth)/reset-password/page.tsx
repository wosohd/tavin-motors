import {
  AuthShell,
} from "@/components/auth/auth-shell";
import {
  ResetPasswordForm,
} from "@/components/auth/reset-password-form";

type ResetPasswordPageProps = {
  searchParams: Promise<{
    token?: string | string[];
    error?: string | string[];
    callbackUrl?:
      | string
      | string[];
  }>;
};

function first(
  value:
    | string
    | string[]
    | undefined,
) {
  return Array.isArray(value)
    ? value[0]
    : value;
}

function resolveCallbackUrl(
  value:
    | string
    | string[]
    | undefined,
) {
  const candidate =
    first(value);

  if (
    candidate &&
    candidate.startsWith("/") &&
    !candidate.startsWith("//")
  ) {
    return candidate;
  }

  return "/";
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params =
    await searchParams;

  const token =
    first(params.token);

  const error =
    first(params.error);

  const callbackUrl =
    resolveCallbackUrl(
      params.callbackUrl,
    );

  return (
    <AuthShell
      eyebrow="Secure account recovery"
      title="Choose a new password."
      description="Create a new password for your Tavin Motors account."
    >
      <ResetPasswordForm
        token={token}
        invalidToken={
          Boolean(error)
        }
        callbackUrl={
          callbackUrl
        }
      />
    </AuthShell>
  );
}