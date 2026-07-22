"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarCheck2,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  serviceBookingSchema,
  type ServiceBookingValues,
} from "@/lib/validations/service-booking";
import type { AutoService } from "@/types/service";

type ServiceBookingFormProps = {
  services: AutoService[];
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

export function ServiceBookingForm({
  services,
}: ServiceBookingFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ServiceBookingValues>({
    resolver: zodResolver(serviceBookingSchema),
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

  async function onSubmit(values: ServiceBookingValues) {
    void values;

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    toast.success("Service request received", {
      description:
        "The Tavin Motors team will review your preferred service date and contact you to confirm availability.",
    });

    reset();
  }

  return (
    <form
      id="book-service"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="tm-panel scroll-mt-28 p-5 sm:p-7 lg:p-8"
    >
      <div className="border-b border-white/10 pb-6">
        <p className="tm-eyebrow">Appointment request</p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Book an auto-care service
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          Choose a service and preferred appointment time. A confirmed
          booking will only be created after the Tavin Motors team
          verifies availability.
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
            Required service
          </span>

          <select
            {...register("service")}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option value="" disabled>
              Select a service
            </option>

            {services.map((service) => (
              <option
                key={service.id}
                value={service.slug}
              >
                {service.title}
              </option>
            ))}
          </select>

          <FieldError message={errors.service?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Vehicle make and model
          </span>

          <Input
            {...register("vehicle")}
            placeholder="For example: 2021 Toyota Harrier"
            className={`mt-2 ${inputClassName}`}
          />

          <FieldError message={errors.vehicle?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Registration number
          </span>

          <span className="ml-2 text-xs text-muted-foreground">
            Optional
          </span>

          <Input
            {...register("registration")}
            placeholder="For example: KXX 000X"
            className={`mt-2 uppercase ${inputClassName}`}
          />

          <FieldError message={errors.registration?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Preferred date
          </span>

          <Input
            {...register("preferredDate")}
            type="date"
            className={`mt-2 ${inputClassName}`}
          />

          <FieldError message={errors.preferredDate?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Preferred time
          </span>

          <select
            {...register("preferredTime")}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option value="" disabled>
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

          <FieldError message={errors.preferredTime?.message} />
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
          {...register("message")}
          rows={5}
          placeholder="Warning lights, unusual sounds, maintenance history or any other useful information..."
          className="mt-2 min-h-32 resize-y border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20"
        />

        <FieldError message={errors.message?.message} />
      </label>

      <div className="mt-7 border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />

          <p className="text-xs leading-6 text-muted-foreground">
            This demonstration form validates and confirms the request
            locally. Database storage, calendar availability and staff
            notifications will be connected during the backend milestone.
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
            Sending Request
          </>
        ) : (
          <>
            <CalendarCheck2 className="size-4" />
            Request Service Appointment
          </>
        )}
      </Button>
    </form>
  );
}