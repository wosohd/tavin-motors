"use client";

import {
  useEffect,
  useState,
} from "react";

import Link from "next/link";

import {
  LogIn,
  LogOut,
  UserRound,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  toast,
} from "sonner";

import {
  Button,
  buttonVariants,
} from "@/components/ui/button";

import {
  authClient,
} from "@/lib/auth-client";

import {
  cn,
} from "@/lib/utils";


export function AuthEntryActions() {

  const router =
    useRouter();


  const [
    mounted,
    setMounted,
  ] =
    useState(false);


  const [
    signingOut,
    setSigningOut,
  ] =
    useState(false);


  const {
    data: session,
    isPending,
  } =
    authClient.useSession();



  useEffect(() => {

    setMounted(true);

  }, []);



  async function handleSignOut() {

    if (signingOut) {
      return;
    }


    setSigningOut(true);


    try {

      await authClient.signOut();


      toast.success(
        "Signed out",
        {
          description:
            "You have been signed out of your Tavin Motors account.",
        },
      );


      router.refresh();


    } catch {

      toast.error(
        "Unable to sign out",
        {
          description:
            "Please try again.",
        },
      );


    } finally {

      setSigningOut(false);

    }

  }



  /*
   * Server and first client render
   * are identical.
   */
  if (
    !mounted ||
    isPending
  ) {

    return (

      <div
        className="h-11 w-28 animate-pulse rounded-full bg-muted/50"
        aria-hidden="true"
      />

    );

  }



  const callbackUrl =
    window.location.pathname +
    window.location.search +
    window.location.hash;



  if (session?.user) {

    return (

      <div className="flex items-center gap-2 sm:gap-3">

        <Link
          href="/dashboard"
          className="hidden items-center gap-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground sm:inline-flex"
        >

          <UserRound className="size-4" />

          Dashboard

        </Link>



        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={signingOut}
          onClick={handleSignOut}
          className="border-white/10 bg-white/5"
        >

          <LogOut className="size-4" />

          <span className="hidden sm:inline">

            {
              signingOut
                ? "Signing out"
                : "Sign out"
            }

          </span>

        </Button>


      </div>

    );

  }



  const encodedCallbackUrl =
    encodeURIComponent(
      callbackUrl,
    );


  return (

    <div className="flex items-center gap-2 sm:gap-3">

      <Link
        href={`/sign-in?callbackUrl=${encodedCallbackUrl}`}
        className="hidden items-center gap-2 text-xs font-semibold tracking-[0.12em] text-muted-foreground uppercase transition-colors hover:text-foreground sm:inline-flex"
      >

        <LogIn className="size-4" />

        Sign in

      </Link>



      <Link
        href={`/sign-up?callbackUrl=${encodedCallbackUrl}`}
        className={cn(
          buttonVariants({
            size:"sm",
          }),
          "bg-primary shadow-[0_0_22px_rgb(164_32_42_/_18%)] hover:bg-primary/90",
        )}
      >

        <UserRound className="size-4" />

        <span className="hidden sm:inline">
          Create Account
        </span>

        <span className="sm:hidden">
          Account
        </span>


      </Link>


    </div>

  );
}