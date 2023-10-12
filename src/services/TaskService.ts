import { Class } from "../models/Class";
import {
  catchPrismaError,
  constants,
  createErrorObject,
  ERRORCODE,
  HISTORYTYPE,
  ROLE,
} from "../utils";
import {
  IPostTask,
  IPostTaskSubmission,
  IPutTaskSubmission,
  IPutTurnInStatusTaskSubmission,
} from "../utils/interfaces/Task";
import { v4 as uuidv4 } from "uuid";
import { UploadFileHelper } from "../utils/helper/UploadFileHelper";
import db from "../database";
import { Task } from "../models/Task";
import { TaskSubmission } from "../models/TaskSubmission";
import { User } from "../models/User";

export class TaskService {
  private classModel: Class;
  private taskModel: Task;
  private taskSubmissionModel: TaskSubmission;
  private userModel: User;

  constructor() {
    this.classModel = new Class();
    this.taskModel = new Task();
    this.taskSubmissionModel = new TaskSubmission();
    this.userModel = new User();
  }

  async getTaskSubmissionByTaskId(userId: string, taskId: string) {
    const submission = await this.taskSubmissionModel.getTaskSubmissionByTaskId(
      taskId
    );

    if (!submission) {
      return createErrorObject(
        404,
        "submission's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (submission.studentId !== userId) {
      return createErrorObject(
        400,
        "this submission is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return submission;
  }

  async getTaskSubmissionById(userId: string, role: ROLE, id: string) {
    const submission = await this.taskSubmissionModel.getTaskSubmissionById(id);

    if (!submission) {
      return createErrorObject(
        404,
        "submission's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!submission.task?.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    if (role === ROLE.LECTURER) {
      return submission.turnedInStatus ? submission : null;
    }

    if (submission.studentId !== userId) {
      return createErrorObject(
        400,
        "this submission is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return submission;
  }

  async getStudentTaskSubmissions(userId: string, id: string) {
    const task = await this.taskModel.getTaskById(id);

    if (!task) {
      return createErrorObject(
        404,
        "task's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!task.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.userModel.getUserByClassIncludeTask(task.classId ?? "", id);
  }

  async updateTaskSubmissionById(
    userId: string,
    payload: IPutTaskSubmission,
    id: string,
    files: Express.Multer.File[] | any
  ) {
    const submission = await this.taskSubmissionModel.getTaskSubmissionById(id);

    if (!submission) {
      return createErrorObject(
        404,
        "task's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (submission.studentId !== userId) {
      return createErrorObject(
        400,
        "this submission is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    const uploadedFiles = [];

    if (files.length) {
      submission.attachments.forEach((a) => {
        UploadFileHelper.deleteFile(`${constants.ABS_PATH}/${a.attachment}`);
      });
      try {
        for (const file of files) {
          const uploadedFile = UploadFileHelper.uploadFileBuffer(
            file.originalname,
            `${constants.TASK_SUBMISSION_PATH}/${submission.task?.classId}/${userId}`,
            file.buffer
          );
          uploadedFiles.push(uploadedFile);
        }

        return await db.$transaction([
          db.attachment.deleteMany({
            where: {
              taskSubmissionId: id,
            },
          }),
          db.taskSubmission.update({
            where: {
              id,
            },
            data: {
              description: payload.description,
              attachments: {
                createMany: {
                  data: uploadedFiles.map((f) => {
                    return {
                      id: uuidv4(),
                      name: "",
                      attachment: f,
                      historyType: HISTORYTYPE.TASK_SUBMISSION,
                    };
                  }),
                },
              },
            },
          }),
        ]);
      } catch (error) {
        return catchPrismaError(error);
      }
    }

    return null;
  }

  async deleteTaskSubmissionById(userId: string, id: string) {
    const submission = await this.taskSubmissionModel.getTaskSubmissionById(id);

    if (!submission) {
      return createErrorObject(
        404,
        "task's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (submission.studentId !== userId) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.taskSubmissionModel.deleteTaskSubmissionById(id);
  }

  async updateTurnedInStatusTaskSubmissionById(
    userId: string,
    payload: IPutTurnInStatusTaskSubmission,
    id: string
  ) {
    const submission = await this.taskSubmissionModel.getTaskSubmissionById(id);

    if (!submission) {
      return createErrorObject(
        404,
        "task's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (submission.studentId !== userId) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.taskSubmissionModel.updateTurnedInStatusTaskSubmissionById(
      id,
      payload
    );
  }

  async addTaskSubmission(
    userId: string,
    payload: IPostTaskSubmission,
    files: Express.Multer.File[] | any
  ) {
    const task = await this.taskModel.getTaskById(payload.taskId);

    if (!task) {
      return createErrorObject(
        404,
        "task's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!task.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    const uploadedFiles = [];
    const referenceId = uuidv4();

    try {
      for (const file of files) {
        const uploadedFile = UploadFileHelper.uploadFileBuffer(
          file.originalname,
          `${constants.TASK_SUBMISSION_PATH}/${task.classId}/${userId}`,
          file.buffer
        );
        uploadedFiles.push(uploadedFile);
      }

      return await db.$transaction([
        db.taskSubmission.create({
          data: {
            id: referenceId,
            studentId: userId,
            taskId: payload.taskId,
            description: payload.description,
            attachments: {
              createMany: {
                data: uploadedFiles.map((f) => {
                  return {
                    id: uuidv4(),
                    name: "",
                    attachment: f,
                    historyType: HISTORYTYPE.TASK_SUBMISSION,
                  };
                }),
              },
            },
          },
        }),
      ]);
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getTaskByClassId(userId: string, id: string) {
    const class_ = await this.classModel.getClassById(id);

    if (!class_) {
      return createErrorObject(
        404,
        "class's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!class_.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return this.taskModel.getAnnouncementByClassId(id);
  }

  async deleteTaskById(userId: string, id: string) {
    const task = await this.taskModel.getTaskById(id);

    if (!task) {
      return createErrorObject(
        404,
        "task's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!task.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    try {
      task.attachments.forEach((a) => {
        UploadFileHelper.deleteFile(`${constants.ABS_PATH}/${a.attachment}`);
      });

      return db.$transaction([
        db.attachment.deleteMany({
          where: {
            taskId: id,
          },
        }),
        db.task.delete({
          where: {
            id,
          },
        }),
        db.history.deleteMany({
          where: {
            uri: id,
          },
        }),
      ]);
    } catch (error) {
      return catchPrismaError(error);
    }
  }

  async getTaskById(userId: string, id: string) {
    const task = await this.taskModel.getTaskById(id);

    if (!task) {
      return createErrorObject(
        404,
        "task's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!task.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return task;
  }

  async addNewTask(
    userId: string,
    payload: IPostTask,
    files: Express.Multer.File[] | any
  ) {
    const class_ = await this.classModel.getClassById(payload.classId);

    if (!class_) {
      return createErrorObject(
        404,
        "class's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!class_.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    const uploadedFiles = [];
    const referenceId = uuidv4();

    try {
      for (const file of files) {
        const uploadedFile = UploadFileHelper.uploadFileBuffer(
          file.originalname,
          `${constants.ANNOUNCEMENT_PATH}/${class_.id}`,
          file.buffer
        );
        uploadedFiles.push(uploadedFile);
      }

      return await db.$transaction([
        db.task.create({
          data: {
            id: referenceId,
            name: payload.name ?? "",
            classId: payload.classId,
            description: payload.description,
            dueDate: payload.dueDate,
            attachments: {
              createMany: {
                data: uploadedFiles.map((f) => {
                  return {
                    id: uuidv4(),
                    name: "",
                    attachment: f,
                    historyType: HISTORYTYPE.TASK,
                  };
                }),
              },
            },
          },
        }),
        db.history.create({
          data: {
            historyType: HISTORYTYPE.TASK,
            id: uuidv4(),
            description: payload.description,
            uri: referenceId,
          },
        }),
      ]);
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
