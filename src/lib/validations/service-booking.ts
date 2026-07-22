import { z } from "zod";

export const serviceBookingSchema = z.object({
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

  service: z
    .string()
    .trim()
    .min(1, "Select the service you require."),

  vehicle: z
    .string()
    .trim()
    .min(2, "Enter your vehicle make and model.")
    .max(100, "The vehicle description is too long."),

  registration: z
    .string()
    .trim()
    .max(30, "The registration is too long."),

  preferredDate: z
    .string()
    .trim()
    .min(1, "Select a preferred date."),

  preferredTime: z
    .string()
    .trim()
    .min(1, "Select a preferred time."),

  message: z
    .string()
    .trim()
    .max(1000, "Additional information cannot exceed 1,000 characters."),
});

export type ServiceBookingValues = z.infer<
  typeof serviceBookingSchema
>;