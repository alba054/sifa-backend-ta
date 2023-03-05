import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { ISeminarScorePost } from "../utils/interfaces/seminarScore.interface";

export class SeminarScore {
  static async getSeminarScoresByLecturerAndSeminarID(
    lecturerID: number,
    seminarID: number
  ) {
    const seminarScores = await prismaDB.seminar_nilai.findMany({
      where: {
        AND: [{ snilaiDsnId: lecturerID }, { snilaiSmrId: seminarID }],
      },
    });

    return seminarScores;
  }

  static async scoreSeminarV2(
    seminarID: number,
    dsnId: number,
    score: ISeminarScorePost
  ) {
    try {
      const seminarScore = await prismaDB.seminar_nilai.findFirst({
        where: {
          AND: [
            { seminar_ref_id: score.refID },
            { snilaiSmrId: seminarID },
            { dosen: { dsnId } },
          ],
        },
      });

      if (seminarScore === null) {
        return await prismaDB.seminar_nilai.create({
          data: {
            snilaiDsnId: dsnId,
            snilaiDate: new Date(),
            snilaiNilai: score.score,
            snilaiSmrId: seminarID,
            seminar_ref_id: score.refID,
          },
        });
      }

      return await prismaDB.seminar_nilai.update({
        where: { snilaiId: seminarScore.snilaiId },
        data: { snilaiNilai: score.score, snilaiDate: new Date() },
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

  static async getSeminarScoresBySeminarID(seminarID: number) {
    return await prismaDB.seminar_nilai.findMany({
      where: { snilaiSmrId: seminarID },
    });
  }

  static async scoreSeminar(seminarID: number, dsnId: number, score: number) {
    try {
      const seminarScore = await prismaDB.seminar_nilai.findFirst({
        where: { AND: [{ dosen: { dsnId } }, { snilaiSmrId: seminarID }] },
      });

      if (seminarScore === null) {
        return await prismaDB.seminar_nilai.create({
          data: {
            snilaiDsnId: dsnId,
            snilaiDate: new Date(),
            snilaiNilai: score,
            snilaiSmrId: seminarID,
            seminar_ref_id: 0,
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
