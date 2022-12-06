import { Student } from "../models/student.model";
import { StudentBuilder } from "../utils/builder/student.builder";
import {
  IStudent,
  IStudentUpdate,
} from "../utils/interfaces/student.interface";

export class StudentService {
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
