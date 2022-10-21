import prismaDB from "../apps/utils/database";

export async function insertSuperUserRole() {
  try {
    const superuserUnit = await prismaDB.adm_group_unit.createMany({
      data: {
        aksesGroupId: 1,
        aksesId: 1,
        aksesNama: "superuser",
        aksesUnitId: 0,
      },
    });

    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
