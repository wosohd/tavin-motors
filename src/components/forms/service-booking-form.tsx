"use client";

import {
  useEffect,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  zodResolver,
} from "@hookform/resolvers/zod";

import {
  CalendarCheck2,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
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
  serviceBookingSchema,
  type ServiceBookingValues,
} from "@/lib/validations/service-booking";

import type {
  AutoService,
} from "@/types/service";

type ServiceBookingFormProps = {
  services: AutoService[];
};

type FieldErrorProps = {
  message?: string;
};

type ServiceBookingSubmissionResponse = {
  message?: string;

  serviceBooking?: {
    referenceCode: string;
    serviceType: string;
    preferredDate: string;
    preferredTime: string | null;
    status: string;
  };
};

const inputClassName =
  "h-11 border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20";

const selectClassName =
  "h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10";

const serviceDraftPrefix =
  "tavin-service-booking-draft";

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

function getServiceCallbackUrl() {
  if (
    typeof window ===
    "undefined"
  ) {
    return "/services#book-service";
  }

  return (
    window.location.pathname +
    window.location.search +
    "#book-service"
  );
}

function getServiceDraftKey() {
  if (
    typeof window ===
    "undefined"
  ) {
    return serviceDraftPrefix;
  }

  return (
    serviceDraftPrefix +
    ":" +
    window.location.pathname +
    window.location.search
  );
}

