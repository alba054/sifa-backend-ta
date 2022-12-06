import { parseCSV } from "../apps/utils/csv-parser";
import prismaDB from "../apps/utils/database";

export async function insertLecturers() {
  try {
    parseCSV(
      "/home/yoyo/personal/dev/sifa/backend/tugas-akhir/data/seed tugas akhir farmasi - Dosen.csv",
      (results) => {
        results.forEach(async (result) => {
          const NIP = result.NIP;
          const name = result.Nama;
          const departmentID = Number(result.DepartemenID);
          const birthPlace = result.TempatLahir;
          const day = Number(result.TglLahir.split("/")[0]);
          const month = Number(result.TglLahir.split("/")[1]);
          const year = Number(result.TglLahir.split("/")[2]);
          const reformattedDate = `${year}-${month}-${day}`;
          const birthDate = new Date(reformattedDate);
          const address = result.Alamat;
          const nidn = result.NIDN;
          const expertise = result.BidangKeahlian;
          const email = result.email;
          const gender = result.JenisKelamin;
          const status = result.StatusKepegawaian;

          await prismaDB.dosen.create({
            data: {
              dsnNama: name,
              dsnNip: NIP,
              dsnAlamat: address,
              dsnBidangKeahlian: expertise,
              dsnDprtId: departmentID,
              dsnEmail: email,
              dsnJK: gender,
              dsnNIDN: nidn,
              dsnTempatLahir: birthPlace,
              dsnTglLahir: birthDate,
              statusKepegawaian: status,
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
