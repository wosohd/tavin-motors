import { z } from "zod";

export const contactSchema = z.object({
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

  enquiryType: z
    .string()
    .trim()
    .min(1, "Select an enquiry type."),

  subject: z
    .string()
    .trim()
    .min(3, "Enter an enquiry subject.")
    .max(120, "The subject is too long."),

  preferredMethod: z
    .string()
    .trim()
    .min(1, "Select a preferred contact method."),

  message: z
    .string()
    .trim()
    .min(10, "Please provide a little more information.")
    .max(1500, "The message cannot exceed 1,500 characters."),
});

export type ContactValues = z.infer<
  typeof contactSchema
>;