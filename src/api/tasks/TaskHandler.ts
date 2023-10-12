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
  ROLE,
  throwResultError,
  throwValidationError,
} from "../../utils";
import {
  IListTasksDTO,
  IListTaskSubmissionDTO,
  ITaskDetailDTO,
  ITaskSubmissionDetailDTO,
} from "../../utils/dto/TaskDTO";
import {
  IPostTask,
  IPostTaskSubmission,
  IPutTaskSubmission,
  IPutTurnInStatusTaskSubmission,
} from "../../utils/interfaces/Task";
import { ITokenPayload } from "../../utils/interfaces/TokenPayload";
import {
  TaskPayloadSchema,
  TaskSubmissionPayloadSchema,
  TaskSubmissionUpdatePayloadSchema,
  TurnedInTaskSubmissionPayloadSchema,
} from "../../validator/tasks/TaskSchema";
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
    this.postTaskSubmission = this.postTaskSubmission.bind(this);
    this.putTurnInStatusTaskSubmission =
      this.putTurnInStatusTaskSubmission.bind(this);
    this.deleteTaskSubmission = this.deleteTaskSubmission.bind(this);
    this.putTaskSubmission = this.putTaskSubmission.bind(this);
    this.getTaskSubmissions = this.getTaskSubmissions.bind(this);
    this.getTaskSubmission = this.getTaskSubmission.bind(this);
    this.getTaskSubmissionsStudent = this.getTaskSubmissionsStudent.bind(this);
    this.putTurnInStatusTaskSubmission =
      this.putTurnInStatusTaskSubmission.bind(this);
    this.getTaskSubmissionAttachment =
      this.getTaskSubmissionAttachment.bind(this);
  }

  async getTaskSubmissionAttachment(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const attachment = await this.attachmentService.getAttachmentById(
        tokenPayload.userId,
        id,
        HISTORYTYPE.TASK_SUBMISSION,
        tokenPayload.role
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

  async getTaskSubmissionsStudent(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const submission = await this.taskService.getTaskSubmissionByTaskId(
        tokenPayload.userId,
        id
      );

      if (submission && "error" in submission) {
        switch (submission.error) {
          case 400:
            throw new BadRequestError(submission.errorCode, submission.message);
          case 404:
            throw new NotFoundError(submission.errorCode, submission.message);
          default:
            throw new InternalServerError(submission.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          userId: submission.studentId ?? null,
          studentName: submission.student?.fullname ?? null,
          turnInStatus: submission.turnedInStatus ?? false,
          taskSubmissionId: submission.id ?? null,
          attachment: submission.attachments.map(
            (a) => `${constants.TASK_SUBMISSION_REFERENCE_URI}${a.id}`
          ),
        } as ITaskSubmissionDetailDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async getTaskSubmission(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const submission = await this.taskService.getTaskSubmissionById(
        tokenPayload.userId,
        tokenPayload.role,
        id
      );

      if (submission && "error" in submission) {
        switch (submission.error) {
          case 400:
            throw new BadRequestError(submission.errorCode, submission.message);
          case 404:
            throw new NotFoundError(submission.errorCode, submission.message);
          default:
            throw new InternalServerError(submission.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(RESPONSE_MESSAGE.SUCCESS, {
          userId: submission?.studentId ?? null,
          studentName: submission?.student?.fullname ?? null,
          turnInStatus: submission?.turnedInStatus ?? false,
          taskSubmissionId: submission?.id ?? null,
          attachment: submission?.attachments.map(
            (a) => `${constants.TASK_SUBMISSION_REFERENCE_URI}${a.id}`
          ),
        } as ITaskSubmissionDetailDTO)
      );
    } catch (error) {
      return next(error);
    }
  }

  async getTaskSubmissions(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      if (tokenPayload.role === ROLE.STUDENT) {
        return next();
      }

      const submissions = await this.taskService.getStudentTaskSubmissions(
        tokenPayload.userId,
        id
      );

      if (submissions && "error" in submissions) {
        switch (submissions.error) {
          case 400:
            throw new BadRequestError(
              submissions.errorCode,
              submissions.message
            );
          case 404:
            throw new NotFoundError(submissions.errorCode, submissions.message);
          default:
            throw new InternalServerError(submissions.errorCode);
        }
      }

      return res.status(200).json(
        createResponse(
          RESPONSE_MESSAGE.SUCCESS,
          submissions.map((s) => {
            return {
              studentName: s.fullname,
              userId: s.id,
              taskSubmissionId: s.TaskSubmission[0]?.id ?? null,
              turnInStatus: s.TaskSubmission[0]?.turnedInStatus ?? false,
            } as IListTaskSubmissionDTO;
          })
        )
      );
    } catch (error) {
      return next(error);
    }
  }

  async putTaskSubmission(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;
    const payload: IPutTaskSubmission = req.body;

    try {
      const validationResult = this.validator.validate(
        TaskSubmissionUpdatePayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.taskService.updateTaskSubmissionById(
        tokenPayload.userId,
        payload,
        id,
        req.files
      );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully update task submission"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async deleteTaskSubmission(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;

    try {
      const testError = await this.taskService.deleteTaskSubmissionById(
        tokenPayload.userId,
        id
      );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully delete task submission"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async putTurnInStatusTaskSubmission(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const { id } = req.params;
    const payload: IPutTurnInStatusTaskSubmission = req.body;

    try {
      const validationResult = this.validator.validate(
        TurnedInTaskSubmissionPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError =
        await this.taskService.updateTurnedInStatusTaskSubmissionById(
          tokenPayload.userId,
          payload,
          id
        );
      throwResultError(testError);

      return res
        .status(200)
        .json(
          createResponse(
            RESPONSE_MESSAGE.SUCCESS,
            "successfully submit or unsubmit submission"
          )
        );
    } catch (error) {
      return next(error);
    }
  }

  async postTaskSubmission(req: Request, res: Response, next: NextFunction) {
    const tokenPayload: ITokenPayload = res.locals.user;
    const payload: IPostTaskSubmission = req.body;

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
        TaskSubmissionPayloadSchema,
        payload
      );

      throwValidationError(validationResult);
      const testError = await this.taskService.addTaskSubmission(
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
            "successfully add new task submission"
          )
        );
    } catch (error) {
      return next(error);
    }
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
