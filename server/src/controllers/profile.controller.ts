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


  async uploadProfileImage(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      if (!req.file) {
        throw new Error("Please upload an image.");
      }

      const result =
        await profileService.updateProfileImage(
          req.user!.userId,
          req.file.path.replace(/\\/g, "/")
        );

      return res.status(200).json({
        success: true,
        message: "Profile image updated successfully.",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }


  async exportProfile(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await profileService.exportProfile(
        req.user!.userId
      );

      res.setHeader(
        "Content-Type",
        "application/json"
      );

      res.setHeader(
        "Content-Disposition",
        "attachment; filename=profile.json"
      );

      return res.status(200).send(
        JSON.stringify(result, null, 2)
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new ProfileController();