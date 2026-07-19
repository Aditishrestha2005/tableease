// import { NextFunction, Request, Response } from "express";
// import userService from "../services/user.service";

// class UserController {
//   async getAllUsers(
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) {
//     try {
//       const users = await userService.getAllUsers();

//       return res.status(200).json({
//         success: true,
//         data: users,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// }

// export default new UserController();

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

  async getUserDetails(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = req.params.id as string;

    const result =
      await userService.getUserDetails(id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
    const id = req.params.id as string;

if (!id) {
  throw new Error("User ID is required.");
}

const result = await userService.deleteUser(id);

      return res.status(200).json({
        success: true,
        message: result.message,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();