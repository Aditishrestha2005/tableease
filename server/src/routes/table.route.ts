import { Router } from "express";
import tableController from "../controllers/table.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

// =========================
// Public Routes
// =========================

// View all tables
router.get("/", tableController.getAllTables);

// View a specific table
router.get("/:id", tableController.getTableById);

// =========================
// Admin Routes
// =========================

// Create table
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  tableController.createTable
);

// Update table
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  tableController.updateTable
);

// Delete table
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  tableController.deleteTable
);

export default router;