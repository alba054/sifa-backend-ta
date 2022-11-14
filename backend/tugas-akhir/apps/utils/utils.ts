import * as dotenv from "dotenv";

dotenv.config();

export const createResponse = (
  status: string,
  message: string,
  data: string | object | null = null
) => {
  if (data) {
    return { status, message, data };
  }

  return { status, message };
};

const ACCESS_TOKEN_EXP = 24 * 60 * 60;
const PASSWORD_RESET_TOKEN_EXP = 5 * 60 * 1000;

export const constants = {
  ACCESS_TOKEN_CLAIMS: {
    expiresIn: ACCESS_TOKEN_EXP,
  },
  INITIAL_CLAIM: {
    issuer: process.env.ISSUER,
  },
  VERIFYING_OPTIONS: {
    issuer: process.env.ISSUER,
  },
  INVALID_TOKEN: "token is invalid",
  MALFORMED_TOKEN:
    "token is not formed correctly. JWT format is xxxx.yyyyy.zzzz",
  SIGNATURE_REQUIRED: "provide secret key to verify token",
  INVALID_SIGNATURE: "secret key is not valid",
  STUDENT_GROUP_ACCESS: 7,
  SUPERUSER_GROUP_ACCESS: 1,
  FACULTY_ADMIN_GROUP_ACCESS: 2,
  DEPARTMENT_ADMIN_GROUP_ACCESS: 3,
  VOCATION_ADMIN_GROUP_ACCESS: 4,
  LAB_ADMIN_GROUP_ACCESS: 5,
  LECTURER_GROUP_ACCESS: 6,
  SEMINAR_COORDINATOR_GROUP_ACCESS: 8,
  DEAN_GROUP_ACCESS: 9,
  SUCCESS_MESSAGE: "success",
  FAILED_MESSAGE: "failed",
  PASSWORD_RESET_TOKEN_EXP,
};
