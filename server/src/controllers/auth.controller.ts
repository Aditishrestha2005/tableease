import { NextFunction, Request, Response } from "express";
import authService from "../services/auth.service";
import { AuthRequest } from "../middleware/auth.middleware";

class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.registerUser(req.body);

      return res.status(201).json({
        success: true,
        message: "User registered successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await authService.loginUser(req.body);

      return res.status(200).json({
        success: true,
        message: "Login successful.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCurrentUser(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await authService.getCurrentUser(req.user!.userId);

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Change Password
  // =========================
  async changePassword(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await authService.changePassword(
        req.user!.userId,
        req.body
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

export default new AuthController();