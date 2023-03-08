import { Examiner } from "../models/examiner.model";
import { Lecturer } from "../models/lecturer.model";
import { Thesis } from "../models/thesis.model";
import { User } from "../models/user.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IWebNotif } from "../utils/interfaces/webNotif.interface";
import { constants } from "../utils/utils";
import { ThesisHeadMajorDispositionService } from "./thesisHeadMajorDisposition.service";
import { WebNotifService } from "./webNotif.service";

interface IAssignedExaminer {
  position: number;
  lecturerID: number;
}

export class HeadMajorService {
  static async assignThesisToDepartmentHead(
    thesisID: number,
    departmentHead: string
  ) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (thesis === null) {
      throw new NotFoundError("thesis's not found");
    }

    const lecturer = await Lecturer.getLecturerByNIP(departmentHead);
    if (lecturer === null) {
      throw new NotFoundError("lecturer's not found");
    }

    const userDepartmentHead = await User.getUserByUsername(lecturer.dsnNip);
    // console.log(userDepartmentHead);

    if (
      !userDepartmentHead?.user_badge.some(
        (b) => b.badge.name === constants.DEPARTMENT_ADMIN_GROUP_ACCESS
      )
    ) {
      throw new BadRequestError("lecturer's not department head");
    }

    const inserted = await Thesis.assignDepartmentHead(
      thesisID,
      lecturer.dsnId
    );

    const data = {
      userID: userDepartmentHead.id,
      role: constants.DEPARTMENT_ADMIN_GROUP_ACCESS,
      title: "Permohonan Tugas Akhir",
      description: `mahasiswa dengan judul tugas akhir ${thesis.taJudul}`,
      link: "/admin-fakultas/persetujuan/izin-ujian-sidang", // todo: change based on FE
    } as IWebNotif;

    await WebNotifService.createNotification(data);
    return inserted;
  }

  static async deleteThesisByID(thesisID: number) {
    const thesis = await Thesis.getThesisByID(thesisID);

    if (thesis === null) {
      throw new NotFoundError("thesis's not found");
    }

    return await Thesis.deleteThesisByID(thesisID);
  }

  static async getAllDispositions() {
    return await ThesisHeadMajorDispositionService.getAllDispositions();
  }

  static async getThesisByID(thesisID: number) {
    return await Thesis.getThesisByID(Number(thesisID));
  }

  static async getAllThesis(status: any) {
    return await Thesis.getAllThesis(status);
  }

  static async viewExaminersHistory(status: any) {
    let examiners = await Thesis.getThesisWithExaminerStatus(status);

    if (status === "unresolved") {
      examiners = examiners.filter((e) => {
        return (
          (e.penguji.filter((e) => e.statusTerima === "Ditolak").length > 0 ||
            e.penguji.length < 1) &&
          e.pembimbing.length > 1
        );
      });
    } else {
      examiners = examiners.filter((e) => {
        return e.penguji.length > 1;
      });
    }

    return examiners;
  }

  static async getExaminersOfThesis(thesisID: number) {
    const examiners = await Examiner.getExaminersByThesisID(thesisID);

    return examiners;
  }

  static async assignExaminer(thesisID: number, body: IAssignedExaminer) {
    const lecturer = await Lecturer.getLecturerByID(body.lecturerID);
    if (!lecturer) {
      throw new NotFoundError("user's not found");
    }
    const user = await User.getUserByUsername(lecturer.dsnNip);
    const thesis = await Thesis.getThesisByID(thesisID);

    const data = {
      userID: user?.id,
      role: constants.LECTURER_GROUP_ACCESS,
      title: "Usulan Sebagai Penguji",
      description: `Anda ditunjuk sebagai penguji mahasiswa ${thesis?.mahasiswa.mhsNama} dengan judul tugas akhir ${thesis?.taJudul}`,
      link: "/dosen/usulan-penguji",
    } as IWebNotif;

    const examiner = await Examiner.createExaminer(thesisID, body);
    await WebNotifService.createNotification(data);
    return examiner;
  }
}
