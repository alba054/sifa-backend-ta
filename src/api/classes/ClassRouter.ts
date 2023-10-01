import { Router } from "express";
import { ClassHandler } from "./ClassHandler.1";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { constants } from "../../utils";

export class ClassRouter {
  private handler: ClassHandler;
  private path: string;
  private router: Router;

  constructor() {
    this.path = "/classes";
    this.router = Router();
    this.handler = new ClassHandler();
  }

  register() {
    // * create subject
    // * get all classes
    this.router
      .route(this.path)
      .post(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.handler.postClass
      )
      .get(
        AuthorizationBearer.authorize([
          constants.ADMIN_ROLE,
          constants.STUDENT_ROLE,
          constants.LECTURER_ROLE,
        ]),
        this.handler.getClasses
      );

    // * edit class
    // * delete class
    this.router
      .route(this.path + "/:id")
      .put(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.handler.putClass
      )
      .delete(
        AuthorizationBearer.authorize([constants.ADMIN_ROLE]),
        this.handler.deleteClass
      );

    return this.router;
  }
}
