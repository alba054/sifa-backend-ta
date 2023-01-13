import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FEClockOutline,
  FEEmailNotificationOutline,
  FELocationOutline,
  FEPenOutline,
  FETogaOutline,
} from "src/assets/Icons/Fluent";
import FETableComponent, {
  IFETableAction,
  IFETableHeadingProps,
  IFETableRowColumnProps,
} from "src/components/fe-components/fe-table/FETable";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEScoreCircleBar from "src/components/fe-components/FEScoreCircleBar";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FETableRow1 from "src/components/fe-components/table/FETableRow1";
import FEInputModal from "src/components/FEInputModal";
import { NumberInput } from "src/components/FormInput";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { getFEDate } from "src/utils/functions/date.function";

export interface IFESeminarCoordinatorSeminarEvaluationUngraded {}

export interface IFELecturerSeminarEvaluation {
  name: string;
  score?: number;
}

export interface IFELecturerStudentSeminar {
  name: string;
  nim: string;
  proposalTitle: string;
  seminarType: string;
  seminarDate: Date;
  seminarStartTime: Date;
  seminarEndTime: Date;
  seminarOfflinePlace: string;
  seminarOnlinePlace: string;
  scoreLetter?: any;
  mainMentor: IFELecturerSeminarEvaluation;
  sideMentor: IFELecturerSeminarEvaluation;
  firstExaminer: IFELecturerSeminarEvaluation;
  secondExaminer: IFELecturerSeminarEvaluation;
}

const dummySeminarData: {
  [nim: string]: IFELecturerStudentSeminar;
} = {
  H071191042: {
    name: "Muhammad Takdim",
    nim: "H071191042",
    proposalTitle:
      "RANCANG BANGUN SISTEM INFORMASI APLIKASI PERPUSTAKAAN UNIVERSITAS HASANUDDIN BERBASIS ANDROID",
    seminarDate: new Date(),
    seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
    seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
    seminarOfflinePlace: "Ruang Diskusi Farmasi",
    seminarOnlinePlace:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Seminar Proposal",
    scoreLetter: "1",
    mainMentor: {
      name: "Dr. Hendra, S.Si., M.Kom.",
      score: 100,
    },
    sideMentor: {
      name: "A. Muh. Amil Siddik, S.Si.,M.Si",
      score: 100,
    },
    firstExaminer: {
      name: "Dr. Armin Lawi, S.Si, M.Eng",
      score: 100,
    },
    secondExaminer: {
      name: "Dr. Muhammad Hasbi, M.Sc",
      score: 100,
    },
  },
  H071191044: {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle:
      "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",

    seminarOfflinePlace: "Hiroshima, Jepang",
    seminarOnlinePlace:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Ujian Skripsi",

    seminarDate: new Date(),
    seminarStartTime: new Date(2023, 0, 13, 14, 0, 0),
    seminarEndTime: new Date(2023, 0, 13, 15, 0, 0),
    scoreLetter: "1",
    mainMentor: {
      name: "Dr. Hendra, S.Si., M.Kom.",
      score: 0,
    },
    sideMentor: {
      name: "A. Muh. Amil Siddik, S.Si.,M.Si",
      score: 90,
    },
    firstExaminer: {
      name: "Dr. Armin Lawi, S.Si, M.Eng",
      score: 0,
    },
    secondExaminer: {
      name: "Dr. Muhammad Hasbi, M.Sc",
      score: 0,
    },
  },
  H011171303: {
    name: "Rista Ismayanti Nur",
    nim: "H011171303",
    proposalTitle:
      "ANALISA PERBANDINGAN KINERJA METODE CANNY DAN FUZZY LOGIC DALAM DETEKSI KEASLIAN MATA UANG RUPIAH KERTAS BERDASARKAN WATERMARK",

    seminarOfflinePlace: "Hiroshima, Jepang",
    seminarOnlinePlace:
      "https://telkomsel.zoom.us/j/96874722331?pwd=cDVrVVBhVFBjY1d4NHpSRlEvam5OUT09",
    seminarType: "Ujian Skripsi",
    mainMentor: {
      name: "Dr. Hendra, S.Si., M.Kom.",
      score: 0,
    },
    sideMentor: {
      name: "A. Muh. Amil Siddik, S.Si.,M.Si",
      score: 0,
    },
    firstExaminer: {
      name: "Dr. Armin Lawi, S.Si, M.Eng",
      score: 0,
    },
    secondExaminer: {
      name: "Dr. Muhammad Hasbi, M.Sc",
    },
    seminarDate: new Date(2022, 8, 12),
    seminarStartTime: new Date(2023, 0, 13, 10, 0, 0),
    seminarEndTime: new Date(2023, 0, 13, 11, 30, 0),
  },
};

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Seminar",
    href: FEROUTES.SEMINAR_COORDINATOR_SEMINAR,
  },
  {
    title: "Penilaian Seminar",
    href: FEROUTES.SEMINAR_COORDINATOR_SEMINAR_EVALUATION,
  },
];

