import { NextFunction, Request, Response } from "express";
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
   
  async verifyLoginMfa(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, token } = req.body;

      const result = await mfaService.verifyLoginMfa(
        email,
        token
      );
      // Set JWT as a secure HttpOnly cookie after successful MFA login
if (result.token) {
  res.cookie("token", result.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
}

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new MfaController();