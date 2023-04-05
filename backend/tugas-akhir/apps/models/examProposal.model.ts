import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IRequestExamDocumentPost } from "../utils/interfaces/exam.interface";

export class ExamProposal {
  static async getSignedProposals() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: { statusTTD: true },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
            sk_verifikasi: { where: { signed: true } },
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async signExamProposal(
    examID: number,
    isAccepted: boolean,
    username: string,
    name: string,
    signature: string
  ) {
    try {
      return await prismaDB.permohonan_ujian_sidang.update({
        where: { id: examID },
        data: {
          statusTTD: isAccepted,
          viceDeanName: name,
          viceDeanNIP: username,
          signature_path: signature,
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

  static async getUnsignedProposals() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: { AND: [{ statusTTD: false }, { statusPermohonan: "Diterima" }] },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
            sk_verifikasi: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async getInProcessExamProposals() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: {
        AND: [
          { statusPermohonan: "Belum_Diproses" },
          { statusValidasiBerkas: "Diterima" },
          { statusVerifikasiBerkas: "Diterima" },
        ],
      },
      include: {
        tugas_akhir: {
          include: {
            sk_verifikasi: true,
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async updateAcceptanceStatus(
    examID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    try {
      return await prismaDB.permohonan_ujian_sidang.update({
        where: { id: examID },
        data: {
          statusPermohonan: isAccepted ? "Diterima" : "Ditolak",
          catatanKTU: note,
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

  static async getHistoryOfAcceptedOrRejectedExamProposal() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: { NOT: { statusPermohonan: "Belum_Diproses" } },
      include: {
        tugas_akhir: {
          include: {
            sk_verifikasi: true,
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async getUnvalidatedExamProposals() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: {
        AND: [
          { statusValidasiBerkas: "Belum_Diproses" },
          { statusVerifikasiBerkas: "Diterima" },
        ],
      },
      include: {
        tugas_akhir: {
          include: {
            sk_verifikasi: true,
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async updateValidationStatus(
    examID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    try {
      return await prismaDB.permohonan_ujian_sidang.update({
        where: { id: examID },
        data: {
          statusValidasiBerkas: isAccepted ? "Diterima" : "Ditolak",
          catatanKasubag: note,
          tanggalSK: new Date(),
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

  static async getHistoryOfValidatedExamProposal() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: { NOT: { statusValidasiBerkas: "Belum_Diproses" } },
      include: {
        tugas_akhir: {
          include: {
            sk_verifikasi: true,
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async getHistoryOfExamProposal() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: { NOT: { statusVerifikasiBerkas: "Belum_Diproses" } },
      include: {
        tugas_akhir: {
          include: {
            sk_verifikasi: true,
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async updateVerificationStatus(
    examID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    try {
      return await prismaDB.permohonan_ujian_sidang.update({
        where: { id: examID },
        data: {
          statusVerifikasiBerkas: isAccepted ? "Diterima" : "Ditolak",
          catatanAdminFakultas: note,
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

  static async getExamProposalByID(examID: number) {
    return await prismaDB.permohonan_ujian_sidang.findUnique({
      where: { id: examID },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
            sk_pembimbing: true,
            sk_penguji: true,
            sk_verifikasi: true,
          },
        },
        dokumen_ujian_sidang: true,
      },
    });
  }

  static async getUnverifiedExamProposals() {
    return await prismaDB.permohonan_ujian_sidang.findMany({
      where: { statusVerifikasiBerkas: "Belum_Diproses" },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            ref_laboratorium: true,
            ref_laboratorium2: true,
            sk_verifikasi: true,
          },
        },
      },
      orderBy: { updated_at: "desc" },
    });
  }

  static async deleteExamProposalByStudentNIM(nim: string) {
    return await prismaDB.permohonan_ujian_sidang.deleteMany({
      where: { tugas_akhir: { mahasiswa: { mhsNim: nim } } },
    });
  }

  static async getExamProposalByNIM(nim: string) {
    return await prismaDB.permohonan_ujian_sidang.findFirst({
      where: { tugas_akhir: { mahasiswa: { mhsNim: nim } } },
      include: {
        dokumen_ujian_sidang: true,
      },
    });
  }

  static async getExamProposalByThesisID(thesisID: number) {
    return await prismaDB.permohonan_ujian_sidang.findFirst({
      where: { tugas_akhirTaId: thesisID },
    });
  }

  static async createExamProposal(
    body: IRequestExamDocumentPost,
    thesisID: number
  ) {
    try {
      await prismaDB.permohonan_ujian_sidang.deleteMany({
        where: { tugas_akhirTaId: thesisID },
      });

      const examProposal = await prismaDB.permohonan_ujian_sidang.create({
        data: {
          tugas_akhirTaId: thesisID,
        },
      });

      const docs = body.doc.map((d) => {
        return {
          fileDokumen: d.path,
          namaDokumen: d.name,
          permohonan_ujian_sidangId: examProposal.id,
        };
      });

      await prismaDB.dokumen_permohonan_ujian_sidang.createMany({
        data: docs,
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
