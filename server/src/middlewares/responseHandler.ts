import type { NextFunction, Request, Response } from "express";
import type { CustomError } from "../types/response";

const successResponse = (_req: Request, res: Response, next: NextFunction) => {
  res.success = (message: string, data?: unknown, statusCode = 200) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };
  next();
};

const errorResponse = (err: CustomError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || err,
  });
};

export const responseHandler = {
  successResponse,
  errorResponse,
};
