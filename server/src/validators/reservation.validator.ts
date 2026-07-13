import { z } from "zod";

export const reservationSchema = z.object({
  table: z.string().min(1, "Table is required"),

  reservationDate: z.coerce.date({
    error: "Invalid reservation date",
  }),

  reservationTime: z
    .string()
    .regex(
      /^([01]\d|2[0-3]):(00|30)$/,
      "Reservation time must be in 30-minute intervals (e.g. 18:00 or 18:30)"
    ),

  numberOfGuests: z
    .number()
    .int("Number of guests must be a whole number")
    .min(1, "At least one guest is required")
    .max(20, "Too many guests"),
});


export const cancelReservationSchema = z.object({
  reservationId: z.string().min(1, "Reservation ID is required"),
});