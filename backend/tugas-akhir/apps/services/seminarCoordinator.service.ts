import { Seminar } from "../models/seminar.model";
import { Thesis } from "../models/thesis.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { ISeminarSchedulePost } from "../utils/interfaces/seminar.interface";

/* <PDFSuratKesediaan
        name={"Muh. Yusuf Syam"}
        nim={"H071191044"}
        letterDate={new Date()}
        seminarDate={new Date()}
        seminarTimeStart={new Date()} 
        seminarTimeEnd={new Date()}
        proposalTitle={"RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID"}
        place={"Hybrid (via Zoom)"}
        firstExaminer={"A"}
        secondExaminer={"A"}
        thirdExaminer={"A"}
        fourthExaminer={"A"}
     /> */

//    <PDFUndanganSeminar
//    name={"Muh. Yusuf Syam"}
//    nim={"H071191044"}
//    letterDate={new Date()}
//    proposalTitle={
//      "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID"
//    }
//    firstExaminer={"A"}
//    secondExaminer={"A"}
//    seminarCoordinator={"Abdul Rahim, S.Si, M.Si, Ph.D, Apt. Devon"}
//    seminarCoordinatorNip={"8281970019283100"}
//    mainMentor={"A"}
//    sideMentor={"A"}
//    seminarDate={new Date()}
//    seminarTimeStart={new Date()}
//    seminarTimeEnd={new Date()}
//    mainMentorNip={"8281970019283100"}
//    sideMentorNip={"8281970019283100"}
//    firstExaminerNip={"8281970019283100"}
//    secondExaminerNip={"8281970019283100"}
//    letterNumber={"19/J/J04.01/PP.12/2022"}
//    department={"Matematika"}
//    studyProgram={"Ilmu Komputer"}
//    onlinePlace={
//      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09"
//    }
//    place={"Lt. 2 Farmasi"}
//  />

export class SeminarCoordinatorService {
  static async deleteSeminarScoringAndEventLetter(seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    return await Seminar.deleteScoringAndEventLetter(seminarID);
  }

  static async provideScoringAndEventLetter(
    seminarID: number,
    scoringLetterPath: string,
    eventLetterPath?: string
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.ref_jenisujian === "Ujian_Skripsi") {
      if (typeof eventLetterPath === "undefined") {
        throw new BadRequestError("provide eventLetterPath");
      }
    }

    if (
      seminar.smrFileBeritaAcara !== null &&
      seminar.smrFileKeteranganNilai !== null
    ) {
      throw new BadRequestError(
        "can't create scoring and event letter. existed"
      );
    }

    if (seminar.smrNilaiAngka === null) {
      throw new BadRequestError("hasn't been scored yet");
    }

    return await Seminar.provideScoringAndEventLetter(
      seminarID,
      scoringLetterPath,
      eventLetterPath
    );
  }

  static async getSeminarEvaluationDetail(seminarID: number) {
    const semianr = await Seminar.getEvaluationDetail(seminarID);

    if (semianr === null) {
      throw new NotFoundError("seminar's not found");
    }

    return semianr;
  }

  static async getSeminarEvaluation() {
    const unscored = await Seminar.getSeminarByScore(false);
    const scored = await Seminar.getSeminarByScore(true);

    return { unscoredSeminars: unscored, scoredSeminars: scored };
  }

  static async provideInvitationAndApprovalLetter(
    seminarID: number,
    invitationPath: string,
    approvalPath: string
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrFileKesediaan !== null && seminar.smrFileUndangan !== null) {
      throw new BadRequestError(
        "can't create invitation and approval letter. existed"
      );
    }

    let members = seminar.seminar_persetujuan;
    members = members.filter((m) => m.statusPermohonan === "Diterima");

    if (members.length < 3) {
      throw new BadRequestError(
        "can't create invitation and approval letter. at least 3 members approved schedule"
      );
    }

    return await Seminar.provideInvitationAndApprovalLetter(
      seminarID,
      invitationPath,
      approvalPath
    );
  }

  static async getScheduledSeminarDetail(seminarID: number) {
    const seminar = await Seminar.getScheduledSeminarDetail(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    return seminar;
  }

  static async getScheduledSeminars() {
    const scheduledSeminar = await Seminar.getScheduledSeminars();

    return scheduledSeminar;
  }

  static async updateSeminarSchedule(
    seminarID: number,
    body: ISeminarSchedulePost
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrNilaiAngka !== null || seminar.smrNilaiHuruf !== null) {
      throw new NotFoundError("seminar has been scored");
    }

    return await Seminar.editSeminarSchedule(seminarID, body);
  }

  static async deleteSeminarSchedule(seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrNilaiAngka !== null || seminar.smrNilaiHuruf !== null) {
      throw new NotFoundError("seminar has been scored");
    }

    return Seminar.deleteSeminarSchedule(seminarID);
  }

  static async createSeminarSchedule(
    seminarID: number,
    body: ISeminarSchedulePost
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrNilaiAngka !== null || seminar.smrNilaiHuruf !== null) {
      throw new NotFoundError("seminar has been scored");
    }

    return await Seminar.updateSeminarSchedule(seminarID, body);
  }

  static async getSeminarRequests() {
    let thesis = await Thesis.getApprovedThesis();

    thesis = thesis.filter((t) => {
      return t.seminar.length > 0;
    });

    const uniqueNIM: string[] = [];
    // todo: separate thesis by student's nim
    for (const t of thesis) {
      if (!uniqueNIM.includes(t.taMhsNim)) {
        uniqueNIM.push(t.taMhsNim);
      }
    }

    const response: any[] = [];
    for (const nim of uniqueNIM) {
      const studentThesis = thesis.filter((t) => t.taMhsNim === nim);
      response.push({
        NIM: nim,
        name: studentThesis[0].mahasiswa.mhsNama,
        data: studentThesis,
      });
    }

    return response;
  }
}