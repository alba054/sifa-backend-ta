/**
 * INSERT INTO `adm_group` VALUES (1, 'Superuser');
INSERT INTO `adm_group` VALUES (2, 'Admin Fakultas');
INSERT INTO `adm_group` VALUES (3, 'Admin Departemen');
INSERT INTO `adm_group` VALUES (4, 'Admin Program Studi');
INSERT INTO `adm_group` VALUES (5, 'Admin Laboratorium');
INSERT INTO `adm_group` VALUES (6, 'Dosen');
INSERT INTO `adm_group` VALUES (7, 'Mahasiswa');
INSERT INTO `adm_group` VALUES (8, 'Koordinator Seminar');
INSERT INTO `adm_group` VALUES (9, 'Dekanat');
 */

import prismaDB from "../apps/utils/database";
import { constants } from "../apps/utils/utils";

export async function populateGroupAdmin() {
  const groupsToInsert = [
    { id: constants.SUPERUSER_GROUP_ACCESS, nama: "superuser" },
    { id: constants.FACULTY_ADMIN_GROUP_ACCESS, nama: "Admin Fakultas" },
    { id: constants.DEPARTMENT_ADMIN_GROUP_ACCESS, nama: "Admin Departemen" },
    { id: constants.VOCATION_ADMIN_GROUP_ACCESS, nama: "Admin Program Studi" },
    { id: constants.LAB_ADMIN_GROUP_ACCESS, nama: "Admin Laboratorium" },
    { id: constants.LECTURER_GROUP_ACCESS, nama: "Dosen" },
    { id: constants.STUDENT_GROUP_ACCESS, nama: "Mahasiswa" },
    {
      id: constants.SEMINAR_COORDINATOR_GROUP_ACCESS,
      nama: "Koordinator Seminar",
    },
    { id: constants.DEAN_GROUP_ACCESS, nama: "Dekanat" },
  ];

  try {
    const _groups = await prismaDB.adm_group.createMany({
      data: groupsToInsert,
    });

    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
