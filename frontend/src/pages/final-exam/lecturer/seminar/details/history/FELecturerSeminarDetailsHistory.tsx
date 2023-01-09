import { Stack } from "@mantine/core";
import path from "path";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFELecturerStudentSeminar } from "../FELecturerSeminarDetails";
import FELecturerSeminarDetailsHistoryCard, {
  IFELecturerSeminarDetailsHistoryCard,
} from "./FELecturerSeminarDetailsHistoryCard";

export interface IFELecturerSeminarDetailsHistory {
  // nim: string;
}

const dummySeminarData: {
  [nim: string]: Array<IFELecturerStudentSeminar>;
} = {
  H071191040: [
    {
      name: "Muhammad Takdim",
      nim: "H071191040",
      proposalTitle:
        "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
      seminarTime: "Senin, 29 Februari 2023 (23:00 - 23:59 WITA)",
      seminarOfflinePlace: "Ruang Diskusi Farmasi",
      seminarOnlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
      seminarType: "Seminar Proposal",
      score: "95",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
      firstExaminer: "Dr. Armin Lawi, S.Si, M.Eng",
      secondExaminer: "Dr. Muhammad Hasbi, M.Sc",
    },
  ],
  H071171308: [
    {
      name: "Siti Rabiatul",
      nim: "H071171308",
      proposalTitle:
        "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
      seminarTime: "Senin, 29 Februari 2023 (23:00 - 23:59 WITA)",
      seminarOfflinePlace: "Hiroshima, Jepang",
      seminarOnlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
      seminarType: "Seminar Proposal",
      score: "70",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
      firstExaminer: "Dr. Armin Lawi, S.Si, M.Eng",
      secondExaminer: "Dr. Muhammad Hasbi, M.Sc",
    },
    {
      name: "Siti Rabiatul",
      nim: "H071171308",
      proposalTitle:
        "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
      seminarTime: "Senin, 29 Februari 2023 (23:00 - 23:59 WITA)",
      seminarOfflinePlace: "Hiroshima, Jepang",
      seminarOnlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
      seminarType: "Ujian Skripsi",
      score: "70",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
      firstExaminer: "Dr. Armin Lawi, S.Si, M.Eng",
      secondExaminer: "Dr. Muhammad Hasbi, M.Sc",
    },
  ],
  H071191044: [
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      proposalTitle:
        "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
      seminarTime: "Senin, 29 Februari 2023 (23:00 - 23:59 WITA)",
      seminarOfflinePlace: "Hiroshima, Jepang",
      seminarOnlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
      seminarType: "Seminar Proposal",
      score: "85",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
      firstExaminer: "Dr. Armin Lawi, S.Si, M.Eng",
      secondExaminer: "Dr. Muhammad Hasbi, M.Sc",
    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      proposalTitle:
        "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
      seminarTime: "Senin, 29 Februari 2023 (23:00 - 23:59 WITA)",
      seminarOfflinePlace: "Hiroshima, Jepang",
      seminarOnlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
      seminarType: "Seminar Hasil",
      score: "85",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
      firstExaminer: "Dr. Armin Lawi, S.Si, M.Eng",
      secondExaminer: "Dr. Muhammad Hasbi, M.Sc",
    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      proposalTitle:
        "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
      seminarTime: "Senin, 29 Februari 2023 (23:00 - 23:59 WITA)",
      seminarOfflinePlace: "Hiroshima, Jepang",
      seminarOnlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
      seminarType: "Ujian Skripsi",
      score: "85",
      mainMentor: "Dr. Hendra, S.Si., M.Kom.",
      sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
      firstExaminer: "Dr. Armin Lawi, S.Si, M.Eng",
      secondExaminer: "Dr. Muhammad Hasbi, M.Sc",
    },
  ],
};

const FELecturerSeminarDetailsHistory: React.FC<
  IFELecturerSeminarDetailsHistory
> = ({}) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const regexPattern = /H\d{9}/g;
  const nim = regexPattern.exec(pathname)![0];

  if (nim == null) {
    console.log("nim is not defined, redirecting...");
    navigate("/tugas-akhir");
  }

  const [seminarData] = useState(dummySeminarData[nim!]);
  const breadCrumbs: Array<IFEBreadCrumbsItem> = [
    {
      title: "Seminar Mahasiswa",
      href: FEROUTES.LECTURER_HOMEPAGE_SEMINAR,
    },
    {
      title: `${seminarData[0].name} (${seminarData[0].nim})`,
      href: FEROUTES.LECTURER_HOMEPAGE_SEMINAR + "/" + nim,
    },
  ];
  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Riwayat Seminar"
    >
      <LFPHeaderComponent title="Riwayat Seminar Mahasiswa" />
      {
        <Stack className="gap-6">
          {seminarData.map((seminar: IFELecturerStudentSeminar, e: number) => {
            return (
              <FELecturerSeminarDetailsHistoryCard key={e} seminarData={seminar} />
            );
          })}
        </Stack>
      }
    </FEMainlayout>
  );
};
export default FELecturerSeminarDetailsHistory;
