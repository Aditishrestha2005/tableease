import { Router } from "express";
import tableController from "../controllers/table.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

// View all tables
router.get("/", tableController.getAllTables);

router.get(
  "/available",
  tableController.getAvailableTables
);

// View a specific table
router.get("/:id", tableController.getTableById);



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