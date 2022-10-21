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
};
