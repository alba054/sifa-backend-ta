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

export async function populateGroupAdmin() {
  const groupsToInsert = [
    { id: 1, nama: "superuser" },
    { id: 2, nama: "Admin Fakultas" },
    { id: 3, nama: "Admin Departemen" },
    { id: 4, nama: "Admin Program Studi" },
    { id: 5, nama: "Admin Laboratorium" },
    { id: 6, nama: "Dosen" },
    { id: 7, nama: "Mahasiswa" },
    { id: 8, nama: "Koordinator Seminar" },
    { id: 9, nama: "Dekanat" },
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
