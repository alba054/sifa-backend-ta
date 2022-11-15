import { Laboratory } from "../models/laboratory.model";

export class LaboratoryService {
  static async getLaboratories() {
    const laboratories = await Laboratory.selectLaboratories();

    return laboratories;
  }
}
