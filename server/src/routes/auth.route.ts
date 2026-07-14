import { Router } from "express";
import authController from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import { authLimiter } from "../middleware/rateLimit.middleware";

const router = Router();
router.post(
  "/register",
  authLimiter,
  authController.register
);

router.post(
  "/login",
  authLimiter,
  authController.login
);


router.get(
  "/me",
  authMiddleware,
  authController.getCurrentUser
);


router.put(
  "/change-password",
  authMiddleware,
  authController.changePassword
);

export default router;