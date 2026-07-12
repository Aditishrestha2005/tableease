import { z } from "zod";

export const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, "Restaurant name must be at least 2 characters")
    .max(100, "Restaurant name cannot exceed 100 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),

  address: z
    .string()
    .min(5, "Address is required")
    .max(255, "Address cannot exceed 255 characters"),

  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),

  email: z.email("Invalid email address"),

  openingTime: z
    .string()
    .min(1, "Opening time is required"),

  closingTime: z
    .string()
    .min(1, "Closing time is required"),

  image: z
    .string()
    .optional()
    .default(""),
});