import prismaDB from "../utils/database";

export class Group {
  static async selectByGroupID(groupID: number) {
    const group = await prismaDB.adm_group.findUnique({
      where: { id: groupID },
    });

    return group;
  }

  static async selectAllGroups() {
    const groups = await prismaDB.adm_group.findMany();

    return groups;
  }
}
