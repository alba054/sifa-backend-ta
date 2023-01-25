import express from "express";
import { NotificationHandler } from "../handlers/notification.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const notifRouter = express.Router();

notifRouter
  .route("/")
  .get(
    AuthorizationMiddleware.authorize([
      constants.DEAN_GROUP_ACCESS,
      constants.STUDENT_GROUP_ACCESS,
      constants.LECTURER_GROUP_ACCESS,
      constants.ADMINHEAD_GROUP_ACCCESS,
      constants.LAB_ADMIN_GROUP_ACCESS,
      constants.VICE_DEAN_GROUP_ACCESS,
      constants.FACULTY_ADMIN_GROUP_ACCESS,
      constants.SUBSECTIONHEAD_GROUP_ACCESS,
      constants.VOCATION_ADMIN_GROUP_ACCESS,
      constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    ]),
    NotificationHandler.getUserNotification
  );

export default notifRouter;
