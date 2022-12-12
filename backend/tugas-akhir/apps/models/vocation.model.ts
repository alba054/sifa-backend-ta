import prismaDB from "../utils/database";
import { IVocation } from "../utils/interfaces/vocation.interface";

export class Vocation {
  static async insertIntoVocation(vocationData: IVocation) {
    const insertedNewVocation = await prismaDB.ref_prodi.create({
      data: {
        prdKepalaNama: vocationData.prdKepalaNama,
        prdKepalaNip: vocationData.prdKepalaNip,
        prdKode: vocationData.prdKode,
        prdNama: vocationData.prdNama,
        prdDprtId: vocationData.prdDprtId,
        jenjang: vocationData.jenjang,
      },
    });
  }
  static async selectVocationByDepartment(departmentID: number) {
    const vocations = await prismaDB.ref_prodi.findMany({
      where: { prdDprtId: departmentID },
    });

    return vocations;
  }
}
