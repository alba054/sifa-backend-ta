import { Lecturer } from "../models/lecturer.model";
import { ILecturer } from "../utils/interfaces/lecturer.interface";

export class LecturerService {
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
