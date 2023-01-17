import express from "express";
import { HeadAdminHandler } from "../handlers/headAdmin.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const headAdminRouter = express.Router();

headAdminRouter
  .route("/sk")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    HeadAdminHandler.getThesisWithSK
  );

headAdminRouter
  .route("/examiners/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    HeadAdminHandler.getExaminerSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    HeadAdminHandler.acceptOrRejectExaminerSK
  );

headAdminRouter
  .route("/supervisors/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    HeadAdminHandler.getSupervisorSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.SUBSECTIONHEAD_GROUP_ACCESS]),
    HeadAdminHandler.acceptOrRejectSupervisorSK
  );

export default headAdminRouter;
