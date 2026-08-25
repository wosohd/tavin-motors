"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  CheckCircle2,
  LoaderCircle,
  Package,
  Search,
  Ship,
  Truck,
  XCircle,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";


type AdminImportActionsProps = {
  requestId: string;
};


type ImportStatus =
  | "REVIEWING"
  | "SOURCING"
  | "QUOTED"
  | "APPROVED"
  | "PURCHASED"
  | "SHIPPING"
  | "CLEARING"
  | "READY_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED";


export function AdminImportActions({
  requestId,
}: AdminImportActionsProps) {

  const router =
    useRouter();


  const [
    loading,
    setLoading,
  ] =
    useState(false);



  async function updateStatus(
    status: ImportStatus,
  ) {

    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/imports/${requestId}`,
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
          "Unable to update import request.",
        );

        return;
      }


      toast.success(
        "Import request updated.",
      );


      router.refresh();


    } catch {

      toast.error(
        "Something went wrong.",
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
            "REVIEWING",
          )
        }
      >
        {
          loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )
        }

        Start review
      </Button>


      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "SOURCING",
          )
        }
      >
        <Package className="size-4" />

        Start sourcing
      </Button>


      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "SHIPPING",
          )
        }
      >
        <Ship className="size-4" />

        Shipping
      </Button>


      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "DELIVERED",
          )
        }
      >
        <Truck className="size-4" />

        Delivered
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