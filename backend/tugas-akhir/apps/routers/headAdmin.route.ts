import express from "express";
import { HeadAdminHandler } from "../handlers/headAdmin.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const headAdminRouter = express.Router();

headAdminRouter
  .route("/sk")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    HeadAdminHandler.getThesisWithSK
  );

headAdminRouter
  .route("/sk/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    HeadAdminHandler.getThesisSKDetail
  );

headAdminRouter
  .route("/examiners/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    HeadAdminHandler.getExaminerSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    HeadAdminHandler.acceptOrRejectExaminerSK
  );

headAdminRouter
  .route("/supervisors/sk/:SKID")
  .get(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    HeadAdminHandler.getSupervisorSKDetail
  )
  .put(
    AuthorizationMiddleware.authorize([constants.ADMINHEAD_GROUP_ACCCESS]),
    HeadAdminHandler.acceptOrRejectSupervisorSK
  );

export default headAdminRouter;
