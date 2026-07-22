import { z } from "zod";

export const importRequestSchema = z.object({
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

  email: z
    .union([
      z.literal(""),
      z.string().trim().email("Enter a valid email address."),
    ]),

  makeModel: z
    .string()
    .trim()
    .min(2, "Enter the vehicle make or model.")
    .max(100, "The vehicle description is too long."),

  yearFrom: z
    .string()
    .trim()
    .min(4, "Select your preferred minimum year."),

  budget: z
    .string()
    .trim()
    .min(1, "Select an estimated budget."),

  origin: z
    .string()
    .trim()
    .min(1, "Select a preferred source market."),

  timeline: z
    .string()
    .trim()
    .min(1, "Select your purchasing timeline."),

  notes: z
    .string()
    .trim()
    .max(1000, "Additional information cannot exceed 1,000 characters."),
});

export type ImportRequestValues = z.infer<
  typeof importRequestSchema
>;