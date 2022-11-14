import prismaDB from "../apps/utils/database";
import { constants } from "../apps/utils/utils";

export async function insertSuperUserRole() {
  try {
    const units = await prismaDB.adm_group_unit.createMany({
      data: [
        {
          aksesGroupId: constants.SUPERUSER_GROUP_ACCESS,
          aksesId: constants.SUPERUSER_GROUP_ACCESS,
          aksesNama: "superuser",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.LECTURER_GROUP_ACCESS,
          aksesId: constants.LECTURER_GROUP_ACCESS,
          aksesNama: "dosen",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.STUDENT_GROUP_ACCESS,
          aksesId: constants.STUDENT_GROUP_ACCESS,
          aksesNama: "mahasiswa",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
          aksesId: constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
          aksesNama: "admin departemen",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.FACULTY_ADMIN_GROUP_ACCESS,
          aksesId: constants.FACULTY_ADMIN_GROUP_ACCESS,
          aksesNama: "admin fakultas",
          aksesUnitId: 0,
        },
      ],
    });
    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
