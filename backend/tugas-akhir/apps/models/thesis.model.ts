import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IThesis } from "../utils/interfaces/thesis.interface";

export class Thesis {
  static async getInProcessThesis() {
    const thesis = await prismaDB.tugas_akhir.findMany({
      where: { statusPermohonan: "Belum_Diproses" },
    });

    return thesis;
  }

  static async deleteThesis(nim: string, thesisID: number) {
    try {
      return await prismaDB.tugas_akhir.deleteMany({
        where: {
          AND: [
            {
              taId: thesisID,
            },
            {
              taMhsNim: nim,
            },
            {
              statusPermohonan: "Belum_Diproses",
            },
          ],
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

  static async getAllProposedThesis(nim: string) {
    const thesis = await prismaDB.tugas_akhir.findMany({
      where: { taMhsNim: nim },
      include: {
        mahasiswa: true,
        ref_laboratorium: true,
        _count: true,
        pengusul: true,
      },
    });

    return thesis;
  }

  static async insertNewThesis(thesis: IThesis) {
    try {
      const newThesis = await prismaDB.tugas_akhir.create({
        data: {
          taJudul: thesis.title,
          taMhsNim: thesis.studentNIM,
          taFile: thesis.thesisFile,
          taLabId: Number(thesis.labID) || undefined,
          taCatatan: thesis.note,
          taCatatanMhs: thesis.studentNote,
          taDosenPengusul: Number(thesis.lecturerPropose) || undefined,
          taKHS: thesis.KHSPath,
          taKRS: thesis.KRSPath,
        },
      });

      return newThesis;
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

  static async selectByGroupID(groupID: number) {
    const group = await prismaDB.adm_group.findUnique({
      where: { id: groupID },
    });

    return group;
  }

  static async selectAllGroups() {
    const groups = await prismaDB.adm_group.findMany();

    return groups;
  }
}
