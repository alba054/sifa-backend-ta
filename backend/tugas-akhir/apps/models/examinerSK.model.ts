import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IExaminerSKPost } from "../utils/interfaces/examinerSK.interface";

export class ExaminerSK {
  static async signSK(SKID: number, signed: boolean) {
    try {
      return await prismaDB.sk_penguji.update({
        where: { skpId: SKID },
        data: { skpStatus: signed ? 1 : null },
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

  static async changeSKStatus(
    SKID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    return await prismaDB.sk_penguji.update({
      where: {
        skpId: SKID,
      },
      data: {
        statusPermohonan: isAccepted ? "Diterima" : "Ditolak",
        note: note,
      },
    });
  }

  static async getSKByID(SKID: number) {
    return await prismaDB.sk_penguji.findUnique({
      where: { skpId: SKID },
      include: {
        ref_departemen: true,
        ref_prodi: true,
        tugas_akhir: {
          include: {
            mahasiswa: {
              include: {
                ref_prodi: true,
              },
            },
            pembimbing: {
              include: {
                dosen: true,
              },
            },
            penguji: {
              include: {
                dosen: true,
              },
            },
          },
        },
      },
    });
  }

  static async deleteSKByID(SKID: number) {
    try {
      return await prismaDB.sk_penguji.delete({ where: { skpId: SKID } });
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

  static async getExaminerSK() {
    return await prismaDB.sk_penguji.findMany({});
  }

  static async createNewSK(body: IExaminerSKPost, majorID: number | null) {
    try {
      return await prismaDB.sk_penguji.create({
        data: {
          skpTaId: body.thesisID,
          skpNomor: body.SKNumber,
          skpTglSurat: new Date(),
          skpPrdId: majorID === null ? 0 : majorID,
          skpDprtId: 1,
          statusPermohonan: "Belum_Diproses",
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
}
