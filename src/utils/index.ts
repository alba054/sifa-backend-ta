import dotenv from "dotenv";
import { BadRequestError } from "../exceptions/httpError/BadRequestError";
import { NotFoundError } from "../exceptions/httpError/NotFoundError";
import { InternalServerError } from "../exceptions/httpError/InternalServerError";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

dotenv.config();

export const constants = {
  SUCCESS_RESPONSE_MESSAGE: "success",
  FAILED_RESPONSE_MESSAGE: "failed",
  ACCESS_TOKEN_EXP: 24 * 60 * 60 * 30, // *  1 month
  REFRESH_TOKEN_EXP: 24 * 60 * 60 * 30, // * 1 month
  INVALID_TOKEN: "token is invalid",
  MALFORMED_TOKEN:
    "token is not formed correctly. JWT format is xxxx.yyyyy.zzzz",
  SIGNATURE_REQUIRED: "provide secret key to verify token",
  INVALID_SIGNATURE: "secret key is not valid",
  STUDENT_ROLE: "STUDENT",
  LECTURER_ROLE: "SUPERVISOR",
  ADMIN_ROLE: "ADMIN",
  ABS_PATH: process.env.ABS_PATH,
  PROFILE_PIC_PATH: "storage/user-pic/",
  PASSWORD_SALT: 10,
  HISTORY_ELEMENTS_PER_PAGE: 25,
  INTERNAL_SERVER_ERROR_CODE: "E501",
  UNIQUE_CONSTRAINT_ERROR: "E401",
  USER_NOT_FOUND_ERROR: "E402",
  LONG_VALUE_ERROR: "E403",
  INVALID_VALUE_ERROR: "E404",
  BAD_REQUEST_ERROR: "E400",
  PROFILE_PICTURE_NOT_FOUND_ERROR: "E405",
  PAYLOAD_NOT_FOUND: "E406",
  VALIDATOR_ERROR: "E407",
  MISSING_VALUE_HEADER_ERROR: "E408",
  TOKEN_NOT_PROVIDED_ERROR: "E409",
  UNAUTHORIZED_ROLE_ERROR: "E410",
  TOKEN_EXPIRED_ERROR: "E411",
  INVALID_TOKEN_ERROR: "E412",
  MALFORMED_TOKEN_ERROR: "E413",
  PASSWORD_INCORRECT_ERROR: "E414",
  COMMON_NOT_FOUND: "E444",
};

export const createErrorObject = (
  error: number = 500,
  message: string = "Internal Error",
  errorCode: string = constants.INTERNAL_SERVER_ERROR_CODE
) => {
  return { error, message, errorCode };
};

export const createResponse = (
  status: string,
  data: any = null,
  error?: { code: string; message?: string } | undefined | null
) => {
  return { status, error, data };
};

export const throwValidationError = (validationResult: any) => {
  if (validationResult && "error" in validationResult) {
    throw new BadRequestError(
      validationResult.errorCode,
      validationResult.message
    );
  }
};

export const throwResultError = (testError: any) => {
  if (testError && "error" in testError) {
    switch (testError.error) {
      case 400:
        throw new BadRequestError(testError.errorCode, testError.message);
      case 404:
        throw new NotFoundError(testError.errorCode, testError.message);
      default:
        throw new InternalServerError(testError.errorCode);
    }
  }

  return testError;
};

export const catchPrismaError = (error: any) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return createErrorObject(
        400,
        "unique constraint failed on field" + error.meta?.target,
        constants.UNIQUE_CONSTRAINT_ERROR
      );
    } else if (error.code === "P2000") {
      return createErrorObject(
        400,
        "the value you provided too long for " + error.meta?.target,
        constants.LONG_VALUE_ERROR
      );
    } else if (error.code === "P2003") {
      return createErrorObject(
        400,
        "the value you provided failed to reference on " + error.meta?.target,
        constants.INVALID_VALUE_ERROR
      );
    } else if (error.code === "P2005") {
      return createErrorObject(
        400,
        "the value you provided for field is invalid " + error.meta?.target,
        constants.INVALID_VALUE_ERROR
      );
    } else {
      return createErrorObject(400, error.message, constants.BAD_REQUEST_ERROR);
    }
  } else {
    return createErrorObject(500, String(error));
  }
};
