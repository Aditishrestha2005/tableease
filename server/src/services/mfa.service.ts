import speakeasy from "speakeasy";
import QRCode from "qrcode";
import userRepository from "../repositories/user.repository";
import { verifyMfaSchema } from "../validators/mfa.validator";

class MfaService {

  async generateMfa(userId: string) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    const secret = speakeasy.generateSecret({
      name: `TableEase (${user.email})`,
    });

    user.mfaSecret = secret.base32;
    await user.save();

    const qrCode = await QRCode.toDataURL(secret.otpauth_url!);

    return {
      secret: secret.base32,
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

    return {
      message: "MFA enabled successfully.",
    };
  }
}

export default new MfaService();