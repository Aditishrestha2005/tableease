import bcrypt from "bcrypt";
import userRepository from "../repositories/user.repository";
import { registerSchema } from "../validators/auth.validator";
import generateToken from "../utils/generateToken";

class AuthService {
  async registerUser(userData: {
    name: string;
    email: string;
    password: string;
  }) {
    // Validate input
    const validatedData = registerSchema.parse(userData);

    // Check if email already exists
    const existingUser = await userRepository.findUserByEmail(
      validatedData.email
    );

    if (existingUser) {
      throw new Error("Email already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12);

    // Create user
    const newUser = await userRepository.createUser({
      ...validatedData,
      password: hashedPassword,
      passwordHistory: [hashedPassword],
    });

    // Generate JWT
    const token = generateToken(
      newUser._id.toString(),
      newUser.role
    );

    return {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    };
  }
}

export default new AuthService();