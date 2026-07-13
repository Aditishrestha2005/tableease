import { Response, NextFunction } from "express";
import reservationService from "../services/reservation.service";
import { AuthRequest } from "../middleware/auth.middleware";

class ReservationController {

  async createReservation(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await reservationService.createReservation(
        req.user!.userId,
        req.body
      );

      return res.status(201).json({
        success: true,
        message: "Reservation created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }


  async getMyReservations(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await reservationService.getMyReservations(
          req.user!.userId
        );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

 
  async getAllReservations(
    _req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await reservationService.getAllReservations();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async cancelReservation(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await reservationService.cancelReservation(
        String(req.params.id),
          req.user!.userId,
          req.user!.role
        );

      return res.status(200).json({
        success: true,
        message: result.message,
        data: result.reservation,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ReservationController();