import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class Supervisor {
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

  static async editSupervisor(supervisorID: number, body: ISupervisorBodyPost) {
    try {
      const assignedSupervisor = await prismaDB.pembimbing.updateMany({
        where: {
          AND: [{ pmbId: supervisorID }, { NOT: { statusTerima: "Diterima" } }],
        },
        data: {
          pmbDsnId: body.lecturerID,
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

  static async createSupervisor(thesisID: number, body: ISupervisorBodyPost) {
    try {
      const assignedSupervisor = await prismaDB.pembimbing.create({
        data: {
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
