import { z } from "zod";

const currentYear = new Date().getFullYear();

export const sellVehicleSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Enter your full name.")
    .max(80, "Your name is too long."),

  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid phone number.")
    .max(20, "Enter a valid phone number."),

  email: z.union([
    z.literal(""),
    z
      .string()
      .trim()
      .email("Enter a valid email address."),
  ]),

  make: z
    .string()
    .trim()
    .min(2, "Enter the vehicle make.")
    .max(50, "The vehicle make is too long."),

  model: z
    .string()
    .trim()
    .min(1, "Enter the vehicle model.")
    .max(50, "The vehicle model is too long."),

  trim: z
    .string()
    .trim()
    .max(80, "The trim description is too long."),

  year: z
    .string()
    .trim()
    .min(4, "Enter the vehicle year.")
    .refine(
      (value) => {
        const year = Number(value);

        return (
          Number.isInteger(year) &&
          year >= 1980 &&
          year <= currentYear + 1
        );
      },
      {
        message: "Enter a valid vehicle year.",
      },
    ),

  price: z
    .string()
    .trim()
    .min(1, "Enter the asking price.")
    .refine(
      (value) =>
        Number.isFinite(Number(value)) &&
        Number(value) > 0,
      {
        message: "Enter a valid asking price.",
      },
    ),

  mileage: z
    .string()
    .trim()
    .min(1, "Enter the current mileage.")
    .refine(
      (value) =>
        Number.isFinite(Number(value)) &&
        Number(value) >= 0,
      {
        message: "Enter a valid mileage.",
      },
    ),

  transmission: z
    .string()
    .trim()
    .min(1, "Select the transmission."),

  fuelType: z
    .string()
    .trim()
    .min(1, "Select the fuel type."),

  bodyType: z
    .string()
    .trim()
    .min(1, "Select the body type."),

  location: z
    .string()
    .trim()
    .min(2, "Enter the vehicle location.")
    .max(100, "The location is too long."),

  condition: z
    .string()
    .trim()
    .min(1, "Select the vehicle condition."),

  ownership: z
    .string()
    .trim()
    .min(1, "Select the ownership status."),

  exteriorColor: z
    .string()
    .trim()
    .min(2, "Enter the exterior colour.")
    .max(50, "The colour description is too long."),

  registration: z
    .string()
    .trim()
    .max(30, "The registration number is too long."),

  description: z
    .string()
    .trim()
    .min(30, "Provide at least 30 characters about the vehicle.")
    .max(1500, "The description cannot exceed 1,500 characters."),

  negotiable: z.boolean(),

  acceptTerms: z.boolean().refine((value) => value, {
    message:
      "You must confirm the listing information and marketplace rules.",
  }),
});

export type SellVehicleValues = z.infer<
  typeof sellVehicleSchema
>;