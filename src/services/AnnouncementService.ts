import { Announcement } from "../models/Announcement";
import { Class } from "../models/Class";
import {
  catchPrismaError,
  constants,
  createErrorObject,
  ERRORCODE,
  HISTORYTYPE,
} from "../utils";
import { IPostAnnouncement } from "../utils/interfaces/Announcement";
import { v4 as uuidv4 } from "uuid";
import { UploadFileHelper } from "../utils/helper/UploadFileHelper";
import db from "../database";

export class AnnouncementService {
  private classModel: Class;
  private announcementModel: Announcement;

  constructor() {
    this.classModel = new Class();
    this.announcementModel = new Announcement();
  }

  async getAnnouncementByClassId(userId: string, id: string) {
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

    return this.announcementModel.getAnnouncementByClassId(id);
  }

  async deleteAnnouncementById(userId: string, id: string) {
    const announcement = await this.announcementModel.getAnnouncementById(id);

    if (!announcement) {
      return createErrorObject(
        404,
        "announcement's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!announcement.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    try {
      announcement.attachments.forEach((a) => {
        UploadFileHelper.deleteFile(`${constants.ABS_PATH}/${a.attachment}`);
      });

      return db.$transaction([
        db.attachment.deleteMany({
          where: {
            announcementId: id,
          },
        }),
        db.announcement.delete({
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

  async getAnnouncementById(userId: string, id: string) {
    const announcement = await this.announcementModel.getAnnouncementById(id);

    if (!announcement) {
      return createErrorObject(
        404,
        "announcement's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!announcement.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return announcement;
  }

  async addNewAnnouncement(
    userId: string,
    payload: IPostAnnouncement,
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
        db.announcement.create({
          data: {
            id: referenceId,
            name: payload.name ?? "",
            classId: payload.classId,
            description: payload.description,
            authorId: userId,
            attachments: {
              createMany: {
                data: uploadedFiles.map((f) => {
                  return {
                    id: uuidv4(),
                    name: "",
                    attachment: f,
                    historyType: HISTORYTYPE.ANNOUNCEMENT,
                  };
                }),
              },
            },
          },
        }),
        db.history.create({
          data: {
            historyType: HISTORYTYPE.ANNOUNCEMENT,
            id: uuidv4(),
            description: payload.description,
            uri: referenceId,
            classId: payload.classId,
            lecturerId: userId
          },
        }),
      ]);
    } catch (error) {
      return catchPrismaError(error);
    }
  }
}
