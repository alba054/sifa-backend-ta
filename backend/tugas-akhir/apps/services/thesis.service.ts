import { Thesis } from "../models/thesis.model";
import { IThesis } from "../utils/interfaces/thesis.interface";

export class ThesisService {
  static async getAllProposedThesis(nim: string) {
    const thesis = await Thesis.getAllProposedThesis(nim);

    return thesis;
  }

  static async insertNewThesis(thesis: IThesis) {
    const newThesis = await Thesis.insertNewThesis(thesis);

    return newThesis;
  }
}
