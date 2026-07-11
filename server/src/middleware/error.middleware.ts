import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);

  res.status(400).json({
    success: false,
    message: err.message || "Something went wrong.",
  });
};

export default errorHandler;