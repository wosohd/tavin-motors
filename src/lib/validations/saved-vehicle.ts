import {
  z,
} from "zod";

export const savedVehicleActionSchema =
  z.object({
    vehicleSlug: z
      .string()
      .trim()
      .min(
        1,
        "Vehicle slug is required.",
      )
      .max(
        200,
        "Vehicle slug is invalid.",
      ),
  });

export type SavedVehicleActionValues =
  z.infer<
    typeof savedVehicleActionSchema
  >;