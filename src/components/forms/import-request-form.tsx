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
  importRequestSchema,
  type ImportRequestValues,
} from "@/lib/validations/import-request";

const inputClassName =
  "h-11 border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20";

const selectClassName =
  "h-11 w-full border border-white/10 bg-black/25 px-3 text-sm text-foreground outline-none transition-colors focus:border-brand-gold/50 focus:ring-2 focus:ring-brand-gold/10";

type FieldErrorProps = {
  message?: string;
};

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

export function ImportRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ImportRequestValues>({
    resolver: zodResolver(importRequestSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      makeModel: "",
      yearFrom: "",
      budget: "",
      origin: "",
      timeline: "",
      notes: "",
    },
  });

  async function onSubmit(values: ImportRequestValues) {
    // This keeps TypeScript and ESLint aware that the validated
    // values will later be sent to our database/API.
    void values;

    await new Promise((resolve) => {
      window.setTimeout(resolve, 700);
    });

    toast.success("Import request received", {
      description:
        "The Tavin Motors team will review your requirements and prepare the next steps.",
    });

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="tm-panel p-5 sm:p-7 lg:p-8"
    >
      <div className="border-b border-white/10 pb-6">
        <p className="tm-eyebrow">Personalised sourcing</p>

        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
          Tell us what you want to import
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          Share your preferred vehicle and budget. This demonstration form
          validates the information and simulates a successful enquiry.
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
            Vehicle make or model
          </span>

          <Input
            {...register("makeModel")}
            placeholder="For example: Toyota Harrier"
            className={`mt-2 ${inputClassName}`}
          />

          <FieldError message={errors.makeModel?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Minimum year
          </span>

          <select
            {...register("yearFrom")}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option value="" disabled>
              Select minimum year
            </option>

            <option value="2024">2024 or newer</option>
            <option value="2022">2022 or newer</option>
            <option value="2020">2020 or newer</option>
            <option value="2018">2018 or newer</option>
            <option value="2016">2016 or newer</option>
            <option value="flexible">Flexible</option>
          </select>

          <FieldError message={errors.yearFrom?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Estimated budget
          </span>

          <select
            {...register("budget")}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option value="" disabled>
              Select your budget
            </option>

            <option value="below-3m">Below KES 3 million</option>
            <option value="3m-5m">KES 3–5 million</option>
            <option value="5m-8m">KES 5–8 million</option>
            <option value="8m-12m">KES 8–12 million</option>
            <option value="above-12m">Above KES 12 million</option>
          </select>

          <FieldError message={errors.budget?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Preferred source market
          </span>

          <select
            {...register("origin")}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option value="" disabled>
              Select source market
            </option>

            <option value="japan">Japan</option>
            <option value="united-kingdom">
              United Kingdom
            </option>
            <option value="south-africa">
              South Africa
            </option>
            <option value="united-arab-emirates">
              United Arab Emirates
            </option>
            <option value="recommend">
              Let Tavin Motors recommend
            </option>
          </select>

          <FieldError message={errors.origin?.message} />
        </label>

        <label className="block">
          <span className="text-sm font-medium">
            Purchasing timeline
          </span>

          <select
            {...register("timeline")}
            defaultValue=""
            className={`mt-2 ${selectClassName}`}
          >
            <option value="" disabled>
              Select timeline
            </option>

            <option value="immediately">Immediately</option>
            <option value="one-month">Within one month</option>
            <option value="three-months">
              Within three months
            </option>
            <option value="researching">
              Currently researching
            </option>
          </select>

          <FieldError message={errors.timeline?.message} />
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium">
          Additional requirements
        </span>

        <Textarea
          {...register("notes")}
          placeholder="Preferred colour, engine size, mileage, interior, features or any other requirements..."
          rows={5}
          className="mt-2 min-h-32 resize-y border-white/10 bg-black/25 focus-visible:border-brand-gold/50 focus-visible:ring-brand-gold/20"
        />

        <FieldError message={errors.notes?.message} />
      </label>

      <div className="mt-7 border border-brand-gold/20 bg-brand-gold/[0.04] p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-gold" />

          <p className="text-xs leading-6 text-muted-foreground">
            Submitting this demonstration form does not initiate a purchase
            or payment. Database storage and staff notifications will be
            connected during the functional backend milestone.
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
            <Send className="size-4" />
            Request Import Consultation
          </>
        )}
      </Button>
    </form>
  );
}