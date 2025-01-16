import type { NextFunction, Request, Response } from "express";
import { logger } from "../config";
import type { CustomError } from "../types/response";

const successResponse = (_req: Request, res: Response, next: NextFunction) => {
  res.success = (message: string, data?: unknown, statusCode = 200) => {
    // logger
    logger.info(`Response: statusCode=${statusCode} message=${message}`);

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

  // logger
  // if the status code is 500 or above, log it as an error
  if (statusCode >= 500) {
    logger.error(`Response: statusCode=${statusCode} message=${err.message || err}`);
  } else {
    logger.warn(`Response: statusCode=${statusCode} message=${err.message || err}`);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || err,
  });
};

export const responseHandler = {
  successResponse,
  errorResponse,
};
