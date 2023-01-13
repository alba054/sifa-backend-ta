import { Thesis } from "../models/thesis.model";
import { NotFoundError } from "../utils/error/notFoundError";

export class HeadFacultyService {
  static async approveOrRejectProposedThesis(
    thesisID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (thesis === null || thesis.statusPermohonan !== "Diterima") {
      throw new NotFoundError("thesis's not found");
    }

    return await Thesis.approveKRSAndKHSDocument(thesisID, isAccepted, note);
  }

  static async getApprovedThesisDetail(thesisID: number) {
    const approvedThesis = await Thesis.getApprovedThesisDetail(thesisID);

    return approvedThesis;
  }

  static async getApprovedThesis() {
    return await Thesis.getApprovedThesisByVocation(0);
  }
}
