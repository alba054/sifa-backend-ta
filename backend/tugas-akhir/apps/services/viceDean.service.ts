import { ExamProposal } from "../models/examProposal.model";
import { NotFoundError } from "../utils/error/notFoundError";

export class ViceDeanService {
  static async unsignedProposal(examID: number) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    return await ExamProposal.signExamProposal(examID, false);
  }

  static async getHistoryOfSignedProposals() {
    return await ExamProposal.getSignedProposals();
  }

  static async signExamProposal(examID: number, isAccepted: boolean) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    return await ExamProposal.signExamProposal(examID, isAccepted);
  }

  static async getExamProposalDetail(examID: number) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    return proposal;
  }

  static async getListOfUnsignedProposals() {
    return await ExamProposal.getUnsignedProposals();
  }
}
