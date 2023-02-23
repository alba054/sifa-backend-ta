import express from "express";
import { HeadDepartmentHandler } from "../handlers/headDepartment.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const headDepartmentRouter = express.Router();

headDepartmentRouter
  .route("/thesis/proposed")
  .get(
    AuthorizationMiddleware.authorize([
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    ]),
    HeadDepartmentHandler.getProposedThesis
  );

headDepartmentRouter
  .route("/thesis/:thesisID")
  .put(
    AuthorizationMiddleware.authorize([
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    ]),
    HeadDepartmentHandler.assignLab
  );

export default headDepartmentRouter;
