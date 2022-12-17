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
        {
          aksesGroupId: constants.VOCATION_ADMIN_GROUP_ACCESS,
          aksesId: constants.VOCATION_ADMIN_GROUP_ACCESS,
          aksesNama: "admin prodi",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.LAB_ADMIN_GROUP_ACCESS,
          aksesId: constants.LAB_ADMIN_GROUP_ACCESS,
          aksesNama: "admin lab",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
          aksesId: constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
          aksesNama: "koordinator seminar",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.DEAN_GROUP_ACCESS,
          aksesId: constants.DEAN_GROUP_ACCESS,
          aksesNama: "dekan",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.SUBSECTIONHEAD_GROUP_ACCESS,
          aksesId: constants.SUBSECTIONHEAD_GROUP_ACCESS,
          aksesNama: "kasubag",
          aksesUnitId: 0,
        },
        {
          aksesGroupId: constants.ADMINHEAD_GROUP_ACCCESS,
          aksesId: constants.ADMINHEAD_GROUP_ACCCESS,
          aksesNama: "KTU",
          aksesUnitId: 0,
        },
      ],
    });
    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
