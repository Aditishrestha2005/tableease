import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository";
import { loginSchema, registerSchema } from "../validators/auth.validator";
import generateToken from "../utils/generateToken";

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
  }) {
    const validatedData = loginSchema.parse(userData);

    const user = await userRepository.findUserByEmail(validatedData.email);

    if (!user) {
      throw new Error("Invalid email or password.");
    }

    // Account lock check
    if (user.lockUntil && user.lockUntil > new Date()) {
      throw new Error("Account is temporarily locked. Please try again later.");
    }

    const passwordMatch = await bcrypt.compare(
      validatedData.password,
      user.password
    );

    if (!passwordMatch) {
      user.failedLoginAttempts += 1;

      // Lock after 5 failed attempts
      if (user.failedLoginAttempts >= 5) {
        user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
      }

      await user.save();

      throw new Error("Invalid email or password.");
    }

    // Reset failed attempts
    user.failedLoginAttempts = 0;
    user.lockUntil = undefined;

    await user.save();

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
}

export default new AuthService();