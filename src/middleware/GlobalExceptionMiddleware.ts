import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { ApiResponse } from "../dtos/api.response";
import { BaseException } from "../exceptions/BaseException";

export const globalExceptionMiddleware: ErrorRequestHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseException) {
    const baseError = err as BaseException;
    res.status(baseError.statusCode).json(ApiResponse.error(baseError.message));
    return;
  }
  const defaultError = err as Error;
  res.status(500).json(ApiResponse.error(defaultError.message));
};
