import { Router } from "express";
import dashboardController from "../controllers/dashboard.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

router.get(
  "/admin",
  authMiddleware,
  roleMiddleware("admin"),
  dashboardController.getAdminDashboard
);


router.get(
  "/user",
  authMiddleware,
  dashboardController.getUserDashboard
);

export default router;