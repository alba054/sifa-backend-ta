import express from "express";
import { FileHandler } from "../handlers/file.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const fileRouter = express.Router();

fileRouter
  .route("/sign")
  .post(
    AuthorizationMiddleware.authorize([
      constants.LECTURER_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    FileHandler.uploadSign
  )
  .get(
    AuthorizationMiddleware.authorize([
      constants.LECTURER_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    FileHandler.getSign
  );

fileRouter
  .route("/students/seminar-docs")
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    FileHandler.uploadSeminarDocs
  );

fileRouter
  .route("/students/seminar-docs/:docname")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    FileHandler.getSeminarDocs
  );

export default fileRouter;
