import { NotFoundError } from "@prisma/client/runtime";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import { IThesis, IThesisPost } from "../utils/interfaces/thesis.interface";
import { notifService } from "../utils/notification";
import { deleteFile, writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";

interface IThesisApproval {
  id: number;
  isApproved: boolean;
}

interface IBody {
  title1: IThesisApproval;
  title2: IThesisApproval;
}

export class ThesisService {
  static async getApprovedThesisDetail(id: number) {
    const approvedThesis = await Thesis.getApprovedThesisDetail(id);

    return approvedThesis;
  }

  static async approveOrRejectProposedThesis(
    proposalGroupID: string,
    body: IBody
  ) {
    const thesis = await this.getThesisByProposalGroupID(proposalGroupID);

    if (thesis.length < 1) {
      throw new NotFoundError("thesis is not found");
    }

    if (thesis[0].statusPermohonan !== "Belum_Diproses") {
      throw new BadRequestError("thesis has been accepted/rejected");
    }

    if (
      thesis[0].taId !== body.title1.id &&
      thesis[0].taId !== body.title2.id
    ) {
      throw new BadRequestError("id is not suitable with proposal");
    }

    if (
      thesis[1].taId !== body.title1.id &&
      thesis[1].taId !== body.title2.id
    ) {
      throw new BadRequestError("id is not suitable with proposal");
    }

    const approveThesis = await Thesis.updateThesisStatus(
      proposalGroupID,
      body
    );

    const user = await User.getUserByUsername(thesis[0].taMhsNim);

    if (user !== null) {
      const message = `judul tugas akhir ${thesis[0].taJudul} telah disetujui`;
      notifService.sendNotification(
        message,
        [user.notificationID],
        user.username
      );
    }

    return approveThesis;
  }

  static async getProposedThesisByHeadMajor(vocationID: number) {
    let proposedThesis = await Thesis.getProposedThesisByVocation(vocationID);

    if (proposedThesis.length > 1) {
      const temp = proposedThesis[0];
      proposedThesis[0] = proposedThesis[1];
      proposedThesis[1] = temp;
    }

    return proposedThesis;
  }

  static async getApprovedThesisByHeadMajor(vocationID: number, status: any) {
    let approvedThesis = await Thesis.getApprovedThesisByVocation(vocationID);

    if (status === "unresolved") {
      approvedThesis = approvedThesis.filter(
        (t) => !t.disposisi_kaprodi.length
      );
    } else {
      approvedThesis = approvedThesis.filter((t) => {
        return t.disposisi_kaprodi.length > 0;
      });
    }

    return approvedThesis;
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
    const thesis = await this.getThesisByProposalGroupID(proposalGroupID);

    if (thesis.length < 1) {
      throw new NotFoundError("thesis is not found");
    }

    if (thesis[0].statusPermohonan === "Diterima") {
      throw new BadRequestError("thesis has been accepted or rejected");
    }

    if (thesis[0].taMhsNim !== nim) {
      throw new NotFoundError("thesis is not found");
    }

    const KRSPath = thesis[0].taKRS;
    const KHSPath = thesis[0].taKHS;

    if (KHSPath !== null && KRSPath !== null) {
      deleteFile(KHSPath);
      deleteFile(KRSPath);
    }

    return await Thesis.deleteThesis(proposalGroupID);
  }

  static async getThesisByProposalGroupID(proposalGroupID: string) {
    return await Thesis.getThesisByProposalGroupID(proposalGroupID);
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
    // console.log(thesis);

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

    const approvedThesis = await ThesisService.getApprovedThesisByNIM(
      thesis[0].studentNIM
    );

    if (approvedThesis.length > 0) {
      throw new BadRequestError(
        "can't propose thesis anymore, you have approved thesis"
      );
    }

    await this.insertNewThesis(thesis[0]);
    await this.insertNewThesis(thesis[1]);

    writeToFile(path, KRSTitle, KRSBuffer);
    writeToFile(path, KHSTitle, KHSBuffer);
  }
  static async getApprovedThesisByNIM(studentNIM: string) {
    return await Thesis.getApprovedThesis(studentNIM);
  }
}
