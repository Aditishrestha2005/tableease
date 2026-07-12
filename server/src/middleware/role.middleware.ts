import { NextFunction, Response } from "express";
import { AuthRequest } from "./auth.middleware";

const roleMiddleware = (role: "admin" | "user") => {
  return (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    if (req.user.role !== role) {
      return res.status(403).json({
        success: false,
        message: "Forbidden. You do not have permission.",
      });
    }

    next();
  };
};

export default roleMiddleware;