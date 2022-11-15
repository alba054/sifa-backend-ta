import express from "express";
import { StudentHandler } from "../handlers/student.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const studentRouter = express.Router();

// * get student's profile
// * update student's profile
studentRouter
  .route("/:nim")
  .get(
    AuthorizationMiddleware.authorize([
      constants.SUPERUSER_GROUP_ACCESS,
      constants.STUDENT_GROUP_ACCESS,
    ]),
    StudentHandler.getStudentProfile
  )
  .put(
    AuthorizationMiddleware.authorize([
      constants.SUPERUSER_GROUP_ACCESS,
      constants.STUDENT_GROUP_ACCESS,
    ]),
    StudentHandler.updateProfile
  );

studentRouter.get(
  "/:nim/reqlabs",
  AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
  StudentHandler.getRequestLabs
);

studentRouter
  .route("/:nim/reqlabs/:reqlabsID")
  .delete(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.deleteRequestLab
  );

// * create new lab free request
studentRouter.post(
  "/:nim/reqlabs/request-lab-free",
  AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
  StudentHandler.requestLabFree
);

export default studentRouter;
