import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class Supervisor {
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
