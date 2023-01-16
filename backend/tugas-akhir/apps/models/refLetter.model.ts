import prismaDB from "../utils/database";
import { IRefLetterPost } from "../utils/interfaces/refLetter.interface";

export class RefLetter {
  static async createNewReferenceLetter(body: IRefLetterPost) {
    return await prismaDB.ref_jenis_surat.create({
      data: { jsuratKode: body.code, jsuratNama: body.name },
    });
  }

  static async getAllRefLetter() {
    return prismaDB.ref_jenis_surat.findMany({});
  }
}
