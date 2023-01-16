import { Examiner } from "../models/examiner.model";
import { Lecturer } from "../models/lecturer.model";
import { Supervisor } from "../models/supervisor.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { ILecturer } from "../utils/interfaces/lecturer.interface";

export class LecturerService {
  static async deleteExaminer(nim: string, examinerID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const examinerOffer = await Examiner.getExaminerByID(examinerID);

    if (lecturer === null) {
      return null;
    }

    if (examinerOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== examinerOffer.ujiDsnId) {
      return null;
    }

    if (examinerOffer.statusTerima === "Belum_Diproses") {
      return null;
    }

    return await Examiner.removeExaminerByID(examinerID);
  }

  static async acceptOrRejectExaminerOffer(
    nim: string,
    examinerID: number,
    isAccepted: boolean
  ) {
    const lecturer = await LecturerService.getLecturerProfile(nim);

    if (lecturer === null) {
      throw new BadRequestError("nip is not valid");
    }

    const examiner = await Examiner.getExaminerByID(examinerID);

    if (examiner === null || examiner.ujiDsnId !== lecturer.dsnId) {
      throw new NotFoundError("examiner's not found");
    }

    const examinerOffer = await Examiner.acceptOrRejectexaminerOffer(
      lecturer.dsnId,
      examinerID,
      isAccepted
    );

    return examinerOffer;
  }

  static async getExaminerOfferDetail(nim: string, examinerID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const examinerOffer = await Examiner.getExaminerByID(examinerID);

    if (lecturer === null) {
      return null;
    }

    if (examinerOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== examinerOffer.ujiDsnId) {
      return null;
    }

    return examinerOffer;
  }

  static async getOffersBecomingExaminer(nim: string, acceptanceStatus: any) {
    const lecturer = await this.getLecturerProfile(nim);

    if (lecturer === null) {
      throw new NotFoundError("lecturer is not found");
    }

    const examinerOffers = await Examiner.getExaminerrByLecturerID(
      Number(lecturer.dsnId),
      acceptanceStatus
    );

    return examinerOffers;
  }

  static async acceptOrRejectOffer(
    nim: string,
    supervisorID: number,
    isAccepted: boolean
  ) {
    const lecturer = await LecturerService.getLecturerProfile(nim);

    if (lecturer === null) {
      return null;
    }

    const supervisor = await Supervisor.getSupervisorByID(supervisorID);

    if (supervisor === null) {
      return null;
    }

    if (supervisor.pmbDsnId !== lecturer.dsnId) {
      return null;
    }

    const supervisorOffer = await Supervisor.acceptOrRejectSupervisorOffer(
      lecturer.dsnId,
      supervisorID,
      isAccepted
    );

    return supervisorOffer;
  }

  static async deleteSupervisor(nim: string, supervisorID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const supervisorOffer = await Supervisor.getSupervisorByID(supervisorID);

    if (lecturer === null) {
      return null;
    }

    if (supervisorOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== supervisorOffer.pmbDsnId) {
      return null;
    }

    if (supervisorOffer.statusTerima === "Belum_Diproses") {
      return null;
    }

    return await Supervisor.removeSupervisorByID(supervisorID);
  }

  static async getOfferDetail(nim: string, supervisorID: number) {
    const lecturer = await LecturerService.getLecturerProfile(nim);
    const supervisorOffer = await Supervisor.getSupervisorByID(supervisorID);

    if (lecturer === null) {
      return null;
    }

    if (supervisorOffer === null) {
      return null;
    }

    if (lecturer.dsnId !== supervisorOffer.pmbDsnId) {
      return null;
    }

    return supervisorOffer;
  }

  static async getOffersBecomingSupervisor(nim: string, acceptanceStatus: any) {
    const lecturer = await this.getLecturerProfile(nim);

    if (lecturer === null) {
      throw new NotFoundError("lecturer is not found");
    }

    const supervisorOffers = await Supervisor.getSupervisorByLecturerID(
      Number(lecturer.dsnId),
      acceptanceStatus
    );

    return supervisorOffers;
  }

  static async getAllLecturers(departmentID: number) {
    const lecturers = await Lecturer.getAllLecturers(departmentID);

    return lecturers;
  }

  static async getLecturerProfile(nim: string) {
    const lecturer = await Lecturer.getLecturerByNIP(nim);

    return lecturer;
  }

  static async insertNewLecturer(body: ILecturer) {
    const newLecturer = await Lecturer.insertIntoLecturer(body);

    return newLecturer;
  }
}
