import { Router } from "express";
import { ClassHandler } from "./ClassHandler";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { ROLE } from "../../utils";

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
    // * create class
    // * get all classes
    this.router
      .route(this.path)
      .post(AuthorizationBearer.authorize([ROLE.ADMIN]), this.handler.postClass)
      .get(
        AuthorizationBearer.authorize([
          ROLE.ADMIN,
          ROLE.STUDENT,
          ROLE.LECTURER,
        ]),
        this.handler.getClasses
      );

    // * edit class
    // * delete class
    this.router
      .route(this.path + "/:id")
      .put(AuthorizationBearer.authorize([ROLE.ADMIN]), this.handler.putClass)
      .delete(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.handler.deleteClass
      );

    // * assign lecturer to class
    this.router
      .route(this.path + "/:id/lecturers")
      .put(
        AuthorizationBearer.authorize([ROLE.ADMIN]),
        this.handler.putLecturerToClass
      );

    return this.router;
  }
}
