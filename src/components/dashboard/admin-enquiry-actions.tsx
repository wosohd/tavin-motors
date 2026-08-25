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
  MessageSquare,
  XCircle,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";


type Props = {
  enquiryId: string;
  currentStatus: string;
};


type Status =
  | "IN_PROGRESS"
  | "REPLIED"
  | "CLOSED";


export function AdminEnquiryActions({
  enquiryId,
}: Props) {

  const router =
    useRouter();


  const [
    loading,
    setLoading,
  ] =
    useState(false);



  async function updateStatus(
    status: Status,
  ) {

    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/enquiries/${enquiryId}`,
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
          "Unable to update enquiry.",
        );

        return;
      }


      toast.success(
        "Enquiry updated.",
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
    <div className="flex flex-wrap gap-3">

      <Button
        disabled={loading}
        onClick={() =>
          updateStatus(
            "IN_PROGRESS",
          )
        }
      >
        {
          loading
          ? <LoaderCircle className="size-4 animate-spin" />
          : <MessageSquare className="size-4" />
        }

        In progress
      </Button>


      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "REPLIED",
          )
        }
      >
        <CheckCircle2 className="size-4" />

        Mark replied
      </Button>


      <Button
        variant="outline"
        disabled={loading}
        onClick={() =>
          updateStatus(
            "CLOSED",
          )
        }
      >
        <XCircle className="size-4" />

        Close enquiry
      </Button>


    </div>
  );
}