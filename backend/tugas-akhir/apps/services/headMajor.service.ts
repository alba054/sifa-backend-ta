import { Examiner } from "../models/examiner.model";

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class HeadMajorService {
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
