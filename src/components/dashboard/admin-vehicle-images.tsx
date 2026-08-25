"use client";

import {
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  LoaderCircle,
  Trash2,
  Upload,
} from "lucide-react";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";


type VehicleImage = {
  id: string;
  url: string;
  publicId: string | null;
  isPrimary: boolean;
};


type AdminVehicleImagesProps = {
  vehicleId: string;
  images: VehicleImage[];
};


export function AdminVehicleImages({
  vehicleId,
  images,
}: AdminVehicleImagesProps) {

  const router =
    useRouter();


  const inputRef =
    useRef<HTMLInputElement>(
      null,
    );


  const [
    loading,
    setLoading,
  ] =
    useState(false);



  async function uploadImage(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {

    const file =
      event.target.files?.[0];


    if (!file) {
      return;
    }


    const formData =
      new FormData();


    formData.append(
      "image",
      file,
    );


    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/inventory/${vehicleId}/images`,
          {
            method:
              "POST",

            body:
              formData,
          },
        );


      const result =
        await response.json();


      if (!response.ok) {

        toast.error(
          result.message ??
          "Image upload failed.",
        );

        return;
      }


      toast.success(
        "Vehicle image uploaded.",
      );


      router.refresh();


    } catch {

      toast.error(
        "Unable to upload image.",
      );

    } finally {

      setLoading(false);

      if (inputRef.current) {
        inputRef.current.value =
          "";
      }

    }

  }



  async function deleteImage(
    imageId: string,
  ) {

    setLoading(true);


    try {

      const response =
        await fetch(
          `/api/admin/inventory/images/${imageId}`,
          {
            method:
              "DELETE",
          },
        );


      const result =
        await response.json();


      if (!response.ok) {

        toast.error(
          result.message ??
          "Unable to delete image.",
        );

        return;
      }


      toast.success(
        "Vehicle image deleted.",
      );


      router.refresh();


    } catch {

      toast.error(
        "Unable to delete image.",
      );

    } finally {

      setLoading(false);

    }

  }



  return (

    <section className="rounded-2xl border border-border bg-card/70 p-6">

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-lg font-semibold">
            Vehicle images
          </h2>


          <p className="mt-1 text-sm text-muted-foreground">
            Manage Cloudinary images attached to this vehicle.
          </p>

        </div>



        <>

          <input
            ref={
              inputRef
            }
            type="file"
            accept="image/*"
            onChange={
              uploadImage
            }
            className="hidden"
          />


          <Button
            disabled={
              loading
            }
            onClick={() =>
              inputRef.current?.click()
            }
          >

            {loading ? (
              <LoaderCircle className="size-4 animate-spin" />
            ) : (
              <Upload className="size-4" />
            )}

            Upload image

          </Button>

        </>

      </div>




      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">


        {images.length > 0 ? (

          images.map(
            (
              image,
            ) => (

              <div
                key={
                  image.id
                }
                className="overflow-hidden rounded-xl border border-border"
              >

                <img
                  src={
                    image.url
                  }
                  alt="Vehicle image"
                  className="h-48 w-full object-cover"
                />


                <div className="flex items-center justify-between gap-3 p-3">

                  {image.isPrimary && (
                    <span className="text-xs font-semibold text-brand-gold">
                      Primary
                    </span>
                  )}


                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={
                      loading
                    }
                    onClick={() =>
                      deleteImage(
                        image.id,
                      )
                    }
                  >

                    <Trash2 className="size-4" />

                    Delete

                  </Button>


                </div>

              </div>

            ),

          )

        ) : (

          <p className="text-sm text-muted-foreground">
            No images uploaded yet.
          </p>

        )}

      </div>


    </section>

  );
}