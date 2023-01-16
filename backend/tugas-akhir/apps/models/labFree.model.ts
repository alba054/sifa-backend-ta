import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import {
  ILabFree,
  ILabFreeUpdate,
} from "../utils/interfaces/labFree.interface";

export class LabFree {
  static async changeRequestLabStatus(reqLabID: number, isAccepted: boolean) {
    try {
      return await prismaDB.bebas_lab.update({
        where: { blId: reqLabID },
        data: { ref_permohonan: isAccepted ? "Diterima" : "Ditolak" },
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

  static async getFreeLabRequestsByLabID(
    labID: number,
    search: string | undefined
  ) {
    if (typeof search !== "undefined") {
      return await prismaDB.bebas_lab.findMany({
        where: {
          AND: [
            { blLabId: labID },
            {
              OR: [
                { blMhsNim: { contains: search } },
                { mahasiswa: { mhsNama: { contains: search } } },
              ],
            },
          ],
        },
      });
    }

    return await prismaDB.bebas_lab.findMany({
      where: { blLabId: labID },
      include: {
        mahasiswa: true,
      },
    });
  }

  static async getFreeLabRequestsByID(reqlabsID: number) {
    return await prismaDB.bebas_lab.findUnique({ where: { blId: reqlabsID } });
  }

  static async editByID(reqlabsID: number, body: ILabFreeUpdate) {
    try {
      await prismaDB.bebas_lab.updateMany({
        where: {
          blId: reqlabsID,
        },
        data: {
          blLabId: body.labID,
          blNomor: body.labFreeNumber,
          blTahun: body.year,
          blTglSurat: body.documentDate,
          ref_permohonan: body.requestStatus,
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

  static async deleteByID(reqlabsID: number) {
    try {
      return await prismaDB.bebas_lab.deleteMany({
        where: {
          blId: reqlabsID,
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

  static async getFreeLabRequestsByNIM(nim: string) {
    const freeLabReqs = await prismaDB.bebas_lab.findMany({
      where: { blMhsNim: nim },
      include: {
        mahasiswa: true,
        ref_laboratorium: true,
      },
    });

    return freeLabReqs;
  }

  static async insertIntoLabFree(labFreeData: ILabFree) {
    try {
      const labFreeReq = await prismaDB.bebas_lab.create({
        data: {
          blMhsNim: labFreeData.studentNIM,
          blLabId: labFreeData.labID,
          blNomor: labFreeData.labFreeNumber,
          ref_permohonan: labFreeData.requestStatus,
          blTahun: labFreeData.year,
          blTglSurat: labFreeData.documentDate,
        },
      });

      return labFreeReq;
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
