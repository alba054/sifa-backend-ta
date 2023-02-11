import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

export class SeminarNote {
  static async noteSeminar(seminarID: number, dsnId: number, note: string) {
    try {
      const seminarNote = await prismaDB.seminar_catatan.findFirst({
        where: { AND: [{ dosen: { dsnId } }, { catatSmrId: seminarID }] },
      });

      if (seminarNote === null) {
        return await prismaDB.seminar_catatan.create({
          data: {
            catatDsnId: dsnId,
            catatDate: new Date(),
            catatKomentar: note,
            catatSmrId: seminarID,
          },
        });
      }

      return await prismaDB.seminar_catatan.update({
        where: { catatId: seminarNote.catatId },
        data: { catatKomentar: note, catatDate: new Date() },
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
