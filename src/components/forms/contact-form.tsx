"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  LoaderCircle,
  Send,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

export function ContactForm({
  defaultSubject = "",
  defaultMessage = "",
  defaultEnquiryType = "",
}: ContactFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      enquiryType: defaultEnquiryType,
      subject: defaultSubject,
      preferredMethod: "",
      message: defaultMessage,
    },
  });

  async function onSubmit(values: ContactValues) {
    void values;

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    toast.success("Enquiry received", {
      description:
        "The Tavin Motors team will review your message and contact you using your preferred method.",
    });

    reset({
      fullName: "",
      phone: "",
      email: "",
      enquiryType: "",
      subject: "",
      preferredMethod: "",
      message: "",
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          Ask about a vehicle, assisted import, marketplace listing,
          service appointment or any other Tavin Motors service.
        </p>
      </div>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block">
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

        <label className="block">
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

        <label className="block">
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

        <label className="block">
          <span className="text-sm font-medium">
            Enquiry type
          </span>

          <select
            {...register("enquiryType")}
            className={`mt-2 ${selectClassName}`}
          >
            <option value="" disabled>
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

          <FieldError message={errors.enquiryType?.message} />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Subject
        </span>

        <Input
          {...register("subject")}
          placeholder="What is your enquiry about?"
          className={`mt-2 ${inputClassName}`}
        />

        <FieldError message={errors.subject?.message} />
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Preferred contact method
        </span>

        <select
          {...register("preferredMethod")}
          defaultValue=""
          className={`mt-2 ${selectClassName}`}
        >
          <option value="" disabled>
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

        <FieldError message={errors.preferredMethod?.message} />
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Message
        </span>

        <Textarea
          {...register("message")}
          rows={6}
          placeholder="Share the vehicle, service or assistance you require..."
          className="mt-2 min-h-36 resize-y border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20"
        />

        <FieldError message={errors.message?.message} />
      </label>

      <div className="mt-7 border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />

          <p className="text-xs leading-6 text-muted-foreground">
            This is currently a demonstration submission. Email,
            WhatsApp, database and customer-management integrations will
            be connected during the backend phase.
          </p>
        </div>
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
            Sending Enquiry
          </>
        ) : (
          <>
            <Send className="size-4" />
            Send Enquiry
          </>
        )}
      </Button>
    </form>
  );
}