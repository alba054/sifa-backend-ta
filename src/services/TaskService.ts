import { Class } from "../models/Class";
import {
  catchPrismaError,
  constants,
  createErrorObject,
  ERRORCODE,
  HISTORYTYPE,
} from "../utils";
import { IPostTask } from "../utils/interfaces/Task";
import { v4 as uuidv4 } from "uuid";
import { UploadFileHelper } from "../utils/helper/UploadFileHelper";
import db from "../database";
import { Task } from "../models/Task";

export class TaskService {
  private classModel: Class;
  private taskModel: Task;

  constructor() {
    this.classModel = new Class();
    this.taskModel = new Task();
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
        UploadFileHelper.deleteFile(
          `${constants.ABS_PATH}/storage/${a.attachment}`
        );
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
