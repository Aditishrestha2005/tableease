import { Router } from "express";
import mfaController from "../controllers/mfa.controller";
import authMiddleware from "../middleware/auth.middleware";
import { authLimiter } from "../middleware/rateLimit.middleware";

const router = Router();

// Generate MFA Secret & QR Code
router.post(
  "/generate",
  authMiddleware,
  mfaController.generateMfa
);
router.post(
  "/login",
  authLimiter,
  mfaController.verifyLoginMfa
);

// Verify MFA OTP
router.post(
  "/verify",
  authMiddleware,
  mfaController.verifyMfa
);

export default router;