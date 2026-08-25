"use client";

import {
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  LoaderCircle,
  Save,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";


type AdminVehicleEditorProps = {
  vehicle: {
    id: string;
    price: number;
    description: string | null;
    location: string | null;
    status:
      | "IN_STOCK"
      | "INCOMING"
      | "IMPORTABLE"
      | "MARKETPLACE";
    featured: boolean;
    published: boolean;
  };
};


export function AdminVehicleEditor({
  vehicle,
}: AdminVehicleEditorProps) {

  const router =
    useRouter();


  const [
    loading,
    setLoading,
  ] =
    useState(false);


  const [
    price,
    setPrice,
  ] =
    useState(
      vehicle.price.toString(),
    );


  const [
    description,
    setDescription,
  ] =
    useState(
      vehicle.description ?? "",
    );


  const [
    location,
    setLocation,
  ] =
    useState(
      vehicle.location ?? "",
    );


  const [
    status,
    setStatus,
  ] =
    useState(
      vehicle.status,
    );


  const [
    featured,
    setFeatured,
  ] =
    useState(
      vehicle.featured,
    );


  const [
    published,
    setPublished,
  ] =
    useState(
      vehicle.published,
    );



  async function saveVehicle() {

    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/inventory/${vehicle.id}`,
          {
            method:
              "PATCH",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                price:
                  Number(price),

                description,

                location,

                status,

                featured,

                published,
              }),
          },
        );


      const result =
        await response.json();


      if (!response.ok) {

        toast.error(
          result.message ??
          "Unable to update vehicle.",
        );

        return;
      }


      toast.success(
        "Vehicle updated successfully.",
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
    <section className="rounded-2xl border border-border bg-card/70 p-6">

      <h2 className="text-lg font-semibold">
        Edit inventory details
      </h2>


      <div className="mt-6 grid gap-5">


        <label className="grid gap-2 text-sm">

          <span>
            Price (KES)
          </span>

          <input
            value={price}
            onChange={(event) =>
              setPrice(
                event.target.value,
              )
            }
            className="h-11 rounded-xl border border-border bg-background px-4"
          />

        </label>



        <label className="grid gap-2 text-sm">

          <span>
            Location
          </span>

          <input
            value={location}
            onChange={(event) =>
              setLocation(
                event.target.value,
              )
            }
            className="h-11 rounded-xl border border-border bg-background px-4"
          />

        </label>



        <label className="grid gap-2 text-sm">

          <span>
            Status
          </span>

          <select
            value={status}
            onChange={(event) =>
              setStatus(
                event.target.value as typeof status,
              )
            }
            className="h-11 rounded-xl border border-border bg-background px-4"
          >

            <option value="IN_STOCK">
              In stock
            </option>

            <option value="INCOMING">
              Incoming
            </option>

            <option value="IMPORTABLE">
              Importable
            </option>

            <option value="MARKETPLACE">
              Marketplace
            </option>

          </select>

        </label>



        <label className="grid gap-2 text-sm">

          <span>
            Description
          </span>

          <textarea
            value={description}
            onChange={(event) =>
              setDescription(
                event.target.value,
              )
            }
            rows={6}
            className="rounded-xl border border-border bg-background p-4"
          />

        </label>



        <label className="flex items-center gap-3 text-sm">

          <input
            type="checkbox"
            checked={featured}
            onChange={(event) =>
              setFeatured(
                event.target.checked,
              )
            }
          />

          Featured vehicle

        </label>



        <label className="flex items-center gap-3 text-sm">

          <input
            type="checkbox"
            checked={published}
            onChange={(event) =>
              setPublished(
                event.target.checked,
              )
            }
          />

          Published publicly

        </label>



        <Button
          disabled={loading}
          onClick={
            saveVehicle
          }
        >

          {loading ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}

          Save changes

        </Button>


      </div>

    </section>
  );
}