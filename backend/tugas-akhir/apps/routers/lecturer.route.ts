import express from "express";
import { LecturerHandler } from "../handlers/lecturer.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const lecturerRouter = express.Router();

// * post new lecturer
lecturerRouter.post(
  "/",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LecturerHandler.insertNewLecturer
);

// * use {departmentID} as query param to get spesific lecturer based on departmentID
lecturerRouter.get(
  "/",
  AuthenticationMiddleware.authenticate("admin"),
  // AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LecturerHandler.getAllLecturers
);

// * get lecturer's profile
lecturerRouter.get(
  "/:nim",
  AuthorizationMiddleware.authorize([
    constants.SUPERUSER_GROUP_ACCESS,
    constants.LECTURER_GROUP_ACCESS,
  ]),
  LecturerHandler.getLecturersProfile
);

// lecturerRouter
//   .route("/:nim")
//   .get(
//     AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
//     LecturerHandler.getLecturerProfile
//   )
//   .put(
//     AuthorizationMiddleware.authorize([constants.LECTURER_GROUP_ACCESS]),
//     LecturerHandler.updateProfile
//   );

export default lecturerRouter;
