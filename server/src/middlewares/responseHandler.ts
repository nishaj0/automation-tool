import type { NextFunction, Request, Response } from "express";
import type { CustomError } from "../types/response";

export const successResponse = (req: Request, res: Response, next: NextFunction) => {
  res.success = (message: string, data?: unknown, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  next();
};

export const errorResponse = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || err,
  });
};
