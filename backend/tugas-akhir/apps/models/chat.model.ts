import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

export class Chat {
  static async createNewMessage(thesisID: number, message: any, type: number) {
    try {
      const curtime = new Date();
      return await prismaDB.pembimbingan.create({
        data: {
          bimPesan: message,
          bimPesanType: type,
          bimTanggal: `${curtime.getDate()}-${curtime.getMonth()}-${curtime.getFullYear()}`,
          bimJam: `${curtime.getHours()}:${curtime.getMinutes()}`,
          bimTaId: thesisID,
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

  static async getAllChatsByThesisID(thesisID: number, type: any) {
    if (type === "media") {
      return await prismaDB.pembimbingan.findMany({
        where: { bimTaId: thesisID, bimPesanType: { in: [1, 2] } },
        include: {
          tugas_akhir: {
            include: {
              pembimbing: { include: { dosen: true } },
              penguji: { include: { dosen: true } },
              mahasiswa: true,
            },
          },
        },
      });
    } else if (type === "text") {
      return await prismaDB.pembimbingan.findMany({
        where: { bimTaId: thesisID, bimPesanType: 0 },
        include: {
          tugas_akhir: {
            include: { pembimbing: true, penguji: true, mahasiswa: true },
          },
        },
      });
    }

    return await prismaDB.pembimbingan.findMany({
      where: { bimTaId: thesisID },
      include: {
        tugas_akhir: {
          include: { pembimbing: true, penguji: true, mahasiswa: true },
        },
      },
    });
  }
}
