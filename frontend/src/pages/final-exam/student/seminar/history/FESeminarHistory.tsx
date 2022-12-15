import { Stack, Title } from "@mantine/core";
import React, { useEffect, useState } from "react";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEStudentMainlayout from "src/layouts/final-exam/student/FEStudentMainlayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFESeminarHistoryCard } from "./FESeminarHistoryCard";
import FESeminarHistoryMain from "./FESeminarHistoryMain";

export interface IFESeminarHistory {}

const dummyFESeminarHistory: Array<IFESeminarHistoryCard> = [
  {
    seminarType: "Ujian Skripsi",
    proposalTitle:
      "Potensi Tumbuhan Libo (Ficus variegata, Blume) Sebagai Sumber Bahan Farmasi Potensial",
    seminarTimeInformation: {
      date: "Jumat, 31 Desember 2022",
      time: "22:00 - 23:59 WITA",
      offlinePlace: "Ruang Diskusi Farmasi",
      onlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09 Meeting ID: 968 7472 2331 Passcode: f4rmasi",
    },
    seminarRubric: "B",
    seminarScore: 85.0,
    mentorNotes: [],
  },
  {
    seminarType: "Seminar Hasil",
    proposalTitle:
      "Potensi Tumbuhan Libo (Ficus variegata, Blume) Sebagai Sumber Bahan Farmasi Potensial",
    seminarTimeInformation: {
      date: "Kamis, 1 Februari 2023",
      time: "22:00 - 23:59 WITA",
      offlinePlace: "Ruang Diskusi Farmasi",
      onlinePlace:
        "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09 Meeting ID: 968 7472 2331 Passcode: f4rmasi",
    },
    seminarRubric: "C",
    seminarScore: 67.5,
    mentorNotes: [
      "Kamu Sangat Bagus",
      "",
      "Lorem ipsum dolor sit amet consectetur. Eleifend ut sodales mauris pellentesque accumsan pharetra semper ut. Pulvinar nibh id in pharetra tellus ac",
      "",
    ],
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Seminar",
    href: FEROUTES.STUDENT_SEMINAR,
  },
];

const FESeminarHistory: React.FC<IFESeminarHistory> = ({}) => {
  const { array: seminarHistoryData } = useArray(dummyFESeminarHistory);
  const [isHistoryExist, setIsHistoryExist] = useState(true);

  useEffect(() => {
    if (seminarHistoryData.length <= 0) {
      setIsHistoryExist(false);
    } else {
      setIsHistoryExist(true);
    }
  }, [seminarHistoryData]);

  return (
    <FEStudentMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Riwayat Seminar"
    >
      <Stack spacing={"xl"}>
        <Title order={2}>Riwayat Seminar</Title>
        {isHistoryExist ? (
            <FESeminarHistoryMain seminarHistoryData={seminarHistoryData} />
        ) : (
          <LFPEmptyDataComponent
            title="Riwayat Seminar Masih Kosong"
            caption={"Riwayat seminar Anda akan ditampilkan di sini."}
            icon={
              <ManThinkingAnimation
                width={400}
                className="overflow-hidden z-[-1]"
              />
            }
          />
        )}
      </Stack>
    </FEStudentMainlayout>
  );
};
export default FESeminarHistory;