const FESeminarCoordinatorSeminarEvaluationUngraded: React.FC<
  IFESeminarCoordinatorSeminarEvaluationUngraded
> = ({}) => {
  let { nim } = useParams();
  const [seminarData] = useState(dummySeminarData[nim!]);
  const [activePage, setActivePage] = useState<number>(1);
  const [scoreAverage, setScoreAverage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(0);
  const { array: seminarExecutiveData } = useArray([
    seminarData.mainMentor,
    seminarData.sideMentor,
    seminarData.firstExaminer,
    seminarData.secondExaminer,
  ]);

  const [isNotifyModalOpened, setisNotifyModalOpened] = useState(false);
  const [generateScoreModalOpened, setGenerateScoreModalOpened] =
    useState(false);
  const [cancelScoreModalOpened, setCancelScoreModalOpened] = useState(false);
  const [isScoreLetterGenerated, setIsScoreLetterGenerated] = useState(
    !(seminarData.scoreLetter == null)
  );
  const [lecturerToNotify, setLecturerToNotify] = useState<any>(
    seminarData.mainMentor
  );

  function notifySeminarHandler() {
    console.log(lecturerToNotify);
    setisNotifyModalOpened(false);
  }

  const [isEditScoreModalOpened, setIsEditScoreModalOpened] = useState(false);
  const [scoreValue, setScoreValue] = useState<number>(
    seminarExecutiveData[selectedRow].score as number
  );
  const [scoreTempValue, setScoreTempValue] = useState<number>(
    seminarExecutiveData[selectedRow].score as number
  );

  const theme = useMantineTheme();

  useEffect(() => {
    let count = 0;

    for (let i = 0; i < seminarExecutiveData.length; i++) {
      count +=
        seminarExecutiveData[i].score == null
          ? 0
          : seminarExecutiveData[i].score;
    }

    setScoreAverage(count / seminarExecutiveData.length);
  });

  const tableHeadings: IFETableHeadingProps[] = [
    {
      label: "No",
      sortable: true,
      textAlign: "center",
      cellKey: "no",
      width: "100px",
    },
    {
      label: "Pembimbing/Penguji",
      sortable: true,
      textAlign: "left",
      cellKey: "name",
      width: "500px",
    },
    {
      label: "Persentasi",
      sortable: true,
      textAlign: "left",
      cellKey: "percentage",
    },
    {
      label: "Nilai",
      sortable: true,
      textAlign: "left",
      cellKey: "score",
    },
  ];

  // function onEditScore() {
  //   setScoreValue(scoreTempValue);
  //   console.log('Ini score value sudah disubmit',scoreValue);
  //   setIsEditScoreModalOpened(false);
  //   seminarExecutiveData[selectedRow].score = scoreValue
  // }

  function generateScoreLetterHandle() {
    setIsScoreLetterGenerated(true);
    setGenerateScoreModalOpened(false);
  }

  function downloadScoreLetterHandle() {}

  function cancelScoreLetterHandle() {
    setIsScoreLetterGenerated(false);
    setCancelScoreModalOpened(false);
  }

  const tableRows = seminarExecutiveData.map(
    (data: any, idx: number) =>
      ({
        no: {
          label: idx + 1,
        },
        name: {
          label: data.name,
        },
        percentage: {
          label: `${data.score == null ? 0 : 100}%`,
        },
        score: {
          label: `${data.score == null ? 0 : data.score}`,
        },
      } as IFETableRowColumnProps)
  );

  const actions: IFETableAction[] = [
    {
      label: "",
      backgroundColor: "white",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setIsEditScoreModalOpened(true);
      },
      icon: <FEPenOutline size={19} color={theme.colors["primary"][5]} />,
      width: "fit-content",
    },
    {
      label: "",
      backgroundColor: "white",
      // Row disini itu row yang ada di table rows
      onClick: (row: any) => {
        setSelectedRow(row.no.label - 1);
        setLecturerToNotify(row.name.label);
        setisNotifyModalOpened(true);
      },
      icon: (
        <FEEmailNotificationOutline
          size={19}
          color={theme.colors["primary"][5]}
        />
      ),
      width: "fit-content",
    },
  ];

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${seminarData.seminarType} (${seminarData.name} - ${seminarData.nim})`}
    >
      <FEInputModal
        title={`Penilaian Seminar/Ujian - ${seminarExecutiveData[selectedRow].name}`}
        opened={isEditScoreModalOpened}
        setOpened={setIsEditScoreModalOpened}
        yesButtonLabel="Simpan"
        children={
          <NumberInput
            label="Persentasi - Nilai Total"
            size="md"
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            hideControls={false}
            max={100}
            min={0}
            value={seminarExecutiveData[selectedRow].score}
            onChange={(val) => setScoreTempValue(val || 0)}
          />
        }
        onSubmit={() => {
          // setScoreValue(scoreTempValue);
          // console.log("Ini score value sudah disubmit", scoreTempValue);
          setIsEditScoreModalOpened(false);
          seminarExecutiveData[selectedRow].score = scoreTempValue;
          setScoreTempValue(0);
        }}
      />
      <FEAlertModal
        opened={isNotifyModalOpened}
        setOpened={setisNotifyModalOpened}
        description={`Email akan dikirimkan ke dosen (${lecturerToNotify}) agar segera memproses jadwal pelaksanaan seminar.`}
        title={"Kirim Email Pengingat?"}
        yesButtonLabel={"Kirim"}
        onSubmit={notifySeminarHandler}
      />
      <FEAlertModal
        opened={generateScoreModalOpened}
        setOpened={setGenerateScoreModalOpened}
        description={
          "Proses ini akan men-generate keterangan nilai seminar/ujian dan mengunci penginputan nilai oleh dosen."
        }
        title={"Buat Keterangan Nilai?"}
        yesButtonLabel={"Buat"}
        onSubmit={generateScoreLetterHandle}
      />

      <FEAlertModal
        opened={cancelScoreModalOpened}
        setOpened={setCancelScoreModalOpened}
        description={
          "Proses ini akan membatalkan keterangan nilai seminar/ujian yang telah dibuat dan kembali membuka penginputan nilai oleh dosen."
        }
        title={"Batalkan Keterangan Nilai?"}
        yesButtonLabel={"Batalkan"}
        noButtonLabel={"Kembali"}
        onSubmit={cancelScoreLetterHandle}
      />

      <LFPHeaderComponent title={seminarData.seminarType} />
      <Stack className="border rounded-xl border-secondary-500 pb-6 pt-8">
        <FETableRow1>
          <Stack className="gap-2 pb-4">
            <Text className="text-[18px] font-semibold text-primary-500 tracking-[0.0015em] mb-4">
              {/* 'asdasdasd' */}
              {seminarData.proposalTitle}
            </Text>
            <Stack className="">
              <Group className="items-center gap-2">
                <FEClockOutline
                  size={18}
                  color={theme.colors["secondary-text"][5]}
                />
                <Text className="text-secondary-text-500">
                  {/* Senin, 29 Februari 2023 (23:00 - 23:59 WITA) */}
                  {getFEDate(
                    seminarData.seminarDate,
                    seminarData.seminarStartTime,
                    seminarData.seminarEndTime
                  )}
                  {/* {seminarTimeInformation.date} ({seminarTimeInformation.time}) */}
                </Text>
              </Group>
              <Group className="gap-2">
                <FELocationOutline
                  size={18}
                  color={theme.colors["secondary-text"][5]}
                  className="self-start"
                />
                <Stack className="gap-0 -mt-[2px]">
                  <Text className="text-secondary-text-500 font-bold">
                    {seminarData.seminarOfflinePlace}
                  </Text>
                  <Text className="text-secondary-text-500">
                    {seminarData.seminarOnlinePlace}
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Stack>
        </FETableRow1>
        <FETableRow1 withBottomBorder={false}>
          <Stack>
            <Group className="gap-2">
              <FETogaOutline color={theme.colors["primary"][5]} />
              <Text className="text-primary-500 font-semibold text-lg">
                Penilaian Seminar
              </Text>
            </Group>
            <Stack className="gap-0">
              <Group className="self-end">
                {isScoreLetterGenerated ? (
                  <>
                    <Button
                      variant="light"
                      className="bg-[#BFDBFE80]/[0.5] hover:bg-[#BFDBFE80]/[0.5] text-primary-500"
                      onClick={downloadScoreLetterHandle}
                    >
                      Unduh Keterangan Nilai
                    </Button>
                    <Button
                      variant="light"
                      className="bg-error-500/[0.1] hover:bg-error-500/[0.1] text-error-500"
                      onClick={() => setCancelScoreModalOpened(true)}
                    >
                      Batalkan Keterangan Nilai
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="light"
                    className="bg-primary-500/[0.1] hover:bg-primary-500/[0.1] text-primary-500"
                    onClick={() => setGenerateScoreModalOpened(true)}
                  >
                    Buat Keterangan Nilai
                  </Button>
                )}
              </Group>
              <FETableComponent
                isLoading={isLoading}
                // dataAmt={dataFromBackend.length}
                dataPerPageAmt={5}
                onSearch={(value) => {
                  console.log("Searching for: ", value);
                }}
                onPageChange={setActivePage}
                activePage={activePage}
                actions={actions}
                tableTitle="Nilai Pembimbing/Penguji"
                tableRows={tableRows}
                tableHeadings={tableHeadings}
                noDataMsg={"Data tidak ditemukan"}
                actionColumnWidth={"150px"}
              />
            </Stack>
          </Stack>
        </FETableRow1>
        <FEScoreCircleBar title="Nilai Rata-rata" score={`${scoreAverage}`} />
      </Stack>
    </FEMainlayout>
  );
};
export default FESeminarCoordinatorSeminarEvaluationUngraded;
function setSelectedRow(arg0: number) {
  throw new Error("Function not implemented.");
}
