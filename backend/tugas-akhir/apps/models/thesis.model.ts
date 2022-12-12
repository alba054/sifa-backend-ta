import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IThesis } from "../utils/interfaces/thesis.interface";

export class Thesis {
  // * filter statusPermohonan here to ensure consistency on updating
  static async editThesis(thesis: IThesis, thesisID: number) {
    try {
      const updatedThesis = await prismaDB.tugas_akhir.updateMany({
        where: {
          AND: [
            { taMhsNim: thesis.studentNIM },
            { proposalGroupID: thesis.proposalGroupID },
            { statusPermohonan: "Belum_Diproses" },
            { taId: thesisID },
          ],
        },
        data: {
          taJudul: thesis.title,
          taMhsNim: thesis.studentNIM,
          taFile: thesis.thesisFile,
          taLabId: Number(thesis.labID) || undefined,
          taLabId2: Number(thesis.labID2) || undefined,
          taCatatan: thesis.note,
          taCatatanMhs: thesis.studentNote,
          taDosenPengusul: Number(thesis.lecturerPropose) || undefined,
          taKHS: thesis.KHSPath,
          taKRS: thesis.KRSPath,
          proposalGroupID: thesis.proposalGroupID,
        },
      });

      return updatedThesis;
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

  static async getInProcessThesis(nim: string) {
    const thesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          {
            statusPermohonan: "Belum_Diproses",
          },
          {
            taMhsNim: nim,
          },
        ],
      },
      include: {
        mahasiswa: true,
        pengusul: true,
        ref_laboratorium: true,
      },
    });

    return thesis;
  }

  // * filter statusPermohonan here to ensure consistency on deleting
  static async deleteThesis(nim: string, proposalGroupID: string) {
    try {
      return await prismaDB.tugas_akhir.deleteMany({
        where: {
          AND: [
            {
              proposalGroupID,
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
        // _count: true,
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
          taLabId2: Number(thesis.labID2) || undefined,
          taCatatan: thesis.note,
          taCatatanMhs: thesis.studentNote,
          taDosenPengusul: Number(thesis.lecturerPropose) || undefined,
          taKHS: thesis.KHSPath,
          taKRS: thesis.KRSPath,
          proposalGroupID: thesis.proposalGroupID,
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
