import { ExaminerSK } from "../models/examinerSK.model";
import { ExamProposal } from "../models/examProposal.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { Thesis } from "../models/thesis.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IExaminerSKPost } from "../utils/interfaces/examinerSK.interface";
import { ISupervisorSKPost } from "../utils/interfaces/supervisorSK.interface";

export class HeadFacultyService {
  static async getHistoryOfExamProposal() {
    return await ExamProposal.getHistoryOfExamProposal();
  }

  static async acceptOrRejectExamProposal(
    examID: number,
    isAccepted: boolean,
    note?: string
  ) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    return await ExamProposal.updateVerificationStatus(
      examID,
      isAccepted,
      note
    );
  }

  static async getExamProposalDetail(examID: number) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    return proposal;
  }

  static async getListOfUnverifiedExamProposal() {
    return await ExamProposal.getUnverifiedExamProposals();
  }

  static async getThesisWithSK(status: any) {
    let thesis = await Thesis.getApprovedThesis();

    if (status === "unresolved") {
      thesis = thesis.filter((t) => {
        return !t.sk_pembimbing.length || !t.sk_penguji.length;
      });
    } else {
      thesis = thesis.filter((t) => {
        return t.sk_pembimbing.length > 0 && t.sk_penguji.length > 0;
      });
    }

    return thesis;
  }

  static async getSupervisorSKDetail(SKID: number) {
    return await SupervisorSK.getSKByID(SKID);
  }

  static async deleteSupervisorSK(SKID: number) {
    const supervisorSK = await SupervisorSK.getSKByID(SKID);

    if (supervisorSK === null) {
      throw new NotFoundError("sk is not found");
    }

    return await SupervisorSK.deleteSKByID(SKID);
  }

  static async getSupervisorSK() {
    return SupervisorSK.getSupervisorSK();
  }

  static async getExaminerSKDetail(SKID: number) {
    return await ExaminerSK.getSKByID(SKID);
  }

  static async createSupervisorSK(body: ISupervisorSKPost) {
    const thesis = await Thesis.getThesisByID(body.thesisID);

    if (thesis === null || thesis.taKRSKHSStatus === "Belum_Diproses") {
      throw new NotFoundError("thesis's not found");
    }

    if (
      thesis.pembimbing.length < 2 ||
      thesis.pembimbing[0].statusTerima !== "Diterima" ||
      thesis.pembimbing[1].statusTerima !== "Diterima"
    ) {
      throw new NotFoundError("thesis doesn't have supervisors");
    }

    return SupervisorSK.createNewSK(body);
  }

  static async deleteExaminerSK(SKID: number) {
    const examinerSK = await ExaminerSK.getSKByID(SKID);

    if (examinerSK === null) {
      throw new NotFoundError("sk is not found");
    }

    return await ExaminerSK.deleteSKByID(SKID);
  }

  static async getExaminerSK() {
    return ExaminerSK.getExaminerSK();
  }

  static async createExaminerSK(body: IExaminerSKPost) {
    const thesis = await Thesis.getThesisByID(body.thesisID);

    if (thesis === null || thesis.taKRSKHSStatus === "Belum_Diproses") {
      throw new NotFoundError("thesis's not found");
    }

    if (
      thesis.penguji.length < 2 ||
      thesis.penguji[0].statusTerima !== "Diterima" ||
      thesis.penguji[1].statusTerima !== "Diterima"
    ) {
      throw new NotFoundError("thesis doesn't have examiners");
    }
    // console.log(thesis.mahasiswa.mhsPrdId);

    return await ExaminerSK.createNewSK(body, thesis.mahasiswa.mhsPrdId);
  }

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
