"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  Check,
  LoaderCircle,
  MessageSquareWarning,
  X,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Textarea,
} from "@/components/ui/textarea";


type AdminMarketplaceActionsProps = {
  listingId: string;
};


type ActionStatus =
  | "APPROVED"
  | "REJECTED"
  | "CHANGES_REQUESTED";


export function AdminMarketplaceActions({
  listingId,
}: AdminMarketplaceActionsProps) {

  const router =
    useRouter();


  const [
    open,
    setOpen,
  ] =
    useState(false);


  const [
    action,
    setAction,
  ] =
    useState<ActionStatus | null>(
      null,
    );


  const [
    note,
    setNote,
  ] =
    useState("");


  const [
    loading,
    setLoading,
  ] =
    useState(false);



  async function updateListing(
    status: ActionStatus,
  ) {

    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/marketplace/${listingId}`,
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

                moderationNote:
                  note,
              }),
          },
        );


      const result =
        await response.json();


      if (!response.ok) {

        toast.error(
          result.message ??
            "Unable to update listing.",
        );

        return;
      }


      toast.success(
        "Marketplace listing updated.",
      );


      setOpen(false);

      setNote("");

      setAction(null);


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
    <>
      <div className="flex flex-wrap gap-3">

        <Button
          onClick={() =>
            updateListing(
              "APPROVED",
            )
          }
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Check className="size-4" />
          Approve
        </Button>


        <Button
          variant="outline"
          onClick={() => {
            setAction(
              "CHANGES_REQUESTED",
            );

            setOpen(true);
          }}
        >
          <MessageSquareWarning className="size-4" />
          Request Changes
        </Button>


        <Button
          variant="destructive"
          onClick={() => {
            setAction(
              "REJECTED",
            );

            setOpen(true);
          }}
        >
          <X className="size-4" />
          Reject
        </Button>

      </div>


      <Dialog
        open={open}
        onOpenChange={
          setOpen
        }
      >

        <DialogContent>

          <DialogHeader>

            <DialogTitle>
              {action ===
              "REJECTED"
                ? "Reject listing"
                : "Request changes"}
            </DialogTitle>


            <DialogDescription>
              Provide a reason so the seller understands what needs to be corrected.
            </DialogDescription>

          </DialogHeader>


          <Textarea
            value={note}
            onChange={(event) =>
              setNote(
                event.target.value,
              )
            }
            placeholder="Explain the required changes..."
            rows={5}
          />


          <DialogFooter>

            <Button
              variant="outline"
              onClick={() =>
                setOpen(false)
              }
            >
              Cancel
            </Button>


            <Button
              disabled={
                loading ||
                note.trim()
                  .length === 0
              }
              onClick={() =>
                action &&
                updateListing(
                  action,
                )
              }
            >

              {loading ? (
                <LoaderCircle className="size-4 animate-spin" />
              ) : null}

              Confirm

            </Button>

          </DialogFooter>

        </DialogContent>

      </Dialog>
    </>
  );
}