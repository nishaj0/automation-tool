import { Response } from "express";

declare module "express-serve-static-core" {
  interface Response {
    success: <T>(message: string, data?: T, statusCode?: number) => void;
  }
}