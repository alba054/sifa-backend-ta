import { ExaminerSK } from "../models/examinerSK.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { Thesis } from "../models/thesis.model";
import { NotFoundError } from "../utils/error/notFoundError";

export class SubsectionAdminService {
  static async acceptOrRejectSupervisorSK(
    SKID: number,
    isAccepted: boolean,
    note?: string
  ) {
    const supervisorSK = SupervisorSK.getSKByID(SKID);

    if (supervisorSK === null) {
      throw new NotFoundError("sk's not found");
    }

    return await SupervisorSK.changeSKStatus(SKID, isAccepted, note);
  }

  static async getSupervisorSKDetail(SKID: number) {
    return await SupervisorSK.getSKByID(SKID);
  }

  static async acceptOrRejectExaminerSK(
    SKID: number,
    isAccepted: boolean,
    note?: string
  ) {
    const examinerSK = ExaminerSK.getSKByID(SKID);

    if (examinerSK === null) {
      throw new NotFoundError("sk's not found");
    }

    return await ExaminerSK.changeSKStatus(SKID, isAccepted, note);
  }

  static async getExaminerSKDetail(SKID: number) {
    return await ExaminerSK.getSKByID(SKID);
  }

  static async getThesisWithSK() {
    let thesis = await Thesis.getApprovedThesis();

    thesis = thesis.filter((t) => {
      return t.sk_pembimbing.length > 0 && t.sk_penguji.length > 0;
    });

    return thesis;
  }
}