export function ServiceBookingForm({
  services,
}: ServiceBookingFormProps) {
  const router =
    useRouter();

  const {
    data: session,
    isPending: sessionPending,
  } =
    authClient.useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } =
    useForm<ServiceBookingValues>({
      resolver: zodResolver(
        serviceBookingSchema,
      ),

      defaultValues: {
        fullName: "",
        phone: "",
        email: "",
        service: "",
        vehicle: "",
        registration: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      },
    });

  /*
   * Restore the booking draft
   * when the customer returns
   * from authentication.
   */
  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return;
    }

    const draftKey =
      getServiceDraftKey();

    const storedDraft =
      window.sessionStorage.getItem(
        draftKey,
      );

    if (!storedDraft) {
      return;
    }

    try {
      const draft =
        JSON.parse(
          storedDraft,
        ) as ServiceBookingValues;

      reset(draft);
    } catch {
      window.sessionStorage.removeItem(
        draftKey,
      );
    }
  }, [reset]);

  async function onSubmit(
    values: ServiceBookingValues,
  ) {
    /*
     * Guests can prepare their
     * appointment but cannot
     * submit it.
     */
    if (!session?.user) {
      const draftKey =
        getServiceDraftKey();

      window.sessionStorage.setItem(
        draftKey,
        JSON.stringify(
          values,
        ),
      );

      const callbackUrl =
        getServiceCallbackUrl();

      toast.info(
        "Tavin account required",
        {
          description:
            "Create an account or sign in to continue with your service appointment.",
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
     * The API repeats both
     * authentication and Zod
     * validation before allowing
     * Prisma to write to
     * PostgreSQL.
     */
    try {
      const response =
        await fetch(
          "/api/service-bookings",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify(
                values,
              ),
          },
        );

      const result =
        (await response
          .json()
          .catch(
            () => null,
          )) as
          | ServiceBookingSubmissionResponse
          | null;

      /*
       * A session could expire
       * while the customer is
       * completing the form.
       */
      if (
        response.status ===
        401
      ) {
        window.sessionStorage.setItem(
          getServiceDraftKey(),
          JSON.stringify(
            values,
          ),
        );

        const callbackUrl =
          getServiceCallbackUrl();

        toast.info(
          "Please sign in again",
          {
            description:
              "Your service booking details have been preserved.",
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
          "Unable to submit service request",
          {
            description:
              result?.message ??
              "Please check your information and try again.",
          },
        );

        return;
      }

      /*
       * Clear the saved draft only
       * after PostgreSQL confirms
       * that the booking exists.
       */
      window.sessionStorage.removeItem(
        getServiceDraftKey(),
      );

      const referenceCode =
        result?.serviceBooking
          ?.referenceCode;

      toast.success(
        "Service request received",
        {
          description:
            referenceCode
              ? `Reference ${referenceCode}. The Tavin Motors team will review your preferred service date and contact you to confirm availability.`
              : "The Tavin Motors team will review your preferred service date and contact you to confirm availability.",
        },
      );

      reset();
    } catch {
      /*
       * Do not clear the form if
       * the network request fails.
       */
      toast.error(
        "Unable to submit service request",
        {
          description:
            "A connection error occurred. Your information has not been cleared, so you can try again.",
        },
      );
    }
  }

  return (
    <form
      id="book-service"
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
          Appointment request
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Book an auto-care service
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          Choose a service and
          preferred appointment time.
          A confirmed booking will only
          be created after the Tavin
          Motors team verifies
          availability. An authenticated
          account is required to submit
          the request.
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
                  Complete your booking
                  details now. We will
                  preserve them while you
                  sign up or sign in and
                  return you directly to
                  this form.
                </p>
              </div>
            </div>
          </div>
        )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
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

        <label className="block">
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

        <label className="block">
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

        <label className="block">
          <span className="text-sm font-medium">
            Required service
          </span>

          <select
            {...register(
              "service",
            )}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option
              value=""
              disabled
            >
              Select a service
            </option>

            {services.map(
              (service) => (
                <option
                  key={
                    service.id
                  }
                  value={
                    service.slug
                  }
                >
                  {
                    service.title
                  }
                </option>
              ),
            )}
          </select>

          <FieldError
            message={
              errors.service
                ?.message
            }
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Vehicle make and model
          </span>

          <Input
            {...register(
              "vehicle",
            )}
            placeholder="For example: 2021 Toyota Harrier"
            className={`mt-2 ${inputClassName}`}
          />

          <FieldError
            message={
              errors.vehicle
                ?.message
            }
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Registration number
          </span>

          <span className="ml-2 text-xs text-muted-foreground">
            Optional
          </span>

          <Input
            {...register(
              "registration",
            )}
            placeholder="For example: KXX 000X"
            className={`mt-2 uppercase ${inputClassName}`}
          />

          <FieldError
            message={
              errors.registration
                ?.message
            }
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Preferred date
          </span>

          <Input
            {...register(
              "preferredDate",
            )}
            type="date"
            className={`mt-2 ${inputClassName}`}
          />

          <FieldError
            message={
              errors.preferredDate
                ?.message
            }
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Preferred time
          </span>

          <select
            {...register(
              "preferredTime",
            )}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option
              value=""
              disabled
            >
              Select preferred time
            </option>

            <option value="morning">
              Morning
            </option>

            <option value="midday">
              Midday
            </option>

            <option value="afternoon">
              Afternoon
            </option>

            <option value="flexible">
              Flexible
            </option>
          </select>

          <FieldError
            message={
              errors.preferredTime
                ?.message
            }
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Describe the concern
        </span>

        <span className="ml-2 text-xs text-muted-foreground">
          Optional
        </span>

        <Textarea
          {...register(
            "message",
          )}
          rows={5}
          placeholder="Warning lights, unusual sounds, maintenance history or any other useful information..."
          className="mt-2 min-h-32 resize-y border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20"
        />

        <FieldError
          message={
            errors.message
              ?.message
          }
        />
      </label>

      <div className="mt-7 border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />

          <p className="text-xs leading-6 text-muted-foreground">
            Your service request is
            securely linked to your
            authenticated Tavin Motors
            account and stored in the
            booking system. Calendar
            availability and staff
            notification features will
            be expanded during the
            following backend
            milestones.
          </p>
        </div>
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
              ? "Sending Request"
              : "Preparing Sign In"}
          </>
        ) : (
          <>
            {session?.user ? (
              <CalendarCheck2 className="size-4" />
            ) : (
              <LockKeyhole className="size-4" />
            )}

            {session?.user
              ? "Request Service Appointment"
              : "Continue to Book Service"}
          </>
        )}
      </Button>
    </form>
  );
}