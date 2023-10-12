import db from "../database";
import { Class } from "../models/Class";
import {
  catchPrismaError,
  constants,
  createErrorObject,
  ERRORCODE,
  HISTORYTYPE,
} from "../utils";
import { IPostReference } from "../utils/interfaces/Reference";
import { v4 as uuidv4 } from "uuid";
import { UploadFileHelper } from "../utils/helper/UploadFileHelper";
import { Reference } from "../models/Reference";
import { ITokenPayload } from "../utils/interfaces/TokenPayload";

export class ReferenceService {
  private classModel: Class;
  private referenceModel: Reference;

  constructor() {
    this.classModel = new Class();
    this.referenceModel = new Reference();
  }

  async deleteReferenceById(userId: string, id: string) {
    const reference = await this.referenceModel.getReferenceById(id);

    if (!reference) {
      return createErrorObject(
        404,
        "reference's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!reference.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    try {
      reference.attachments.forEach((a) => {
        UploadFileHelper.deleteFile(`${constants.ABS_PATH}/${a.attachment}`);
      });

      return db.$transaction([
        db.attachment.deleteMany({
          where: {
            referenceId: id,
          },
        }),
        db.reference.delete({
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

  async getReferenceById(userId: string, id: string) {
    const reference = await this.referenceModel.getReferenceById(id);

    if (!reference) {
      return createErrorObject(
        404,
        "reference's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    if (!reference.Class?.user.find((u) => u.id === userId)) {
      return createErrorObject(
        400,
        "this class is not for you",
        ERRORCODE.BAD_REQUEST_ERROR
      );
    }

    return reference;
  }

  async getReferenceByClassId(userId: string, id: string) {
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

    return this.referenceModel.getReferenceByClassId(id);
  }

  async addNewReference(
    userId: string,
    payload: IPostReference,
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
          `${constants.REFERENCE_PATH}/${class_.id}`,
          file.buffer
        );
        uploadedFiles.push(uploadedFile);
      }

      return await db.$transaction([
        db.reference.create({
          data: {
            id: referenceId,
            name: payload.name ?? "",
            classId: payload.classId,
            description: payload.description,
            attachments: {
              createMany: {
                data: uploadedFiles.map((f) => {
                  return {
                    id: uuidv4(),
                    name: "",
                    attachment: f,
                    historyType: HISTORYTYPE.REFERENCE,
                  };
                }),
              },
            },
          },
        }),
        db.history.create({
          data: {
            historyType: HISTORYTYPE.REFERENCE,
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
