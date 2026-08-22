"use client";

import {
  type ChangeEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  CheckCircle2,
  ImagePlus,
  LoaderCircle,
  LockKeyhole,
  Send,
  X,
} from "lucide-react";

import {
  useForm,
} from "react-hook-form";

import {
  toast,
} from "sonner";

import {
  Button,
} from "@/components/ui/button";

import {
  Input,
} from "@/components/ui/input";

import {
  Textarea,
} from "@/components/ui/textarea";

import {
  authClient,
} from "@/lib/auth-client";

import {
  sellVehicleSchema,
  type SellVehicleValues,
} from "@/lib/validations/sell-vehicle";

type FieldErrorProps = {
  message?: string;
};

type MarketplaceListingSubmissionResponse = {
  message?: string;

  listing?: {
    referenceCode: string | null;
    slug: string;
    status: string;
  };
};

const inputClassName =
  "h-11 border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20";

const selectClassName =
  "h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10";

const sellVehicleDraftKey =
  "tavin-marketplace-sell-draft";

function FieldError({
  message,
}: FieldErrorProps) {
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

function getSellVehicleCallbackUrl() {
  if (
    typeof window ===
    "undefined"
  ) {
    return "/marketplace/sell#sell-vehicle";
  }

  return (
    window.location.pathname +
    window.location.search +
    "#sell-vehicle"
  );
}

export function SellVehicleForm() {
  const router =
    useRouter();

  const {
    data: session,
    isPending: sessionPending,
  } =
    authClient.useSession();

  const [
    selectedImages,
    setSelectedImages,
  ] =
    useState<File[]>([]);

  const [
    imageError,
    setImageError,
  ] =
    useState("");

  const [
    imageInputKey,
    setImageInputKey,
  ] =
    useState(0);

  /*
   * Prevent the saved draft from
   * being restored more than once.
   *
   * This avoids overwriting edits
   * if the authentication session
   * finishes resolving while the
   * customer is already typing.
   */
  const hasRestoredDraftRef =
    useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<SellVehicleValues>({
      resolver:
        zodResolver(
          sellVehicleSchema,
        ),

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

  /*
   * Restore serialisable listing
   * information after the customer
   * returns from sign-up/sign-in.
   *
   * Browsers do not allow File
   * objects to be restored into a
   * file input, so photographs must
   * be selected again.
   */
  useEffect(() => {
    if (
      typeof window ===
        "undefined" ||
      hasRestoredDraftRef.current
    ) {
      return;
    }

    hasRestoredDraftRef.current =
      true;

    const storedDraft =
      window.sessionStorage.getItem(
        sellVehicleDraftKey,
      );

    if (!storedDraft) {
      return;
    }

    try {
      const draft =
        JSON.parse(
          storedDraft,
        ) as SellVehicleValues;

      reset(draft);
    } catch {
      window.sessionStorage.removeItem(
        sellVehicleDraftKey,
      );
    }
  }, [reset]);

  function handleImagesChange(
    event:
      ChangeEvent<HTMLInputElement>,
  ) {
    const files =
      Array.from(
        event.currentTarget
          .files ?? [],
      );

    if (
      files.length >
      8
    ) {
      setSelectedImages(
        [],
      );

      setImageError(
        "Select a maximum of eight images.",
      );

      event.currentTarget.value =
        "";

      return;
    }

    const unsupportedFile =
      files.find(
        (file) =>
          ![
            "image/jpeg",
            "image/png",
            "image/webp",
          ].includes(
            file.type,
          ),
      );

    if (unsupportedFile) {
      setSelectedImages(
        [],
      );

      setImageError(
        "Only JPG, PNG and WebP images are supported.",
      );

      event.currentTarget.value =
        "";

      return;
    }

    const oversizedFile =
      files.find(
        (file) =>
          file.size >
          5 *
            1024 *
            1024,
      );

    if (oversizedFile) {
      setSelectedImages(
        [],
      );

      setImageError(
        "Each selected image must be smaller than 5 MB.",
      );

      event.currentTarget.value =
        "";

      return;
    }

    setSelectedImages(
      files,
    );

    if (
      files.length <
      3
    ) {
      setImageError(
        "Select at least three clear vehicle images.",
      );

      return;
    }

    setImageError("");
  }

  function clearImages() {
    setSelectedImages(
      [],
    );

    setImageError("");

    /*
     * Remount the uncontrolled
     * file input to clear its
     * browser-managed selection.
     */
    setImageInputKey(
      (
        currentKey,
      ) =>
        currentKey +
        1,
    );
  }

  async function onSubmit(
    values:
      SellVehicleValues,
  ) {
    /*
     * Allow a guest to complete
     * and validate the textual
     * listing before authentication.
     *
     * Save the serialisable fields
     * before checking photographs,
     * because selected File objects
     * cannot survive navigation.
     */
    if (
      !session?.user
    ) {
      window.sessionStorage.setItem(
        sellVehicleDraftKey,
        JSON.stringify(
          values,
        ),
      );

      const callbackUrl =
        getSellVehicleCallbackUrl();

      toast.info(
        "Tavin account required",
        {
          description:
            selectedImages.length >
            0
              ? "Your listing details have been preserved. Create an account or sign in to continue. You will need to reselect the photographs when you return."
              : "Your listing details have been preserved. Create an account or sign in to continue.",
        },
      );

      router.push(
        `/sign-up?callbackUrl=${encodeURIComponent(
          callbackUrl,
        )}`,
      );

      return;
    }

    /*
     * Photographs are required for
     * a genuine marketplace
     * submission.
     */
    if (
      selectedImages.length <
      3
    ) {
      setImageError(
        "Select at least three clear vehicle images.",
      );

      return;
    }

    if (
      selectedImages.length >
      8
    ) {
      setImageError(
        "Select a maximum of eight images.",
      );

      return;
    }

    setImageError("");

    try {
      /*
       * Marketplace submissions
       * contain both ordinary form
       * fields and binary image
       * files, so this request uses
       * multipart FormData.
       */
      const formData =
        new FormData();

      Object.entries(
        values,
      ).forEach(
        ([
          key,
          value,
        ]) => {
          formData.append(
            key,
            String(
              value,
            ),
          );
        },
      );

      selectedImages.forEach(
        (file) => {
          formData.append(
            "images",
            file,
          );
        },
      );

      /*
       * Do not manually provide a
       * Content-Type header here.
       *
       * The browser must create the
       * multipart boundary.
       */
      const response =
        await fetch(
          "/api/marketplace-listings",
          {
            method:
              "POST",

            body:
              formData,
          },
        );

      const result =
        (await response
          .json()
          .catch(
            () =>
              null,
          )) as
          | MarketplaceListingSubmissionResponse
          | null;

      /*
       * The browser may have shown
       * an authenticated session
       * which expired before the
       * request reached the server.
       *
       * The API's 401 is therefore
       * authoritative.
       */
      if (
        response.status ===
        401
      ) {
        window.sessionStorage.setItem(
          sellVehicleDraftKey,
          JSON.stringify(
            values,
          ),
        );

        const callbackUrl =
          getSellVehicleCallbackUrl();

        toast.info(
          "Please sign in again",
          {
            description:
              "Your listing information has been preserved. You will need to reselect the photographs after signing in.",
          },
        );

        router.push(
          `/sign-in?callbackUrl=${encodeURIComponent(
            callbackUrl,
          )}`,
        );

        return;
      }

      if (
        !response.ok
      ) {
        toast.error(
          "Unable to submit listing",
          {
            description:
              result?.message ??
              "Please check the listing information and try again.",
          },
        );

        return;
      }

      /*
       * PostgreSQL has confirmed
       * the listing and the API has
       * confirmed the associated
       * image records.
       *
       * It is now safe to remove
       * the authentication draft.
       */
      window.sessionStorage.removeItem(
        sellVehicleDraftKey,
      );

      const referenceCode =
        result?.listing
          ?.referenceCode;

      toast.success(
        "Vehicle listing submitted",
        {
          description:
            referenceCode
              ? `Reference ${referenceCode}. Your listing and photographs have been received and are awaiting Tavin Motors review.`
              : "Your listing and photographs have been received and are awaiting Tavin Motors review.",
        },
      );

      reset();

      clearImages();
    } catch {
      /*
       * Leave the form and selected
       * photographs untouched when
       * the network request fails.
       */
      toast.error(
        "Unable to submit listing",
        {
          description:
            "A connection error occurred. Your form has not been cleared, so you can try again.",
        },
      );
    }
  }

  return (
    <form
      id="sell-vehicle"
      onSubmit={
        handleSubmit(
          onSubmit,
        )
      }
      noValidate
      className="tm-panel scroll-mt-28 p-5 sm:p-7 lg:p-8"
    >
      <div className="border-b border-white/10 pb-6">
        <p className="tm-eyebrow">
          Marketplace submission
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Submit your vehicle
          for review
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Complete the vehicle
          and seller information
          below. The listing will
          remain pending until
          reviewed by the Tavin
          Motors administration
          team. An authenticated
          Tavin account is required
          before the vehicle can be
          submitted.
        </p>
      </div>

      {!sessionPending &&
        !session?.user && (
          <div className="mt-6 border border-brand-gold/25 bg-brand-gold/[0.05] p-4">
            <div className="flex items-start gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-gold/10 text-brand-gold">
                <LockKeyhole
                  aria-hidden="true"
                  className="size-4"
                />
              </span>

              <div>
                <p className="text-sm font-semibold text-foreground">
                  Account required
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Complete your
                  vehicle details
                  now. We will
                  preserve the
                  information while
                  you create an
                  account or sign
                  in, then return
                  you directly to
                  this form. Vehicle
                  photographs must
                  be reselected
                  after
                  authentication.
                </p>
              </div>
            </div>
          </div>
        )}

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
              {...register(
                "fullName",
              )}
              placeholder="Your full name"
              autoComplete="name"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.fullName
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Phone number
            </span>

            <Input
              {...register(
                "phone",
              )}
              type="tel"
              placeholder="+254 7XX XXX XXX"
              autoComplete="tel"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.phone
                  ?.message
              }
            />
          </label>

          <label className="sm:col-span-2">
            <span className="text-sm font-medium">
              Email address
            </span>

            <span className="ml-2 text-xs text-muted-foreground">
              Optional
            </span>

            <Input
              {...register(
                "email",
              )}
              type="email"
              placeholder="name@example.com"
              autoComplete="email"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.email
                  ?.message
              }
            />
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
              {...register(
                "make",
              )}
              placeholder="Toyota"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.make
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Model
            </span>

            <Input
              {...register(
                "model",
              )}
              placeholder="Harrier"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.model
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Trim or variant
            </span>

            <span className="ml-2 text-xs text-muted-foreground">
              Optional
            </span>

            <Input
              {...register(
                "trim",
              )}
              placeholder="Premium or specific variant"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.trim
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Year
            </span>

            <Input
              {...register(
                "year",
              )}
              type="number"
              min="1980"
              max={
                new Date()
                  .getFullYear() +
                1
              }
              placeholder="2020"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.year
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Asking price in
              KES
            </span>

            <Input
              {...register(
                "price",
              )}
              type="number"
              min="1"
              placeholder="3500000"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.price
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Mileage in
              kilometres
            </span>

            <Input
              {...register(
                "mileage",
              )}
              type="number"
              min="0"
              placeholder="65000"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.mileage
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Transmission
            </span>

            <select
              {...register(
                "transmission",
              )}
              className={`mt-2 ${selectClassName}`}
            >
              <option
                value=""
                disabled
              >
                Select
                transmission
              </option>

              <option value="automatic">
                Automatic
              </option>

              <option value="manual">
                Manual
              </option>
            </select>

            <FieldError
              message={
                errors.transmission
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Fuel type
            </span>

            <select
              {...register(
                "fuelType",
              )}
              className={`mt-2 ${selectClassName}`}
            >
              <option
                value=""
                disabled
              >
                Select fuel
                type
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

            <FieldError
              message={
                errors.fuelType
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Body type
            </span>

            <select
              {...register(
                "bodyType",
              )}
              className={`mt-2 ${selectClassName}`}
            >
              <option
                value=""
                disabled
              >
                Select body
                type
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

            <FieldError
              message={
                errors.bodyType
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Location
            </span>

            <Input
              {...register(
                "location",
              )}
              placeholder="Nairobi, Kenya"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.location
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Vehicle condition
            </span>

            <select
              {...register(
                "condition",
              )}
              className={`mt-2 ${selectClassName}`}
            >
              <option
                value=""
                disabled
              >
                Select
                condition
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

            <FieldError
              message={
                errors.condition
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Ownership status
            </span>

            <select
              {...register(
                "ownership",
              )}
              className={`mt-2 ${selectClassName}`}
            >
              <option
                value=""
                disabled
              >
                Select
                ownership
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

            <FieldError
              message={
                errors.ownership
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Exterior colour
            </span>

            <Input
              {...register(
                "exteriorColor",
              )}
              placeholder="Pearl White"
              className={`mt-2 ${inputClassName}`}
            />

            <FieldError
              message={
                errors.exteriorColor
                  ?.message
              }
            />
          </label>

          <label>
            <span className="text-sm font-medium">
              Registration
              number
            </span>

            <span className="ml-2 text-xs text-muted-foreground">
              Optional
            </span>

            <Input
              {...register(
                "registration",
              )}
              placeholder="KXX 000X"
              className={`mt-2 uppercase ${inputClassName}`}
            />

            <FieldError
              message={
                errors.registration
                  ?.message
              }
            />
          </label>
        </div>

        <label className="mt-5 block">
          <span className="text-sm font-medium">
            Vehicle description
          </span>

          <Textarea
            {...register(
              "description",
            )}
            rows={7}
            placeholder="Describe the vehicle condition, ownership history, service history, upgrades and any known issues..."
            className="mt-2 min-h-40 resize-y border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20"
          />

          <FieldError
            message={
              errors.description
                ?.message
            }
          />
        </label>

        <label className="mt-5 flex items-start gap-3 border border-white/10 bg-white/[0.025] p-4">
          <input
            {...register(
              "negotiable",
            )}
            type="checkbox"
            className="mt-1 size-4 accent-[var(--brand-red)]"
          />

          <span>
            <span className="block text-sm font-medium">
              The asking price
              is negotiable
            </span>

            <span className="mt-1 block text-xs leading-6 text-muted-foreground">
              Buyers will see a
              negotiable-price
              indicator on the
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
          Select between three
          and eight JPG, PNG or
          WebP images. Each image
          must be smaller than
          5 MB.
        </p>

        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center border border-dashed border-white/20 bg-black/20 px-6 py-10 text-center transition-colors hover:border-brand-gold/40 hover:bg-brand-gold/[0.025]">
          <ImagePlus className="size-8 text-brand-gold" />

          <span className="mt-4 text-sm font-medium">
            Select vehicle
            images
          </span>

          <span className="mt-2 text-xs text-muted-foreground">
            Exterior, interior,
            dashboard and
            engine-bay photos
          </span>

          <input
            key={
              imageInputKey
            }
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={
              handleImagesChange
            }
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

        {selectedImages.length >
          0 && (
          <div className="mt-4 border border-white/10 bg-white/[0.025] p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">
                {
                  selectedImages.length
                }{" "}
                images selected
              </p>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={
                  clearImages
                }
                className="text-muted-foreground"
              >
                <X className="size-4" />
                Clear
              </Button>
            </div>

            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              {selectedImages.map(
                (
                  file,
                ) => (
                  <li
                    key={`${file.name}-${file.lastModified}`}
                    className="truncate text-xs text-muted-foreground"
                  >
                    {
                      file.name
                    }
                  </li>
                ),
              )}
            </ul>
          </div>
        )}
      </div>

      <label className="mt-8 flex items-start gap-3 border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
        <input
          {...register(
            "acceptTerms",
          )}
          type="checkbox"
          className="mt-1 size-4 accent-[var(--brand-red)]"
        />

        <span>
          <span className="block text-sm font-medium">
            Confirm listing
            information
          </span>

          <span className="mt-1 block text-xs leading-6 text-muted-foreground">
            I confirm that I am
            authorised to advertise
            this vehicle, the
            information is accurate
            and I accept the
            marketplace review and
            publication rules.
          </span>

          <FieldError
            message={
              errors.acceptTerms
                ?.message
            }
          />
        </span>
      </label>

      <div className="mt-6 flex items-start gap-3 border border-white/10 bg-white/[0.025] p-4">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />

        <p className="text-xs leading-6 text-muted-foreground">
          Marketplace
          submissions are securely
          linked to your
          authenticated Tavin
          Motors account. Vehicle
          photographs are stored
          securely and the listing
          remains pending until
          reviewed by the Tavin
          Motors administration
          team.
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={
          isSubmitting ||
          sessionPending
        }
        className="mt-7 h-12 w-full bg-primary shadow-[0_0_28px_rgb(164_32_42_/_20%)] hover:bg-primary/90"
      >
        {sessionPending ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />
            Checking Account
          </>
        ) : isSubmitting ? (
          <>
            <LoaderCircle className="size-4 animate-spin" />

            {session?.user
              ? "Uploading Listing"
              : "Preparing Sign In"}
          </>
        ) : (
          <>
            {session?.user ? (
              <Send className="size-4" />
            ) : (
              <LockKeyhole className="size-4" />
            )}

            {session?.user
              ? "Submit Vehicle for Review"
              : "Continue to Submit Vehicle"}
          </>
        )}
      </Button>
    </form>
  );
}