import jwt, { SignOptions } from "jsonwebtoken";

const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn:
  (process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"]) || "1d",
    }
  );
};

export default generateToken;