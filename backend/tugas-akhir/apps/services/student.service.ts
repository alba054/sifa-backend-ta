import { Student } from "../models/student.model";
import { Thesis } from "../models/thesis.model";
import { StudentBuilder } from "../utils/builder/student.builder";
import { NotFoundError } from "../utils/error/notFoundError";
import {
  IStudent,
  IStudentUpdate,
} from "../utils/interfaces/student.interface";
import { writeToFile } from "../utils/storage";

export class StudentService {
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
