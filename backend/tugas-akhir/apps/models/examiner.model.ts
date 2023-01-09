import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class Examiner {
  static async getAllExaminersAcceptedOrRejected(
    status: "Belum_Diproses" | "Diterima" | "Ditolak" | undefined
  ) {
    if (
      typeof status === "undefined" ||
      !["Belum_Diproses", "Diterima", "Ditolak"].includes(status)
    ) {
      return await prismaDB.penguji.findMany({
        where: {},
        include: {
          dosen: true,
          tugas_akhir: true,
        },
      });
    }

    return await prismaDB.penguji.findMany({
      where: { statusTerima: status },
      include: {
        dosen: true,
        tugas_akhir: true,
      },
    });
  }

  static async removeExaminerByID(examinerID: number) {
    try {
      await prismaDB.penguji.delete({
        where: { ujiId: examinerID },
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

  static async acceptOrRejectexaminerOffer(
    lecturerID: number,
    examinerID: number,
    isAccepted: boolean
  ) {
    try {
      return await prismaDB.penguji.updateMany({
        data: { statusTerima: isAccepted ? "Diterima" : "Ditolak" },
        where: {
          AND: [
            { ujiDsnId: lecturerID },
            { ujiId: examinerID },
            { statusTerima: "Belum_Diproses" },
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

  static async getExaminerByID(examinerID: number) {
    const examiner = await prismaDB.penguji.findUnique({
      where: { ujiId: examinerID },
      include: {
        dosen: true,
      },
    });

    return examiner;
  }

  static async getExaminerrByLecturerID(
    lecturerID: number,
    acceptanceStatus: "Belum_Diproses" | "Diterima" | "Ditolak" | undefined
  ) {
    if (typeof acceptanceStatus === "undefined") {
      return await prismaDB.penguji.findMany({
        where: {
          ujiDsnId: lecturerID,
        },
        include: {
          dosen: true,
          tugas_akhir: {
            include: {
              ref_laboratorium: true,
              ref_laboratorium2: true,
            },
          },
        },
      });
    }

    return await prismaDB.penguji.findMany({
      where: {
        AND: [{ ujiDsnId: lecturerID }, { statusTerima: acceptanceStatus }],
      },
      include: {
        dosen: true,
        tugas_akhir: {
          include: {
            ref_laboratorium: true,
            ref_laboratorium2: true,
          },
        },
      },
    });
  }

  static async getExaminersOfThesis(thesisID: number) {
    const examiners = await prismaDB.penguji.findMany({
      where: {
        ujiTaId: thesisID,
      },
    });

    return examiners;
  }

  static async getExaminersByThesisID(thesisID: number) {
    const examiners = await prismaDB.penguji.findMany({
      where: {
        ujiTaId: thesisID,
      },
    });

    return examiners;
  }

  static async createExaminer(thesisID: number, body: IAssignedExaminer) {
    try {
      return await prismaDB.penguji.create({
        data: {
          ujiUrutan: body.position,
          ujiDsnId: body.lecturerID,
          ujiTaId: thesisID,
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