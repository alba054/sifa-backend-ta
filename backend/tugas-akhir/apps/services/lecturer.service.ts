import { Examiner } from "../models/examiner.model";
import { Lecturer } from "../models/lecturer.model";
import { Seminar } from "../models/seminar.model";
import { SeminarNote } from "../models/seminarNote.model";
import { SeminarReferences } from "../models/seminarRef.model";
import { SeminarScore } from "../models/seminarScore.model";
import { Supervisor } from "../models/supervisor.model";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { decodeBase64 } from "../utils/decoder";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { ILecturer } from "../utils/interfaces/lecturer.interface";
import { ISeminarScorePost } from "../utils/interfaces/seminarScore.interface";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { notifService } from "../utils/notification";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";
import { WebNotifService } from "./webNotif.service";

import { v4 as uuidv4 } from "uuid";

export class LecturerService {
  static async scoreSeminarV2(
    nim: string,
    seminarID: number,
    score: ISeminarScorePost[]
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }
    const lecturer = seminar.seminar_persetujuan.find(
      (s) => s.dosen.dsnNip === nim
    );

    if (typeof lecturer === "undefined") {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrFileKesediaan === null && seminar.smrFileUndangan === null) {
      throw new BadRequestError("cannot scores yet");
    }

    if (seminar.smrFileBeritaAcara !== null) {
      throw new BadRequestError("has been blocked");
    }

    const scoreToInsert: ISeminarScorePost[] = [];
    score.forEach(async (s) => {
      const ref = await SeminarReferences.getSeminarReferencesByID(s.refID);

      if (ref === null) {
        throw new NotFoundError("ref's not found");
      }

      if (s.score > ref.max || s.score < ref.min) {
        throw new BadRequestError("provided score is out of bound");
      }

      s.score = s.score * ref.weight;
      scoreToInsert.push({ score: s.score, refID: s.refID });
    });

    scoreToInsert.forEach(async (s) => {
      await SeminarScore.scoreSeminarV2(seminarID, lecturer.dosen.dsnId, s);
    });

    const seminarScores = await SeminarScore.getSeminarScoresBySeminarID(
      seminarID
    );

    const refByType = await SeminarReferences.getSeminarReferencesBySeminarType(
      seminar.ref_jenisujian
    );

