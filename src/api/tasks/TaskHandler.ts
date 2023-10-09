import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../../exceptions/httpError/BadRequestError";
import { InternalServerError } from "../../exceptions/httpError/InternalServerError";
import { NotFoundError } from "../../exceptions/httpError/NotFoundError";
import { AttachmentService } from "../../services/AttachmentService";
import { TaskService } from "../../services/TaskService";
import {
  constants,
  createResponse,
  ERRORCODE,
  HISTORYTYPE,
  RESPONSE_MESSAGE,
  throwResultError,
  throwValidationError,
} from "../../utils";
import { IListTasksDTO, ITaskDetailDTO } from "../../utils/dto/TaskDTO";
import { IPostTask } from "../../utils/interfaces/Task";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import { TaskPayloadSchema } from "../../validator/tasks/TaskSchema";
import { Validator } from "../../validator/Validator";

export class TaskHandler {
  private validator: Validator;
  private taskService: TaskService;
  private attachmentService: AttachmentService;

  constructor() {
    this.taskService = new TaskService();
    this.attachmentService = new AttachmentService();
    this.validator = new Validator();

    this.postTasks = this.postTasks.bind(this);
    this.getTaskDetail = this.getTaskDetail.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.getTasks = this.getTasks.bind(this);
    this.getTaskAttachment = this.getTaskAttachment.bind(this);
  }

  async getTaskAttachment(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const attachment = await this.attachmentService.getAttachmentById(
        tokenPayload.userId,
        id,
        HISTORYTYPE.TASK
      );

      if (attachment && "error" in attachment) {
        switch (attachment.error) {
          case 400:
            throw new BadRequestError(attachment.errorCode, attachment.message);
          case 404:
            throw new NotFoundError(attachment.errorCode, attachment.message);
          default:
            throw new InternalServerError(attachment.errorCode);
        }
      }

      return res.sendFile(`${constants.ABS_PATH}/${attachment.attachment}`);
    } catch (error) {
      return next(error);
    }
  }

  async getTasks(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const tasks = await this.taskService.getTaskByClassId(
        tokenPayload.userId,
        id
      );

      if (tasks && "error" in tasks) {
        switch (tasks.error) {
          case 400:
            throw new BadRequestError(tasks.errorCode, tasks.message);
          case 404:
            throw new NotFoundError(tasks.errorCode, tasks.message);
          default:
            throw new InternalServerError(tasks.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          tasks.map((r) => {
            return {
              id: r.id,
              name: r.name,
              updatedAt: r.updatedAt,
              dueDate: Number(r.dueDate),
            } as IListTasksDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async deleteTask(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const testError = await this.taskService.deleteTaskById(
        tokenPayload.userId,
        id
      );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(RESPONSE_MESSAGE.SUCCESS, "successfully delete task")
        );
    } catch (error) {
      return next(error);
    }
  }

  async getTaskDetail(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const task = await this.taskService.getTaskById(tokenPayload.userId, id);

      if (task && "error" in task) {
        switch (task.error) {
          case 400:
            throw new BadRequestError(task.errorCode, task.message);
          case 404:
            throw new NotFoundError(task.errorCode, task.message);
          default:
            throw new InternalServerError(task.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          attachment: task.attachments.map(
            (a) => `${constants.TASK_REFERENCE_URI}${a.id}`
          ),
          id: task.id,
          name: task.name,
          description: task.description,
          updatedAt: task.updatedAt,
          dueDate: Number(task.dueDate),
        } as ITaskDetailDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async postTasks(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const payload: IPostTask = req.body;

    try {
      if (!req.files) {
        throw new BadRequestError(ERRORCODE.BAD_REQUEST_ERROR, "provide files");
      }

      if (!req.files.length) {
        throw new BadRequestError(
          ERRORCODE.BAD_REQUEST_ERROR,
          "at least one file in files"
        );
      }

      const validationResult = this.validator.validate(
        TaskPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.taskService.addNewTask(
        tokenPayload.userId,
        payload,
        req.files
      );
      throwResultError(testError);

      return res
        .status(201)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully add new task to class"
          )
        );
    } catch (error) {
      return next(error);
    }
  }
}
