import prismaDB from "../utils/database";

export class Laboratory {
  static async selectLaboratories() {
    const laboratories = await prismaDB.ref_laboratorium.findMany({});

    return laboratories;
  }
}
