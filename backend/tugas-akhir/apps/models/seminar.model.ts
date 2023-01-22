import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import prismaDB from "../utils/database";
import { BadRequestError } from "../utils/error/badrequestError";
import { InternalServerError } from "../utils/error/internalError";
import {
  ISeminarDocumentPost,
  ISeminarSchedulePost,
} from "../utils/interfaces/seminar.interface";

export class Seminar {
  static async getSeminarsByStudentNIM(nim: string) {
    return await prismaDB.seminar.findMany({
      where: {
        tugas_akhir: {
          taMhsNim: nim,
        },
      },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: {
              include: { dosen: true },
            },
            penguji: {
              include: { dosen: true },
            },
          },
        },
        seminar_dokumen: true,
        seminar_nilai: {
          include: {
            dosen: true,
          },
        },
        seminar_catatan: {
          include: {
            dosen: true,
          },
        },
      },
    });
  }

  static async deleteScoringAndEventLetter(seminarID: number) {
    try {
      return await prismaDB.seminar.update({
        where: { smrId: seminarID },
        data: { smrFileBeritaAcara: null, smrFileKeteranganNilai: null },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async provideScoringAndEventLetter(
    seminarID: number,
    scoringLetterPath: string,
    eventLetterPath: string | undefined
  ) {
    try {
      return await prismaDB.seminar.update({
        where: { smrId: seminarID },
        data: {
          smrFileBeritaAcara: eventLetterPath,
          smrFileKeteranganNilai: scoringLetterPath,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }
  static async getEvaluationDetail(seminarID: number) {
    return await prismaDB.seminar.findFirst({
      where: {
        AND: [
          { smrId: seminarID },
          { NOT: { smrFileKesediaan: null } },
          { NOT: { smrFileUndangan: null } },
        ],
      },
      include: {
        seminar_dokumen: true,
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
          },
        },
        seminar_nilai: {
          include: { dosen: true },
        },
        seminar_catatan: {
          include: { dosen: true },
        },
        seminar_persetujuan: {
          include: { dosen: true },
        },
      },
    });
  }

  static async getSeminarByScore(scored: boolean) {
    if (scored) {
      return await prismaDB.seminar.findMany({
        where: {
          AND: [
            { NOT: { smrFileUndangan: null } },
            { NOT: { smrFileKesediaan: null } },
            { NOT: { smrNilaiAngka: null } },
          ],
        },
        include: {
          tugas_akhir: true,
        },
      });
    }

    return await prismaDB.seminar.findMany({
      where: {
        AND: [
          { NOT: { smrFileUndangan: null } },
          { NOT: { smrFileKesediaan: null } },
          { smrNilaiAngka: null },
        ],
      },
      include: {
        tugas_akhir: { include: { mahasiswa: true } },
      },
    });
  }

  static async updateAvgScore(seminarID: number, finalScore: number | null) {
    return await prismaDB.seminar.update({
      where: { smrId: seminarID },
      data: { smrNilaiAngka: finalScore },
    });
  }

  static async getSeminarOfThesisByLecturer(nim: string, thesisID: number) {
    return await prismaDB.seminar.findMany({
      where: {
        AND: [
          { smrTaId: thesisID },
          { seminar_persetujuan: { some: { dosen: { dsnNip: nim } } } },
          { NOT: { smrFileUndangan: null } },
          { NOT: { smrFileKesediaan: null } },
        ],
      },
      include: {
        seminar_dokumen: true,
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
          },
        },
        seminar_persetujuan: {
          include: { dosen: true },
          where: { dosen: { dsnNip: nim } },
        },
        seminar_nilai: {
          include: { dosen: true },
          where: { dosen: { dsnNip: nim } },
        },
        seminar_catatan: {
          include: { dosen: true },
          where: { dosen: { dsnNip: nim } },
        },
      },
    });
  }

  static async provideInvitationAndApprovalLetter(
    seminarID: number,
    invitationPath: string,
    approvalPath: string
  ) {
    try {
      return await prismaDB.seminar.update({
        where: { smrId: seminarID },
        data: {
          smrFileUndangan: invitationPath,
          smrFileKesediaan: approvalPath,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async getScheduledSeminarDetail(seminarID: number) {
    return await prismaDB.seminar.findUnique({
      where: {
        smrId: seminarID,
        // tugas_akhir: {
        //   OR: [
        //     { pembimbing: { some: { dosen: { dsnNip: nim } } } },
        //     { penguji: { some: { dosen: { dsnNip: nim } } } },
        //   ],
        // },
      },
      include: {
        seminar_dokumen: true,
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
          },
        },
        seminar_persetujuan: {
          include: { dosen: true },
        },
      },
    });
  }

  static async getScheduledSeminars() {
    return await prismaDB.seminar.findMany({
      where: {
        AND: [{ NOT: { smrTglSeminar: null } }, { smrFileBeritaAcara: null }],
        // tugas_akhir: {
        //   OR: [
        //     { pembimbing: { some: { dosen: { dsnNip: nim } } } },
        //     { penguji: { some: { dosen: { dsnNip: nim } } } },
        //   ],
        // },
      },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
          },
        },
        seminar_persetujuan: {
          include: { dosen: true },
        },
      },
    });
  }

  static async getInvitedSeminarDetail(nim: string, seminarID: number) {
    return await prismaDB.seminar.findFirst({
      where: {
        AND: [
          { smrId: seminarID },
          { NOT: { smrFileKesediaan: null } },
          { NOT: { smrFileUndangan: null } },
        ],
      },
      include: {
        seminar_dokumen: true,
        tugas_akhir: {
          include: {
            mahasiswa: true,
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
          },
        },
        seminar_nilai: {
          where: { dosen: { dsnNip: nim } },
          include: { dosen: true },
        },
        seminar_catatan: {
          where: { dosen: { dsnNip: nim } },
          include: { dosen: true },
        },
        seminar_persetujuan: {
          where: { dosen: { dsnNip: nim } },
          include: { dosen: true },
        },
      },
    });
  }

  static async getInvitedSeminarsBySupervisorUsername(nim: string) {
    return await prismaDB.seminar.findMany({
      where: {
        AND: [
          { seminar_persetujuan: { some: { dosen: { dsnNip: nim } } } },
          { NOT: { smrFileUndangan: null } },
          { smrFileBeritaAcara: null },
        ],
        // tugas_akhir: {
        //   OR: [
        //     { pembimbing: { some: { dosen: { dsnNip: nim } } } },
        //     { penguji: { some: { dosen: { dsnNip: nim } } } },
        //   ],
        // },
      },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
          },
        },
        seminar_persetujuan: {
          include: { dosen: true },
          where: { dosen: { dsnNip: nim } },
        },
      },
    });
  }

  static async changeScheduledSeminarApproval(
    seminarID: number,
    isAccepted: boolean,
    nim: string
  ) {
    try {
      return await prismaDB.seminar_persetujuan.updateMany({
        where: {
          AND: [{ ssetujuSmrId: seminarID }, { dosen: { dsnNip: nim } }],
        },
        data: {
          statusPermohonan: isAccepted ? "Diterima" : "Ditolak",
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async getScheduledSeminarDetailByLecturerUsername(
    nim: string,
    seminarID: number
  ) {
    return await prismaDB.seminar.findUnique({
      where: {
        smrId: seminarID,
        // tugas_akhir: {
        //   OR: [
        //     { pembimbing: { some: { dosen: { dsnNip: nim } } } },
        //     { penguji: { some: { dosen: { dsnNip: nim } } } },
        //   ],
        // },
      },
      include: {
        seminar_dokumen: true,
        tugas_akhir: {
          include: {
            mahasiswa: true,
          },
        },
        seminar_persetujuan: {
          include: { dosen: true },
          where: { dosen: { dsnNip: nim } },
        },
      },
    });
  }

  static async getScheduledSeminarBySupervisorUsername(nim: string) {
    return await prismaDB.seminar.findMany({
      where: {
        AND: [
          { seminar_persetujuan: { some: { dosen: { dsnNip: nim } } } },
          { NOT: { smrTglSeminar: null } },
        ],
        // tugas_akhir: {
        //   OR: [
        //     { pembimbing: { some: { dosen: { dsnNip: nim } } } },
        //     { penguji: { some: { dosen: { dsnNip: nim } } } },
        //   ],
        // },
      },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
          },
        },
        seminar_persetujuan: {
          include: { dosen: true },
          where: { dosen: { dsnNip: nim } },
        },
      },
    });
  }

  static async editSeminarSchedule(
    seminarID: number,
    body: ISeminarSchedulePost
  ) {
    const seminarDate = new Date(
      Number(body.seminarDate.split("-")[2]),
      Number(body.seminarDate.split("-")[1]),
      Number(body.seminarDate.split("-")[0])
    );

    const seminar = await prismaDB.seminar.update({
      where: {
        smrId: seminarID,
      },
      data: {
        smrLink: body.note,
        smrJamMulai: body.startTime,
        smrJamSelesai: body.endTime,
        smrTempat: body.place,
        smrTglSeminar: seminarDate,
        smrFileKesediaan: null,
        smrFileUndangan: null,
      },
    });

    await prismaDB.seminar_persetujuan.updateMany({
      where: { ssetujuSmrId: seminarID },
      data: { statusPermohonan: "Belum_Diproses" },
    });
  }

  static async deleteSeminarSchedule(seminarID: number) {
    const seminar = await prismaDB.seminar.update({
      where: {
        smrId: seminarID,
      },
      data: {
        smrLink: null,
        smrJamMulai: null,
        smrJamSelesai: null,
        smrTempat: null,
        smrTglSeminar: null,
        smrFileKesediaan: null,
        smrFileUndangan: null,
      },
    });

    await prismaDB.seminar_persetujuan.deleteMany({
      where: {
        ssetujuSmrId: seminarID,
      },
    });
  }

  static async updateSeminarSchedule(
    seminarID: number,
    body: ISeminarSchedulePost
  ) {
    const seminarDate = new Date(
      Number(body.seminarDate.split("-")[2]),
      Number(body.seminarDate.split("-")[1]),
      Number(body.seminarDate.split("-")[0])
    );

    const seminar = await prismaDB.seminar.update({
      where: {
        smrId: seminarID,
      },
      data: {
        smrLink: body.note,
        smrJamMulai: body.startTime,
        smrJamSelesai: body.endTime,
        smrTempat: body.place,
        smrTglSeminar: seminarDate,
      },
      include: {
        tugas_akhir: {
          include: {
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
          },
        },
      },
    });

    await prismaDB.seminar_persetujuan.create({
      data: {
        ssetujuSmrId: seminarID,
        ssetujuDsnId: seminar.tugas_akhir.pembimbing[0].pmbDsnId,
      },
    });

    await prismaDB.seminar_persetujuan.create({
      data: {
        ssetujuSmrId: seminarID,
        ssetujuDsnId: seminar.tugas_akhir.pembimbing[1].pmbDsnId,
      },
    });

    await prismaDB.seminar_persetujuan.create({
      data: {
        ssetujuSmrId: seminarID,
        ssetujuDsnId: seminar.tugas_akhir.penguji[0].ujiDsnId,
      },
    });

    await prismaDB.seminar_persetujuan.create({
      data: {
        ssetujuSmrId: seminarID,
        ssetujuDsnId: seminar.tugas_akhir.penguji[1].ujiDsnId,
      },
    });

    return seminar;
  }

  static async getSeminars() {
    return await prismaDB.seminar.findMany({
      include: {
        tugas_akhir: {
          include: { mahasiswa: true },
        },
      },
    });
  }

  static async changeSupervisorSeminarApproval(
    seminarID: number,
    isAccepted: boolean,
    nim: string
  ) {
    try {
      return await prismaDB.seminar_status_pembimbing.updateMany({
        where: {
          AND: [
            { setujuSmrId: seminarID },
            { pembimbing: { dosen: { dsnNip: nim } } },
          ],
        },
        data: {
          statusPermohonan: isAccepted ? "Diterima" : "Ditolak",
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async getSeminarSupervisorDetail(nim: string, seminarID: number) {
    return await prismaDB.seminar.findFirst({
      where: {
        smrId: seminarID,
        seminar_status_pembimbing: {
          some: {
            pembimbing: {
              dosen: {
                dsnNip: nim,
              },
            },
          },
        },
      },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
          },
        },
        seminar_dokumen: true,
        seminar_status_pembimbing: {
          where: {
            pembimbing: { dosen: { dsnNip: nim } },
          },
          include: {
            pembimbing: {
              include: {
                dosen: true,
              },
            },
          },
        },
      },
    });
  }

  static async getSeminarBySupervisorNIP(nim: string) {
    return await prismaDB.seminar.findMany({
      where: {
        tugas_akhir: {
          pembimbing: { some: { dosen: { dsnNip: nim } } },
        },
      },
      include: {
        tugas_akhir: {
          include: {
            mahasiswa: true,
          },
        },
        seminar_status_pembimbing: {
          where: { pembimbing: { dosen: { dsnNip: nim } } },
        },
      },
    });
  }

  static async provideSeminarDocument(
    seminarID: number,
    body: ISeminarDocumentPost
  ) {
    try {
      const data = body.doc.map((d) => {
        return {
          namaDokumenSeminar: d.name,
          dokSmrId: seminarID,
          dokFile: d.path,
        };
      });
      return prismaDB.seminar_dokumen.createMany({
        data,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }

  static async getSeminarByID(seminarID: number) {
    return await prismaDB.seminar.findUnique({
      where: { smrId: seminarID },
      include: {
        seminar_catatan: { include: { dosen: true } },
        seminar_dokumen: true,
        seminar_persetujuan: { include: { dosen: true } },
        seminar_status_pembimbing: {
          include: { pembimbing: { include: { dosen: true } } },
        },
        seminar_nilai: {
          include: {
            dosen: true,
          },
        },
        tugas_akhir: {
          include: {
            pembimbing: { include: { dosen: true } },
            penguji: { include: { dosen: true } },
            mahasiswa: { include: { ref_prodi: true } },
          },
        },
      },
    });
  }

  static async createRequestSeminar(
    thesisID: number,
    supervisorsID: number[],
    seminarType: "Seminar_Proposal" | "Seminar_Hasil" | "Ujian_Skripsi"
  ) {
    try {
      const seminar = await prismaDB.seminar.create({
        data: {
          ref_jenisujian: seminarType,
          smrTaId: thesisID,
        },
      });

      await prismaDB.seminar_status_pembimbing.create({
        data: {
          setujuSmrId: seminar.smrId,
          setujuPmbId: supervisorsID[0],
        },
      });
      await prismaDB.seminar_status_pembimbing.create({
        data: {
          setujuSmrId: seminar.smrId,
          setujuPmbId: supervisorsID[1],
        },
      });

      return seminar;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        throw new BadRequestError(error.message);
      } else if (error instanceof Error) {
        throw new InternalServerError(error.message);
      } else {
        throw new InternalServerError("server error");
      }
    }
  }
}
