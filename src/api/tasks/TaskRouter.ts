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

    // * get task submissions of class (it will return list of submissions for lecturer and the detail for student)
    this.router
      .route(this.path + "/:id/submissions")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getTaskSubmissions,
        this.handler.getTaskSubmissionsStudent
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

    // * upload task submission
    this.router
      .route(this.path + "/submissions")
      .post(
        AuthorizationBearer.authorize([ROLE.STUDENT]),
        multerHelper.upload.array("files"),
        this.handler.postTaskSubmission
      );

    // * delete task submission
    // * edit task submission
    // * get task submission
    this.router
      .route(this.path + "/submissions/:id")
      .delete(
        AuthorizationBearer.authorize([ROLE.STUDENT]),
        this.handler.deleteTaskSubmission
      )
      .put(
        AuthorizationBearer.authorize([ROLE.STUDENT]),
        multerHelper.upload.array("files"),
        this.handler.putTaskSubmission
      )
      .get(
        AuthorizationBearer.authorize([ROLE.STUDENT, ROLE.LECTURER]),
        this.handler.getTaskSubmission
      );

    // * turn in task submission
    this.router
      .route(this.path + "/submissions/:id/turn-in")
      .put(
        AuthorizationBearer.authorize([ROLE.STUDENT]),
        this.handler.putTurnInStatusTaskSubmission
      );

    // * get Task submission attachment
    this.router
      .route(this.path + "/submissions/attachments/:id")
      .get(
        AuthorizationBearer.authorize([ROLE.LECTURER, ROLE.STUDENT]),
        this.handler.getTaskSubmissionAttachment
      );

    return this.router;
  }
}
