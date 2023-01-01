import { Supervisor } from "../models/supervisor.model";
import { Thesis } from "../models/thesis.model";
import { ThesisHeadMajorDisposition } from "../models/thesisHeadMajorDisposition.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class HeadLabService {
  static async assignSupervisor(
    thesisID: number,
    labID: number,
    body: ISupervisorBodyPost
  ) {
    const thesis = await Thesis.getApprovedThesisDetail(thesisID);

    if (
      thesis === null ||
      (thesis?.taLabId !== labID && thesis?.taLabId2 !== labID)
    ) {
      throw new NotFoundError("thesis is not found");
    }

    const isPositionFilled = thesis.pembimbing.find(
      (supervisor) => supervisor.ref_posisipmb === body.position
    );

    if (isPositionFilled) {
      throw new BadRequestError(
        "supervisor as " +
          body.position +
          " has been assigned please edit it instead"
      );
    }

    const assignedSupervisor = await Supervisor.createSupervisor(
      thesisID,
      body
    );

    return assignedSupervisor;
  }

  static async getThesisDispositionDetail(thesisID: number) {
    const thesisDisposition =
      await ThesisHeadMajorDisposition.getDispositionByThesisID(thesisID);

    return thesisDisposition;
  }

  static async getDisposition() {
    const dispositions = await ThesisHeadMajorDisposition.getDispositions();

    return dispositions;
  }

  static async getThesisDetail(thesisID: number) {
    const thesis = await Thesis.getApprovedThesisDetail(thesisID);

    return thesis;
  }

  static async getApprovedThesis(labID: number) {
    const approvedThesis = await Thesis.getApprovedThesisByLab(labID);

    return approvedThesis;
  }
}
