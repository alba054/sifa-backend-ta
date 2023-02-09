import { Examiner } from "../models/examiner.model";
import { Lecturer } from "../models/lecturer.model";
import { Seminar } from "../models/seminar.model";
import { SeminarNote } from "../models/seminarNote.model";
import { SeminarScore } from "../models/seminarScore.model";
import { Supervisor } from "../models/supervisor.model";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { ILecturer } from "../utils/interfaces/lecturer.interface";
import { notifService } from "../utils/notification";

export class LecturerService {
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

    return await Thesis.confirmProposedThesisByLecturer(
      nim,
      thesisID,
      isAccepted
    );
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
    isAccepted: boolean
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

    return await Seminar.changeScheduledSeminarApproval(
      seminarID,
      isAccepted,
      nim
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
    isAccepted: boolean
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
      isAccepted
    );

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
