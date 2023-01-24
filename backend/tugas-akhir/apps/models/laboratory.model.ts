import prismaDB from "../utils/database";

export class Laboratory {
  static async deleteLab(labID: number) {
    return await prismaDB.ref_laboratorium.delete({ where: { labId: labID } });
  }

  static async getLabByID(labID: number) {
    return await prismaDB.ref_laboratorium.findUnique({
      where: { labId: labID },
    });
  }

  static async editLab(
    labID: number,
    labName: string | undefined,
    lecturerNIP: string | undefined,
    lecturerName: string | undefined
  ) {
    return await prismaDB.ref_laboratorium.update({
      where: { labId: labID },
      data: {
        labKepalaNama: lecturerName,
        labKepalaNip: lecturerNIP,
        labNama: labName,
      },
    });
  }

  static async selectLaboratories() {
    const laboratories = await prismaDB.ref_laboratorium.findMany({});

    return laboratories;
  }
}
