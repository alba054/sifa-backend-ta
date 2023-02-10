import express from "express";
import { UserHandler } from "../handlers/user.handler";
import { AuthenticationMiddleware } from "../middlewares/auth/authentication.middleware";
import { AuthorizationMiddleware } from "../middlewares/auth/authorization.middleware";
import { constants } from "../utils/utils";

const userRouter = express.Router();

// * superuser create a new user
// !deprecated
// userRouter.post(
//   "/",
//   AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
//   UserHandler.addNewUserHandler
// );

userRouter.get(
  "/",
  AuthorizationMiddleware.authorize([
    constants.DEAN_GROUP_ACCESS,
    constants.STUDENT_GROUP_ACCESS,
    constants.ADMINHEAD_GROUP_ACCCESS,
    constants.LECTURER_GROUP_ACCESS,
    constants.LAB_ADMIN_GROUP_ACCESS,
    constants.SUPERUSER_GROUP_ACCESS,
    constants.FACULTY_ADMIN_GROUP_ACCESS,
    constants.SUBSECTIONHEAD_GROUP_ACCESS,
    constants.VOCATION_ADMIN_GROUP_ACCESS,
    constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
    constants.VICE_DEAN_GROUP_ACCESS,
  ]),
  UserHandler.getUserCredential
);

// // * student sign up
// userRouter.post(
//   "/students",
//   AuthenticationMiddleware.authenticate("admin"),
//   UserHandler.studentSignUp
// );

// * get all students by superuser
userRouter.get(
  "/students",
  AuthorizationMiddleware.authorize([constants.SUPERUSER_GROUP_ACCESS]),
  UserHandler.getUserStudents
);

// * login as user
userRouter.post(
  "/login",
  AuthenticationMiddleware.authenticate("user"),
  UserHandler.loginHandler
);

// * logout
userRouter.get(
  "/logout/:nim",
  AuthorizationMiddleware.authorize([
    constants.SUPERUSER_GROUP_ACCESS,
    constants.ADMINHEAD_GROUP_ACCCESS,
    constants.DEAN_GROUP_ACCESS,
    constants.STUDENT_GROUP_ACCESS,
    constants.LECTURER_GROUP_ACCESS,
    constants.LAB_ADMIN_GROUP_ACCESS,
    constants.FACULTY_ADMIN_GROUP_ACCESS,
    constants.SUBSECTIONHEAD_GROUP_ACCESS,
    constants.VOCATION_ADMIN_GROUP_ACCESS,
    constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
  ]),
  UserHandler.logoutHandler
);

// * generate token for resetting password
userRouter.get(
  "/:username/forget-password",
  AuthenticationMiddleware.authenticate("admin"),
  UserHandler.forgetPassword
);

// * reset password
userRouter.post(
  "/:username/reset-password/:token",
  AuthenticationMiddleware.authenticate("admin"),
  UserHandler.resetPassword
);

userRouter.get(
  "/:username",
  AuthorizationMiddleware.authorize([
    constants.SUPERUSER_GROUP_ACCESS,
    constants.ADMINHEAD_GROUP_ACCCESS,
    constants.DEAN_GROUP_ACCESS,
    constants.STUDENT_GROUP_ACCESS,
    constants.LECTURER_GROUP_ACCESS,
    constants.LAB_ADMIN_GROUP_ACCESS,
    constants.FACULTY_ADMIN_GROUP_ACCESS,
    constants.SUBSECTIONHEAD_GROUP_ACCESS,
    constants.VOCATION_ADMIN_GROUP_ACCESS,
    constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
    constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
  ]),
  UserHandler.getProfile
);

export default userRouter;
