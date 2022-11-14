import prismaDB from "../utils/database";

export class Vocation {
  static async selectVocationByDepartment(departmentID: number) {
    const vocations = await prismaDB.ref_prodi.findMany({
      where: { prdDprtId: departmentID },
    });

    return vocations;
  }
}
