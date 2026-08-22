import { AuthShell } from "@/components/auth/auth-shell";
import {
  ForgotPasswordForm,
} from "@/components/auth/forgot-password-form";

type ForgotPasswordPageProps = {
  searchParams: Promise<{
    callbackUrl?:
      | string
      | string[];
  }>;
};

function resolveCallbackUrl(
  value:
    | string
    | string[]
    | undefined,
) {
  const candidate =
    Array.isArray(value)
      ? value[0]
      : value;

  if (
    candidate &&
    candidate.startsWith("/") &&
    !candidate.startsWith("//")
  ) {
    return candidate;
  }

  return "/";
}

export default async function ForgotPasswordPage({
  searchParams,
}: ForgotPasswordPageProps) {
  const params =
    await searchParams;

  const callbackUrl =
    resolveCallbackUrl(
      params.callbackUrl,
    );

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Find your way back."
      description="Enter the email linked to your Tavin Motors account and we will send you a secure password-reset link."
    >
      <ForgotPasswordForm
        callbackUrl={
          callbackUrl
        }
      />
    </AuthShell>
  );
}