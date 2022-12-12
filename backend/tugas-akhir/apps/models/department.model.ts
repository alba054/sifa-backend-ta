import prismaDB from "../utils/database";

export class Department {
  static async selectAllDepartments() {
    const departments = await prismaDB.ref_departemen.findMany({});

    return departments;
  }
}
