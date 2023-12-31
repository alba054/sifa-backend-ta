import { ExaminerSK } from "../models/examinerSK.model";
import { ExamProposal } from "../models/examProposal.model";
import { LabFree } from "../models/labFree.model";
import { Seminar } from "../models/seminar.model";
import { SupervisorSK } from "../models/supervisorSK.model";
import { User } from "../models/user.model";
import { VerificationSK } from "../models/verificationSK.model";
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
  IVerificationSKDoc,
} from "../utils/interfaces/document.interface";
import { constants } from "../utils/utils";
import { LabFreeService } from "./labFree.service";

export class DocumentService {
  static async getVerificationSKData(nim: any, SKID: number) {
    const verificationSK = await VerificationSK.getSKByID(SKID);

    if (verificationSK === null) {
      throw new NotFoundError("sk is not found");
    }

    if (verificationSK.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    if (
      verificationSK.statusPermohonan !== "Diterima" &&
      !verificationSK.signed
    ) {
      throw new BadRequestError("sk hasn't been verified by vice dean");
    }

    return {
      educationLevel: "s1",
      isMajorCorrect: verificationSK.isMajorCorrect,
      isNameCorrect: verificationSK.isNameCorrect,
      isNimCorrect: verificationSK.isNimCorrect,
      letterDate: verificationSK.letterDate,
      major: "S1 Farmasi",
      name: verificationSK.tugas_akhir.mahasiswa.mhsNama,
      nim: verificationSK.tugas_akhir.taMhsNim,
      signature: verificationSK.signature,
      sksPassed: verificationSK.sksPassed,
      viceaDeanName: verificationSK.viceDeanName,
      viceDeanNip: verificationSK.viceDeanNip,
    } as IVerificationSKDoc;
  }

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
      (sk) =>
        sk.skbStatus === 1 &&
        sk.statusPermohonanKasubag === "Diterima" &&
        sk.statusPermohonanKTU === "Diterima"
    );
    const supervisoerSK = exam.tugas_akhir.sk_penguji.some(
      (sk) =>
        sk.skpStatus === 1 &&
        sk.statusPermohonanKasubag === "Diterima" &&
        sk.statusPermohonanKTU === "Diterima"
    );
    const sk = examinerSK && supervisoerSK;

    // const viceDean = await User.getUserByBadge(
    //   constants.VICE_DEAN_GROUP_ACCESS
    // );