    if (seminarScores.length === refByType.length * 4) {
      const scores = seminarScores.map((s) => s.snilaiNilai);
      if (scores.every((s) => s !== null)) {
        // console.log(scores);

        let finalScore = scores.reduce((total, s) => (total ?? 0) + (s ?? 0));
        // console.log(finalScore);

        finalScore = (finalScore ?? 0) / seminarScores.length;

        await Seminar.updateAvgScore(seminarID, finalScore);
      }
    }
  }

  static async getApprentices(nim: string) {
    return await Thesis.getThesisBySupervisor(nim);
  }

  static async confirmProposedThesis(
    nim: string,
    thesisID: number,
    isAccepted: boolean
  ) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (
      thesis === null ||
      thesis.pengusul.every((p) => p.dosen?.dsnNip !== nim)
    ) {
      throw new NotFoundError("thesis's not found");
    }

    const inserted = await Thesis.confirmProposedThesisByLecturer(
      nim,
      thesisID,
      isAccepted
    );

    if (thesis.pengusul.every((p) => p.statusPermohonan === "Diterima")) {
      const userVocationAdmin = await User.getUsersByBadge(
        constants.VOCATION_ADMIN_GROUP_ACCESS
      );
      const userHeadMajor = await User.getUsersByBadge(
        constants.HEAD_MAJOR_GROUP_ACCESS
      );

      userHeadMajor.forEach(async (u) => {
        const data = {
          userID: u.id,
          role: constants.HEAD_MAJOR_GROUP_ACCESS,
          title: "Persetujuan Judul Tugas Akhir",
          description: `tugas akhir dengan judul ${thesis.taJudul} siap direview`,
          link: "/admin-program-studi/persetujuan/judul-penelitian/permohonan-judul-penelitian",
        } as IWebNotif;
        await WebNotifService.createNotification(data);
      });

      userVocationAdmin.forEach(async (u) => {
        const data = {
          userID: u.id,
          role: constants.VOCATION_ADMIN_GROUP_ACCESS,
          title: "Persetujuan Judul Tugas Akhir",
          description: `tugas akhir dengan judul ${thesis.taJudul} siap direview`,
          link: "/admin-program-studi/persetujuan/judul-penelitian/permohonan-judul-penelitian",
        } as IWebNotif;
        await WebNotifService.createNotification(data);
      });
    }

    return inserted;
  }

  static async getUncorfimedProposedThesisDetail(
    nim: string,
    thesisID: number
  ) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (
      thesis === null ||
      thesis.pengusul.every((p) => p.dosen?.dsnNip !== nim)
    ) {
      throw new NotFoundError("thesis's not found");
    }

    return thesis;
  }

  static async getUncorfimedProposedThesis(nim: string) {
    const thesis = await Thesis.getThesisByLecturerProposer(nim);

    return thesis;
  }

  static async getSeminarOfThesis(nim: string, thesisID: number) {
    return await Seminar.getSeminarOfThesisByLecturer(nim, thesisID);
  }

  static async noteSeminar(nim: string, seminarID: number, note: string) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }
    const lecturer = seminar.seminar_persetujuan.find(
      (s) => s.dosen.dsnNip === nim
    );
    if (typeof lecturer === "undefined") {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrFileKesediaan === null && seminar.smrFileUndangan === null) {
      throw new BadRequestError("seminar's not found");
    }

    return await SeminarNote.noteSeminar(seminarID, lecturer.dosen.dsnId, note);
  }

  static async scoreSeminar(nim: string, seminarID: number, score: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }
    const lecturer = seminar.seminar_persetujuan.find(
      (s) => s.dosen.dsnNip === nim
    );
    if (typeof lecturer === "undefined") {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrFileKesediaan === null && seminar.smrFileUndangan === null) {
      throw new BadRequestError("cannot scores yet");
    }

    if (seminar.smrFileBeritaAcara !== null) {
      throw new BadRequestError("has been blocked");
    }

    const seminarScore = await SeminarScore.scoreSeminar(
      seminarID,
      lecturer.dosen.dsnId,
      score
    );

    const seminarScores = await SeminarScore.getSeminarScoresBySeminarID(
      seminarID
    );

    if (seminarScores.length > 3) {
      const scores = seminarScores.map((s) => s.snilaiNilai);
      if (scores.every((s) => s !== null)) {
        // console.log(scores);

        let finalScore = scores.reduce((total, s) => (total ?? 0) + (s ?? 0));
        // console.log(finalScore);

        finalScore = (finalScore ?? 0) / seminarScores.length;

        await Seminar.updateAvgScore(seminarID, finalScore);
      }
    }

    return seminarScore;
  }

  static async getInvitedSeminarDetail(nim: string, seminarID: number) {
    const seminar = await Seminar.getInvitedSeminarDetail(nim, seminarID);

    if (
      seminar === null ||
      seminar.seminar_persetujuan.some((s) => s.dosen.dsnNip !== nim)
    ) {
      throw new NotFoundError("seminar's not found");
    }

    // if (
    //   seminar.seminar_persetujuan.every(
    //     (s) => s.statusPermohonan !== "Diterima"
    //   )
    // ) {
    //   throw new NotFoundError("seminar has not been approved by all lecturers");
    // }

    return seminar;
  }

  static async getInvitedSeminars(nim: string) {
    const invitedSeminars =
      await Seminar.getInvitedSeminarsBySupervisorUsername(nim);

    return invitedSeminars;
  }

  static async acceptOrRejectScheduledSeminar(
    nim: string,
    seminarID: number,
    isAccepted: boolean,
    signature: string
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    const lecturer = seminar.seminar_persetujuan.find(
      (s) => s.dosen.dsnNip === nim
    );

    if (typeof lecturer === "undefined") {
      throw new NotFoundError("seminar's not found");
    }

    const user = await User.getUserByUsername(
      seminar.tugas_akhir.mahasiswa.mhsNim
    );

    if (user !== null) {
      const message = `${lecturer.dosen.dsnNama} ${
        isAccepted ? "menyetujui" : "menolak"
      } jadwal`;
      notifService.sendNotification(
        message,
        [user.notificationID],
        user.username
      );
    }
    const filename = writeToFile(
      constants.SIGN_FILE_PATH,
      uuidv4() + ".png",
      decodeBase64(signature)
    );

    return await Seminar.changeScheduledSeminarApproval(
      seminarID,
      isAccepted,
      nim,
      `${constants.SIGN_FILE_PATH}/${filename}`
    );
  }

  static async getScheduledSeminarDetail(nim: string, seminarID: number) {
    const seminar = await Seminar.getScheduledSeminarDetailByLecturerUsername(
      nim,
      seminarID
    );

    if (
      seminar === null ||
      typeof seminar.seminar_persetujuan.find((s) => s.dosen.dsnNip === nim) ===
        "undefined"
    ) {
      throw new NotFoundError("seminar's not found");
    }

    return seminar;
  }

  static async getScheduledSeminars(nim: string) {
    const scheduledSeminar =
      await Seminar.getScheduledSeminarBySupervisorUsername(nim);

    return scheduledSeminar;
  }

  static async acceptOrRejectSeminar(
    nim: string,
    seminarID: number,
    isAccepted: boolean
  ) {
    const seminar = await Seminar.getSeminarSupervisorDetail(nim, seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    return await Seminar.changeSupervisorSeminarApproval(
      seminarID,
      isAccepted,
      nim
    );
  }

  static async getSeminarDetail(nim: string, seminarID: number) {
    const seminar = await Seminar.getSeminarSupervisorDetail(nim, seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    return seminar;
  }

  static async getSeminarRequests(nim: string) {
    return await Seminar.getSeminarBySupervisorNIP(nim);
  }

  static async deleteExaminer(nim: string, examinerID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const examinerOffer = await Examiner.getExaminerByID(examinerID);

    if (lecturer === null) {
      return null;
    }

    if (examinerOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== examinerOffer.ujiDsnId) {
      return null;
    }

    if (examinerOffer.statusTerima === "Belum_Diproses") {
      return null;
    }

    return await Examiner.removeExaminerByID(examinerID);
  }

  static async acceptOrRejectExaminerOffer(
    nim: string,
    examinerID: number,
    isAccepted: boolean
  ) {
    const lecturer = await LecturerService.getLecturerProfile(nim);

    if (lecturer === null) {
      throw new BadRequestError("nip is not valid");
    }

    const examiner = await Examiner.getExaminerByID(examinerID);

    if (examiner === null || examiner.ujiDsnId !== lecturer.dsnId) {
      throw new NotFoundError("examiner's not found");
    }

    const examinerOffer = await Examiner.acceptOrRejectexaminerOffer(
      lecturer.dsnId,
      examinerID,
      isAccepted
    );

    return examinerOffer;
  }

  static async getExaminerOfferDetail(nim: string, examinerID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const examinerOffer = await Examiner.getExaminerByID(examinerID);

    if (lecturer === null) {
      return null;
    }

    if (examinerOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== examinerOffer.ujiDsnId) {
      return null;
    }

    return examinerOffer;
  }

  static async getOffersBecomingExaminer(nim: string, acceptanceStatus: any) {
    const lecturer = await this.getLecturerProfile(nim);

    if (lecturer === null) {
      throw new NotFoundError("lecturer is not found");
    }

    const examinerOffers = await Examiner.getExaminerrByLecturerID(
      Number(lecturer.dsnId),
      acceptanceStatus
    );

    return examinerOffers;
  }

  static async acceptOrRejectOffer(
    nim: string,
    supervisorID: number,
    isAccepted: boolean,
    note?: string
  ) {
    const lecturer = await LecturerService.getLecturerProfile(nim);

    if (lecturer === null) {
      return null;
    }

    const supervisor = await Supervisor.getSupervisorByID(supervisorID);

    if (supervisor === null) {
      return null;
    }

    if (supervisor.pmbDsnId !== lecturer.dsnId) {
      return null;
    }

    const supervisorOffer = await Supervisor.acceptOrRejectSupervisorOffer(
      lecturer.dsnId,
      supervisorID,
      isAccepted,
      note
    );

    const user = await User.getUsersByBadge(
      constants.FACULTY_ADMIN_GROUP_ACCESS
    );

    if (
      supervisor.tugas_akhir.pembimbing.every(
        (p) => p.statusTerima === "Diterima"
      )
    ) {
      const vocationAdminUser = await User.getUsersByBadge(
        constants.VOCATION_ADMIN_GROUP_ACCESS
      );
      const headMajorUser = await User.getUsersByBadge(
        constants.HEAD_MAJOR_GROUP_ACCESS
      );

      vocationAdminUser.forEach(async (u) => {
        const data = {
          userID: u.id,
          role: constants.VOCATION_ADMIN_GROUP_ACCESS,
          title: "Penyusunan Tim Penguji",
          description: `tugas akhir dengan judul ${supervisor.tugas_akhir.taJudul} siap diajukan penguji`,
          link: "/tugas-akhir/admin-program-studi/persetujuan/penyusunan-tim-penguji",
        } as IWebNotif;

        await WebNotifService.createNotification(data);
      });

      headMajorUser.forEach(async (u) => {
        const data = {
          userID: u.id,
          role: constants.VOCATION_ADMIN_GROUP_ACCESS,
          title: "Penyusunan Tim Penguji",
          description: `tugas akhir dengan judul ${supervisor.tugas_akhir.taJudul} siap diajukan penguji`,
          link: "/tugas-akhir/admin-program-studi/persetujuan/penyusunan-tim-penguji",
        } as IWebNotif;

        await WebNotifService.createNotification(data);
      });
    }

    if (user) {
      user.forEach(async (u) => {
        const data = {
          userID: u.id,
          role: constants.FACULTY_ADMIN_GROUP_ACCESS,
          title:
            "Daftar Tugas Akhir Yang Perlu Dibuatkan SK Pembimbing dan Penguji",
          description: `tugas akhir baru siap dibuatkan SK pembimbing dan penguji`,
          link: "/admin-fakultas/persetujuan/sk-pembimbing-dan-penguji/pembuatan",
        } as IWebNotif;

        await WebNotifService.createNotification(data);
      });
    }

    return supervisorOffer;
  }

  static async deleteSupervisor(nim: string, supervisorID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const supervisorOffer = await Supervisor.getSupervisorByID(supervisorID);

    if (lecturer === null) {
      return null;
    }

    if (supervisorOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== supervisorOffer.pmbDsnId) {
      return null;
    }

    if (supervisorOffer.statusTerima === "Belum_Diproses") {
      return null;
    }

    return await Supervisor.removeSupervisorByID(supervisorID);
  }

  static async getOfferDetail(nim: string, supervisorID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const supervisorOffer = await Supervisor.getSupervisorByID(supervisorID);

    if (lecturer === null) {
      return null;
    }

    if (supervisorOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== supervisorOffer.pmbDsnId) {
      return null;
    }

    return supervisorOffer;
  }

  static async getOffersBecomingSupervisor(nim: string, acceptanceStatus: any) {
    const lecturer = await this.getLecturerProfile(nim);

    if (lecturer === null) {
      throw new NotFoundError("lecturer is not found");
    }

    const supervisorOffers = await Supervisor.getSupervisorByLecturerID(
      Number(lecturer.dsnId),
      acceptanceStatus
    );

    return supervisorOffers;
  }

  static async getAllLecturers(departmentID: number) {
    const lecturers = await Lecturer.getAllLecturers(departmentID);

    return lecturers;
  }

  static async getLecturerProfile(nim: string) {
    const lecturer = await Lecturer.getLecturerByNIP(nim);

    return lecturer;
  }

  static async insertNewLecturer(body: ILecturer) {
    const newLecturer = await Lecturer.insertIntoLecturer(body);

    return newLecturer;
  }
}
