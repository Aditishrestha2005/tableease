import userRepository from "../repositories/user.repository";
import { updateProfileSchema } from "../validators/userProfile.validator";
import activityLogService from "./activityLog.service";

class ProfileService {

  async getProfile(userId: string) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profileImage: user.profileImage,
      mfaEnabled: user.mfaEnabled,
    };
  }


  async updateProfile(
    userId: string,
    data: {
      name: string;
      phoneNumber: string;
    }
  ) {
    const validatedData = updateProfileSchema.parse(data);

    const updatedUser = await userRepository.updateUser(
      userId,
      validatedData
    );

    if (!updatedUser) {
      throw new Error("User not found.");
    }
    await activityLogService.logActivity(
  userId,
  "PROFILE_UPDATED",
  "User updated their profile."
);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      mfaEnabled: updatedUser.mfaEnabled,
    };
  }

  async updateProfileImage(
    userId: string,
    imagePath: string
  ) {
    const updatedUser = await userRepository.updateUser(
      userId,
      {
        profileImage: imagePath,
      }
    );

    if (!updatedUser) {
      throw new Error("User not found.");
    }
await activityLogService.logActivity(
  userId,
  "PROFILE_IMAGE_UPDATED",
  "User updated their profile image."
);

    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      mfaEnabled: updatedUser.mfaEnabled,
    };
  }


  async exportProfile(userId: string) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profileImage: user.profileImage,
      mfaEnabled: user.mfaEnabled,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}

export default new ProfileService();