import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import activityLogService from "../services/activityLog.service";

class ActivityLogController {
  async getAllLogs(
    _req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const logs = await activityLogService.getAllLogs();

      return res.status(200).json({
        success: true,
        data: logs,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ActivityLogController();