import { Thesis } from "../models/thesis.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { IThesis } from "../utils/interfaces/thesis.interface";
import { deleteFile, writeToFile } from "../utils/storage";

export class ThesisService {
  static async deleteThesis(nim: string, proposalGroupID: string) {
    const thesis = await Thesis.getInProcessThesis();
    const KRSPath = thesis[0].taKRS;
    const KHSPath = thesis[0].taKHS;

    if (KHSPath !== null && KRSPath !== null) {
      deleteFile(KHSPath);
      deleteFile(KRSPath);
    }

    return await Thesis.deleteThesis(nim, proposalGroupID);
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

  static async insertProposedThesis(
    thesis: IThesis[],
    path: string,
    KRSPath: string,
    KHSPath: string,
    KRSBuffer: Buffer,
    KHSBuffer: Buffer
  ) {
    await this.insertNewThesis(thesis[0]);
    await this.insertNewThesis(thesis[1]);

    writeToFile(path, KRSPath, KRSBuffer);
    writeToFile(path, KHSPath, KHSBuffer);
  }
}
