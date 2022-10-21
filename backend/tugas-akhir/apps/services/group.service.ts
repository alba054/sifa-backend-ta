import { Group } from "../models/group.model";

export class GroupService {
  static async getGroupByGroupID(groupID: number) {
    const group = await Group.selectByGroupID(groupID);

    return group;
  }

  static async getAllGroups() {
    const groups = await Group.selectAllGroups();

    return groups;
  }
}
