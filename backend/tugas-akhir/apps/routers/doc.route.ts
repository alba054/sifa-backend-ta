import express from "express";
import { DocumentHandler } from "../handlers/doc.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const docRouter = express.Router();

docRouter
  .route("/students/:nim/free-lab/:reqLabID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
    ]),
    DocumentHandler.getFreeLabData
  );

docRouter
  .route("/students/:nim/sk/supervisors/:SKID")
  .get(
    AuthorizationMiddleware.authorize([
      constants.STUDENT_GROUP_ACCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEAN_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
    ]),
    DocumentHandler.getSupervisorSKData
  );

export default docRouter;
