import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { ILecturer } from "../utils/interfaces/lecturer.interface";

export class Lecturer {
  static async getExaminersCountByStatus(status?: any) {
    return await prismaDB.dosen.findMany({
      where: {
        AND: [
          { penguji: { every: { statusTerima: "Diterima" } } },
          { mahasiswa: { every: { mhsStatus: status } } },
        ],
      },
      select: { dsnNama: true, penguji: true },
    });
  }

  static async getSupervisorsCountByStatus(status?: any) {
    return await prismaDB.dosen.findMany({
      where: {
        AND: [
          { pembimbing: { every: { statusTerima: "Diterima" } } },
          { mahasiswa: { every: { mhsStatus: status } } },
        ],
      },
      select: { dsnNama: true, pembimbing: true },
    });
  }

  static async getSupervisorsCountByPosition() {
    return await prismaDB.dosen.findMany({
      where: {
        AND: [{ pembimbing: { every: { statusTerima: "Diterima" } } }],
      },
      select: { dsnNama: true, pembimbing: true },
    });
  }

  static async getLecturerByID(lecturerID: number) {
    return await prismaDB.dosen.findUnique({
      where: { dsnId: lecturerID },
    });
  }

  static async deleteLecturerByNIP(nip: string) {
    try {
      return await prismaDB.dosen.delete({
        where: {
          dsnNip: nip,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async getAllLecturers(departmentID: number) {
    let lecturers = [];

    if (departmentID === -1) {
      lecturers = await prismaDB.dosen.findMany({});
    } else {
      lecturers = await prismaDB.dosen.findMany({
        where: { dsnDprtId: departmentID },
      });
    }

    return lecturers;
  }

  static async getLecturerByNIP(nim: string) {
    const lecturer = await prismaDB.dosen.findUnique({
      where: { dsnNip: nim },
      include: {
        ref_departemen: true,
      },
    });

    return lecturer;
  }

  static async insertIntoLecturer(body: ILecturer) {
    try {
      const newLecturer = await prismaDB.dosen.create({
        data: {
          dsnNama: body.name,
          dsnNip: body.nip,
          statusKepegawaian: body.employeeStatus,
          dsnTempatLahir: body.birthPlace,
          dsnAlamat: body.address,
          dsnBidangKeahlian: body.expertise,
          dsnDprtId: body.departmentID,
          dsnEmail: body.email,
          dsnFoto: body.picture,
          dsnGelarBelakang: body.prefixDegree,
          dsnGelarDepan: body.postfixDegree,
          dsnJK: body.gender,
          dsnNIDN: body.NIDN,
          dsnNoSertifikasi: body.sertificationNumber,
          dsnTglLahir: body.birthDate,
          dsnTtd: body.signature,
        },
      });

      return newLecturer;
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
