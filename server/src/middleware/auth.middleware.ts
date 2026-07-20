// import {
//   NextFunction,
//   Request,
//   Response,
// } from "express";
// import { ParamsDictionary } from "express-serve-static-core";
// import jwt from "jsonwebtoken";

// interface JwtPayload {
//   userId: string;
//   role: "user" | "admin";
// }

// export interface AuthRequest<
//   P = ParamsDictionary
// > extends Request<P> {
//   user?: JwtPayload;
// }

// const authMiddleware = (
//   req: AuthRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const authHeader = req.headers.authorization;

// console.log("Authorization Header:", authHeader);

// if (!authHeader || !authHeader.startsWith("Bearer ")) {
//   return res.status(401).json({
//     success: false,
//     message: "Access denied. No token provided.",
//   });
// }

// const token = authHeader.split(" ")[1];

// console.log("Extracted Token:", token);

// const decoded = jwt.verify(
//   token,
//   process.env.JWT_SECRET as string
// ) as JwtPayload;

//     req.user = decoded;

//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token.",
//     });
//   }
// };

// export default authMiddleware;

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

export interface AuthRequest<P = ParamsDictionary> extends Request<P> {
  user?: JwtPayload;
}

const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

// First try to read the JWT from the HttpOnly cookie
let token = req.cookies?.token;

// If no cookie exists, fall back to Authorization header
if (!token && authHeader?.startsWith("Bearer ")) {
  token = authHeader.split(" ")[1];
}

if (!token) {
  return res.status(401).json({
    success: false,
    message: "Access denied. No token provided.",
  });
}

  console.log("Extracted Token:", token);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    console.log("Decoded JWT:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("JWT Verify Error:", error);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;