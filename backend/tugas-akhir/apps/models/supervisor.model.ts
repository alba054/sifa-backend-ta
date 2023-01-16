import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class Supervisor {
  static async getAllSupervisors(
    status: "Belum_Diproses" | "Diterima" | "Ditolak" | undefined
  ) {
    if (
      typeof status === "undefined" ||
      !["Belum_Diproses", "Diterima", "Ditolak"].includes(status)
    ) {
      return await prismaDB.pembimbing.findMany({
        where: {},
        include: {
          dosen: true,
          tugas_akhir: true,
        },
      });
    }

    return await prismaDB.pembimbing.findMany({
      where: { statusTerima: status },
      include: {
        dosen: true,
        tugas_akhir: true,
      },
    });
  }

  static async acceptOrRejectSupervisorOffer(
    lecturerID: number,
    supervisorID: number,
    isAccepted: boolean
  ) {
    try {
      return await prismaDB.pembimbing.updateMany({
        data: { statusTerima: isAccepted ? "Diterima" : "Ditolak" },
        where: {
          AND: [
            { pmbDsnId: lecturerID },
            { pmbId: supervisorID },
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

  static async getSupervisorByLecturerID(
    lecturerID: number,
    acceptanceStatus: "Diterima" | "Belum_Diproses" | "Ditolak" | undefined
  ) {
    if (typeof acceptanceStatus === "undefined") {
      return await prismaDB.pembimbing.findMany({
        where: {
          pmbDsnId: lecturerID,
        },
        include: {
          dosen: true,
          tugas_akhir: {
            include: {
              ref_laboratorium: true,
              ref_laboratorium2: true,
              mahasiswa: true,
            },
          },
          asal_usulan: true,
        },
      });
    }
    return await prismaDB.pembimbing.findMany({
      where: {
        AND: [{ pmbDsnId: lecturerID }, { statusTerima: acceptanceStatus }],
      },
      include: {
        dosen: true,
        tugas_akhir: {
          include: {
            ref_laboratorium: true,
            ref_laboratorium2: true,
            mahasiswa: true,
          },
        },
        asal_usulan: true,
      },
    });
  }

  static async removeSupervisorByID(supervisorID: number) {
    try {
      await prismaDB.pembimbing.delete({
        where: { pmbId: supervisorID },
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

  static async getSupervisorByID(supervisorID: number) {
    const supervisor = await prismaDB.pembimbing.findUnique({
      where: { pmbId: supervisorID },
      include: {
        dosen: true,
      },
    });

    return supervisor;
  }

  static async getSupervisorsByThesisID(thesisID: number) {
    const supervisors = await prismaDB.pembimbing.findMany({
      where: { pmbTaId: thesisID },
      include: {
        dosen: true,
      },
    });

    return supervisors;
  }

  static async editSupervisor(supervisorID: number, lecturerID: number) {
    try {
      const assignedSupervisor = await prismaDB.pembimbing.updateMany({
        where: {
          AND: [{ pmbId: supervisorID }, { NOT: { statusTerima: "Diterima" } }],
        },
        data: {
          pmbDsnId: lecturerID,
        },
      });

      return assignedSupervisor;
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

  static async createSupervisor(
    labID: number,
    thesisID: number,
    body: ISupervisorBodyPost
  ) {
    try {
      const assignedSupervisor = await prismaDB.pembimbing.create({
        data: {
          asal_usulan_labID: labID,
          pmbDsnId: body.lecturerID,
          pmbTaId: thesisID,
          ref_posisipmb: body.position,
        },
      });

      return assignedSupervisor;
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
