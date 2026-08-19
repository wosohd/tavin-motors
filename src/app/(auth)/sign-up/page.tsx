import { AuthShell } from "@/components/auth/auth-shell";
import { SignUpForm } from "@/components/auth/sign-up-form";

type SignUpPageProps = {
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

export default async function SignUpPage({
  searchParams,
}: SignUpPageProps) {
  const params =
    await searchParams;

  const callbackUrl =
    resolveCallbackUrl(
      params.callbackUrl,
    );

  return (
    <AuthShell
      eyebrow="Join Tavin Motors"
      title="Build your garage."
      description="Create an account to save vehicles, make requests and manage your Tavin Motors activity."
    >
      <SignUpForm
        callbackUrl={
          callbackUrl
        }
      />
    </AuthShell>
  );
}