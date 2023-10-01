import { Class } from "../models/Class";
import { constants, createErrorObject } from "../utils";
import { IPostClass, IPutClass } from "../utils/interfaces/Class";
import { v4 as uuidv4 } from "uuid";

export class ClassService {
  private classModel: Class;

  constructor() {
    this.classModel = new Class();
  }

  async deleteClassById(id: string) {
    const class_ = await this.classModel.getClassById(id);

    if (!class_) {
      return createErrorObject(
        404,
        "class's not found",
        constants.COMMON_NOT_FOUND
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
        constants.COMMON_NOT_FOUND
      );
    }

    return this.classModel.updateClassById(id, payload);
  }

  async getClasses(subjectId: string | undefined) {
    return this.classModel.getAllClasses(subjectId);
  }

  async addNewClass(payload: IPostClass) {
    return this.classModel.inserNewClass(uuidv4(), payload);
  }
}
