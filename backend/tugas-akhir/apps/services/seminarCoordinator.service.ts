import { group } from "console";
import { Seminar } from "../models/seminar.model";
import { SeminarReferences } from "../models/seminarRef.model";
import { SeminarScore } from "../models/seminarScore.model";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { decodeBase64 } from "../utils/decoder";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { ISeminarSchedulePost } from "../utils/interfaces/seminar.interface";
import { ISeminarRefPost } from "../utils/interfaces/seminarRef.interface";
import { ISeminarScorePost } from "../utils/interfaces/seminarScore.interface";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { notifService } from "../utils/notification";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";
import { WebNotifService } from "./webNotif.service";

import { v4 as uuidv4 } from "uuid";
import { Lecturer } from "../models/lecturer.model";

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
  static async getSeminarRequestsBeforeApproved() {
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
      if (
        studentThesis[0].seminar.every((s) => !s.smrTglSeminar) &&
        studentThesis[0].seminar.some((s) => s.statusPermohonan !== "Diterima")
      ) {
        response.push({
          NIM: nim,
          name: studentThesis[0].mahasiswa.mhsNama,
          types: studentThesis[0].seminar.filter((s) => !s.smrTglSeminar),
          data: studentThesis,
        });
      }
    }

    return response;
  }

  static async getSeminarsByGroupID(groupID: string) {
    return Seminar.getSeminarByGroupID(groupID);
  }

  static async scoreSeminarV2(
    lecturerID: number,
    seminarID: number,
    score: ISeminarScorePost[]
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }
    const lecturer = seminar.seminar_persetujuan.find(
      (s) => s.ssetujuDsnId === lecturerID
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

    for (let i = 0; i < score.length; i++) {
      const sc = score[i];
      const ref = await SeminarReferences.getSeminarReferencesByID(sc.refID);

      if (ref === null) {
        throw new NotFoundError("ref's not found");
      }

      if (sc.score > ref.max || sc.score < ref.min) {
        throw new BadRequestError("provided score is out of bound");
      }

      sc.score = sc.score * ref.weight;
      scoreToInsert.push({ score: sc.score, refID: sc.refID });
    }

    // score.forEach(async (s) => {
    //   const ref = await SeminarReferences.getSeminarReferencesByID(s.refID);

    //   if (ref === null) {
    //     // throw new NotFoundError("ref's not found");
    //     return "ref's not found";
    //   }

    //   if (s.score > ref.max || s.score < ref.min) {
    //     // throw new BadRequestError("provided score is out of bound");
    //     return "provided score is out of bound";
    //   }

    //   s.score = s.score * ref.weight;
    //   scoreToInsert.push({ score: s.score, refID: s.refID });
    // });

    // scoreToInsert.forEach(async (s) => {
    //   await SeminarScore.scoreSeminarV2(seminarID, lecturer.dosen.dsnId, s);
    // });

    for (let i = 0; i < scoreToInsert.length; i++) {
      const score_ = scoreToInsert[i];
      await SeminarScore.scoreSeminarV2(
        seminarID,
        lecturer.dosen.dsnId,
        score_
      );
    }

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

        finalScore = (finalScore ?? 0) / 4;

        await Seminar.updateAvgScore(seminarID, finalScore);
      }
    }
  }

  static async deleteSeminarRef(refID: number) {
    const ref = await SeminarReferences.getSeminarReferencesByID(refID);

    if (ref === null) {
      throw new NotFoundError("references item's not found");
    }

    return await SeminarReferences.deleteSeminarRefByID(refID);
  }

  static async editSeminarRef(refID: number, body: ISeminarRefPost) {
    const ref = await SeminarReferences.getSeminarReferencesByID(refID);

    if (ref === null) {
      throw new NotFoundError("references item's not found");
    }

    return await SeminarReferences.updateSeminarRef(refID, body);
  }

  static async addSeminarRef(body: ISeminarRefPost) {
    return await SeminarReferences.addSeminarRef(body);
  }

  static async getReferencesItems() {
    return await SeminarReferences.getSeminarReferences();
  }

  static async approveSeminarRequest(seminarID: number, isAccepted: boolean) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    return await Seminar.approveSeminarRequest(seminarID, isAccepted);
  }

  static async scoreSeminar(
    lecturerID: number,
    seminarID: number,
    score: number
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }
    const lecturer = seminar.seminar_persetujuan.find(
      (s) => s.ssetujuDsnId === lecturerID
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
      if (typeof scoringLetterPath === "undefined") {
        throw new BadRequestError("provide scoringLetterPath");
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
      seminar.tugas_akhir.taMhsNim,
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
    approvalPath: string,
    signature: string
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    // if (seminar.smrFileKesediaan !== null && seminar.smrFileUndangan !== null) {
    //   throw new BadRequestError(
    //     "can't create invitation and approval letter. existed"
    //   );
    // }

    let members = seminar.seminar_persetujuan;
    members = members.filter((m) => m.statusPermohonan === "Diterima");

    if (members.length < 3) {
      throw new BadRequestError(
        "can't create invitation and approval letter. at least 3 members approved schedule"
      );
    }

    const filename = writeToFile(
      constants.SIGN_FILE_PATH,
      uuidv4() + ".png",
      decodeBase64(signature)
    );

    const inserted = await Seminar.provideInvitationAndApprovalLetter(
      seminarID,
      invitationPath,
      approvalPath,
      `${constants.SIGN_FILE_PATH}/${filename}`
    );

    const userSupervisor0 = await User.getUserByUsername(
      seminar.seminar_persetujuan[0].dosen.dsnNip
    );
    const userSupervisor1 = await User.getUserByUsername(
      seminar.seminar_persetujuan[1].dosen.dsnNip
    );
    const userExaminer0 = await User.getUserByUsername(
      seminar.seminar_persetujuan[2].dosen.dsnNip
    );
    const userExaminer1 = await User.getUserByUsername(
      seminar.seminar_persetujuan[3].dosen.dsnNip
    );

    const dataSupervisor0 = {
      userID: userSupervisor0?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Daftar Pelaksanaan Seminar/Ujian Mahasiswa Yang Akan Datang",
      description: `akan ada seminar dengan judul tugas akhir ${seminar.tugas_akhir.taJudul}`,
      link: "/dosen/seminar",
    } as IWebNotif;

    const dataSupervisor1 = {
      userID: userSupervisor1?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Daftar Pelaksanaan Seminar/Ujian Mahasiswa Yang Akan Datang",
      description: `akan ada seminar dengan judul tugas akhir ${seminar.tugas_akhir.taJudul}`,
      link: "/dosen/seminar",
    } as IWebNotif;

    const dataExaminer0 = {
      userID: userExaminer0?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Daftar Pelaksanaan Seminar/Ujian Mahasiswa Yang Akan Datang",
      description: `akan ada seminar dengan judul tugas akhir ${seminar.tugas_akhir.taJudul}`,
      link: "/dosen/seminar",
    } as IWebNotif;

    const dataExaminer1 = {
      userID: userExaminer1?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Daftar Pelaksanaan Seminar/Ujian Mahasiswa Yang Akan Datang",
      description: `akan ada seminar dengan judul tugas akhir ${seminar.tugas_akhir.taJudul}`,
      link: "/dosen/seminar",
    } as IWebNotif;

    await WebNotifService.createNotification(dataSupervisor0);
    await WebNotifService.createNotification(dataSupervisor1);
    await WebNotifService.createNotification(dataExaminer0);
    await WebNotifService.createNotification(dataExaminer1);

    return inserted;
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

    if (seminar.statusPermohonan !== "Diterima") {
      throw new BadRequestError("seminar request's not accepted");
    }

    if (seminar.smrNilaiAngka !== null || seminar.smrNilaiHuruf !== null) {
      throw new NotFoundError("seminar has been scored");
    }

    const inserted = await Seminar.editSeminarSchedule(seminarID, body);

    const userSupervisor0 = await User.getUserByUsername(
      seminar.seminar_persetujuan[0].dosen.dsnNip
    );
    const userSupervisor1 = await User.getUserByUsername(
      seminar.seminar_persetujuan[1].dosen.dsnNip
    );
    const userExaminer0 = await User.getUserByUsername(
      seminar.seminar_persetujuan[2].dosen.dsnNip
    );
    const userExaminer1 = await User.getUserByUsername(
      seminar.seminar_persetujuan[3].dosen.dsnNip
    );

    if (body.moderator) {
      const moderator = await Lecturer.getLecturerByID(body.moderator);

      if (moderator === null) {
        throw new NotFoundError("lecturer assigned as moderator is not found");
      }

      const userModerator = await User.getUserByUsername(moderator.dsnNip);

      const dataModerator = {
        userID: userModerator?.id,
        role: constants.LECTURER_GROUP_ACCESS,
        title: "Persetujuan Moderator",
        description: `ditunjuk sebagai moderator seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
        link: "/dosen/persetujuan-pelaksanaan-seminar",
      } as IWebNotif;
      await WebNotifService.createNotification(dataModerator);
    }

    const dataSupervisor0 = {
      userID: userSupervisor0?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    const dataSupervisor1 = {
      userID: userSupervisor1?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    const dataExaminer0 = {
      userID: userExaminer0?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    const dataExaminer1 = {
      userID: userExaminer1?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    await WebNotifService.createNotification(dataSupervisor0);
    await WebNotifService.createNotification(dataSupervisor1);
    await WebNotifService.createNotification(dataExaminer0);
    await WebNotifService.createNotification(dataExaminer1);

    return inserted;
  }

  static async deleteSeminarSchedule(seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.smrNilaiAngka !== null || seminar.smrNilaiHuruf !== null) {
      throw new NotFoundError("seminar has been scored");
    }

    if (!seminar.groupID) {
      throw new BadRequestError("seminar has not been scheduled");
    }

    return Seminar.deleteSeminarSchedule(seminarID, seminar.groupID);
  }

  static async createSeminarSchedule(
    seminarID: number,
    body: ISeminarSchedulePost
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    if (seminar.statusPermohonan !== "Diterima") {
      throw new BadRequestError("seminar request's not accepted");
    }

    if (seminar.smrNilaiAngka !== null || seminar.smrNilaiHuruf !== null) {
      throw new NotFoundError("seminar has been scored");
    }

    if (seminar.tugas_akhir.pembimbing.length < 2) {
      throw new BadRequestError("thesis's supervisors must be 2");
    }

    if (seminar.tugas_akhir.penguji.length < 2) {
      throw new BadRequestError("thesis's examiner must be 2");
    }

    if (body.moderator) {
      const moderator = await Lecturer.getLecturerByID(body.moderator);

      if (moderator === null) {
        throw new NotFoundError("lecturer assigned as moderator is not found");
      }

      const userModerator = await User.getUserByUsername(moderator.dsnNip);

      const dataModerator = {
        userID: userModerator?.id,
        role: constants.LECTURER_GROUP_ACCESS,
        title: "Persetujuan Moderator",
        description: `ditunjuk sebagai moderator seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
        link: "/dosen/persetujuan-pelaksanaan-seminar",
      } as IWebNotif;

      await WebNotifService.createNotification(dataModerator);
    }

    const user = await User.getUserByUsername(
      seminar.tugas_akhir.mahasiswa.mhsNim
    );

    if (user !== null) {
      notifService.sendNotification(
        `seminar koordinator telah menjadwalkan seminar`,
        [user.notificationID],
        seminar.tugas_akhir.mahasiswa.mhsNim
      );
    }
    const inserted = await Seminar.updateSeminarSchedule(seminarID, body);

    const userSupervisor0 = await User.getUserByUsername(
      seminar.seminar_persetujuan[0].dosen.dsnNip
    );
    const userSupervisor1 = await User.getUserByUsername(
      seminar.seminar_persetujuan[1].dosen.dsnNip
    );
    const userExaminer0 = await User.getUserByUsername(
      seminar.seminar_persetujuan[2].dosen.dsnNip
    );
    const userExaminer1 = await User.getUserByUsername(
      seminar.seminar_persetujuan[3].dosen.dsnNip
    );

    const dataSupervisor0 = {
      userID: userSupervisor0?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    const dataSupervisor1 = {
      userID: userSupervisor1?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    const dataExaminer0 = {
      userID: userExaminer0?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    const dataExaminer1 = {
      userID: userExaminer1?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Persetujuan Jadwal Seminar",
      description: `jadwal seminar mahasiswa ${seminar.tugas_akhir.mahasiswa.mhsNama} dengan judul tugas akhir ${seminar.tugas_akhir.taJudul} pada tanggal ${seminar.smrTglSeminar}`,
      link: "/dosen/persetujuan-pelaksanaan-seminar",
    } as IWebNotif;

    await WebNotifService.createNotification(dataSupervisor0);
    await WebNotifService.createNotification(dataSupervisor1);
    await WebNotifService.createNotification(dataExaminer0);
    await WebNotifService.createNotification(dataExaminer1);

    return inserted;
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
      if (
        studentThesis[0].seminar.every((s) => !s.smrTglSeminar) &&
        studentThesis[0].seminar.every((s) => s.statusPermohonan === "Diterima")
      ) {
        response.push({
          NIM: nim,
          name: studentThesis[0].mahasiswa.mhsNama,
          types: studentThesis[0].seminar.filter((s) => !s.smrTglSeminar),
          data: studentThesis,
        });
      }
    }

    return response;
  }
}
