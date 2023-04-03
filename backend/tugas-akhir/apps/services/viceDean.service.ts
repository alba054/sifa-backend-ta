import { ExamProposal } from "../models/examProposal.model";
import { VerificationSK } from "../models/verificationSK.model";
import { decodeBase64 } from "../utils/decoder";
import { NotFoundError } from "../utils/error/notFoundError";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";

import { v4 as uuidv4 } from "uuid";

export class ViceDeanService {
  static async verifyVerificationSK(
    SKID: number,
    isAccepted: boolean,
    username: any,
    name: any,
    signature: any
  ) {
    const verificationSK = await VerificationSK.getSKByID(SKID);

    if (verificationSK === null) {
      throw new NotFoundError("verificationSK's not found");
    }

    const filename = writeToFile(
      constants.SIGN_FILE_PATH,
      username + ".png",
      decodeBase64(signature)
    );

    return await VerificationSK.verifyVerificationSK(
      SKID,
      isAccepted,
      username,
      name,
      `${constants.SIGN_FILE_PATH}/${filename}`
    );
  }

  static async getVerificationSKDetail(SKID: number) {
    return await VerificationSK.getSKByID(SKID);
  }

  static async unsignedProposal(examID: number) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    return await ExamProposal.signExamProposal(examID, false, "", "", "");
  }

  static async getHistoryOfSignedProposals() {
    return await ExamProposal.getSignedProposals();
  }

  static async signExamProposal(
    examID: number,
    isAccepted: boolean,
    username: string,
    name: string,
    signature: string
  ) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    const filename = writeToFile(
      constants.SIGN_FILE_PATH,
      username + ".png",
      decodeBase64(signature)
    );

    return await ExamProposal.signExamProposal(
      examID,
      isAccepted,
      username,
      name,
      `${constants.SIGN_FILE_PATH}/${filename}`
    );
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