    const student = await User.getUserByUsername(nim);
    return {
      name: exam.tugas_akhir.mahasiswa.mhsNama,
      nim: exam.tugas_akhir.taMhsNim,
      department: student?.ref_departemen?.dprtNama,
      faculty: "Farmasi",
      firstViceDean: exam.viceDeanName || "",
      firstViceDeanNIP: exam.viceDeanNIP || "",
      checkList: [
        true,
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
      signature: exam.signature_path,
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

    const student = await User.getUserByUsername(seminar.tugas_akhir.taMhsNim);
    const firstExaminer = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Utama"
    )?.dosen;
    const secondExaminer = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Pendamping"
    )?.dosen;
    const thirdExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 1
    )?.dosen;
    const forthExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 2
    )?.dosen;

    return {
      department: student?.ref_departemen?.dprtNama,
      letterDate: seminar.smrTglBeritaAcara,
      proposalTitle: seminar.tugas_akhir.taJudul,
      score: seminar.smrNilaiAngka,
      season: "",
      studentName: seminar.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: seminar.tugas_akhir.mahasiswa.mhsNim,
      mainMentorNIP: seminar.tugas_akhir.pembimbing.filter(
        (l) => l.ref_posisipmb === "Utama"
      )[0].dosen.dsnNip,
      mainMentorName: seminar.tugas_akhir.pembimbing.filter(
        (l) => l.ref_posisipmb === "Utama"
      )[0].dosen.dsnNama,
      sideMentorNIP: seminar.tugas_akhir.pembimbing.filter(
        (l) => l.ref_posisipmb === "Pendamping"
      )[0].dosen.dsnNip,
      sideMentorName: seminar.tugas_akhir.pembimbing.filter(
        (l) => l.ref_posisipmb === "Pendamping"
      )[0].dosen.dsnNama,
      firstExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === firstExaminer?.dsnId
      )?.signature,
      secondExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === secondExaminer?.dsnId
      )?.signature,
      thirdExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === thirdExaminer?.dsnId
      )?.signature,
      forthExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === forthExaminer?.dsnId
      )?.signature,
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

    let dean = await User.getUsersByBadge(constants.DEAN_GROUP_ACCESS);
    dean = dean.filter((d) => d.username !== "superuser");
    const seminarCoord = await User.getUserByBadge(
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS
    );

    const seminars = await Seminar.getSeminarByGroupID(seminar.groupID);

    const response: any[] = [];

    const student = await User.getUserByUsername(seminar.tugas_akhir.taMhsNim);

    seminars.forEach((s) => {
      const mainMentor = s.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Utama"
      )?.dosen;
      const sideMentor = s.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Pendamping"
      )?.dosen;
      const firstExaminer = s.tugas_akhir.penguji.find(
        (s) => s.ujiUrutan === 1
      )?.dosen;
      const secondExaminer = s.tugas_akhir.penguji.find(
        (s) => s.ujiUrutan === 2
      )?.dosen;
      response.push({
        deanName: dean[0].name || "",
        deanNIP: dean[0].username || "",
        mainMentorNIP: mainMentor?.dsnNip,
        sideMentorNIP: sideMentor?.dsnNip,
        coordinatorSeminarNote: s.smrCatatan,
        department: student?.ref_departemen?.dprtNama,
        firstExaminer: firstExaminer?.dsnNama,
        firstExaminerNIP: firstExaminer?.dsnNip,
        letterNumber: "",
        secondExaminer: secondExaminer?.dsnNama,
        secondExaminerNIP: secondExaminer?.dsnNip,
        seminarCoordinatorName: seminarCoord?.name || "",
        seminarCoordinatorNIP: seminarCoord?.username || "",
        letterDate: s.smrTglUndangan || "",
        mainMentor: mainMentor?.dsnNama,
        sideMentor: sideMentor?.dsnNama,
        major: s.tugas_akhir.mahasiswa.ref_prodi?.prdNama,
        proposalTitle: s.tugas_akhir.taJudul,
        seminarDate: s.smrTglSeminar ?? "",
        seminarEndTime: s.smrJamSelesai,
        seminarPlace: s.smrTempat,
        seminarStartTime: s.smrJamMulai,
        studentName: s.tugas_akhir.mahasiswa.mhsNama,
        studentNIM: s.tugas_akhir.taMhsNim,
        link: s.smrLink,
        signature: s.signature,
        moderator: s.moderator?.dsnNama,
      } as ISeminarInvitationDoc);
    });

    return response;
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
    )?.dosen;
    const secondExaminer = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Pendamping"
    )?.dosen;
    const thirdExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 1
    )?.dosen;
    const forthExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 2
    )?.dosen;

    const firstExaminerScore =
      seminar.seminar_nilai
        .filter((e) => e.dosen?.dsnNip === firstExaminer?.dsnNip)
        .map((s) => s.snilaiNilai)
        .reduce((total, score) => (total ?? 0) + (score ?? 0)) ?? 0 / 4;
    const secondExaminerScore =
      seminar.seminar_nilai
        .filter((e) => e.dosen?.dsnNip === secondExaminer?.dsnNip)
        .map((s) => s.snilaiNilai)
        .reduce((total, score) => (total ?? 0) + (score ?? 0)) ?? 0 / 4;
    const thirdExaminerScore =
      seminar.seminar_nilai
        .filter((e) => e.dosen?.dsnNip === thirdExaminer?.dsnNip)
        .map((s) => s.snilaiNilai)
        .reduce((total, score) => (total ?? 0) + (score ?? 0)) ?? 0 / 4;
    const forthExaminerScore =
      seminar.seminar_nilai
        .filter((e) => e.dosen?.dsnNip === forthExaminer?.dsnNip)
        .map((s) => s.snilaiNilai)
        .reduce((total, score) => (total ?? 0) + (score ?? 0)) ?? 0 / 4;

    const dean = await User.getUsersByBadge(
      constants.SEMINAR_COORDINATOR_GROUP_ACCESS
    );

    return {
      deanName: dean.filter((d) => d.name !== "superuser")[0].name || "",
      deanNIP: dean.filter((d) => d.name !== "superuser")[0].username || "",
      firstExaminer: firstExaminer?.dsnNama || "",
      secondExaminer: secondExaminer?.dsnNama || "",
      thirdExaminer: thirdExaminer?.dsnNama || "",
      forthExaminer: forthExaminer?.dsnNama || "",
      firstExaminerScore,
      secondExaminerScore,
      thirdExaminerScore,
      forthExaminerScore,
      firstExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === firstExaminer?.dsnId
      )?.signature,
      secondExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === secondExaminer?.dsnId
      )?.signature,
      thirdExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === thirdExaminer?.dsnId
      )?.signature,
      forthExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === forthExaminer?.dsnId
      )?.signature,
      seminarCoordinatorSignature: seminar.signature,
      letterDate: seminar.smrTglBeritaAcara,
      mainMentor: firstExaminer?.dsnNama || "",
      sideMentor: secondExaminer?.dsnNama || "",
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

    const firstExaminer = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Utama"
    )?.dosen;
    const secondExaminer = seminar.tugas_akhir.pembimbing.find(
      (s) => s.ref_posisipmb === "Pendamping"
    )?.dosen;
    const thirdExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 1
    )?.dosen;
    const forthExaminer = seminar.tugas_akhir.penguji.find(
      (s) => s.ujiUrutan === 2
    )?.dosen;

    return {
      firstExaminer: firstExaminer?.dsnNama,
      firstExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === firstExaminer?.dsnId
      )?.signature,
      secondExaminer: secondExaminer?.dsnNama,
      secondExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === secondExaminer?.dsnId
      )?.signature,
      thirdExaminer: thirdExaminer?.dsnNama,
      thirdExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === thirdExaminer?.dsnId
      )?.signature,
      forthExaminer: forthExaminer?.dsnNama,
      forthExaminerSignature: seminar.seminar_persetujuan.find(
        (l) => l.ssetujuDsnId === forthExaminer?.dsnId
      )?.signature,
      letterDate: seminar.smrTglUndangan || "",
      proposalTitle: seminar.tugas_akhir.taJudul,
      seminarDate: seminar.smrTglSeminar ?? "",
      seminarEndTime: seminar.smrJamSelesai,
      seminarPlace: seminar.smrTempat,
      seminarStartTime: seminar.smrJamMulai,
      studentName: seminar.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: seminar.tugas_akhir.taMhsNim,
      major: seminar.tugas_akhir.mahasiswa.ref_prodi?.prdNama,
    } as ISeminarApprovalDoc;
  }

  static async getExaminerSKData(nim: any, SKID: number) {
    const sk = await ExaminerSK.getSKByID(SKID);

    if (
      sk === null
      // sk.statusPermohonan !== "Diterima"
      // sk.skpStatus !== 1
    ) {
      throw new NotFoundError("sk hasn't been provided");
    }

    if (sk.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    // const dean = await User.getUserByBadge(constants.DEAN_GROUP_ACCESS);
    const student = await User.getUserByUsername(nim);
    return {
      deanName: sk.deanName || "",
      deanNIP: sk.deanNIP || "",
      department: student?.ref_departemen?.dprtNama,
      letterDate: sk.skpTglSurat,
      letterNumber: sk.skpNomor,
      chaiman: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Utama"
      )?.dosen.dsnNama,
      secretary: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Pendamping"
      )?.dosen.dsnNama,
      major: sk.tugas_akhir.mahasiswa.ref_prodi?.prdNama || "S1 Farmasi",
      studentName: sk.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: sk.tugas_akhir.taMhsNim,
      member: sk.tugas_akhir.penguji.map((e) => e.dosen.dsnNama),
      signature: sk.signature,
      proposalTitle: sk.tugas_akhir.taJudul,
    } as IExaminerSKDoc;
  }

  static async getSupervisorSKData(nim: any, SKID: number) {
    const sk = await SupervisorSK.getSKByID(SKID);

    if (
      sk === null
      // sk.statusPermohonan !== "Diterima"
      // sk.skbStatus !== 1
    ) {
      throw new NotFoundError("sk hasn't been provided");
    }

    if (sk.tugas_akhir.taMhsNim !== nim) {
      throw new BadRequestError("data's not for this student");
    }

    // const dean = await User.getUserByBadge(constants.DEAN_GROUP_ACCESS);
    const student = await User.getUserByUsername(nim);
    return {
      deanName: sk.deanName || "",
      deanNIP: sk.deanNIP || "",
      department: student?.ref_departemen?.dprtNama,
      letterDate: sk.skbTglSurat,
      letterNumber: sk.skbNomor,
      mainMentor: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Utama"
      )?.dosen.dsnNama,
      sideMentor: sk.tugas_akhir.pembimbing.find(
        (s) => s.ref_posisipmb === "Pendamping"
      )?.dosen.dsnNama,
      major: sk.tugas_akhir.mahasiswa.ref_prodi?.prdNama || "",
      studentName: sk.tugas_akhir.mahasiswa.mhsNama,
      studentNIM: sk.tugas_akhir.taMhsNim,
      signature: sk.signature_path,
      proposalTitle: sk.tugas_akhir.taJudul,
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

    const headLab = await User.getUserByBadge(
      constants.LAB_ADMIN_GROUP_ACCESS,
      { lab: freeLab.blLabId }
    );

    return {
      faculty: "Farmasi",
      headLabName: headLab?.name || "",
      headLabNIP: headLab?.username || "",
      letterDate: freeLab.blTglSurat ?? "",
      letterNumber: "",
      studentName: freeLab.mahasiswa.mhsNama,
      studentNIM: nim,
      signature: freeLab.signature_path,
      labName: freeLab.ref_laboratorium.labNama,
      major: freeLab.mahasiswa.ref_prodi?.prdNama,
      title: freeLab.mahasiswa.tugas_akhir.find(
        (t) =>
          t.statusPermohonan === "Diterima" &&
          t.statusDepartemen === "Diterima" &&
          t.taKRSKHSStatus === "Diterima"
      )?.taJudul,
    } as IFreeLabDoc;
  }
}
