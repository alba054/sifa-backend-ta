import express from "express";
import { LecturerHandler } from "../handlers/lecturer.handler";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const lecturerRouter = express.Router();

lecturerRouter.post(
  "/",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LecturerHandler.insertNewLecturer
);

lecturerRouter.get(
  "/",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  LecturerHandler.getAllLecturers
);

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
