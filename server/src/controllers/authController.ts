import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import { ENV } from "../config";
import { User } from "../models";
import { ErrorResponse, jwtUtil } from "../utils";

const handleRegister = async (req: Request, res: Response, next: NextFunction) => {
  const { username, email, password } = req.body;

  try {
    // check body fields
    if (!username || !email || !password) {
      throw new ErrorResponse("Missing required fields", 400);
    }

    // check if user already exists
    const duplicateUsername = await User.findOne({ username });
    if (duplicateUsername) {
      throw new ErrorResponse("Username already exists", 400);
    }

    const duplicateEmail = await User.findOne({ email });
    if (duplicateEmail) {
      throw new ErrorResponse("Email already exists", 400);
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({ username, email, password: hashedPassword })

    // create tokens
    const accessToken = jwtUtil.generateAccessToken(user.id, ENV.ACCESS_TOKEN_SECRET);
    const refreshToken = jwtUtil.generateRefreshToken(user.id, ENV.REFRESH_TOKEN_SECRET);

    // send response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: ENV.ENVIRONMENT === "PROD",
    });
    
    const { password: _, ...basicUserData } = user.toObject()

    res.success("User registered successfully", { user: basicUserData, accessToken }, 201);
  } catch (error) {
    next(error);
  }
};

const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  const {email, password} = req.body;

  try{
    // check body fields
    if (!email || !password) {
      throw new ErrorResponse("Missing required fields", 400);
    }

    // check if user exists
    const user = await User.findOne({ email})
    if (!user){
      throw new ErrorResponse("Invalid credentials", 400);
    }

    // check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword){
      throw new ErrorResponse("Invalid credentials", 400);
    }

    // create tokens
    const accessToken = jwtUtil.generateAccessToken(user.id, ENV.ACCESS_TOKEN_SECRET);
    const refreshToken = jwtUtil.generateRefreshToken(user.id, ENV.REFRESH_TOKEN_SECRET);

    // send response
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: ENV.ENVIRONMENT === "PROD",
    });

    // user data without password
    const { password: _, ...basicUserData } = user.toObject();

    res.success("User logged in successfully", { user: basicUserData, accessToken });
  } catch(error){
    next(error);
  }
}

export const authController = {
  handleRegister,
  handleLogin,
};
