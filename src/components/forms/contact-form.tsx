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
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  Send,
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
  contactSchema,
  type ContactValues,
} from "@/lib/validations/contact";

type ContactFormProps = {
  defaultSubject?: string;
  defaultMessage?: string;
  defaultEnquiryType?: string;
};

type FieldErrorProps = {
  message?: string;
};

type EnquirySubmissionResponse = {
  message?: string;

  enquiry?: {
    referenceCode: string;
    category: string;
    status: string;
  };
};

const inputClassName =
  "h-11 border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20";

const selectClassName =
  "h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10";

const contactDraftPrefix =
  "tavin-contact-enquiry-draft";

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

function getCurrentCallbackUrl() {
  if (
    typeof window ===
    "undefined"
  ) {
    return "/contact";
  }

  return (
    window.location.pathname +
    window.location.search +
    window.location.hash
  );
}

function getContactDraftKey() {
  if (
    typeof window ===
    "undefined"
  ) {
    return contactDraftPrefix;
  }

  return (
    contactDraftPrefix +
    ":" +
    window.location.pathname +
    window.location.search
  );
}

export function ContactForm({
  defaultSubject = "",
  defaultMessage = "",
  defaultEnquiryType = "",
}: ContactFormProps) {
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
    useForm<ContactValues>({
      resolver: zodResolver(
        contactSchema,
      ),

      defaultValues: {
        fullName: "",
        phone: "",
        email: "",
        enquiryType:
          defaultEnquiryType,
        subject:
          defaultSubject,
        preferredMethod: "",
        message:
          defaultMessage,
      },
    });

  /*
   * Restore the customer's
   * enquiry after returning
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
      getContactDraftKey();

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
        ) as ContactValues;

      reset(draft);
    } catch {
      window.sessionStorage.removeItem(
        draftKey,
      );
    }
  }, [reset]);

  async function onSubmit(
    values: ContactValues,
  ) {
    /*
     * Guests may prepare an
     * enquiry, but it cannot be
     * submitted without an
     * authenticated account.
     */
    if (!session?.user) {
      const draftKey =
        getContactDraftKey();

      window.sessionStorage.setItem(
        draftKey,
        JSON.stringify(values),
      );

      const callbackUrl =
        getCurrentCallbackUrl();

      toast.info(
        "Tavin account required",
        {
          description:
            "Create an account or sign in to continue with your enquiry.",
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
     * The client-side session check
     * provides the user experience.
     *
     * The API performs the real
     * server-side authentication
     * and validation before writing
     * the enquiry to PostgreSQL.
     */
    try {
      const response =
        await fetch(
          "/api/enquiries",
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
          | EnquirySubmissionResponse
          | null;

      /*
       * A session can expire
       * between rendering the
       * page and submitting the
       * enquiry.
       *
       * Preserve everything and
       * send the customer back
       * through sign-in.
       */
      if (
        response.status ===
        401
      ) {
        window.sessionStorage.setItem(
          getContactDraftKey(),
          JSON.stringify(
            values,
          ),
        );

        const callbackUrl =
          getCurrentCallbackUrl();

        toast.info(
          "Please sign in again",
          {
            description:
              "Your enquiry has been preserved.",
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
          "Unable to submit enquiry",
          {
            description:
              result?.message ??
              "Please check your information and try again.",
          },
        );

        return;
      }

      /*
       * Only remove the saved draft
       * after PostgreSQL confirms
       * the enquiry was created.
       */
      window.sessionStorage.removeItem(
        getContactDraftKey(),
      );

      const referenceCode =
        result?.enquiry
          ?.referenceCode;

      toast.success(
        "Enquiry received",
        {
          description:
            referenceCode
              ? `Reference ${referenceCode}. The Tavin Motors team will review your message and contact you using your preferred method.`
              : "The Tavin Motors team will review your message and contact you using your preferred method.",
        },
      );

      reset({
        fullName: "",
        phone: "",
        email: "",
        enquiryType: "",
        subject: "",
        preferredMethod: "",
        message: "",
      });
    } catch {
      /*
       * Keep the form populated on
       * network failure so the
       * customer does not lose
       * their enquiry.
       */
      toast.error(
        "Unable to submit enquiry",
        {
          description:
            "A connection error occurred. Your information has not been cleared, so you can try again.",
        },
      );
    }
  }

  return (
    <form
      onSubmit={
        handleSubmit(
          onSubmit,
        )
      }
      noValidate
      className="tm-panel p-5 sm:p-7 lg:p-8"
    >
      <div className="border-b border-white/10 pb-6">
        <p className="tm-eyebrow">
          Send an enquiry
        </p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          How can we assist?
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          Ask about a vehicle,
          assisted import,
          marketplace listing,
          service appointment or
          any other Tavin Motors
          service. An authenticated
          Tavin account is required
          before an enquiry can be
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
                  Complete your enquiry
                  now. We will keep your
                  information while you
                  create an account or
                  sign in, then return
                  you here.
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
            Enquiry type
          </span>

          <select
            {...register(
              "enquiryType",
            )}
            className={`mt-2 ${selectClassName}`}
          >
            <option
              value=""
              disabled
            >
              Select enquiry type
            </option>

            <option value="vehicle">
              Vehicle enquiry
            </option>

            <option value="import">
              Import assistance
            </option>

            <option value="marketplace">
              Local marketplace
            </option>

            <option value="service">
              Auto-care service
            </option>

            <option value="partnership">
              Business or partnership
            </option>

            <option value="general">
              General enquiry
            </option>
          </select>

          <FieldError
            message={
              errors.enquiryType
                ?.message
            }
          />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Subject
        </span>

        <Input
          {...register(
            "subject",
          )}
          placeholder="What is your enquiry about?"
          className={`mt-2 ${inputClassName}`}
        />

        <FieldError
          message={
            errors.subject
              ?.message
          }
        />
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Preferred contact method
        </span>

        <select
          {...register(
            "preferredMethod",
          )}
          defaultValue=""
          className={`mt-2 ${selectClassName}`}
        >
          <option
            value=""
            disabled
          >
            Select contact method
          </option>

          <option value="phone">
            Phone call
          </option>

          <option value="whatsapp">
            WhatsApp
          </option>

          <option value="email">
            Email
          </option>
        </select>

        <FieldError
          message={
            errors.preferredMethod
              ?.message
          }
        />
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Message
        </span>

        <Textarea
          {...register(
            "message",
          )}
          rows={6}
          placeholder="Share the vehicle, service or assistance you require..."
          className="mt-2 min-h-36 resize-y border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20"
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
            Your enquiry is securely
            linked to your
            authenticated Tavin
            Motors account. Staff
            notification and
            conversation management
            features will be expanded
            during the following
            backend milestones.
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
              ? "Sending Enquiry"
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
              ? "Send Enquiry"
              : "Continue to Send Enquiry"}
          </>
        )}
      </Button>
    </form>
  );
}