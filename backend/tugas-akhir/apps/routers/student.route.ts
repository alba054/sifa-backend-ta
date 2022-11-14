import express from "express";
import { StudentHandler } from "../handlers/student.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const studentRouter = express.Router();

studentRouter
  .route("/:nim")
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getStudentProfile
  )
  .put(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.updateProfile
  );

export default studentRouter;
