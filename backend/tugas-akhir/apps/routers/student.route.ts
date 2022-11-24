import express from "express";
import { StudentHandler } from "../handlers/student.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { upload } from "../utils/storage";
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

// * get all reqlabs
// * create new lab free request
studentRouter
  .route("/:nim/reqlabs")
  .get(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.getRequestLabs
  )
  .post(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.requestLabFree
  );

// * delete reqlabs
// * update reqlabs
studentRouter
  .route("/:nim/reqlabs/:reqlabsID")
  .delete(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.deleteRequestLab
  )
  .put(
    AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
    StudentHandler.editReqLabs
  );

studentRouter.post(
  "/:nim/upload-krs-and-khs",
  AuthorizationMiddleware.authorize([constants.STUDENT_GROUP_ACCESS]),
  upload.array("docs"),
  StudentHandler.uploadKRSAndKHS
);

export default studentRouter;
