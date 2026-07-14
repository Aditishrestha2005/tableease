import speakeasy from "speakeasy";
import QRCode from "qrcode";
import userRepository from "../repositories/user.repository";

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
}

export default new MfaService();