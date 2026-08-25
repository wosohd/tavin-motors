"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  CalendarCheck,
  CheckCircle2,
  LoaderCircle,
  PlayCircle,
  XCircle,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";


type AdminServiceBookingActionsProps = {
  bookingId: string;
};


type BookingStatus =
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";


export function AdminServiceBookingActions({
  bookingId,
}: AdminServiceBookingActionsProps) {

  const router =
    useRouter();


  const [
    loading,
    setLoading,
  ] =
    useState(false);



  async function updateStatus(
    status: BookingStatus,
  ) {

    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/service-bookings/${bookingId}`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                status,
              }),
          },
        );


      const result =
        await response.json();


      if (!response.ok) {

        toast.error(
          result.message ??
          "Unable to update booking.",
        );

        return;
      }


      toast.success(
        "Service booking updated.",
      );


      router.refresh();


    } catch {

      toast.error(
        "Something went wrong while updating booking.",
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <div className="flex flex-wrap gap-3 border-t border-border pt-6">


      <Button
        disabled={loading}
        onClick={() =>
          updateStatus(
            "CONFIRMED",
          )
        }
      >

        {loading ? (
          <LoaderCircle className="size-4 animate-spin" />
        ) : (
          <CalendarCheck className="size-4" />
        )}

        Confirm booking

      </Button>



      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "IN_PROGRESS",
          )
        }
      >

        <PlayCircle className="size-4" />

        Start service

      </Button>



      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "COMPLETED",
          )
        }
      >

        <CheckCircle2 className="size-4" />

        Complete

      </Button>



      <Button
        variant="destructive"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "CANCELLED",
          )
        }
      >

        <XCircle className="size-4" />

        Cancel

      </Button>


    </div>

  );
}