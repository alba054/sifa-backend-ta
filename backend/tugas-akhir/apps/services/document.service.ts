import { ExaminerSK } from "../models/examinerSK.model";
import { ExamProposal } from "../models/examProposal.model";
import { LabFree } from "../models/labFree.model";
import { Seminar } from "../models/seminar.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { BadRequestError } from "../utils/error/badrequestError";
import { NotFoundError } from "../utils/error/notFoundError";
import {
  IExaminerSKDoc,
  IExamProposalDoc,
  IFreeLabDoc,
  ISeminarApprovalDoc,
  ISeminarInvitationDoc,
  ISeminarLetterEventDoc,
  ISeminarScoreDoc,
  ISupervisorSKDoc,
} from "../utils/interfaces/document.interface";
import { LabFreeService } from "./labFree.service";

export class DocumentService {
  static async getExamProposalData(nim: any, examID: number) {
    const exam = await ExamProposal.getExamProposalByID(examID);

    if (exam === null) {
      throw new NotFoundError("exam proposal's not found");
    }

    if (exam.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    const krs =
      exam.tugas_akhir.taKRS !== null &&
      typeof exam.tugas_akhir.taKRS !== "undefined" &&
      exam.tugas_akhir.taKRSKHSStatus === "Diterima";

    const khs =
      exam.tugas_akhir.taKHS !== null &&
      typeof exam.tugas_akhir.taKHS !== "undefined" &&
      exam.tugas_akhir.taKRSKHSStatus === "Diterima";

    const freeLabDocs = await LabFreeService.getFreeLabRequestsByNIM(
      exam.tugas_akhir.taMhsNim
    );

    const biofarmaka = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "biofarmaka" &&
        d.ref_permohonan === "Diterima"
    );
    const biofarmasi = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "biofarmasi" &&
        d.ref_permohonan === "Diterima"
    );
    const fitokimia = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "fitokimia" &&
        d.ref_permohonan === "Diterima"
    );
    const mikrobiologi = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "mikrobiologi farmasi" &&
        d.ref_permohonan === "Diterima"
    );
    const farmasetika = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "farmasetika" &&
        d.ref_permohonan === "Diterima"
    );
    const kimia = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "kimia farmasi" &&
        d.ref_permohonan === "Diterima"
    );
    const farmakologi = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "farmakologi toksilogi" &&
        d.ref_permohonan === "Diterima"
    );
    const farmakognosi = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "farmakognosi" &&
        d.ref_permohonan === "Diterima"
    );
    const farmasi = freeLabDocs.some(
      (d) =>
        d.ref_laboratorium.labNama.toLowerCase() === "farmasi klinik" &&
        d.ref_permohonan === "Diterima"
    );

    const examinerSK = exam.tugas_akhir.sk_pembimbing.some(
      (sk) => sk.skbStatus === 1 && sk.statusPermohonan === "Diterima"
    );
    const supervisoerSK = exam.tugas_akhir.sk_penguji.some(
      (sk) => sk.skpStatus === 1 && sk.statusPermohonan === "Diterima"
    );
    const sk = examinerSK && supervisoerSK;

    return {
      name: exam.tugas_akhir.mahasiswa.mhsNama,
      nim: exam.tugas_akhir.taMhsNim,
      department: "Farmasi",
      faculty: "Farmasi",
      firstViceDean: "",
      firstViceDeanNIP: "",
      checkList: [
        krs,
        true,
        true,
        true,
        true,
        biofarmaka,
        biofarmasi,
        fitokimia,
        mikrobiologi,
        farmasetika,
        kimia,
        farmakologi,
        farmakognosi,
        farmasi,
        khs,
        true,
        true,
        sk,
      ],
      letterDate: exam.tanggalSK,
    } as IExamProposalDoc;
  }

  static async getSeminarScoreData(nim: any, seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.smrFileBeritaAcara === null) {
      throw new NotFoundError("data hasn't been provided");
    }

    if (seminar.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    return {
      department: "Farmasi",
      letterDate: "",
      proposalTitle: seminar.tugas_akhir.taJudul,
      score: seminar.smrNilaiAngka,
      season: "",
      studentName: seminar.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: seminar.tugas_akhir.mahasiswa.mhsNim,
    } as ISeminarScoreDoc;
  }

  static async getSeminarInvitationData(nim: any, seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.smrFileUndangan === null) {
      throw new NotFoundError("data hasn't been provided");
    }

    if (seminar.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    const mainMentor = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Utama"
    )?.dosen;
    const sideMentor = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Pendamping"
    )?.dosen;
    const firstExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 1
    )?.dosen;
    const secondExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 2
    )?.dosen;
    return {
      deanName: "",
      deanNIP: "",
      mainMentorNIP: mainMentor?.dsnNip,
      sideMentorNIP: sideMentor?.dsnNip,
      coordinatorSeminarNote: seminar.smrCatatan,
      department: "Farmasi",
      firstExaminer: firstExaminer?.dsnNama,
      firstExaminerNIP: firstExaminer?.dsnNip,
      letterNumber: "",
      secondExaminer: secondExaminer?.dsnNama,
      secondExaminerNIP: secondExaminer?.dsnNip,
      seminarCoordinatorName: "",
      seminarCoordinatorNIP: "",
      letterDate: seminar.smrTglUndangan || "",
      mainMentor: mainMentor?.dsnNama,
      sideMentor: sideMentor?.dsnNama,
      major: seminar.tugas_akhir.mahasiswa.ref_prodi?.prdNama,
      proposalTitle: seminar.tugas_akhir.taJudul,
      seminarDate: seminar.smrTglSeminar ?? "",
      seminarEndTime: seminar.smrJamSelesai,
      seminarPlace: seminar.smrTempat,
      seminarStartTime: seminar.smrJamMulai,
      studentName: seminar.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: seminar.tugas_akhir.taMhsNim,
    } as ISeminarInvitationDoc;
  }
  static async getSeminarLetterEventData(nim: any, seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.smrFileBeritaAcara === null) {
      throw new NotFoundError("data hasn't been provided");
    }

    if (seminar.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    const firstExaminer = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Utama"
    )?.dosen.dsnNama;
    const secondExaminer = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Pendamping"
    )?.dosen.dsnNama;
    const thirdExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 1
    )?.dosen.dsnNama;
    const forthExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 2
    )?.dosen.dsnNama;

    const firstExaminerScore = seminar.seminar_nilai.find(
      (e) => e.dosen?.dsnNama === firstExaminer
    )?.snilaiNilai;
    const secondExaminerScore = seminar.seminar_nilai.find(
      (e) => e.dosen?.dsnNama === secondExaminer
    )?.snilaiNilai;
    const thirdExaminerScore = seminar.seminar_nilai.find(
      (e) => e.dosen?.dsnNama === thirdExaminer
    )?.snilaiNilai;
    const forthExaminerScore = seminar.seminar_nilai.find(
      (e) => e.dosen?.dsnNama === forthExaminer
    )?.snilaiNilai;

    return {
      deanName: "",
      deanNIP: "",
      firstExaminer,
      secondExaminer,
      thirdExaminer,
      forthExaminer,
      firstExaminerScore,
      secondExaminerScore,
      thirdExaminerScore,
      forthExaminerScore,
      letterDate: "",
      mainMentor: firstExaminer,
      sideMentor: secondExaminer,
      major: seminar.tugas_akhir.mahasiswa.ref_prodi?.prdNama,
      proposalTitle: seminar.tugas_akhir.taJudul,
      seminarDate: seminar.smrTglSeminar ?? "",
      seminarEndTime: seminar.smrJamSelesai,
      seminarPlace: seminar.smrTempat,
      seminarStartTime: seminar.smrJamMulai,
      studentName: seminar.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: seminar.tugas_akhir.taMhsNim,
    } as ISeminarLetterEventDoc;
  }

  static async getSeminarApprovalData(nim: any, seminarID: number) {
    const seminar = await Seminar.getSeminarByID(seminarID);

    if (seminar === null || seminar.smrFileKesediaan === null) {
      throw new NotFoundError("data hasn't been provided");
    }

    if (seminar.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    return {
      firstExaminer: seminar.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Utama"
      )?.dosen.dsnNama,
      secondExaminer: seminar.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Pendamping"
      )?.dosen.dsnNama,
      thirdExaminer: seminar.tugas_akhir.penguji.find((s) => s.ujiUrutan === 1)
        ?.dosen.dsnNama,
      forthExaminer: seminar.tugas_akhir.penguji.find((s) => s.ujiUrutan === 2)
        ?.dosen.dsnNama,
      letterDate: seminar.smrTglUndangan || "",
      proposalTitle: seminar.tugas_akhir.taJudul,
      seminarDate: seminar.smrTglSeminar ?? "",
      seminarEndTime: seminar.smrJamSelesai,
      seminarPlace: seminar.smrTempat,
      seminarStartTime: seminar.smrJamMulai,
      studentName: seminar.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: seminar.tugas_akhir.taMhsNim,
    } as ISeminarApprovalDoc;
  }

  static async getExaminerSKData(nim: any, SKID: number) {
    const sk = await ExaminerSK.getSKByID(SKID);

    if (
      sk === null ||
      sk.statusPermohonan !== "Diterima" ||
      sk.skpStatus !== 1
    ) {
      throw new NotFoundError("sk hasn't been provided");
    }

    if (sk.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    return {
      deanName: "",
      deanNIP: "",
      department: "Farmasi",
      letterDate: sk.skpTglSurat,
      letterNumber: sk.skpNomor,
      chaiman: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Utama"
      )?.dosen.dsnNama,
      secretary: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Pendamping"
      )?.dosen.dsnNama,
      major: sk.tugas_akhir.mahasiswa.ref_prodi?.prdNama,
      studentName: sk.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: sk.tugas_akhir.taMhsNim,
      member: sk.tugas_akhir.penguji.map((e) => e.dosen.dsnNama),
    } as IExaminerSKDoc;
  }

  static async getSupervisorSKData(nim: any, SKID: number) {
    const sk = await SupervisorSK.getSKByID(SKID);

    if (
      sk === null ||
      sk.statusPermohonan !== "Diterima" ||
      sk.skbStatus !== 1
    ) {
      throw new NotFoundError("sk hasn't been provided");
    }

    if (sk.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    return {
      deanName: "",
      deanNIP: "",
      department: "Farmasi",
      letterDate: sk.skbTglSurat,
      letterNumber: sk.skbNomor,
      mainMentor: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Utama"
      )?.dosen.dsnNama,
      sideMentor: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Pendamping"
      )?.dosen.dsnNama,
      major: sk.tugas_akhir.mahasiswa.ref_prodi?.prdNama,
      studentName: sk.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: sk.tugas_akhir.taMhsNim,
    } as ISupervisorSKDoc;
  }

  static async getFreeLabData(nim: any, reqLabID: number) {
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
