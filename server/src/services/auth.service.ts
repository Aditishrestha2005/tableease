import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository";
import {
  loginSchema,
  registerSchema,
} from "../validators/auth.validator";
import { changePasswordSchema } from "../validators/changePassword.validator";
import generateToken from "../utils/generateToken";
import activityLogService from "./activityLog.service";
import captchaService from "./captcha.service";
class AuthService {
  async registerUser(userData: {
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
  }) {
    const validatedData = registerSchema.parse(userData);

    const existingUser = await userRepository.findUserByEmail(
      validatedData.email
    );

    if (existingUser) {
      throw new Error("Email already exists.");
    }

    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    const newUser = await userRepository.createUser({
      ...validatedData,
      password: hashedPassword,
      passwordHistory: [hashedPassword],
    });
    await activityLogService.logActivity(
  String(newUser._id),
  "REGISTER",
  "User registered successfully."
);

    const token = generateToken(String(newUser._id), newUser.role);

    return {
      user: {
        id: String(newUser._id),
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
      token,
    };
  }

 async loginUser(userData: {
  email: string;
  password: string;
  captchaToken?: string;
}) {
    const validatedData = loginSchema.parse(userData);

    const user = await userRepository.findUserByEmail(validatedData.email);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new Error(
        "Account is temporarily locked. Please try again later."
      );
    }

    const passwordMatch = await bcrypt.compare(
      validatedData.password,
      user.password
    );
if (!passwordMatch) {
  user.failedLoginAttempts += 1;

  if (user.failedLoginAttempts >= 5) {
    user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
  }

  await user.save();

  await activityLogService.logActivity(
    String(user._id),
    "LOGIN_FAILED",
    "Failed login attempt."
  );

  throw new Error("Invalid email or password.");
}

// ✅ Password Expiry Check (90 days)
// Password Expiry Check (90 days)
const ninetyDays = 90 * 24 * 60 * 60 * 1000;

if (
  user.passwordChangedAt &&
  Date.now() - user.passwordChangedAt.getTime() > ninetyDays
) {
  return {
    passwordExpired: true,
    email: user.email,
  };
}

// Reset failed login attempts after successful login
user.failedLoginAttempts = 0;
user.lockUntil = undefined;

await user.save();

await activityLogService.logActivity(
  String(user._id),
  "LOGIN_SUCCESS",
  "User logged in successfully."
);

// If MFA is enabled, require OTP before issuing JWT
if (user.mfaEnabled) {
  return {
    mfaRequired: true,
    email: user.email,
  };
}

const token = generateToken(String(user._id), user.role);

return {
  user: {
    id: String(user._id),
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  },
  token,
};
  }

  async getCurrentUser(userId: string) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    return {
      id: String(user._id),
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profileImage: user.profileImage,
      mfaEnabled: user.mfaEnabled,
    };
  }
  async changePassword(
    userId: string,
    data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }
  ) {
    const validatedData = changePasswordSchema.parse(data);

    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    // Check current password
    const isCurrentPasswordValid = await bcrypt.compare(
      validatedData.currentPassword,
      user.password
    );

    if (!isCurrentPasswordValid) {
      throw new Error("Current password is incorrect.");
    }

    // Prevent using current password again
    const isSamePassword = await bcrypt.compare(
      validatedData.newPassword,
      user.password
    );

    if (isSamePassword) {
      throw new Error(
        "New password cannot be the same as the current password."
      );
    }

    // Prevent reuse of last 5 passwords
    for (const oldPassword of user.passwordHistory.slice(-5)) {
      const isReused = await bcrypt.compare(
        validatedData.newPassword,
        oldPassword
      );

      if (isReused) {
        throw new Error(
          "You cannot reuse any of your last 5 passwords."
        );
      }
    }

    const hashedPassword = await bcrypt.hash(
      validatedData.newPassword,
      12
    );

   user.password = hashedPassword;

user.passwordChangedAt = new Date();

user.passwordHistory.push(hashedPassword);

    if (user.passwordHistory.length > 5) {
      user.passwordHistory =
        user.passwordHistory.slice(-5);
    }

    await user.save();
    await activityLogService.logActivity(
  String(user._id),
  "PASSWORD_CHANGED",
  "User changed password successfully."
);

    return {
      message: "Password changed successfully.",
    };
  }
}

export default new AuthService();