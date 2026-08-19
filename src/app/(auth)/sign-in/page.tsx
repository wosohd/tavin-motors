import { AuthShell } from "@/components/auth/auth-shell";
import { SignInForm } from "@/components/auth/sign-in-form";

type SignInPageProps = {
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

  return "/dashboard";
}

export default async function SignInPage({
  searchParams,
}: SignInPageProps) {
  const params =
    await searchParams;

  const callbackUrl =
    resolveCallbackUrl(
      params.callbackUrl,
    );

  return (
    <AuthShell
      eyebrow="Private garage access"
      title="Welcome back."
      description="Sign in to continue your Tavin Motors journey."
    >
      <SignInForm
        callbackUrl={
          callbackUrl
        }
      />
    </AuthShell>
  );
}