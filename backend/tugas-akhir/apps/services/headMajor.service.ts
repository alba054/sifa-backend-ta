import { Examiner } from "../models/examiner.model";
import { Thesis } from "../models/thesis.model";
import { NotFoundError } from "../utils/error/notFoundError";
import { ThesisHeadMajorDispositionService } from "./thesisHeadMajorDisposition.service";

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class HeadMajorService {
  static async deleteThesisByID(thesisID: number) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (thesis === null) {
      throw new NotFoundError("thesis's not found");
    }

    return await Thesis.deleteThesisByID(thesisID);
  }

  static async getAllDispositions() {
    return await ThesisHeadMajorDispositionService.getAllDispositions();
  }

  static async getThesisByID(thesisID: number) {
    return await Thesis.getThesisByID(Number(thesisID));
  }

  static async getAllThesis(status: any) {
    return await Thesis.getAllThesis(status);
  }

  static async viewExaminersHistory(status: any) {
    return await Examiner.getAllExaminersAcceptedOrRejected(status);
  }

  static async getExaminersOfThesis(thesisID: number) {
    const examiners = await Examiner.getExaminersByThesisID(thesisID);

    return examiners;
  }

  static async assignExaminer(thesisID: number, body: IAssignedExaminer) {
    return await Examiner.createExaminer(thesisID, body);
  }
}
