import { Stack, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FESeminarCoordinatorSeminarSchedulingCard, {
  IFESeminarCoordinatorSeminarSchedulingCard
} from "./FESeminarCoordinatorSeminarSchedulingCard";
import FESeminarCoordinatorSeminarSchedulingModal from "./FESeminarCoordinatorSeminarSchedulingModal";
export interface IFESeminarCoordinatorSeminarScheduling {}

const dummySeminarData: Array<IFESeminarCoordinatorSeminarSchedulingCard> = [
  {
    name: "Muhammad Takdim",
    nim: "H071191040",
    proposalTitle:
      "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
    seminarTime: "Senin, 29 Februari 2023",
    seminarStartTime: "22",
    seminarEndTime: "23",
    seminarOfflinePlace: "Ruang Diskusi Farmasi",
    seminarOnlinePlace:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Seminar Proposal",
    mainMentor: "Dr. Hendra, S.Si., M.Kom.",
    sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    firstExaminers: "Dr. Muhammad Hasbi, M.Sc",
    secondExaminers: "Prof. Dr. Nurdin, S.Si., M.Si.",
    mainMentorStatus: "Belum_Diproses",
    firstExaminersStatus: "Diterima",
    secondExaminersStatus: "Ditolak",
    sideMentorStatus: "Belum_Diproses",
    isSeminarLetterGenerated: false,
  },
  {
    name: "Siti Rabiatul",
    nim: "H071171308",
    proposalTitle:
      "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
    seminarTime: "Senin, 29 Februari 2023",
    seminarStartTime: "22",
    seminarEndTime: "23",
    seminarOfflinePlace: "Hiroshima, Jepang",
    seminarOnlinePlace:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Ujian Skripsi",
    mainMentor: "Dr. Hendra, S.Si., M.Kom.",
    sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    firstExaminers: "Dr. Muhammad Hasbi, M.Sc",
    secondExaminers: "Prof. Dr. Nurdin, S.Si., M.Si.",
    mainMentorStatus: "Diterima",
    firstExaminersStatus: "Diterima",
    secondExaminersStatus: "Diterima",
    sideMentorStatus: "Belum_Diproses",
    isSeminarLetterGenerated: false,
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle:
      "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",
    seminarTime: "Senin, 29 Februari 2023",
    seminarStartTime: "22",
    seminarEndTime: "23",
    seminarOfflinePlace: "Hiroshima, Jepang",
    seminarOnlinePlace:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Ujian Skripsi",
    mainMentor: "Dr. Hendra, S.Si., M.Kom.",
    sideMentor: "A. Muh. Amil Siddik, S.Si.,M.Si",
    firstExaminers: "Dr. Muhammad Hasbi, M.Sc",
    secondExaminers: "Prof. Dr. Nurdin, S.Si., M.Si.",
    mainMentorStatus: "Diterima",
    firstExaminersStatus: "Diterima",
    secondExaminersStatus: "Diterima",
    sideMentorStatus: "Diterima",
    isSeminarLetterGenerated: true,
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Seminar",
    href: FEROUTES.SEMINAR_COORDINATOR_SEMINAR
  },
];

const FESeminarCoordinatorSeminarScheduling: React.FC<
  IFESeminarCoordinatorSeminarScheduling
> = ({}) => {
  const { array: seminarData, remove, clear } = useArray(dummySeminarData);
  const navigate = useNavigate();

  const [isAddScheduleModalOpened, setIsAddScheduleModalOpened] =
    useState(false);
  const [isDataExist, setIsDataExist] = useState(
    seminarData.length > 0 ? true : false
  );

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Buat Jadwal",
      type: "modal",
      onClick: () => {
        setIsAddScheduleModalOpened(true);
      },
      disabled: false,
    },
  ];

  function onDelete(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (seminarData.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [seminarData]);

  function addScheduleHandler(values: any) {
    console.log("Ini valuenya", values);
    setIsAddScheduleModalOpened(false);
  }

  return (
    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Jadwal Seminar">
      <FESeminarCoordinatorSeminarSchedulingModal
        opened={isAddScheduleModalOpened}
        setOpened={setIsAddScheduleModalOpened}
        onSubmit={addScheduleHandler}
      />
      <Stack className="gap-0">
        <LFPHeaderComponent
          title="Jadwal Seminar"
          buttons={buttons}
          // chipLabel={`${dataFromBackend.length} Usulan`}
          chipLabel={`${seminarData.length} Seminar`}
        />
        <Text className="text-secondary-text-500">
          Daftar pelaksanaan seminar/ujian mahasiswa yang akan datang
        </Text>
      </Stack>
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {seminarData.map(
            (
              proposal: IFESeminarCoordinatorSeminarSchedulingCard,
              e: number
            ) => {
              return (
                <FESeminarCoordinatorSeminarSchedulingCard
                  key={e}
                  index={e}
                  onDelete={(e: number) => {
                    onDelete(e);
                  }}
                  {...proposal}
                />
              );
            }
          )}
        </Stack>
      ) : (
        <LFPEmptyDataComponent
          title="Jadwal Seminar Masih Kosong"
          caption="Jadwal seminar yang telah dibuat akan muncul di sini."
          icon={
            <ManThinkingAnimation
              width={400}
              className="overflow-hidden z-[-1]"
            />
          }
        />
      )}
    </FEMainlayout>
  );
};
export default FESeminarCoordinatorSeminarScheduling;
