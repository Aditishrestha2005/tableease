import { Router } from "express";
import profileController from "../controllers/profile.controller";
import authMiddleware from "../middleware/auth.middleware";
import upload from "../middleware/upload.middleware";

const router = Router();

// Get Profile
router.get(
  "/",
  authMiddleware,
  profileController.getProfile
);

// Export Profile
router.get(
  "/export",
  authMiddleware,
  profileController.exportProfile
);


// Update Profile
router.put(
  "/",
  authMiddleware,
  profileController.updateProfile
);
// Import Profile
router.post(
  "/import",
  authMiddleware,
  profileController.importProfile
);

// Upload Profile Image
router.put(
  "/image",
  authMiddleware,
  upload.single("profileImage"),
  profileController.uploadProfileImage
);

export default router;