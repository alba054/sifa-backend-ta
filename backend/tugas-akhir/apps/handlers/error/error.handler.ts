import { NextFunction, Request, Response } from "express";
import { WebError } from "../../utils/error/base/base";
import { createResponse } from "../../utils/utils";

export const ErrorHandler = async (
  err: WebError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const ERROR_CODE = !(err instanceof WebError) ? 500 : err.statusCode;

  return res
    .status(ERROR_CODE)
    .json(createResponse(err.name, err.message + "\n\n"));
};
