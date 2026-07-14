import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import mfaService from "../services/mfa.service";

class MfaController {

  async generateMfa(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await mfaService.generateMfa(
        req.user!.userId
      );

      return res.status(200).json({
        success: true,
        message: "MFA secret generated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
  
  async verifyMfa(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { token } = req.body;

      const result = await mfaService.verifyMfa(
        req.user!.userId,
        token
      );

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MfaController();