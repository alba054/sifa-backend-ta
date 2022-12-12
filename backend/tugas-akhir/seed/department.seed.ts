// 12345	Sarjana Farmasi	145259834693385264	Nurhasni Hasan, S.Si., M.Pharm.Sc., Ph.D., Apt.	Farmasi	S1
// 12346	Profesi Apoteker	124095270341248856	Abdul Rahim, S.Si., M.Si., PhD, Apt.	Farmasi	Profesi_Apoteker
// 12347	Magister Farmasi	124857429457257294	Muhammad Aswad, S.Si., M.Si., Ph.D., Apt.	Farmasi	S2
// 12348	Doktor Farmasi	199574363245783257	Yusnita Rifai, Ph.D., Apt.	Farmasi	S3

import { parseCSV } from "../apps/utils/csv-parser";
import prismaDB from "../apps/utils/database";

export async function insertDepartments() {
  try {
    parseCSV(
      "/home/yoyo/personal/dev/sifa/backend/tugas-akhir/data/seed tugas akhir farmasi - Departemen.csv",
      (results) => {
        results.forEach(async (result) => {
          const deptName = result.NamaDepartemen;
          const deptID = result.IDDepartemen;
          const headDept = result.NamaKepalaDepartemen;
          const headNIP = result.NIPKepalaDepartemen;

          await prismaDB.ref_departemen.create({
            data: {
              dprtNama: deptName,
              dprtId: Number(deptID),
              dprtKepalaNama: headDept,
              dprtKepalaNip: headNIP,
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
