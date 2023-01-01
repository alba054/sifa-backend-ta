import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IThesis } from "../utils/interfaces/thesis.interface";

interface IThesisApproval {
  id: number;
  isApproved: boolean;
  note?: string;
}

interface IBody {
  title1: IThesisApproval;
  title2: IThesisApproval;
}

export class Thesis {
  static async getApprovedThesisByLab(labID: number) {
    const approvedThesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          { statusPermohonan: "Diterima" },
          // { OR: [{ taLabId: labID }, { taLabId2: labID }] },
        ],
      },
    });

    return approvedThesis;
  }

  static async getApprovedThesisDetail(id: number) {
    const approvedThesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [{ taId: id }, { statusPermohonan: "Diterima" }],
      },
      include: {
        pengusul: true,
        mahasiswa: true,
        ref_laboratorium: true,
        ref_laboratorium2: true,
        pembimbing: true,
      },
    });

    return approvedThesis[0];

    // try {
    // } catch (error) {
    //   return null;
    // }
  }

  static async updateThesisStatus(proposalGroupID: string, body: IBody) {
    try {
      const thesisOneStatus = body.title1.isApproved ? "Diterima" : "Ditolak";
      const thesisTwoStatus = body.title2.isApproved ? "Diterima" : "Ditolak";
      const resolveDateOne = thesisOneStatus === "Diterima" ? new Date() : null;
      const resolveDateTwo = thesisTwoStatus === "Diterima" ? new Date() : null;

      const noteThesisOne = body.title1.note;
      const noteThesisTwo = body.title2.note;
      const thesis1 = await prismaDB.tugas_akhir.updateMany({
        where: {
          AND: [
            { proposalGroupID: proposalGroupID },
            { taId: body.title1.id },
            { statusPermohonan: "Belum_Diproses" },
          ],
        },
        data: {
          statusPermohonan: thesisOneStatus,
          taCatatan: noteThesisOne,
          tanggalPenyelesaian: resolveDateOne,
        },
      });

      const thesis2 = await prismaDB.tugas_akhir.updateMany({
        where: {
          AND: [
            { proposalGroupID: proposalGroupID },
            { taId: body.title2.id },
            { statusPermohonan: "Belum_Diproses" },
          ],
        },
        data: {
          statusPermohonan: thesisTwoStatus,
          taCatatanMhs: noteThesisTwo,
          tanggalPenyelesaian: resolveDateTwo,
        },
      });

      return [thesis1, thesis2];
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

  static async getApprovedThesisByVocation(vocationID: number) {
    const approvedThesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          // { mahasiswa: { mhsPrdId: vocationID } },
          { statusPermohonan: "Diterima" },
        ],
      },
    });

    return approvedThesis;
  }

  static async getProposedThesisByVocation(vocationID: number) {
    const proposedThesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          // { mahasiswa: { mhsPrdId: vocationID } },
          { statusPermohonan: "Belum_Diproses" },
        ],
      },
    });

    return proposedThesis;
  }

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
