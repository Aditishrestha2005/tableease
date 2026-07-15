import {
  NextFunction,
  Request,
  Response,
} from "express";
import { ParamsDictionary } from "express-serve-static-core";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: "user" | "admin";
}

export interface AuthRequest<
  P = ParamsDictionary
> extends Request<P> {
  user?: JwtPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;