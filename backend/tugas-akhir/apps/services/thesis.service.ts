import { Thesis } from "../models/thesis.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { IThesis } from "../utils/interfaces/thesis.interface";

export class ThesisService {
  static async deleteThesis(nim: string, thesisID: number) {
    return await Thesis.deleteThesis(nim, thesisID);
  }

  static async getAllProposedThesis(nim: string) {
    const thesis = await Thesis.getAllProposedThesis(nim);

    return thesis;
  }

  static async getInProcessThesis() {
    const thesis = await Thesis.getInProcessThesis();

    return thesis;
  }

  static async insertNewThesis(thesis: IThesis) {
    const inProcessThesis = await this.getInProcessThesis();

    if (inProcessThesis.length === 2) {
      throw new BadRequestError(
        "unable to create new thesis proposal, 2 maximum"
      );
    }

    const newThesis = await Thesis.insertNewThesis(thesis);

    return newThesis;
  }
}
