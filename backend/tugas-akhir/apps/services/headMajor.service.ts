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
    let examiners = await Thesis.getThesisWithExaminerStatus(status);

    if (status === "unresolved") {
      examiners = examiners.filter((e) => {
        return (
          (e.penguji.filter((e) => e.statusTerima === "Ditolak").length > 0 ||
            e.penguji.length < 1) &&
          e.pembimbing.length > 1
        );
      });
    } else {
      examiners = examiners.filter((e) => {
        return e.penguji.length > 1;
      });
    }

    return examiners;
  }

  static async getExaminersOfThesis(thesisID: number) {
    const examiners = await Examiner.getExaminersByThesisID(thesisID);

    return examiners;
  }

  static async assignExaminer(thesisID: number, body: IAssignedExaminer) {
    return await Examiner.createExaminer(thesisID, body);
  }
}
