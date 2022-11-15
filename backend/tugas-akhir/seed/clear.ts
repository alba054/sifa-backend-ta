import prismaDB from "../apps/utils/database";

export async function clearDatabase() {
  await prismaDB.password_reset_token.deleteMany({});
  await prismaDB.user.deleteMany({});
  await prismaDB.ref_prodi.deleteMany({});
  await prismaDB.adm_group_unit.deleteMany({});
  await prismaDB.adm_group.deleteMany({});
  await prismaDB.mahasiswa.deleteMany({});
  await prismaDB.dosen.deleteMany({});
  await prismaDB.ref_departemen.deleteMany({});
}
