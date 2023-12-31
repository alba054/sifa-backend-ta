import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { ISupervisorSKPost } from "../utils/interfaces/supervisorSK.interface";

export class SupervisorSK {
  static async changeViceDeanSKStatus(
    SKID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    return await prismaDB.sk_pembimbing.update({
      where: {
        skbId: SKID,
      },
      data: {
        statusPermohonanWD: isAccepted ? "Diterima" : "Ditolak",
        note: note,
      },
    });
  }

  static async signSK(
    SKID: number,
    signed: boolean,
    username: string,
    name: string,
    signature: string
  ) {
    try {
      return await prismaDB.sk_pembimbing.update({
        where: { skbId: SKID },
        data: {
          skbStatus: signed ? 1 : null,
          deanName: name,
          deanNIP: username,
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

  static async changeKTUSKStatus(
    SKID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    return await prismaDB.sk_pembimbing.update({
      where: {
        skbId: SKID,
      },
      data: {
        statusPermohonanKTU: isAccepted ? "Diterima" : "Ditolak",
        note: note,
      },
    });
  }

  static async changeSubsectionSKStatus(
    SKID: number,
    isAccepted: boolean,
    note: string | undefined
  ) {
    return await prismaDB.sk_pembimbing.update({
      where: {
        skbId: SKID,
      },
      data: {
        statusPermohonanKasubag: isAccepted ? "Diterima" : "Ditolak",
        note: note,
      },
    });
  }

  static async deleteSKByID(SKID: number) {
    try {
      return await prismaDB.sk_pembimbing.delete({ where: { skbId: SKID } });
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

  static async getSKByID(SKID: any) {
    return await prismaDB.sk_pembimbing.findUnique({
      where: { skbId: SKID },
      include: {
        ref_departemen: true,
        tugas_akhir: {
          include: {
            sk_verifikasi: true,
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

  static async getSupervisorSK() {
    return await prismaDB.sk_pembimbing.findMany({});
  }

  static async createNewSK(body: ISupervisorSKPost) {
    try {
      return await prismaDB.sk_pembimbing.create({
        data: {
          skbTaId: body.thesisID,
          skbNomor: body.SKNumber || "xxxx/yyyy/zzzz",
          skbTglSurat: new Date(),
          skbDprtId: 1,
          statusPermohonanKasubag: "Belum_Diproses",
          statusPermohonanKTU: "Belum_Diproses",
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
