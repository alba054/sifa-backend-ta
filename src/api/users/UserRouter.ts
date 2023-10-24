import { Router } from "express";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { BasicAuthMiddleware } from "../../middleware/auth/BasicAuth";
import { ROLE } from "../../utils";
import { multerHelper } from "../../utils/MulterHelper";
import { UserHandler } from "./UserHandler";

export class UserRouter {
  private userHandler: UserHandler;
  private path: string;
  private router: Router;

  constructor() {
    this.path = "/users";
    this.router = Router();
    this.userHandler = new UserHandler();
  }

  register() {
    // * credential
    // * update user profile
    // * post a new user
    this.router
      .route(this.path)
      .get(
        AuthorizationBearer.authorize([
          ROLE.STUDENT,
          ROLE.ADMIN,
          ROLE.LECTURER,
        ]),
        this.userHandler.getUserProfile
      )
      .put(
        AuthorizationBearer.authorize([
          ROLE.STUDENT,
          ROLE.ADMIN,
          ROLE.LECTURER,
        ]),
        this.userHandler.putUserProfile
      )
      .post(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.userHandler.postUser
      )
      .delete(
        AuthorizationBearer.authorize([
          ROLE.STUDENT,
          ROLE.ADMIN,
          ROLE.LECTURER,
        ]),
        this.userHandler.deleteUserAccount
      );

    // * login
    this.router.post(
      this.path + "/login",
      BasicAuthMiddleware.authenticate(),
      this.userHandler.postUserLogin
    );

    // * upload profile pic
    // * get profile pic
    // * delete profile pic
    this.router
      .route(this.path + "/pic")
      .post(
        AuthorizationBearer.authorize([
          ROLE.STUDENT,
          ROLE.ADMIN,
          ROLE.LECTURER,
        ]),
        multerHelper.upload.single("pic"),
        this.userHandler.postProfilePicture
      )
      .get(
        AuthorizationBearer.authorize([
          ROLE.STUDENT,
          ROLE.ADMIN,
          ROLE.LECTURER,
        ]),
        this.userHandler.getUserProfilePic
      )
      .delete(
        AuthorizationBearer.authorize([
          ROLE.STUDENT,
          ROLE.ADMIN,
          ROLE.LECTURER,
        ]),
        this.userHandler.deleteUserProfilePic
      );

    // * get user master data
    this.router
      .route(this.path + "/master")
      .get(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.userHandler.getAllUsers
      );

    // * delete user account by id
    // * edit user profile
    // * get user detail
    this.router
      .route(this.path + "/:id/master")
      .delete(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.userHandler.deleteUserById
      )
      .put(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.userHandler.updateUserById
      )
      .get(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.userHandler.getUserById
      );

    // * student register to class
    // * list of classes (lecturer and student)
    this.router
      .route(this.path + "/classes")
      .put(
        AuthorizationBearer.authorize([ROLE.STUDENT]),
        this.userHandler.putRegistrationStudentToClass
      )
      .get(
        AuthorizationBearer.authorize([ROLE.STUDENT, ROLE.LECTURER]),
        this.userHandler.getUserClasses
      );

    // * class lecturers viewing student waiting list
    this.router
      .route(this.path + "/classes/:id/waiting-lists")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.userHandler.getLecturerStudentsWaitingLists
      );

    // * class lecturers viewing students
    this.router
      .route(this.path + "/classes/:id/students")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.userHandler.getLecturerStudentsClass
      );

    // * user view schedule based on current request time
    this.router
      .route(this.path + "/schedules")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.userHandler.getTodayClassSchedules
      );

    return this.router;
  }
}
