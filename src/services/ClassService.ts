import { Class } from "../models/Class";
import { User } from "../models/User";
import { ERRORCODE, ROLE, constants, createErrorObject } from "../utils";
import {
  IPostClass,
  IPutClass,
  IPutUserClass,
} from "../utils/interfaces/Class";
import { v4 as uuidv4 } from "uuid";

export class ClassService {
  private classModel: Class;
  private userModel: User;

  constructor() {
    this.classModel = new Class();
    this.userModel = new User();
  }

  private async checkUserRole(userId: string, role: ROLE) {
    const user = await this.userModel.getUserById(userId);

    if (user?.role === role) {
      return true;
    }

    return false;
  }

  async assignLectureToClassById(id: string, payload: IPutUserClass) {
    const allowUserIds: string[] = [];

    for (let i = 0; i < payload.userIds.length; i++) {
      const id = payload.userIds[i];

      if (await this.checkUserRole(id, ROLE.LECTURER)) {
        allowUserIds.push(id);
      }
    }

    return this.classModel.insertUserToClass(id, allowUserIds);
  }

  async deleteClassById(id: string) {
    const class_ = await this.classModel.getClassById(id);

    if (!class_) {
      return createErrorObject(
        404,
        "class's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    return this.classModel.deleteClassById(id);
  }

  async editClassById(id: string, payload: IPutClass) {
    const class_ = await this.classModel.getClassById(id);

    if (!class_) {
      return createErrorObject(
        404,
        "class's not found",
        ERRORCODE.COMMON_NOT_FOUND
      );
    }

    return this.classModel.updateClassById(id, payload);
  }

  async getClasses(page: number = 1, subjectId: string | undefined) {
    return this.classModel.getAllClasses(page, subjectId);
  }

  async addNewClass(payload: IPostClass) {
    return this.classModel.inserNewClass(uuidv4(), payload);
  }
}
