import { Router } from "express";
import { AuthorizationBearer } from "../../middleware/auth/AuthorizationBearer";
import { ROLE } from "../../utils";
import { multerHelper } from "../../utils/MulterHelper";
import { TaskHandler } from "./TaskHandler";

export class TaskRouter {
  private path: string;
  private router: Router;
  private handler: TaskHandler;

  constructor() {
    this.path = "/tasks";
    this.router = Router();
    this.handler = new TaskHandler();
  }

  register() {
    // * post Task to class
    this.router
      .route(this.path)
      .post(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        multerHelper.upload.array("files"),
        this.handler.postTasks
      );

    // * get Task detail
    // * delete Task by id
    this.router
      .route(this.path + "/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getTaskDetail
      )
      .delete(
        AuthorizationBearer.authorize([ROLE.LECTURER]),
        this.handler.deleteTask
      );

    // * get Task by class
    this.router
      .route(this.path + "/classes/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getTasks
      );

    // * get Task attachment
    this.router
      .route(this.path + "/attachments/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getTaskAttachment
      );

    return this.router;
  }
}
