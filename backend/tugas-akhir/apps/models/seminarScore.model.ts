import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

export class SeminarScore {
  static async getSeminarScoresBySeminarID(seminarID: number) {
    return await prismaDB.seminar_nilai.findMany({
      where: { snilaiSmrId: seminarID },
    });
  }

  static async scoreSeminar(seminarID: number, dsnId: number, score: number) {
    try {
      const seminarScore = await prismaDB.seminar_nilai.findFirst({
        where: { dosen: { dsnId } },
      });

      if (seminarScore === null) {
        return await prismaDB.seminar_nilai.create({
          data: {
            snilaiDsnId: dsnId,
            snilaiDate: new Date(),
            snilaiNilai: score,
            snilaiSmrId: seminarID,
          },
        });
      }

      return await prismaDB.seminar_nilai.update({
        where: { snilaiId: seminarScore.snilaiId },
        data: { snilaiNilai: score, snilaiDate: new Date() },
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
