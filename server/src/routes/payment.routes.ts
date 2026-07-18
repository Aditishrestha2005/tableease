import { Router } from "express";
import paymentController from "../controllers/payment.controller";
import authMiddleware from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/initiate",
  authMiddleware,
  paymentController.initiatePayment
);

router.post(
  "/verify",
  authMiddleware,
  paymentController.verifyPayment
);

export default router;