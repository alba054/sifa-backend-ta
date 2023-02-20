import { LabFree } from "../models/labFree.model";
import { User } from "../models/user.model";
import { NotFoundError } from "../utils/error/notFoundError";
import {
  ILabFree,
  ILabFreeUpdate,
} from "../utils/interfaces/labFree.interface";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { constants } from "../utils/utils";
import { WebNotifService } from "./webNotif.service";

export class LabFreeService {
  static async getFreeLabRequestsByreqlabsID(nim: string, reqlabsID: number) {
    const reqlab = await LabFree.getFreeLabRequestsByID(reqlabsID);

    if (reqlab === null || reqlab?.blMhsNim !== nim) {
      throw new NotFoundError("request lab is not found");
    }

    return reqlab;
  }

  static async editFreeLabByID(
    nim: string,
    reqlabsID: number,
    body: ILabFreeUpdate
  ) {
    const labFree = await LabFree.getFreeLabRequestsByID(reqlabsID);

    if (labFree === null || labFree.blMhsNim !== nim) {
      throw new NotFoundError("lab free request is not found");
    }

    return await LabFree.editByID(reqlabsID, body);
  }

  static async deleteFreeLabByID(nim: string, reqlabsID: number) {
    const labFree = await LabFree.getFreeLabRequestsByID(reqlabsID);

    if (labFree === null || labFree?.blMhsNim !== nim) {
      throw new NotFoundError("lab free request is not found");
    }

    return await LabFree.deleteByID(reqlabsID);
  }

  static async getFreeLabRequestsByNIM(nim: string) {
    const freeLabReqs = await LabFree.getFreeLabRequestsByNIM(nim);

    return freeLabReqs;
  }

  static async insertNewLabFreeDoc(labFreeData: ILabFree) {
    const labFreeReq = await LabFree.insertIntoLabFree(labFreeData);
    const user = await User.getUserByBadge(constants.LAB_ADMIN_GROUP_ACCESS, {
      lab: labFreeData.labID,
    });

    const data = {
      userID: user?.id,
      role: constants.LAB_ADMIN_GROUP_ACCESS,
      title: "Permohonan Bebas Lab",
      description: `mahasiswa ${labFreeData.studentNIM} mengajukan permohonan bebas lab`,
      link: "/kepala-lab/bebas-lab",
    } as IWebNotif;

    await WebNotifService.createNotification(data);

    return labFreeReq;
  }
}
