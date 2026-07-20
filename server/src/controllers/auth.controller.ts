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
     // Set JWT as a secure HttpOnly cookie after successful login
if (result.token) {
 res.cookie("token", result.token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
  maxAge: 24 * 60 * 60 * 1000,
});
}
    return res.status(200).json({
  success: true,
  message: result.passwordExpired
    ? "Password change required."
    : result.mfaRequired
    ? "MFA verification required."
    : "Login successful.",
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
    console.log("Decoded user from JWT:", req.user);

    const result = await authService.getCurrentUser(req.user!.userId);

    console.log("User returned from service:", result);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error("getCurrentUser Error:", error);
    next(error);
  }
}

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
  async sendResetPasswordEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await authService.sendResetPasswordEmail(req.body.email);

    return res.status(200).json({
      success: true,
      message: "If the email is registered, a reset link has been sent.",
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  const token = String(req.params.token);
const newPassword = String(req.body.newPassword);

await authService.resetPassword(token, newPassword);

    return res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    next(error);
  }
}
async logout(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
  res.clearCookie("token", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  path: "/",
});

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    next(error);
  }
}
}

export default new AuthController();