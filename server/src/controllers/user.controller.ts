import { NextFunction, Request, Response } from "express";
import userService from "../services/user.service";

class UserController {
  async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const users = await userService.getAllUsers();

      return res.status(200).json({
        success: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();