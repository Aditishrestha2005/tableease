import { Router } from "express";
import reservationController from "../controllers/reservation.controller";
import authMiddleware from "../middleware/auth.middleware";
import roleMiddleware from "../middleware/role.middleware";

const router = Router();


// Create reservation
router.post(
  "/",
  authMiddleware,
  reservationController.createReservation
);

// Get my reservations
router.get(
  "/my",
  authMiddleware,
  reservationController.getMyReservations
);

// Cancel reservation
router.patch(
  "/:id/cancel",
  authMiddleware,
  reservationController.cancelReservation
);



// View all reservations
router.get(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  reservationController.getAllReservations
);

export default router;