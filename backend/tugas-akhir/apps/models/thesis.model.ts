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
  static async getThesisWithAcceptedSupervisorsAndExaminers() {
    return await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          { penguji: { every: { statusTerima: "Diterima" } } },
          { pembimbing: { every: { statusTerima: "Diterima" } } },
        ],
      },
      include: {
        pembimbing: { include: { dosen: true } },
        penguji: { include: { dosen: true } },
      },
    });
  }

  static async updateLab(
    thesisID: number,
    isAccepted: boolean,
    lab1?: number,
    lab2?: number
  ) {
    try {
      return await prismaDB.tugas_akhir.update({
        where: { taId: thesisID },
        data: {
          statusPermohonan: isAccepted ? "Diterima" : "Ditolak",
          taLabId: lab1,
          taLabId2: lab2,
          statusDepartemen: isAccepted ? "Diterima" : "Ditolak",
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

  static async assignDepartmentHead(thesisID: number, departmentHead: number) {
    try {
      return await prismaDB.tugas_akhir.update({
        where: { taId: thesisID },
        data: {
          taKepalaDepartemen: departmentHead,
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

  static async getThesisBySupervisor(nim: string) {
    return await prismaDB.tugas_akhir.findMany({
      where: {
        pembimbing: {
          some: {
            AND: [{ dosen: { dsnNip: nim } }, { statusTerima: "Diterima" }],
          },
        },
      },
      include: {
        mahasiswa: true,
        pembimbing: { include: { dosen: true } },
        penguji: { include: { dosen: true } },
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async confirmProposedThesisByLecturer(
    nim: string,
    thesisID: number,
    isAccepted: boolean
  ) {
    return await prismaDB.pengusul.updateMany({
      where: {
        dosen: { dsnNip: nim },
        tugas_akhirTaId: thesisID,
      },
      data: {
        statusPermohonan: isAccepted ? "Diterima" : "Ditolak",
      },
    });
  }

  static async getThesisByLecturerProposer(nim: string) {
    return await prismaDB.tugas_akhir.findMany({
      where: {
        pengusul: { some: { dosen: { dsnNip: nim } } },
      },
      include: {
        pengusul: { include: { dosen: true } },
        mahasiswa: true,
        ref_laboratorium: true,
        ref_laboratorium2: true,
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async getThesisWithExaminerStatus(
    status: "Belum_Diproses" | "Diterima" | "Ditolak" | undefined
  ) {
    // if (
    // typeof status === "undefined" ||
    // !["Belum_Diproses", "Diterima", "Ditolak"].includes(status);
    // ) {
    return await prismaDB.tugas_akhir.findMany({
      include: {
        penguji: { include: { dosen: true } },
        mahasiswa: true,
        pengusul: { include: { dosen: true } },
        pembimbing: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        sk_pembimbing: true,
        sk_penguji: true,
      },
      orderBy: { updated_at: "desc" },
    });
    // }

    // return await prismaDB.tugas_akhir.findMany({
    //   where: { statusTerima: status },
    //   include: {
    //     dosen: true,
    //     tugas_akhir: true,
    //   },
    // });
  }

  static async deleteThesisByID(thesisID: number) {
    try {
      return await prismaDB.tugas_akhir.delete({
        where: {
          taId: thesisID,
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

  static async getApprovedThesis(nim?: string) {
    return await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          { statusPermohonan: "Diterima" },
          { taMhsNim: nim },
          // { OR: [{ taLabId: labID }, { taLabId2: labID }] },
        ],
      },
      include: {
        mahasiswa: true,
        penguji: { include: { dosen: true } },
        pembimbing: { include: { dosen: true } },
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        sk_pembimbing: true,
        sk_penguji: true,
        seminar: {
          where: {
            smrTglSeminar: null,
            NOT: { ref_jenisujian: "Ujian_Skripsi" },
          },
          include: { seminar_dokumen: true },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async updateKRSAndKHSPath(
    KHSPath: string,
    KRSPath: string,
    thesisID: number
  ) {
    try {
      return await prismaDB.tugas_akhir.update({
        where: { taId: thesisID },
        data: {
          taKRS: KRSPath,
          taKHS: KHSPath,
          taKRSKHSStatus: "Belum_Diproses",
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

  static async approveKRSAndKHSDocument(
    thesisID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    try {
      return await prismaDB.tugas_akhir.update({
        where: { taId: thesisID },
        data: {
          taKRSKHSStatus: isAccepted ? "Diterima" : "Ditolak",
          taCatatanFA: note,
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

  static async getThesisByID(thesisID: number) {
    return await prismaDB.tugas_akhir.findUnique({
      where: { taId: thesisID },
      include: {
        mahasiswa: true,
        penguji: { include: { dosen: true } },
        pembimbing: { include: { dosen: true } },
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        sk_pembimbing: true,
        sk_penguji: true,
      },
    });
  }

  static async getAllThesis(
    status: "Belum_Diproses" | "Diterima" | "Ditolak" | undefined
  ) {
    if (typeof status === "undefined") {
      return await prismaDB.tugas_akhir.findMany({
        where: { pengusul: { every: { statusPermohonan: "Diterima" } } },
        include: {
          penguji: { include: { dosen: true } },
          pembimbing: { include: { dosen: true } },
          pengusul: { include: { dosen: true } },
          ref_laboratorium: true,
          ref_laboratorium2: true,
          mahasiswa: true,
          sk_pembimbing: true,
          sk_penguji: true,
          kepalaDepartemen: true,
        },
        orderBy: { updated_at: "desc" },
      });
    }

    return await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          { statusPermohonan: status },
          { pengusul: { every: { statusPermohonan: "Diterima" } } },
        ],
      },
      include: {
        penguji: { include: { dosen: true } },
        pembimbing: { include: { dosen: true } },
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        mahasiswa: true,
        sk_pembimbing: true,
        sk_penguji: true,
        kepalaDepartemen: true,
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async getThesisByProposalGroupID(proposalGroupID: string) {
    return await prismaDB.tugas_akhir.findMany({
      where: { proposalGroupID },
      include: {
        mahasiswa: true,
        penguji: { include: { dosen: true } },
        pembimbing: { include: { dosen: true } },
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        sk_pembimbing: true,
        sk_penguji: true,
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async getApprovedThesisByLab(labID: number, title?: string) {
    const approvedThesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          { statusPermohonan: "Diterima" },
          // { OR: [{ taLabId: labID }, { taLabId2: labID }] },
          { taJudul: { contains: title } },
          { statusDepartemen: "Diterima" },
        ],
      },
      include: {
        mahasiswa: true,
        penguji: { include: { dosen: true } },
        pembimbing: { include: { dosen: true } },
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        sk_pembimbing: true,
        sk_penguji: true,
      },
      orderBy: { updated_at: "desc" },
    });

    return approvedThesis;
  }

  static async getApprovedThesisDetail(id: number) {
    const approvedThesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [{ taId: id }, { statusPermohonan: "Diterima" }],
      },
      include: {
        pengusul: { include: { dosen: true } },
        mahasiswa: true,
        ref_laboratorium: true,
        ref_laboratorium2: true,
        pembimbing: { include: { dosen: true } },
        penguji: { include: { dosen: true } },
        sk_pembimbing: true,
        sk_penguji: true,
      },
      orderBy: { updated_at: "desc" },
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
          statusDepartemen: "Diterima",
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
          taCatatan: noteThesisTwo,
          statusDepartemen: "Diterima",
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
          { pengusul: { every: { statusPermohonan: "Diterima" } } },
          // { mahasiswa: { mhsPrdId: vocationID } },
          { statusPermohonan: "Diterima" },
        ],
      },
      include: {
        ref_laboratorium: true,
        ref_laboratorium2: true,
        mahasiswa: true,
        pengusul: { include: { dosen: true } },
        disposisi_kaprodi: true,
        sk_pembimbing: true,
        sk_penguji: true,
        pembimbing: { include: { dosen: true } },
        penguji: { include: { dosen: true } },
      },
      orderBy: { updated_at: "desc" },
    });

    return approvedThesis;
  }

  static async getProposedThesisByVocation(vocationID: number) {
    const proposedThesis = await prismaDB.tugas_akhir.findMany({
      where: {
        AND: [
          // { mahasiswa: { mhsPrdId: vocationID } },
          { statusPermohonan: "Belum_Diproses" },
          { pengusul: { every: { statusPermohonan: "Diterima" } } },
        ],
      },
      include: {
        mahasiswa: true,
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        sk_pembimbing: true,
        sk_penguji: true,
      },
      orderBy: { updated_at: "desc" },
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
        pengusul: { include: { dosen: true } },
        ref_laboratorium: true,
        ref_laboratorium2: true,
        sk_pembimbing: true,
        sk_penguji: true,
      },
      orderBy: { updated_at: "desc" },
    });

    return thesis;
  }

  // * filter statusPermohonan here to ensure consistency on deleting
  static async deleteThesis(proposalGroupID: string) {
    try {
      return await prismaDB.tugas_akhir.deleteMany({
        where: {
          proposalGroupID,
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
        ref_laboratorium2: true,
        // _count: true,
        pengusul: { include: { dosen: true } },
        pembimbing: { include: { dosen: true } },
        penguji: { include: { dosen: true } },
        sk_pembimbing: true,
        sk_penguji: true,
      },
      orderBy: { updated_at: "desc" },
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
          taKHS: thesis.KHSPath,
          taKRS: thesis.KRSPath,
          proposalGroupID: thesis.proposalGroupID,
        },
      });

      if (typeof thesis.lecturerPropose !== "undefined") {
        await prismaDB.pengusul.create({
          data: {
            dosenDsnId: thesis.lecturerPropose,
            tugas_akhirTaId: newThesis.taId,
            statusPermohonan: "Belum_Diproses",
          },
        });
      }

      if (typeof thesis.coLecturerPropose !== "undefined") {
        await prismaDB.pengusul.create({
          data: {
            dosenDsnId: thesis.coLecturerPropose,
            tugas_akhirTaId: newThesis.taId,
            statusPermohonan: "Belum_Diproses",
          },
        });
      }

      return newThesis;
      // const newThesis = await prismaDB.tugas_akhir.create({
      //   data: {
      //     taJudul: thesis.title,
      //     taMhsNim: thesis.studentNIM,
      //     taFile: thesis.thesisFile,
      //     taLabId: Number(thesis.labID) || undefined,
      //     taLabId2: Number(thesis.labID2) || undefined,
      //     taCatatan: thesis.note,
      //     taCatatanMhs: thesis.studentNote,
      //     taDosenPengusul: Number(thesis.lecturerPropose) || undefined,
      //     taKHS: thesis.KHSPath,
      //     taKRS: thesis.KRSPath,
      //     proposalGroupID: thesis.proposalGroupID,
      //   },
      // });

      // return newThesis;
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
