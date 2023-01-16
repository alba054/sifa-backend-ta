import { LabFree } from "../models/labFree.model";
import { Supervisor } from "../models/supervisor.model";
import { Thesis } from "../models/thesis.model";
import { ThesisHeadMajorDisposition } from "../models/thesisHeadMajorDisposition.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { LabFreeService } from "./labFree.service";

interface ISupervisorBodyPost {
  lecturerID: number;
  position: "Utama" | "Pendamping";
}

export class HeadLabService {
  static async getReqLabDetail(reqLabID: number, labID: number) {
    const reqlab = await LabFree.getFreeLabRequestsByID(reqLabID);

    if (reqlab === null || reqlab.blLabId !== labID) {
      throw new NotFoundError("reqlab's not found");
    }

    return reqlab;
  }

  static async acceptOrRejectRequestLab(
    reqLabID: number,
    labID: number,
    isAccepted: boolean
  ) {
    const reqlab = await LabFree.getFreeLabRequestsByID(reqLabID);

    if (reqlab === null || reqlab.blLabId !== labID) {
      throw new NotFoundError("request's not found");
    }

    return await LabFree.changeRequestLabStatus(reqLabID, isAccepted);
  }

  static async getReqLabsByLabID(labID: number, search: any) {
    return await LabFree.getFreeLabRequestsByLabID(labID, search);
  }

  static async viewSupervisorsHistory(status: any) {
    return await Supervisor.getAllSupervisors(status);
  }

  static async removeSupervisor(supervisorID: number) {
    const supervisor = await Supervisor.getSupervisorByID(supervisorID);

    if (supervisor === null) {
      throw new NotFoundError("supervisor is not found");
    }

    await Supervisor.removeSupervisorByID(supervisorID);
  }

  static async getSupervisorDetail(supervisorID: number) {
    const supervisor = await Supervisor.getSupervisorByID(supervisorID);

    return supervisor;
  }

  static async getSupervisorOfThesis(thesisID: number) {
    const supervisors = await Supervisor.getSupervisorsByThesisID(thesisID);

    return supervisors;
  }
  static async editSupervisor(supervisorID: number, lecturerID: number) {
    const supervisor = await Supervisor.getSupervisorByID(supervisorID);

    if (supervisor === null) {
      throw new NotFoundError("supervisor is not found");
    }

    const assignedSupervisor = await Supervisor.editSupervisor(
      supervisorID,
      lecturerID
    );

    return assignedSupervisor;
  }

  // todo: checking inprocess and rejected acceptance status in order to be able to create new supervisor
  static async eligibleToAssignNewSupervisor(
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
  }

  static async assignSupervisor(
    thesisID: number,
    labID: number,
    body: ISupervisorBodyPost
  ) {
    const assignedSupervisor = await Supervisor.createSupervisor(
      labID,
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
