import { NotFoundError } from "@prisma/client/runtime";
import { Thesis } from "../models/thesis.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IThesis, IThesisPost } from "../utils/interfaces/thesis.interface";
import { deleteFile, writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";

export class ThesisService {
  static async getProposedThesisByHeadMajor(vocationID: number) {
    const proposedThesis = await Thesis.getProposedThesisByVocation(vocationID);

    return proposedThesis;
  }

  static async editProposedThesis(
    body: IThesisPost,
    nim: string,
    proposalGroupID: string,
    KRSBuffer: Buffer,
    KHSBuffer: Buffer
  ) {
    const proposedThesis = await this.getInProcessThesis(nim);

    // ! this is bug
    // ! this shouldn't be happening
    if (proposedThesis.length !== 2) {
      throw new InternalServerError("@BUG: PROPOSED THESIS ARE MORE THAN 2");
    }

    const oldThesis = proposedThesis[0];

    if (oldThesis.proposalGroupID !== proposalGroupID) {
      throw new NotFoundError(
        "proposal is not in process status or proposal not found"
      );
    }

    const KRSPath = oldThesis.taKRS;
    const KHSPath = oldThesis.taKHS;

    const thesis = [
      {
        studentNIM: nim,
        title: body.title_1st,
        labID: body.labID_1st,
        labID2: body.labID2_1st,
        lecturerPropose: body.lecturerPropose_1st,
        proposalGroupID,
        KHSPath,
        KRSPath,
      } as IThesis,
      {
        studentNIM: nim,
        title: body.title_2nd,
        labID: body.labID_2nd,
        labID2: body.labID2_2nd,
        lecturerPropose: body.lecturerPropose_2nd,
        proposalGroupID,
        KHSPath,
        KRSPath,
      } as IThesis,
    ];

    await Thesis.editThesis(thesis[0], proposedThesis[0].taId);
    await Thesis.editThesis(thesis[1], proposedThesis[1].taId);

    const path = `${constants.KRS_AND_KHS_PATH}/${nim}`;
    if (KRSPath !== null && KHSPath !== null) {
      let KRSTitle: string[] | string = KRSPath.split("/");
      let KHSTitle: string[] | string = KHSPath.split("/");

      KRSTitle = KRSTitle[KRSTitle.length - 1];
      KHSTitle = KHSTitle[KHSTitle.length - 1];

      writeToFile(path, KRSTitle, KRSBuffer);
      writeToFile(path, KHSTitle, KHSBuffer);
    }
  }

  static async deleteThesis(nim: string, proposalGroupID: string) {
    const thesis = await this.getInProcessThesis(nim);
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

  static async getInProcessThesis(nim: string) {
    const thesis = await Thesis.getInProcessThesis(nim);

    return thesis;
  }

  static async insertNewThesis(thesis: IThesis) {
    const inProcessThesis = await this.getInProcessThesis(thesis.studentNIM);

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
    KRSTitle: string,
    KHSTitle: string,
    KRSBuffer: Buffer,
    KHSBuffer: Buffer
  ) {
    if (thesis.length !== 2) {
      throw new BadRequestError("provide 2 proposal");
    }

    await this.insertNewThesis(thesis[0]);
    await this.insertNewThesis(thesis[1]);

    writeToFile(path, KRSTitle, KRSBuffer);
    writeToFile(path, KHSTitle, KHSBuffer);
  }
}
