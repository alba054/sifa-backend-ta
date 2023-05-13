import { ExaminerSK } from "../models/examinerSK.model";
import { ExamProposal } from "../models/examProposal.model";
import { Seminar } from "../models/seminar.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { VerificationSK } from "../models/verificationSK.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IExaminerSKPost } from "../utils/interfaces/examinerSK.interface";
import { ISupervisorSKPost } from "../utils/interfaces/supervisorSK.interface";
import { IVerificationSKPost } from "../utils/interfaces/verificationSK.interface";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { constants } from "../utils/utils";
import { WebNotifService } from "./webNotif.service";

import { v4 as uuidv4 } from "uuid";
import { decodeBase64 } from "../utils/decoder";
import { writeToFile } from "../utils/storage";

export class HeadFacultyService {
  static async uploadExamProposalDocument(examID: number, doc: string) {
    const examProposal = ExamProposal.getExamProposalByID(examID);

    if (examProposal === null) {
      throw new NotFoundError("exam proposal's not found");
    }

    const filename = writeToFile(
      constants.EXAM_PROPOSAL_PATH,
      uuidv4() + ".pdf",
      decodeBase64(doc)
    );

    return await ExamProposal.uploadDocument(
      examID,
      `${constants.EXAM_PROPOSAL_PATH}/${filename}`
    );
  }

  static async getListOfSignedExamProposal() {
    return await ExamProposal.getSignedProposals();
  }

  static async getVerificationSKDetail(SKID: number) {
    return await VerificationSK.getSKByID(SKID);
  }

  static async deleteVerificationSK(SKID: number) {
    const verificationSK = await VerificationSK.getSKByID(SKID);

    if (verificationSK === null) {
      throw new NotFoundError("sk is not found");
    }

    return await VerificationSK.deleteSKByID(SKID);
  }

  static async getVerificationSK() {
    return VerificationSK.getVerificationSK();
  }

  static async createVerificationSK(body: IVerificationSKPost) {
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

    const verificationSK = await VerificationSK.createNewSK(body);

    // const userSubsection = await User.getUsersByBadge(
    //   constants.SUBSECTIONHEAD_GROUP_ACCESS
    // );

    // userSubsection.forEach(async (u) => {
    //   const data = {
    //     userID: u.id,
    //     role: constants.SUBSECTIONHEAD_GROUP_ACCESS,
    //     title: "SK Pembimbing dan Penguji",
    //     description: `SK penguji tugas akhir dengan judul ${thesis.taJudul} siap direview`,
    //     link: "/kasubag/persetujuan/sk-pembimbing-dan-penguji",
    //   } as IWebNotif;

    //   await WebNotifService.createNotification(data);
    // });

    return verificationSK;
  }

  static async deleteSeminar(seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }
    // if (
    //   seminar.seminar_persetujuan.filter(
    //     (s) => s.statusPermohonan === "Diterima"
    //   ).length > 2
    // ) {
    //   throw new BadRequestError("cannot delete seminar, has been approved");
    // }

    return await Seminar.deleteSeminarByID(seminarID);
  }

  static async getExamDetail(seminarID: number) {
    const exam = await Seminar.getSeminarByID(seminarID);

    if (exam === null) {
      throw new NotFoundError("exam's not found");
    }

    if (
      exam.ref_jenisujian !== "Ujian_Skripsi" &&
      exam.statusPermohonan !== "Diterima"
    ) {
      throw new NotFoundError("not exam or haven't been accepted");
    }

    return exam;
  }

  static async getExamSeminars() {
    let exams = await Seminar.getSeminars();

    exams = exams.filter(
      (s) =>
        s.ref_jenisujian === "Ujian_Skripsi" &&
        s.statusPermohonan === "Diterima"
    );

    return exams;
  }

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

    const inserted = await ExamProposal.updateVerificationStatus(
      examID,
      isAccepted,
      note
    );

    const userSubsection = await User.getUsersByBadge(
      constants.SUBSECTIONHEAD_GROUP_ACCESS
    );

    userSubsection.forEach(async (u) => {
      const data = {
        userID: u.id,
        role: constants.SUBSECTIONHEAD_GROUP_ACCESS,
        title: "Surat Permohonan Izin Ujian Sidang",
        description: `permohonan ujian sidang tugas akhir dengan judul ${proposal.tugas_akhir.taJudul} siap divalidasi`,
        link: "/kasubag/persetujuan/izin-ujian-sidang",
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

  static async getListOfUnverifiedExamProposal() {
    return await ExamProposal.getUnverifiedExamProposals();
  }

  static async getThesisWithSK(status: any) {
    let thesis = await Thesis.getApprovedThesis();

    if (status === "unresolved") {
      thesis = thesis.filter((t) => {
        const noSK =
          (!t.sk_pembimbing.length || !t.sk_penguji.length) &&
          t.pembimbing.length > 1 &&
          t.penguji.length > 1;

        const withSK =
          (t.sk_pembimbing.at(-1)?.statusPermohonanKasubag !== "Diterima" ||
            t.sk_penguji.at(-1)?.statusPermohonanKasubag !== "Diterima") &&
          t.pembimbing.length > 1 &&
          t.penguji.length > 1;

        return noSK || withSK;
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

    const supervisorSK = await SupervisorSK.createNewSK(body);

    const userSubsection = await User.getUsersByBadge(
      constants.SUBSECTIONHEAD_GROUP_ACCESS
    );

    userSubsection.forEach(async (u) => {
      const data = {
        userID: u.id,
        role: constants.SUBSECTIONHEAD_GROUP_ACCESS,
        title: "SK Pembimbing dan Penguji",
        description: `SK pembimbing tugas akhir dengan judul ${thesis.taJudul} siap direview`,
        link: "/kasubag/persetujuan/sk-pembimbing-dan-penguji",
      } as IWebNotif;

      await WebNotifService.createNotification(data);
    });

    return supervisorSK;
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

    const examinerSK = await ExaminerSK.createNewSK(
      body,
      thesis.mahasiswa.mhsPrdId
    );

    const userSubsection = await User.getUsersByBadge(
      constants.SUBSECTIONHEAD_GROUP_ACCESS
    );

    userSubsection.forEach(async (u) => {
      const data = {
        userID: u.id,
        role: constants.SUBSECTIONHEAD_GROUP_ACCESS,
        title: "SK Pembimbing dan Penguji",
        description: `SK penguji tugas akhir dengan judul ${thesis.taJudul} siap direview`,
        link: "/kasubag/persetujuan/sk-pembimbing-dan-penguji",
      } as IWebNotif;

      await WebNotifService.createNotification(data);
    });

    return examinerSK;
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
