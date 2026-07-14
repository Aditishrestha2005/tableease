import { NextFunction, Response } from "express";
import dashboardService from "../services/dashboard.service";
import { AuthRequest } from "../middleware/auth.middleware";

class DashboardController {
  async getAdminDashboard(
    _req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await dashboardService.getAdminDashboard();

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserDashboard(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await dashboardService.getUserDashboard(
        req.user!.userId
      );

      return res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new DashboardController();