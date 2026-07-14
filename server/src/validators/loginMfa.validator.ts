import { z } from "zod";

export const loginMfaSchema = z.object({
  email: z.string().email("Invalid email address."),
  token: z
    .string()
    .length(6, "OTP must be exactly 6 digits.")
    .regex(/^\d+$/, "OTP must contain only numbers."),
});