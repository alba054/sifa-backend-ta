import express from "express";
import { HeadLabHandler } from "../handlers/headLab.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const headLabRouter = express.Router();

// * view approved thesis based on its lab
headLabRouter
  .route("/thesis")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getAllApprovedThesis
  );

// * view thesis detail
// * assign lecturer as supervisor
headLabRouter
  .route("/thesis/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getDetailThesis
  )
  .post(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.assignSupervisor
  );

// * view thesis dispositions
headLabRouter
  .route("/dispositions")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getDispositions
  );

// * view disposition detail
headLabRouter
  .route("/dispositions/:thesisID")
  .get(
    AuthorizationMiddleware.authorize([constants.LAB_ADMIN_GROUP_ACCESS]),
    HeadLabHandler.getDispositionDetail
  );

export default headLabRouter;
