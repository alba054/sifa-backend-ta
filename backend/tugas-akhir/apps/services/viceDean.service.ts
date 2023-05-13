import { ExamProposal } from "../models/examProposal.model";
import { VerificationSK } from "../models/verificationSK.model";
import { decodeBase64 } from "../utils/decoder";
import { NotFoundError } from "../utils/error/notFoundError";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";

import { v4 as uuidv4 } from "uuid";
import { Thesis } from "../models/thesis.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { ExaminerSK } from "../models/examinerSK.model";

export class ViceDeanService {
  static async getApprovedThesisWithSKDetail(thesisID: number) {
    const thesis = await Thesis.getApprovedThesisDetail(thesisID);

    if (typeof thesis === "undefined") {
      throw new NotFoundError("thesis's not found");
    }

    return thesis;
  }

  static async acceptOrRejectSupervisorSK(
    SKID: number,
    isAccepted: boolean,
    note?: string
  ) {
    const supervisorSK = SupervisorSK.getSKByID(SKID);

    if (supervisorSK === null) {
      throw new NotFoundError("sk's not found");
    }

    return await SupervisorSK.changeViceDeanSKStatus(SKID, isAccepted, note);
  }

  static async getSupervisorSKDetail(SKID: number) {
    return await SupervisorSK.getSKByID(SKID);
  }

  static async acceptOrRejectExaminerSK(
    SKID: number,
    isAccepted: boolean,
    note?: string
  ) {
    const examinerSK = ExaminerSK.getSKByID(SKID);

    if (examinerSK === null) {
      throw new NotFoundError("sk's not found");
    }

    return await ExaminerSK.changeViceDeanSKStatus(SKID, isAccepted, note);
  }

  static async getExaminerSKDetail(SKID: number) {
    return await ExaminerSK.getSKByID(SKID);
  }

  static async getThesisWithSK() {
    let thesis = await Thesis.getApprovedThesis();

    thesis = thesis.filter((t) => {
      return t.sk_pembimbing.length > 0 && t.sk_penguji.length > 0;
    });

    return thesis;
  }

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
