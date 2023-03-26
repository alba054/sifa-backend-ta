import { ExamProposal } from "../models/examProposal.model";
import { Seminar } from "../models/seminar.model";
import { Student } from "../models/student.model";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { StudentBuilder } from "../utils/builder/student.builder";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IRequestExamDocumentPost } from "../utils/interfaces/exam.interface";
import {
  ISeminarDocumentPost,
  ISeminarSchedulePost,
} from "../utils/interfaces/seminar.interface";
import {
  IStudent,
  IStudentUpdate,
} from "../utils/interfaces/student.interface";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { notifService } from "../utils/notification";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";
import { FileService } from "./file.service";
import { WebNotifService } from "./webNotif.service";

export class StudentService {
  static async createSeminarSchedule(
    seminarID: number,
    body: ISeminarSchedulePost
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null) {
      throw new NotFoundError("seminar's not found");
    }

    // if (seminar.statusPermohonan !== "Diterima") {
    //   throw new BadRequestError("seminar request's not accepted");
    // }

    if (seminar.ref_jenisujian !== "Ujian_Skripsi") {
      throw new BadRequestError("cannot schedule seminar but 'ujian skripsi'");
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

  static async deleteSeminar(nim: string, seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.tugas_akhir.taMhsNim !== nim) {
      throw new NotFoundError("seminar's not found");
    }

    if (
      seminar.seminar_persetujuan.filter(
        (s) => s.statusPermohonan === "Diterima"
      ).length > 2
    ) {
      throw new BadRequestError("cannot delete seminar, has been approved");
    }

    return await Seminar.deleteSeminarByID(seminarID);
  }

  static async deleteByNIM(username: string) {
    return await Student.deleteStudentByNIM(username);
  }

  static async getSeminars(nim: string) {
    return await Seminar.getSeminarsByStudentNIM(nim);
  }

  static async deleteExamProposal(nim: string) {
    const examProposal = await ExamProposal.getExamProposalByNIM(nim);

    if (examProposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    if (examProposal?.statusVerifikasiBerkas === "Diterima") {
      throw new BadRequestError("can't delete verified accepted exam proposal");
    }

    return await ExamProposal.deleteExamProposalByStudentNIM(nim);
  }

  static async getExamProposalDetail(nim: string) {
    const exam = await ExamProposal.getExamProposalByNIM(nim);

    if (exam === null) {
      throw new NotFoundError("exam proposal's not found");
    }

    return exam;
  }

  static async requestExam(
    nim: string,
    body: IRequestExamDocumentPost,
    username: any
  ) {
    const thesis = await Thesis.getApprovedThesis(nim);

    if (thesis.length < 1) {
      throw new NotFoundError("you have no approved thesis");
    }

    const examProposal = await ExamProposal.getExamProposalByThesisID(
      thesis[0].taId
    );

    if (examProposal?.statusVerifikasiBerkas === "Diterima") {
      throw new BadRequestError(
        "can't request exam if the previous is already accepted"
      );
    }

    // const newBody: any = [];
    body.doc.forEach(async (d) => {
      d.path = FileService.uploadExamProposalDoc(d.path, username);
      // newBody.push({ name: d.name, path: d.path });
    });

    const inserted = await ExamProposal.createExamProposal(
      body,
      Number(thesis[0].taId)
    );

    const user = await User.getUsersByBadge(
      constants.FACULTY_ADMIN_GROUP_ACCESS
    );

    if (user) {
      user.forEach(async (u) => {
        const data = {
          userID: u.id,
          role: constants.FACULTY_ADMIN_GROUP_ACCESS,
          title: "Permohonan Ujian Sidang",
          description: `mahasiswa dengan judul tugas akhir ${thesis[0].taJudul} mengajukan permohonan ujian sidang`,
          link: "/admin-fakultas/persetujuan/izin-ujian-sidang",
        } as IWebNotif;

        await WebNotifService.createNotification(data);
      });
    }

    return inserted;
  }

  static async getSeminarDetail(nim: string, seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.tugas_akhir.taMhsNim !== nim) {
      throw new NotFoundError("seminar's not found");
    }

    return seminar;
  }

  static async provideSeminarDocument(
    nim: string,
    seminarID: number,
    body: ISeminarDocumentPost,
    username: string
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.tugas_akhir.taMhsNim !== nim) {
      throw new NotFoundError("seminar's not found");
    }

    const newBody: any = [];

    body.doc.forEach(async (d) => {
      d.path = FileService.uploadFileSeminarDoc(d.path, username);
      newBody.push({ name: d.name, path: d.path });
    });

