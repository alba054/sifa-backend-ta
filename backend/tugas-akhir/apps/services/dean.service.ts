import { ExaminerSK } from "../models/examinerSK.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { Thesis } from "../models/thesis.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { writeToFile } from "../utils/storage";
import { constants } from "../utils/utils";

import { v4 as uuidv4 } from "uuid";
import { decodeBase64 } from "../utils/decoder";

export class DeanService {
  static async getApprovedThesisWithSKDetail(thesisID: number) {
    const thesis = await Thesis.getApprovedThesisDetail(thesisID);

    if (typeof thesis === "undefined") {
      throw new NotFoundError("thesis's not found");
    }

    return thesis;
  }

  static async signSupervisorSK(
    SKID: number,
    signed: boolean,
    username: string,
    name: string,
    signature: string
  ) {
    const supervisorSK = await SupervisorSK.getSKByID(SKID);

    if (
      supervisorSK === null ||
      (supervisorSK.statusPermohonanKasubag !== "Diterima" &&
        supervisorSK?.statusPermohonanKTU !== "Diterima" &&
        supervisorSK.statusPermohonanWD !== "Diterima")
    ) {
      throw new NotFoundError("sk's not found");
    }

    if (supervisorSK.skbStatus === 1) {
      throw new BadRequestError("cannot sign anymore");
    }

    const filename = writeToFile(
      constants.SIGN_FILE_PATH,
      username + ".png",
      decodeBase64(signature)
    );

    return await SupervisorSK.signSK(
      SKID,
      signed,
      username,
      name,
      `${constants.SIGN_FILE_PATH}/${filename}`
    );
  }

  static async signExaminerSK(
    SKID: number,
    signed: boolean,
    username: string,
    name: string,
    signature: string
  ) {
    const examinerSK = await ExaminerSK.getSKByID(SKID);

    if (
      examinerSK === null ||
      (examinerSK.statusPermohonanKasubag !== "Diterima" &&
        examinerSK?.statusPermohonanKTU !== "Diterima" &&
        examinerSK.statusPermohonanWD !== "Diterima")
    ) {
      throw new NotFoundError("sk's not found");
    }

    if (examinerSK.skpStatus === 1) {
      throw new BadRequestError("cannot sign anymore");
    }

    const filename = writeToFile(
      constants.SIGN_FILE_PATH,
      username + ".png",
      decodeBase64(signature)
    );

    return await ExaminerSK.signSK(
      SKID,
      signed,
      username,
      name,
      `${constants.SIGN_FILE_PATH}/${filename}`
    );
  }

  static async getApprovedThesisWithSK(nim: any) {
    let thesis = await Thesis.getApprovedThesis(nim);

    thesis = thesis.filter((t) => {
      return t.sk_pembimbing.length > 0 && t.sk_penguji.length > 0;
    });

    thesis = thesis.filter((t) => {
      const approvedSupervisorSK = t.sk_pembimbing.some(
        (sk) =>
          sk.statusPermohonanKasubag === "Diterima" &&
          sk.statusPermohonanWD === "Diterima" &&
          sk.statusPermohonanKTU === "Diterima"
      );
      const approvedExaminerSK = t.sk_penguji.some(
        (sk) =>
          sk.statusPermohonanKasubag === "Diterima" &&
          sk.statusPermohonanKTU === "Diterima" &&
          sk.statusPermohonanWD === "Diterima"
      );

      return approvedExaminerSK && approvedSupervisorSK;
    });

    return thesis;
  }
}
