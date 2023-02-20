import { NotFoundError } from "@prisma/client/runtime";
import { ExaminerSK } from "../models/examinerSK.model";
import { ExamProposal } from "../models/examProposal.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { constants } from "../utils/utils";
import { WebNotifService } from "./webNotif.service";

export class HeadAdminService {
  static async getHistoryOfExamProposal() {
    return await ExamProposal.getHistoryOfAcceptedOrRejectedExamProposal();
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
    await ExamProposal.updateAcceptanceStatus(examID, isAccepted, note);
    await ExamProposal.updateAcceptanceStatus(examID, isAccepted, note);
    const inserted = await ExamProposal.updateAcceptanceStatus(
      examID,
      isAccepted,
      note
    );

    const userViceDean = await User.getUsersByBadge(
      constants.VICE_DEAN_GROUP_ACCESS
    );

    userViceDean.forEach(async (u) => {
      const data = {
        userID: u.id,
        role: constants.VICE_DEAN_GROUP_ACCESS,
        title: "SK Izin Ujian Sidang",
        description: `SK Ujian Sidang mahasiswa ${proposal.tugas_akhir.mahasiswa.mhsNama} siap di tanda tangani`,
        link: "/wakil-dekan-1/persetujuan/ujian-sidang",
      } as IWebNotif;
      await WebNotifService.createNotification(data);
    });

    return inserted;
  }

  static async getExamProposalDetail(examID: number) {
    const proposal = await ExamProposal.getExamProposalByID(examID);

    if (proposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    return proposal;
  }

  static async getListOfUnvalidatedExamProposal() {
    return await ExamProposal.getInProcessExamProposals();
  }

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

    return await SupervisorSK.changeSKStatus(SKID, isAccepted, note);
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

    return await ExaminerSK.changeSKStatus(SKID, isAccepted, note);
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
}
