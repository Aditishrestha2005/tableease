import { Request, Response, NextFunction } from "express";
import paymentService from "../services/payment.service";

class PaymentController {
  async initiatePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
        await paymentService.initiatePayment(
          req.body
        );

        

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyPayment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { pidx } = req.body;

    const result =
      await paymentService.verifyPayment(pidx);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}
}

export default new PaymentController();