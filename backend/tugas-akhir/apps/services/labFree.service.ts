import { LabFree } from "../models/labFree.model";
import {
  ILabFree,
  ILabFreeUpdate,
} from "../utils/interfaces/labFree.interface";

export class LabFreeService {
  static async editFreeLabByID(
    nim: string,
    reqlabsID: number,
    body: ILabFreeUpdate
  ) {
    await LabFree.editByID(nim, reqlabsID, body);
  }

  static async deleteFreeLabByID(nim: string, reqlabsID: number) {
    await LabFree.deleteByID(nim, reqlabsID);
  }

  static async getFreeLabRequestsByNIM(nim: string) {
    const freeLabReqs = await LabFree.getFreeLabRequestsByNIM(nim);

    return freeLabReqs;
  }

  static async insertNewLabFreeDoc(labFreeData: ILabFree) {
    const labFreeReq = await LabFree.insertIntoLabFree(labFreeData);

    return labFreeReq;
  }
}
