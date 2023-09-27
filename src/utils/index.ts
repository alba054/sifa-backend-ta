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
  code?: string | undefined | null
) => {
  if (data) {
    return { status, code, data };
  }

  return { status, code, data: data };
};
