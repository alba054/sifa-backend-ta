import { Subject } from "../models/Subject";
import { constants, createErrorObject } from "../utils";
import { IPostSubject, IPutSubject } from "../utils/interfaces/Subject";
import { v4 as uuidv4 } from "uuid";

export class SubjectService {
  private subjectModel: Subject;

  constructor() {
    this.subjectModel = new Subject();
  }

  async getSubjects() {
    return this.subjectModel.getAllSubjects();
  }

  async deleteSubjectById(id: string) {
    const subject = await this.subjectModel.getSubjectById(id);

    if (!subject) {
      return createErrorObject(
        404,
        "subject's not found",
        constants.COMMON_NOT_FOUND
      );
    }

    return this.subjectModel.deleteSubjectById(id);
  }

  async editSubjectById(id: string, payload: IPutSubject) {
    const subject = await this.subjectModel.getSubjectById(id);

    if (!subject) {
      return createErrorObject(
        404,
        "subject's not found",
        constants.COMMON_NOT_FOUND
      );
    }

    return this.subjectModel.updateSubjectById(id, payload);
  }

  async addNewSubject(payload: IPostSubject) {
    return this.subjectModel.inserNewSubject(uuidv4(), payload);
  }
}
