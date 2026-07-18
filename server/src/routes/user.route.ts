import { Router } from "express";
import userController from "../controllers/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  userController.getAllUsers
);

export default router;