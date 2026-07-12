import { z } from "zod";

export const tableSchema = z.object({
  tableNumber: z
    .number()
    .int("Table number must be an integer")
    .positive("Table number must be greater than 0"),

  capacity: z
    .number()
    .int("Capacity must be an integer")
    .min(1, "Capacity must be at least 1")
    .max(20, "Capacity cannot exceed 20"),

  location: z.enum(["Indoor", "Outdoor", "VIP"], {
    message: "Invalid table location",
  }),

  status: z.enum(["available", "maintenance"], {
    message: "Invalid table status",
  }),
});