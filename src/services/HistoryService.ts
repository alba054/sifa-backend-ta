import { Class } from "../models/Class";
import { History } from "../models/History";
import { createErrorObject, ERRORCODE } from "../utils";

export class HistoryService {
  private classModel: Class;
  private historyModel: History;

  constructor() {
    this.classModel = new Class();
    this.historyModel = new History();
  }

  async getHistoryByClassId(userId: string, classId: string) {
    const class_ = await this.classModel.getClassById(classId);

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

    return this.historyModel.getHistoriesByClassId(classId);
  }
}
