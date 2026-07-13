import { Response, NextFunction } from "express";
import profileService from "../services/profile.service";
import { AuthRequest } from "../middleware/auth.middleware";

class ProfileController {

  async getProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await profileService.getProfile(
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


  async updateProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await profileService.updateProfile(
        req.user!.userId,
        req.body
      );

      return res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();