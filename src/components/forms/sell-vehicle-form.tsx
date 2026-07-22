"use client";

import {
  type ChangeEvent,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  Send,
  X,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  sellVehicleSchema,
  type SellVehicleValues,
} from "@/lib/validations/sell-vehicle";

type FieldErrorProps = {
  message?: string;
};

const inputClassName =
  "h-11 border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20";

const selectClassName =
  "h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10";

function FieldError({ message }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p
      role="alert"
      className="mt-1.5 text-xs text-red-400"
    >
      {message}
    </p>
  );
}

export function SellVehicleForm() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState("");
  const [imageInputKey, setImageInputKey] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<SellVehicleValues>({
    resolver: zodResolver(sellVehicleSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      make: "",
      model: "",
      trim: "",
      year: "",
      price: "",
      mileage: "",
      transmission: "",
      fuelType: "",
      bodyType: "",
      location: "",
      condition: "",
      ownership: "",
      exteriorColor: "",
      registration: "",
      description: "",
      negotiable: false,
      acceptTerms: false,
    },
  });

  function handleImagesChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const files = Array.from(
      event.currentTarget.files ?? [],
    );

    if (files.length > 8) {
      setSelectedImages([]);
      setImageError("Select a maximum of eight images.");
      event.currentTarget.value = "";
      return;
    }

    const unsupportedFile = files.find(
      (file) =>
        ![
          "image/jpeg",
          "image/png",
          "image/webp",
        ].includes(file.type),
    );

    if (unsupportedFile) {
      setSelectedImages([]);
      setImageError(
        "Only JPG, PNG and WebP images are supported.",
      );
      event.currentTarget.value = "";
      return;
    }

    const oversizedFile = files.find(
      (file) => file.size > 5 * 1024 * 1024,
    );

    if (oversizedFile) {
      setSelectedImages([]);
      setImageError(
        "Each selected image must be smaller than 5 MB.",
      );
      event.currentTarget.value = "";
      return;
    }

    setSelectedImages(files);

    if (files.length < 3) {
      setImageError(
        "Select at least three clear vehicle images.",
      );
      return;
    }

    setImageError("");
  }

  function clearImages() {
    setSelectedImages([]);
    setImageError("");

    // Remount the uncontrolled file input to clear its selection.
    setImageInputKey((currentKey) => currentKey + 1);
  }

  async function onSubmit(values: SellVehicleValues) {
    if (selectedImages.length < 3) {
      setImageError(
        "Select at least three clear vehicle images.",
      );
      return;
    }

    void values;
    void selectedImages;

    await new Promise((resolve) => {
      window.setTimeout(resolve, 900);
    });

    toast.success("Vehicle listing submitted", {
      description:
        "The listing has entered the demonstration moderation queue and is not yet publicly visible.",
    });

    reset();
    clearImages();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="tm-panel p-5 sm:p-7 lg:p-8"
    >
      <div className="border-b border-white/10 pb-6">
        <p className="tm-eyebrow">
          Marketplace submission
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Submit your vehicle for review
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Complete the vehicle and seller information below. The
          listing will remain pending until reviewed by the Tavin
          Motors administration team.
        </p>
      </div>

      <div className="mt-8">
        <p className="text-sm font-semibold">
          Seller information
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label>
            <span className="text-sm font-medium">
              Full name
            </span>

            <Input
              {...register("fullName")}
              placeholder="Your full name"
              autoComplete="name"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.fullName?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Phone number
            </span>

            <Input
              {...register("phone")}
              type="tel"
              placeholder="+254 7XX XXX XXX"
              autoComplete="tel"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.phone?.message} />
          </label>

          <label className="sm:col-span-2">
            <span className="text-sm font-medium">
              Email address
            </span>

            <span className="ml-2 text-xs text-muted-foreground">
              Optional
            </span>

            <Input
              {...register("email")}
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.email?.message} />
          </label>
        </div>
      </div>

      <div className="mt-9 border-t border-white/10 pt-8">
        <p className="text-sm font-semibold">
          Vehicle information
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label>
            <span className="text-sm font-medium">
              Make
            </span>

            <Input
              {...register("make")}
              placeholder="Toyota"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.make?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Model
            </span>

            <Input
              {...register("model")}
              placeholder="Harrier"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.model?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Trim or variant
            </span>

            <span className="ml-2 text-xs text-muted-foreground">
              Optional
            </span>

            <Input
              {...register("trim")}
              placeholder="Premium or specific variant"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.trim?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Year
            </span>

            <Input
              {...register("year")}
              type="number"
              min="1980"
              max={new Date().getFullYear() + 1}
              placeholder="2020"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.year?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Asking price in KES
            </span>

            <Input
              {...register("price")}
              type="number"
              min="1"
              placeholder="3500000"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.price?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Mileage in kilometres
            </span>

            <Input
              {...register("mileage")}
              type="number"
              min="0"
              placeholder="65000"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.mileage?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Transmission
            </span>

            <select
              {...register("transmission")}
              className={`mt-2 ${selectClassName}`}
            >
              <option value="" disabled>
                Select transmission
              </option>

              <option value="automatic">
                Automatic
              </option>

              <option value="manual">
                Manual
              </option>
            </select>

            <FieldError
              message={errors.transmission?.message}
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Fuel type
            </span>

            <select
              {...register("fuelType")}
              className={`mt-2 ${selectClassName}`}
            >
              <option value="" disabled>
                Select fuel type
              </option>

              <option value="petrol">
                Petrol
              </option>

              <option value="diesel">
                Diesel
              </option>

              <option value="hybrid">
                Hybrid
              </option>

              <option value="electric">
                Electric
              </option>
            </select>

            <FieldError message={errors.fuelType?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Body type
            </span>

            <select
              {...register("bodyType")}
              className={`mt-2 ${selectClassName}`}
            >
              <option value="" disabled>
                Select body type
              </option>

              <option value="suv">
                SUV
              </option>

              <option value="sedan">
                Sedan
              </option>

              <option value="hatchback">
                Hatchback
              </option>

              <option value="pickup">
                Pickup
              </option>

              <option value="coupe">
                Coupe
              </option>
            </select>

            <FieldError message={errors.bodyType?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Location
            </span>

            <Input
              {...register("location")}
              placeholder="Nairobi, Kenya"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError message={errors.location?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Vehicle condition
            </span>

            <select
              {...register("condition")}
              className={`mt-2 ${selectClassName}`}
            >
              <option value="" disabled>
                Select condition
              </option>

              <option value="locally-used">
                Locally Used
              </option>

              <option value="newly-imported">
                Newly Imported
              </option>

              <option value="brand-new">
                Brand New
              </option>
            </select>

            <FieldError message={errors.condition?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Ownership status
            </span>

            <select
              {...register("ownership")}
              className={`mt-2 ${selectClassName}`}
            >
              <option value="" disabled>
                Select ownership
              </option>

              <option value="first-owner">
                First Owner
              </option>

              <option value="second-owner">
                Second Owner
              </option>

              <option value="multiple-owners">
                Multiple Owners
              </option>
            </select>

            <FieldError message={errors.ownership?.message} />
          </label>

          <label>
            <span className="text-sm font-medium">
              Exterior colour
            </span>

            <Input
              {...register("exteriorColor")}
              placeholder="Pearl White"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={errors.exteriorColor?.message}
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Registration number
            </span>

            <span className="ml-2 text-xs text-muted-foreground">
              Optional
            </span>

            <Input
              {...register("registration")}
              placeholder="KXX 000X"
              className={`mt-2 uppercase ${inputClassName}`}
            />

            <FieldError
              message={errors.registration?.message}
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium">
            Vehicle description
          </span>

          <Textarea
            {...register("description")}
            rows={7}
            placeholder="Describe the vehicle condition, ownership history, service history, upgrades and any known issues..."
            className="mt-2 min-h-40 resize-y border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20"
          />

          <FieldError message={errors.description?.message} />
        </label>

        <label className="mt-5 flex items-start gap-3 border border-white/10 bg-white/[0.025] p-4">
          <input
            {...register("negotiable")}
            type="checkbox"
            className="mt-1 size-4 accent-[var(--brand-red)]"
          />

          <span>
            <span className="block text-sm font-medium">
              The asking price is negotiable
            </span>

            <span className="mt-1 block text-xs leading-6 text-muted-foreground">
              Buyers will see a negotiable-price indicator on the
              public listing.
            </span>
          </span>
        </label>
      </div>

      <div className="mt-9 border-t border-white/10 pt-8">
        <p className="text-sm font-semibold">
          Vehicle photographs
        </p>

        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          Select between three and eight JPG, PNG or WebP images.
          Each image must be smaller than 5 MB.
        </p>

        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center border border-dashed border-white/20 bg-black/20 px-6 py-10 text-center transition-colors hover:border-brand-gold/40 hover:bg-brand-gold/[0.025]">
          <ImagePlus className="size-8 text-brand-gold" />

          <span className="mt-4 text-sm font-medium">
            Select vehicle images
          </span>

          <span className="mt-2 text-xs text-muted-foreground">
            Exterior, interior, dashboard and engine-bay photos
          </span>

          <input
            key={imageInputKey}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImagesChange}
            className="sr-only"
          />
        </label>

        {imageError && (
          <p
            role="alert"
            className="mt-2 text-xs text-red-400"
          >
            {imageError}
          </p>
        )}

        {selectedImages.length > 0 && (
          <div className="mt-4 border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {selectedImages.length} images selected
              </p>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearImages}
                className="text-muted-foreground"
              >
                <X className="size-4" />
                Clear
              </Button>
            </div>

            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {selectedImages.map((file) => (
                <li
                  key={`${file.name}-${file.lastModified}`}
                  className="truncate text-xs text-muted-foreground"
                >
                  {file.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <label className="mt-8 flex items-start gap-3 border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
        <input
          {...register("acceptTerms")}
          type="checkbox"
          className="mt-1 size-4 accent-[var(--brand-red)]"
        />

        <span>
          <span className="block text-sm font-medium">
            Confirm listing information
          </span>

          <span className="mt-1 block text-xs leading-6 text-muted-foreground">
            I confirm that I am authorised to advertise this vehicle,
            the information is accurate and I accept the marketplace
            review and publication rules.
          </span>

          <FieldError message={errors.acceptTerms?.message} />
        </span>
      </label>

      <div className="mt-6 flex items-start gap-3 border border-white/10 bg-white/[0.025] p-4">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />

        <p className="text-xs leading-6 text-muted-foreground">
          This demonstration validates the listing locally. Images
          are not uploaded or permanently stored. Database,
          authentication, Cloudinary and admin moderation will be
          connected during the backend phase.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="mt-7 h-12 w-full bg-primary shadow-[0_0_28px_rgb(164_32_42_/_20%)] hover:bg-primary/90"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Submitting Listing
          </>
        ) : (
          <>
            <Send className="size-4" />
            Submit Vehicle for Review
          </>
        )}
      </Button>
    </form>
  );
}