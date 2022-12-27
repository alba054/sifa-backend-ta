import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";

interface IHeadMajorApproval {
  thesisID: number;
  departmentName: string;
}

export class ThesisHeadMajorDisposition {
  static async getDispositionByThesisID(thesisID: number) {
    const thesisDisposition = await prismaDB.disposisi_kaprodi.findUnique({
      where: { tugas_akhirTaId: thesisID },
      include: {
        tugas_akhir: true,
      },
    });

    return thesisDisposition;
  }

  static async createDisposition(body: IHeadMajorApproval) {
    try {
      const thesisDisposition = await prismaDB.disposisi_kaprodi.create({
        data: {
          tugas_akhirTaId: body.thesisID,
          departmentName: body.departmentName,
        },
      });

      return thesisDisposition;
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
