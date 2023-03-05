import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { ISeminarRefPost } from "../utils/interfaces/seminarRef.interface";

export class SeminarReferences {
  static async getSeminarReferencesBySeminarType(
    ref_jenisujian: "Seminar_Proposal" | "Seminar_Hasil" | "Ujian_Skripsi"
  ) {
    return await prismaDB.seminar_ref.findMany({
      where: { seminarType: ref_jenisujian },
    });
  }

  static async deleteSeminarRefByID(refID: number) {
    return await prismaDB.seminar_ref.delete({ where: { id: refID } });
  }

  static async updateSeminarRef(refID: number, body: ISeminarRefPost) {
    try {
      return await prismaDB.seminar_ref.update({
        where: { id: refID },
        data: {
          max: body.max,
          min: body.min,
          name: body.name,
          weight: body.weight,
          scoringType: body.scoringType,
          seminarType: body.type,
          status: body.status,
        },
      });
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

  static async getSeminarReferencesByID(refID: number) {
    return await prismaDB.seminar_ref.findUnique({ where: { id: refID } });
  }

  static async addSeminarRef(body: ISeminarRefPost) {
    try {
      return await prismaDB.seminar_ref.create({
        data: {
          max: body.max,
          min: body.min,
          scoringType: body.scoringType,
          seminarType: body.type,
          weight: body.weight,
          status: body.status,
          name: body.name,
        },
      });
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

  static async getSeminarReferences() {
    return await prismaDB.seminar_ref.findMany({});
  }
}
