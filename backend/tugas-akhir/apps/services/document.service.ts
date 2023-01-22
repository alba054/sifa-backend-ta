import { LabFree } from "../models/labFree.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import { IFreeLabDoc } from "../utils/interfaces/document.interface";

export class DocumentService {
  static async getSupervisorSKData(nim: string, SKID: number) {
    const sk = await SupervisorSK.getSKByID(SKID);

    if (
      sk === null ||
      sk.statusPermohonan !== "Diterima" ||
      sk.skbStatus !== 1
    ) {
    }
    // todo: supervisor sk data
    return null;
  }

  static async getFreeLabData(nim: string, reqLabID: number) {
    const freeLab = await LabFree.getFreeLabRequestsByID(reqLabID);

    if (freeLab === null || freeLab.ref_permohonan !== "Diterima") {
      throw new NotFoundError("data's not found");
    }

    if (freeLab.mahasiswa.mhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    return {
      faculty: "Farmasi",
      headLabName: freeLab.ref_laboratorium.labKepalaNama,
      headLabNIP: freeLab.ref_laboratorium.labKepalaNip,
      letterDate: freeLab.blTglSurat ?? "",
      letterNumber: "",
      studentName: freeLab.mahasiswa.mhsNama,
      studentNIM: nim,
    } as IFreeLabDoc;
  }
}
