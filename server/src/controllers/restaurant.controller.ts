import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import restaurantService from "../services/restaurant.service";

class RestaurantController {
async createRestaurant(
  req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result =
  await restaurantService.createRestaurant(
    req.user!.userId,
    req.body
  );

      return res.status(201).json({
        success: true,
        message: "Restaurant created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }


  async getRestaurant(
    _req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await restaurantService.getRestaurant();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

async updateRestaurant(
  req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
     const result =
  await restaurantService.updateRestaurant(
    req.user!.userId,
    req.body
  );

      return res.status(200).json({
        success: true,
        message: "Restaurant updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new RestaurantController();