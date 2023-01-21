import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { ILabLetterPost } from "../utils/interfaces/labLetter.interface";

export class LabLetter {
  static async deleteLabLetter(labLetterID: number) {
    try {
      return await prismaDB.ref_temp_nosurat.delete({
        where: { tsId: labLetterID },
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

  static async editLabLetter(labLetterID: number, body: ILabLetterPost) {
    try {
      return await prismaDB.ref_temp_nosurat.update({
        where: { tsId: labLetterID },
        data: { tsFormat: body.format, tsJsuratId: body.refLetterID },
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

  static async getLabLettersByID(labLetterID: number) {
    return await prismaDB.ref_temp_nosurat.findUnique({
      where: { tsId: labLetterID },
    });
  }

  static async createNewLabLetter(labID: number, body: ILabLetterPost) {
    return prismaDB.ref_temp_nosurat.create({
      data: {
        tsFormat: body.format,
        tsLabId: labID,
        tsJsuratId: body.refLetterID,
      },
    });
  }

  static async getLabLettersByLabID(labID: number, search?: string) {
    return prismaDB.ref_temp_nosurat.findMany({
      where: { AND: [{ tsLabId: labID }, {}] },
      include: { ref_laboratorium: true, ref_jenis_surat: true },
    });
  }
}
