"use client";

import {
  HeartOff,
  LoaderCircle,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useState,
} from "react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";

type RemoveSavedVehicleButtonProps = {
  vehicleSlug: string;
  vehicleName: string;
};

type SavedVehicleResponse = {
  message?: string;
  saved?: boolean;
};

export function RemoveSavedVehicleButton({
  vehicleSlug,
  vehicleName,
}: RemoveSavedVehicleButtonProps) {
  const router =
    useRouter();

  const [
    removing,
    setRemoving,
  ] =
    useState(false);

  async function handleRemove() {
    if (removing) {
      return;
    }

    setRemoving(true);

    try {
      const response =
        await fetch(
          "/api/saved-vehicles",
          {
            method:
              "DELETE",

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

      if (
        response.status ===
        401
      ) {
        toast.error(
          "Session expired",
          {
            description:
              "Please sign in again to manage your saved vehicles.",
          },
        );

        router.push(
          `/sign-in?callbackUrl=${encodeURIComponent(
            "/dashboard/saved-vehicles",
          )}`,
        );

        return;
      }

      if (!response.ok) {
        toast.error(
          "Unable to remove vehicle",
          {
            description:
              result?.message ??
              "Please try again.",
          },
        );

        return;
      }

      toast.success(
        "Vehicle removed",
        {
          description:
            `${vehicleName} has been removed from your saved vehicles.`,
        },
      );

      /*
       * The dashboard page is a
       * Server Component reading
       * PostgreSQL directly.
       *
       * Refreshing causes the new
       * saved collection to be
       * rendered immediately.
       */
      router.refresh();
    } catch {
      toast.error(
        "Unable to remove vehicle",
        {
          description:
            "A connection error occurred. Please try again.",
        },
      );
    } finally {
      setRemoving(false);
    }
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={removing}
      onClick={handleRemove}
      className="border-white/10 bg-white/5"
    >
      {removing ? (
        <>
          <LoaderCircle
            aria-hidden="true"
            className="size-4 animate-spin"
          />

          Removing
        </>
      ) : (
        <>
          <HeartOff
            aria-hidden="true"
            className="size-4"
          />

          Remove
        </>
      )}
    </Button>
  );
}