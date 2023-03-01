import express from "express";
import { statisticHandler } from "../handlers/statistic.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const statisticRouter = express.Router();

statisticRouter
  .route("/supervisors")
  .get(
    AuthorizationMiddleware.authorize([
      constants.HEAD_MAJOR_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    ]),
    statisticHandler.getSupervisorStatisticsByStatus
  );

statisticRouter
  .route("/examiners")
  .get(
    AuthorizationMiddleware.authorize([
      constants.HEAD_MAJOR_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    ]),
    statisticHandler.getExaminerStatisticsByStatus
  );

statisticRouter
  .route("/supervisors/position")
  .get(
    AuthorizationMiddleware.authorize([
      constants.HEAD_MAJOR_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    ]),
    statisticHandler.getSupervisorStatisticsByPosition
  );

export default statisticRouter;
