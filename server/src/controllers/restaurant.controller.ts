import { NextFunction, Request, Response } from "express";
import restaurantService from "../services/restaurant.service";

class RestaurantController {
  // =========================
  // Create Restaurant (Only Once)
  // =========================
  async createRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await restaurantService.createRestaurant(req.body);

      return res.status(201).json({
        success: true,
        message: "Restaurant created successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  // =========================
  // Get Restaurant
  // =========================
  async getRestaurant(
    _req: Request,
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

  // =========================
  // Update Restaurant
  // =========================
  async updateRestaurant(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await restaurantService.updateRestaurant(req.body);

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