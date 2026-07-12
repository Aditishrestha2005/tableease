import { Router } from "express";
import restaurantController from "../controllers/restaurant.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();

// View Restaurant Information
router.get("/", restaurantController.getRestaurant);



router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  restaurantController.createRestaurant
);

// Update Restaurant Information
router.put(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  restaurantController.updateRestaurant
);

export default router;