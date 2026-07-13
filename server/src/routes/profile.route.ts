import { Router } from "express";
import profileController from "../controllers/profile.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();


// Get Profile
router.get(
  "/",
  authMiddleware,
  profileController.getProfile
);

// Update Profile
router.put(
  "/",
  authMiddleware,
  profileController.updateProfile
);

export default router;