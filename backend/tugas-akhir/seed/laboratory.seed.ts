// 12345	Sarjana Farmasi	145259834693385264	Nurhasni Hasan, S.Si., M.Pharm.Sc., Ph.D., Apt.	Farmasi	S1
// 12346	Profesi Apoteker	124095270341248856	Abdul Rahim, S.Si., M.Si., PhD, Apt.	Farmasi	Profesi_Apoteker
// 12347	Magister Farmasi	124857429457257294	Muhammad Aswad, S.Si., M.Si., Ph.D., Apt.	Farmasi	S2
// 12348	Doktor Farmasi	199574363245783257	Yusnita Rifai, Ph.D., Apt.	Farmasi	S3

import { parseCSV } from "../apps/utils/csv-parser";
import prismaDB from "../apps/utils/database";

export async function insertlaboratories() {
  try {
    parseCSV(
      "/home/yoyo/personal/dev/sifa/backend/tugas-akhir/data/seed tugas akhir farmasi - Laboratorium.csv",
      (results) => {
        results.forEach(async (result) => {
          const labName = result.nama_lab;
          const headName = result.nama_kepala;
          const headNIP = result.nip_kepala;

          await prismaDB.ref_laboratorium.create({
            data: {
              labNama: labName,
              labKepalaNama: headName,
              labKepalaNip: headNIP,
            },
          });
        });
      }
    );
    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
