import { parseCSV } from "../apps/utils/csv-parser";
import prismaDB from "../apps/utils/database";

export async function insertStudents() {
  try {
    parseCSV(
      "/home/yoyo/personal/dev/sifa/backend/tugas-akhir/data/seed tugas akhir farmasi - Mahasiswa.csv",
      (results) => {
        results.forEach(async (result) => {
          const NIM = result.NIM;
          const name = result.Nama;
          const birthPlace = result.TempatLahir;
          const day = Number(result.TglLahir.split("/")[0]);
          const month = Number(result.TglLahir.split("/")[1]);
          const year = Number(result.TglLahir.split("/")[2]);
          const reformattedDate = `${year}-${month}-${day}`;
          const birthDate = new Date(reformattedDate);
          const address = result.Alamat;
          const email = result.email;
          const gender = result.JK;
          const phoneNumber = result.NoTelp;
          const vocationCode = result.KodeProdi;
          const academicLecturer = result.PADosenNIP;

          const vocation = await prismaDB.ref_prodi.findFirst({
            where: { prdKode: vocationCode },
          });

          const lecturer = await prismaDB.dosen.findUnique({
            where: { dsnNip: academicLecturer },
          });

          await prismaDB.mahasiswa.create({
            data: {
              mhsNama: name,
              mhsNim: NIM,
              mhsAlamat: address,
              mhsEmail: email,
              mhsJk: gender,
              mhsTempatLahir: birthPlace,
              mhsTglLahir: birthDate,
              mhsNoTelp: phoneNumber,
              mhsPrdId: vocation?.prdId,
              mhsPaDsnId: lecturer?.dsnId,
            },
          });
        });
      }
    );
    // const departments = await prismaDB.ref_departemen.createMany({
    //   data: [
    //     {
    //       dprtNama: "Farmasi",
    //       dprtId: 1,
    //       dprtKepalaNama: "Muh. Ikhsan, S.Si",
    //       dprtKepalaNip: "128852340252734652",
    //     },
    //   ],
    // });

    // const lecturer = await prismaDB.dosen.create({
    //   data: {
    //     dsnNama: "Muh. Ikhsan, S.Si",
    //     dsnNip: "128852340252734652",
    //     dsnDprtId: 1,
    //   },
    // });

    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
