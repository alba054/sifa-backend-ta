// 12345	Sarjana Farmasi	145259834693385264	Nurhasni Hasan, S.Si., M.Pharm.Sc., Ph.D., Apt.	Farmasi	S1
// 12346	Profesi Apoteker	124095270341248856	Abdul Rahim, S.Si., M.Si., PhD, Apt.	Farmasi	Profesi_Apoteker
// 12347	Magister Farmasi	124857429457257294	Muhammad Aswad, S.Si., M.Si., Ph.D., Apt.	Farmasi	S2
// 12348	Doktor Farmasi	199574363245783257	Yusnita Rifai, Ph.D., Apt.	Farmasi	S3

import prismaDB from "../apps/utils/database";

interface IVocation {
  prdKode: string;
  prdKepalaNama: string;
  prdKepalaNip: string;
  prdNama: string;
  prdDprtId: number;
  jenjang: "S1" | "S2" | "S3" | "Profesi_Apoteker";
}

export async function insertVocations() {
  try {
    let data: IVocation[];
    data = [
      {
        prdKode: "12345",
        prdKepalaNama: "Nurhasni Hasan, S.Si., M.Pharm.Sc., Ph.D., apt",
        prdKepalaNip: "145259834693385264",
        prdNama: "Sarjana Farmasi",
        prdDprtId: 1,
        jenjang: "S1",
      },
      {
        prdKode: "12346",
        prdKepalaNama: "Abdul Rahim, S.Si., M.Si., PhD, Apt",
        prdKepalaNip: "124095270341248856",
        prdNama: "Profesi Apoteker",
        prdDprtId: 1,
        jenjang: "Profesi_Apoteker",
      },
      {
        prdKode: "12347",
        prdKepalaNama: "Muhammad Aswad, S.Si., M.Si., Ph.D., Apt",
        prdKepalaNip: "124857429457257294",
        prdNama: "Doktor Farmasi",
        prdDprtId: 1,
        jenjang: "S2",
      },
      {
        prdKode: "12348",
        prdKepalaNama: "Yusnita Rifai, Ph.D., Apt",
        prdKepalaNip: "199574363245783257",
        prdNama: "Magister Farmasi",
        prdDprtId: 1,
        jenjang: "S3",
      },
    ];

    const vocations = await prismaDB.ref_prodi.createMany({
      data,
    });

    console.info("done");
  } catch (error) {
    console.error(error);
  }
}
