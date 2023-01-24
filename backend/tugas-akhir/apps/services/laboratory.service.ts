import { Laboratory } from "../models/laboratory.model";
import { NotFoundError } from "../utils/error/notFoundError";

export class LaboratoryService {
  static async deleteLab(labID: number) {
    const lab = await Laboratory.getLabByID(labID);

    if (lab === null) {
      throw new NotFoundError("lab's not found");
    }

    return await Laboratory.deleteLab(labID);
  }

  static async editLab(
    labID: number,
    labName?: string,
    lecturerNIP?: string,
    lecturerName?: string
  ) {
    const lab = await Laboratory.getLabByID(labID);

    if (lab === null) {
      throw new NotFoundError("lab's not found");
    }

    return await Laboratory.editLab(labID, labName, lecturerNIP, lecturerName);
  }

  static async getLaboratories() {
    const laboratories = await Laboratory.selectLaboratories();

    return laboratories;
  }
}
