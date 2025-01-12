import jwt from "jsonwebtoken";

const generateAccessToken = (userId: string, secret: string) => {
  return jwt.sign({ userId }, secret, { expiresIn: "15m" });
};

const generateRefreshToken = (userId: string, secret: string) => {
  return jwt.sign({ userId }, secret, { expiresIn: "7d" });
};

export const jwtUtil = {
  generateAccessToken,
  generateRefreshToken,
};
