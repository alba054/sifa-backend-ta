import { ThesisHeadMajorDisposition } from "../models/thesisHeadMajorDisposition.model";
import { NotFoundError } from "../utils/error/notFoundError";
import { ThesisService } from "./thesis.service";

interface IHeadMajorApproval {
  thesisID: number;
  departmentName: string;
}

export class ThesisHeadMajorDispositionService {
  static async getAllDispositions() {
    const dispositions = await ThesisHeadMajorDisposition.getDispositions();

    return dispositions;
  }

  static async deleteDispositionOfApprovedThesis(thesisID: number) {
    const thesisDisposition =
      await ThesisHeadMajorDisposition.deleteDispositionOfApprovedThesis(
        thesisID
      );

    return thesisDisposition;
  }

  static async getDispositionOfApprovedThesis(thesisID: number) {
    const thesisDisposition =
      await ThesisHeadMajorDisposition.getDispositionByThesisID(thesisID);

    return thesisDisposition;
  }

  static async createDisposition(body: IHeadMajorApproval) {
    const approvedThesis = await ThesisService.getApprovedThesisDetail(
      body.thesisID
    );

    if (typeof approvedThesis === "undefined") {
      throw new NotFoundError("approved thesis is not found");
    }

    const thesisDisposition =
      await ThesisHeadMajorDisposition.createDisposition(body);

    return thesisDisposition;
  }
}
