import speakeasy from "speakeasy";
import QRCode from "qrcode";
import userRepository from "../repositories/user.repository";
import { verifyMfaSchema } from "../validators/mfa.validator";
import generateToken from "../utils/generateToken";
import { loginMfaSchema } from "../validators/loginMfa.validator";
import activityLogService from "./activityLog.service";

class MfaService {

  async generateMfa(userId: string) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }
    if (user.mfaEnabled) {
  throw new Error("MFA is already enabled.");
}

    const secret = speakeasy.generateSecret({
      name: `TableEase (${user.email})`,
    });

    user.mfaSecret = secret.base32;
    await user.save();

    const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

    return {
      qrCode,
    };
  }

 
  async verifyMfa(userId: string, token: string) {
    const validatedData = verifyMfaSchema.parse({
      token,
    });

    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.mfaSecret) {
      throw new Error("MFA has not been set up.");
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token: validatedData.token,
    });

    if (!verified) {
      throw new Error("Invalid OTP.");
    }

    user.mfaEnabled = true;
    await user.save();
 
    await activityLogService.logActivity(
  String(user._id),
  "MFA_ENABLED",
  "User enabled multi-factor authentication."
);
    return {
      message: "MFA enabled successfully.",
    };
  }
  
    async verifyLoginMfa(
    email: string,
    token: string
  ) {
    const validatedData = loginMfaSchema.parse({
      email,
      token,
    });

    const user = await userRepository.findUserByEmail(
      validatedData.email
    );

    if (!user) {
      throw new Error("User not found.");
    }

    if (!user.mfaEnabled) {
      throw new Error("MFA is not enabled.");
    }

    if (!user.mfaSecret) {
      throw new Error("MFA secret not found.");
    }

    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: "base32",
      token: validatedData.token,
    });

    if (!verified) {
      throw new Error("Invalid OTP.");
    }

    const tokenJwt = generateToken(
      String(user._id),
      user.role
    );

    return {
      user: {
        id: String(user._id),
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
      token: tokenJwt,
    };
  }
}

export default new MfaService();