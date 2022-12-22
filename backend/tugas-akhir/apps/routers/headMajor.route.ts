import express from "express";
import { HeadMajorHandler } from "../handlers/headMajor.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const headMajorRouter = express.Router();

// * view all proposed thesis
headMajorRouter
  .route("/thesis/proposed")
  .get(
    AuthorizationMiddleware.authorize([constants.VOCATION_ADMIN_GROUP_ACCESS]),
    HeadMajorHandler.getListOfProposedThesis
  );

// * get approved thesis
headMajorRouter
  .route("/thesis/history")
  .get(
    AuthorizationMiddleware.authorize([constants.VOCATION_ADMIN_GROUP_ACCESS]),
    HeadMajorHandler.getApprovedThesisHistory
  );

// * approve or reject proposed thesis
headMajorRouter
  .route("/thesis/:proposalGroupID/approve-thesis")
  .put(
    AuthorizationMiddleware.authorize([constants.VOCATION_ADMIN_GROUP_ACCESS]),
    HeadMajorHandler.approveProposedThesis
  );

export default headMajorRouter;