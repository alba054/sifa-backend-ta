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

const ACCESS_TOKEN_EXP = 24 * 60 * 60 * 30; // * 1 month
const PASSWORD_RESET_TOKEN_EXP = 5 * 60 * 1000;
// * path to uploaded file
// * change this if using object storage
const UPLOADED_FILE_BASE_URL = "uploaded_file";
// * directory to separate students and other entities files
const STUDENT_UPLOADED_FILE = `./${UPLOADED_FILE_BASE_URL}/students`;

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
  SUBSECTIONHEAD_GROUP_ACCESS: 10,
  ADMINHEAD_GROUP_ACCCESS: 11,
  VICE_DEAN_GROUP_ACCESS: 12,
  SUCCESS_MESSAGE: "success",
  FAILED_MESSAGE: "failed",
  USER_ACTIVE_STATUS: 1,
  USER_INACTIVE_STATUS: 0,
  MAXIMUM_UPLOADED_FILE_SIZE: 5 * 10e6, // * 5 MB
  KRS_AND_KHS_PATH: `${STUDENT_UPLOADED_FILE}/krs_khs`, // * krs and khs path,
  CHAT_FILE_PATH: `${UPLOADED_FILE_BASE_URL}/chats`,
  SIGN_FILE_PATH: `${UPLOADED_FILE_BASE_URL}/signs`,
  SEMINAR_FILE_PATH: `${UPLOADED_FILE_BASE_URL}/seminars`,
  EXAM_FILE_PATH: `${UPLOADED_FILE_BASE_URL}/exams`,
  PROPOSAL_STATUS_IN_PROCESS: "Belum_diproses",
  PROPOSAL_STATUS_APPROVED: "Diterima",
  PROPOSAL_STATUS_REJECTED: "Ditolak",
  SEMINAR_COORDINATOR_DOC_POSTFIX: "seminarkoordinator", // * use encrypted for future dev
  PASSWORD_RESET_TOKEN_EXP,
};
