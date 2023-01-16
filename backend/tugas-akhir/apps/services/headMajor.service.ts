import { Examiner } from "../models/examiner.model";
import { Thesis } from "../models/thesis.model";
import { ThesisHeadMajorDispositionService } from "./thesisHeadMajorDisposition.service";

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class HeadMajorService {
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
