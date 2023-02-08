import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import {
  IStudent,
  IStudentUpdate,
} from "../utils/interfaces/student.interface";

export class Student implements IStudent {
  static async deleteStudentByNIM(nim: string) {
    try {
      return await prismaDB.mahasiswa.delete({
        where: { mhsNim: nim },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async selectAllStudentsWithouPagination() {
    return await prismaDB.mahasiswa.findMany({
      include: {
        penasehat_akademik: true,
        bebas_lab: true,
        dosen: true,
        ref_prodi: true,
        tugas_akhir: true,
      },
    });
  }

  nim: string;
  name: string;
  address?: string | undefined;
  birthPlace?: string | undefined;
  birthDate?: string | undefined;
  status?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  gender?: "L" | "P";
  educationStage?: "S1" | "S2" | "S3" | "Profesi_Apoteker";
  vocation?: number | undefined;
  academicTeacher?: number | undefined;

  constructor(nim: string, name: string) {
    this.nim = nim;
    this.name = name;
  }

  setAddress(address: string | undefined) {
    this.address = address;
    return this;
  }

  setBirthPlace(birthPlace: string | undefined) {
    this.birthPlace = birthPlace;
    return this;
  }

  setBirthDate(birthDate: string | undefined) {
    this.birthDate = birthDate;
    return this;
  }

  setStatus(status: string | undefined) {
    this.status = status;
    return this;
  }

  setPhone(phone: string | undefined) {
    this.phone = phone;
    return this;
  }

  setGender(gender: "L" | "P") {
    this.gender = gender;
    return this;
  }

  setEducationStage(
    educationStage: "S1" | "S2" | "S3" | "Profesi_Apoteker" | undefined
  ) {
    this.educationStage = educationStage;
    return this;
  }

  setVocation(vocation: number | undefined) {
    this.vocation = vocation;
    return this;
  }

  setAcademicTeacher(academicTeacher: number | undefined) {
    this.academicTeacher = academicTeacher;
    return this;
  }

  static async updateStudentProfile(nim: string, updatedData: IStudentUpdate) {
    try {
      const updatedStudent = await prismaDB.mahasiswa.update({
        where: { mhsNim: nim },
        data: {
          mhsAlamat: updatedData.address,
          mhsEmail: updatedData.email,
          mhsJk: updatedData.gender,
          mhsNoTelp: updatedData.phone,
          mhsTempatLahir: updatedData.birthPlace,
          mhsTglLahir: updatedData.birthDate,
          mhsPrdId: updatedData.vocation,
        },
      });

      return updatedStudent;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async selectAllStudents(page: number, limit: number) {
    const students = await prismaDB.mahasiswa.findMany({
      include: {
        penasehat_akademik: true,
        bebas_lab: true,
        dosen: true,
        ref_prodi: true,
        tugas_akhir: true,
      },
      skip: page,
      take: limit,
    });

    return students;
  }

  static async selectStudentByNIM(nim: string) {
    const student = await prismaDB.mahasiswa.findUnique({
      where: { mhsNim: nim },
      include: {
        penasehat_akademik: true,
        bebas_lab: true,
        dosen: true,
        ref_prodi: true,
        tugas_akhir: true,
      },
    });

    return student;
  }

  static async insertIntoStudent(newStudent: Student) {
    try {
      const student = await prismaDB.mahasiswa.create({
        data: {
          mhsNim: newStudent.nim,
          mhsNama: newStudent.name,
          mhsAlamat: newStudent.address,
          mhsEmail: newStudent.email,
          ref_jenjang: newStudent.educationStage,
          // mhsJenjangId: newStudent.educationStage,
          mhsNoTelp: newStudent.phone,
          mhsPaDsnId: newStudent.academicTeacher,
          mhsPrdId: newStudent.vocation,
          mhsTempatLahir: newStudent.birthPlace,
          mhsTglLahir: newStudent.birthDate,
        },
      });

      return student;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }
}