    return await Seminar.provideSeminarDocument(seminarID, newBody);
  }

  static async requestSeminar(nim: string, seminarType: string) {
    if (
      seminarType !== "Seminar_Proposal" &&
      seminarType !== "Seminar_Hasil" &&
      seminarType !== "Ujian_Skripsi"
    ) {
      throw new BadRequestError(
        "seminar type should be Seminar_Proposal | Seminar_Hasil | Ujian_Skripsi"
      );
    }

    const thesis = await Thesis.getApprovedThesis(nim);
    if (typeof thesis === "undefined" || thesis.length !== 1) {
      throw new NotFoundError(
        "cannot request seminar if thesis's not approved"
      );
    }

    if (
      thesis[0].pembimbing.length < 2 ||
      thesis[0].pembimbing[0].statusTerima !== "Diterima" ||
      thesis[0].pembimbing[1].statusTerima !== "Diterima"
    ) {
      throw new NotFoundError(
        "thesis's supervisors has not been assigned or accepted"
      );
    }

    if (seminarType === "Ujian_Skripsi") {
      const examPermission = await ExamProposal.getExamProposalByThesisID(
        thesis[0].taId
      );

      if (
        examPermission?.statusPermohonan !== "Diterima" &&
        !examPermission?.statusTTD &&
        examPermission?.statusValidasiBerkas !== "Diterima" &&
        examPermission?.statusVerifikasiBerkas !== "Diterima"
      ) {
        throw new BadRequestError("can't create exam seminar");
      }
    }

    const supervisorsID = [
      thesis[0].pembimbing[0].pmbId,
      thesis[0].pembimbing[1].pmbId,
    ];

    const seminar = await Seminar.createRequestSeminar(
      thesis[0].taId,
      supervisorsID,
      seminarType
    );

    const seminarCoordinatorUser = await User.getUsersByBadge(
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS
    );

    seminarCoordinatorUser.forEach(async (u) => {
      const data = {
        userID: u.id,
        role: constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
        title: "Persetujuan Seminar Oleh Koordinator Seminar",
        description: `mahasiswa ${thesis[0].mahasiswa.mhsNama} mengajukan permohonan seminar dengan judul tugas akhir ${thesis[0].taJudul}`,
        link: "/koordinator-seminar/persetujuan-seminar",
      } as IWebNotif;
      await WebNotifService.createNotification(data);
    });

    // const userSupervisor0 = await User.getUserByUsername(
    //   thesis[0].pembimbing[0].dosen.dsnNip
    // );
    // const userSupervisor1 = await User.getUserByUsername(
    //   thesis[0].pembimbing[1].dosen.dsnNip
    // );

    // const dataSupervisor0 = {
    //   userID: userSupervisor0?.id,
    //   role: constants.LECTURER_GROUP_ACCESS,
    //   title: "Persetujuan Seminar Oleh Pembimbing",
    //   description: `mahasiswa ${thesis[0].mahasiswa.mhsNama} mengajukan permohonan seminar dengan judul tugas akhir ${thesis[0].taJudul}`,
    //   link: "/dosen/usulan-pembimbing",
    // } as IWebNotif;

    // const dataSupervisor1 = {
    //   userID: userSupervisor1?.id,
    //   role: constants.LECTURER_GROUP_ACCESS,
    //   title: "Persetujuan Seminar Oleh Pembimbing",
    //   description: `mahasiswa ${thesis[0].mahasiswa.mhsNama} mengajukan permohonan seminar dengan judul tugas akhir ${thesis[0].taJudul}`,
    //   link: "/dosen/usulan-pembimbing",
    // } as IWebNotif;

    // await WebNotifService.createNotification(dataSupervisor0);
    // await WebNotifService.createNotification(dataSupervisor1);

    return seminar;
  }

  static async getAllStudents() {
    return await Student.selectAllStudentsWithouPagination();
  }

  static async reuploadKRSAndKHS(
    path: string,
    krsBuffer: Buffer,
    KRSPath: string,
    khsBuffer: Buffer,
    KHSPath: string,
    nim: string,
    thesisID: number
  ) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (thesis === null || thesis.taMhsNim !== nim) {
      throw new NotFoundError("thesis's not found");
    }

    if (thesis.taKRSKHSStatus !== "Ditolak") {
      throw new BadRequestError(
        "hanya dapat mengupload ulang krs dan khs ketika status berkas ditolak"
      );
    }

    await Thesis.updateKRSAndKHSPath(KHSPath, KRSPath, thesisID);

    if (KRSPath !== null && KHSPath !== null) {
      let KRSTitle: string[] | string = KRSPath.split("/");
      let KHSTitle: string[] | string = KHSPath.split("/");

      KRSTitle = KRSTitle[KRSTitle.length - 1];
      KHSTitle = KHSTitle[KHSTitle.length - 1];

      writeToFile(path, KRSTitle, krsBuffer);
      writeToFile(path, KHSTitle, khsBuffer);
    }
  }

  static async getThesisDetail(nim: string, thesisID: number) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (
      thesis === null ||
      thesis.taMhsNim !== nim ||
      thesis.statusPermohonan !== "Diterima"
    ) {
      throw new NotFoundError("thesis's not found");
    }

    return thesis;
  }

  static async updateProfile(nim: string, updatedData: IStudentUpdate) {
    const updatedStudent = await Student.updateStudentProfile(nim, updatedData);

    return updatedStudent;
  }

  static async insertUserIntoStudent(newStudent: IStudent) {
    const student = await Student.insertIntoStudent(
      StudentBuilder.build(newStudent.nim, newStudent.name)
    );

    return student;
  }

  static async getStudentByNIM(nim: string) {
    const student = await Student.selectStudentByNIM(nim);

    return student;
  }
}
