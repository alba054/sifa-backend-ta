import { ExaminerSK } from "../models/examinerSK.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { Thesis } from "../models/thesis.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";

export class DeanService {
  static async signSupervisorSK(SKID: number, signed: boolean) {
    const supervisorSK = await SupervisorSK.getSKByID(SKID);

    if (supervisorSK === null || supervisorSK.statusPermohonan !== "Diterima") {
      throw new NotFoundError("sk's not found");
    }

    if (supervisorSK.skbStatus === 1) {
      throw new BadRequestError("cannot sign anymore");
    }

    return await SupervisorSK.signSK(SKID, signed);
  }

  static async signExaminerSK(SKID: number, signed: boolean) {
    const examinerSK = await ExaminerSK.getSKByID(SKID);

    if (examinerSK === null || examinerSK.statusPermohonan !== "Diterima") {
      throw new NotFoundError("sk's not found");
    }

    if (examinerSK.skpStatus === 1) {
      throw new BadRequestError("cannot sign anymore");
    }

    return await ExaminerSK.signSK(SKID, signed);
  }

  static async getApprovedThesisWithSK(nim: any) {
    let thesis = await Thesis.getApprovedThesis(nim);

    thesis = thesis.filter((t) => {
      return t.sk_pembimbing.length > 0 && t.sk_penguji.length > 0;
    });

    thesis = thesis.filter((t) => {
      const approvedSupervisorSK = t.sk_pembimbing.some(
        (sk) => sk.statusPermohonan === "Diterima"
      );
      const approvedExaminerSK = t.sk_penguji.some(
        (sk) => sk.statusPermohonan === "Diterima"
      );

      return approvedExaminerSK && approvedSupervisorSK;
    });

    return thesis;
  }
}
