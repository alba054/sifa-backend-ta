import express from "express";
import { DeanHandler } from "../handlers/dean.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const deanRouter = express.Router();

deanRouter
  .route("/sk")
  .get(
    AuthorizationMiddleware.authorize([constants.DEAN_GROUP_ACCESS]),
    DeanHandler.getApprovedThesisWithSK
  );

deanRouter
  .route("/sk/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.DEAN_GROUP_ACCESS]),
    DeanHandler.getThesisSKDetail
  );

deanRouter
  .route("/examiners/sk/:SKID")
  .put(
    AuthorizationMiddleware.authorize([constants.DEAN_GROUP_ACCESS]),
    DeanHandler.signExaminerSK
  );

deanRouter
  .route("/supervisors/sk/:SKID")
  .put(
    AuthorizationMiddleware.authorize([constants.DEAN_GROUP_ACCESS]),
    DeanHandler.signSupervisorSK
  );

export default deanRouter;
