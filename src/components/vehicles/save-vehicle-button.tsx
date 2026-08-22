"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Heart,
  LoaderCircle,
  LockKeyhole,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";

import {
  authClient,
} from "@/lib/auth-client";

import {
  cn,
} from "@/lib/utils";

type SaveVehicleButtonProps = {
  vehicleSlug: string;
  vehicleName?: string;
  className?: string;
};

type SavedVehicleResponse = {
  message?: string;
  saved?: boolean;
};

function getCurrentCallbackUrl() {
  if (
    typeof window ===
    "undefined"
  ) {
    return "/vehicles";
  }

  return (
    window.location.pathname +
    window.location.search +
    window.location.hash
  );
}

export function SaveVehicleButton({
  vehicleSlug,
  vehicleName = "Vehicle",
  className,
}: SaveVehicleButtonProps) {
  const router =
    useRouter();

  const {
    data: session,
    isPending: sessionPending,
  } =
    authClient.useSession();

  const [
    saved,
    setSaved,
  ] =
    useState(false);

  const [
    loadingStatus,
    setLoadingStatus,
  ] =
    useState(false);

  const [
    changing,
    setChanging,
  ] =
    useState(false);

  /*
   * Once an authenticated
   * session is available, ask
   * PostgreSQL whether this
   * particular vehicle is saved.
   */
  useEffect(() => {
    if (
      sessionPending ||
      !session?.user
    ) {
      return;
    }

    let cancelled =
      false;

    async function loadSavedState() {
      setLoadingStatus(
        true,
      );

      try {
        const response =
          await fetch(
            `/api/saved-vehicles?vehicleSlug=${encodeURIComponent(
              vehicleSlug,
            )}`,
            {
              method: "GET",

              cache:
                "no-store",
            },
          );

        if (
          !response.ok
        ) {
          return;
        }

        const result =
          (await response.json()) as SavedVehicleResponse;

        if (!cancelled) {
          setSaved(
            Boolean(
              result.saved,
            ),
          );
        }
      } catch {
        /*
         * Do not interrupt normal
         * vehicle browsing because
         * a save-status lookup
         * failed.
         */
      } finally {
        if (!cancelled) {
          setLoadingStatus(
            false,
          );
        }
      }
    }

    void loadSavedState();

    return () => {
      cancelled =
        true;
    };
  }, [
    session?.user,
    sessionPending,
    vehicleSlug,
  ]);

  async function handleSaveToggle() {
    /*
     * Guests may browse vehicles,
     * but saving is protected.
     */
    if (!session?.user) {
      const callbackUrl =
        getCurrentCallbackUrl();

      toast.info(
        "Tavin account required",
        {
          description:
            "Create an account or sign in to save this vehicle to your garage.",
        },
      );

      router.push(
        `/sign-up?callbackUrl=${encodeURIComponent(
          callbackUrl,
        )}`,
      );

      return;
    }

    if (changing) {
      return;
    }

    setChanging(
      true,
    );

    try {
      const response =
        await fetch(
          "/api/saved-vehicles",
          {
            method:
              saved
                ? "DELETE"
                : "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                vehicleSlug,
              }),
          },
        );

      const result =
        (await response
          .json()
          .catch(
            () =>
              null,
          )) as
          | SavedVehicleResponse
          | null;

      /*
       * The client session may
       * expire while a customer
       * remains on the page.
       *
       * The server-side 401 is
       * authoritative.
       */
      if (
        response.status ===
        401
      ) {
        const callbackUrl =
          getCurrentCallbackUrl();

        toast.info(
          "Please sign in again",
          {
            description:
              "Sign in to continue managing your saved vehicles.",
          },
        );

        router.push(
          `/sign-in?callbackUrl=${encodeURIComponent(
            callbackUrl,
          )}`,
        );

        return;
      }

      if (!response.ok) {
        toast.error(
          saved
            ? "Unable to remove vehicle"
            : "Unable to save vehicle",
          {
            description:
              result?.message ??
              "Please try again.",
          },
        );

        return;
      }

      const nextSavedState =
        Boolean(
          result?.saved,
        );

      setSaved(
        nextSavedState,
      );

      if (
        nextSavedState
      ) {
        toast.success(
          "Vehicle saved",
          {
            description:
              `${vehicleName} has been added to your Tavin Motors garage.`,
          },
        );
      } else {
        toast.success(
          "Vehicle removed",
          {
            description:
              `${vehicleName} has been removed from your saved vehicles.`,
          },
        );
      }

      /*
       * Useful once dashboard
       * server components begin
       * reading this data too.
       */
      router.refresh();
    } catch {
      toast.error(
        saved
          ? "Unable to remove vehicle"
          : "Unable to save vehicle",
        {
          description:
            "A connection error occurred. Please try again.",
        },
      );
    } finally {
      setChanging(
        false,
      );
    }
  }

  const busy =
    sessionPending ||
    loadingStatus ||
    changing;

  return (
    <Button
      type="button"
      variant={
        saved
          ? "outline"
          : "default"
      }
      size="lg"
      disabled={
        busy
      }
      onClick={
        handleSaveToggle
      }
      className={cn(
        "min-h-11",

        saved &&
          "border-brand-burgundy/35 bg-brand-burgundy/5 text-brand-burgundy hover:bg-brand-burgundy/10 dark:border-brand-gold/30 dark:text-brand-gold dark:hover:bg-brand-gold/5",

        className,
      )}
    >
      {busy ? (
        <>
          <LoaderCircle
            aria-hidden="true"
            className="size-4 animate-spin"
          />

          {changing
            ? saved
              ? "Removing"
              : "Saving"
            : "Checking"}
        </>
      ) : !session?.user ? (
        <>
          <LockKeyhole
            aria-hidden="true"
            className="size-4"
          />

          Save Vehicle
        </>
      ) : (
        <>
          <Heart
            aria-hidden="true"
            className={cn(
              "size-4",

              saved &&
                "fill-current",
            )}
          />

          {saved
            ? "Saved"
            : "Save Vehicle"}
        </>
      )}
    </Button>
  );
}