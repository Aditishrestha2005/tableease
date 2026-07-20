import { Router } from "express";
import activityLogController from "../controllers/activityLog.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  activityLogController.getAllLogs
);

export default router;