import type { NextFunction, Request, Response } from "express";
import { logger } from "../config";

const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  const { method, url, headers, ip } = req;

  logger.info(
    `Request: Method=${method}, URL=${url}, Origin=${headers.origin || "unknown"}, IP=${ip}, User-Agent=${headers["user-agent"]}`,
  );

  next();
};

export default requestLogger;
