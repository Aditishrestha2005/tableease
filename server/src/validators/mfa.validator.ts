import { z } from "zod";

export const verifyMfaSchema = z.object({
  token: z
    .string()
    .length(6, "OTP must be exactly 6 digits.")
    .regex(/^\d+$/, "OTP must contain only numbers."),
});