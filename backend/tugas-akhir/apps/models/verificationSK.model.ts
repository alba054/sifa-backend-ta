import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IVerificationSKPost } from "../utils/interfaces/verificationSK.interface";

export class VerificationSK {
  static async verifyVerificationSK(
    SKID: number,
    isAccepted: boolean,
    username: any,
    name: any,
    signature: string
  ) {
    try {
      return await prismaDB.sk_verifikasi.update({
        where: { id: SKID },
        data: {
          signed: isAccepted,
          signature,
          statusPermohonan: "Diterima",
          viceDeanName: name,
          viceDeanNip: username,
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

  static async signSK(
    SKID: number,
    signed: boolean,
    username: string,
    name: string,
    signature?: string
  ) {
    try {
      return await prismaDB.sk_penguji.update({
        where: { skpId: SKID },
        data: {
          skpStatus: signed ? 1 : null,
          deanName: name,
          deanNIP: username,
          signature,
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

  static async getSKByID(SKID: number) {
    return await prismaDB.sk_verifikasi.findUnique({
      where: { id: SKID },
      include: {
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
      return await prismaDB.sk_verifikasi.delete({ where: { id: SKID } });
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

  static async getVerificationSK() {
    return await prismaDB.sk_verifikasi.findMany({});
  }

  static async createNewSK(body: IVerificationSKPost) {
    try {
      return await prismaDB.sk_verifikasi.create({
        data: {
          thesisID: body.thesisID,
          letterNumber: body.SKNumber,
          letterDate: new Date(),
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
