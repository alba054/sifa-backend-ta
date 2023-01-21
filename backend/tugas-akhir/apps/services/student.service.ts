import { ExamProposal } from "../models/examProposal.model";
import { Seminar } from "../models/seminar.model";
import { Student } from "../models/student.model";
import { Thesis } from "../models/thesis.model";
import { StudentBuilder } from "../utils/builder/student.builder";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IRequestExamDocumentPost } from "../utils/interfaces/exam.interface";
import { ISeminarDocumentPost } from "../utils/interfaces/seminar.interface";
import {
  IStudent,
  IStudentUpdate,
} from "../utils/interfaces/student.interface";
import { writeToFile } from "../utils/storage";

export class StudentService {
  static async deleteExamProposal(nim: string) {
    const examProposal = await ExamProposal.getExamProposalByNIM(nim);

    if (examProposal === null) {
      throw new NotFoundError("proposal's not found");
    }

    if (examProposal?.statusVerifikasiBerkas === "Diterima") {
      throw new BadRequestError("can't accepted exam proposal");
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

  static async requestExam(nim: string, body: IRequestExamDocumentPost) {
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

    return await ExamProposal.createExamProposal(body, Number(thesis[0].taId));
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
    body: ISeminarDocumentPost
  ) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.tugas_akhir.taMhsNim !== nim) {
      throw new NotFoundError("seminar's not found");
    }

    return await Seminar.provideSeminarDocument(seminarID, body);
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

    const supervisorsID = [
      thesis[0].pembimbing[0].pmbId,
      thesis[0].pembimbing[1].pmbId,
    ];

    return await Seminar.createRequestSeminar(
      thesis[0].taId,
      supervisorsID,
      seminarType
    );
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

    if (
      thesis === null ||
      thesis.taMhsNim !== nim ||
      thesis.statusPermohonan === "Ditolak"
    ) {
      throw new NotFoundError("thesis's not found");
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
