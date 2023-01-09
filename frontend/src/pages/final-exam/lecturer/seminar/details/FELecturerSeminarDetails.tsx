import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FEClockOutline,
  FEClockRepeatOutline,
  FEDocumentRewardOutline,
  FEFileMultipleOutline,
  FELocationOutline,
  FEMultiplePersonOutline,
  FEPenFilled,
  FEPenOutline,
  FETogaOutline,
} from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FEScoreCircleBar from "src/components/fe-components/FEScoreCircleBar";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import FETableRow1 from "src/components/fe-components/table/FETableRow1";
import FETableRow2 from "src/components/fe-components/table/FETableRow2";
import FEInputModal from "src/components/FEInputModal";
import { NumberInput, TextInput } from "src/components/FormInput";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFELecturerSeminarDetails {}

export interface IFELecturerStudentSeminar {
  name: string;
  nim: string;
  proposalTitle: string;
  seminarType: string;
  seminarTime: string;
  seminarOfflinePlace: string;
  seminarOnlinePlace: string;
  mainMentor: string;
  sideMentor: string;
  firstExaminer: string;
  secondExaminer: string;
  score?: string;
  note?: string;
}

const dummySeminarData: {
  [nim: string]: IFELecturerStudentSeminar;
} = {
  H071191040: {
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
  H071171308: {
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
  H071191044: {
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
};

const dummySeminarDataCount: {
  [nim: string]: number;
} = {
  H071191040: 0,
  H071171308: 3,
  H071191044: 3,
};

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Seminar Mahasiswa",
    href: FEROUTES.LECTURER_HOMEPAGE_SEMINAR,
  },
];

const FELecturerSeminarDetails: React.FC<IFELecturerSeminarDetails> = ({}) => {
  let { nim } = useParams();
  const [seminarData] = useState(dummySeminarData[nim!]);
  const [seminarDataCount] = useState(dummySeminarDataCount[nim!]);

  const theme = useMantineTheme();

  const [seminarScore, setSeminarScore] = useState(
    parseInt(seminarData.score || "0")
  );
  const [tempSeminarScore, setTempSeminarScore] = useState(seminarScore);
  const [changeScoreModalOpened, setChangeScoreModalOpened] = useState(false);

  const [seminarNote, setSeminarNote] = useState(seminarData.note);
  const [tempSeminarNote, setTempSeminarNote] = useState(seminarNote);
  const [changeSeminarNoteModalOpened, setChangeSeminarNoteModalOpened] =
    useState(false);

  function scoreChangedHandler() {
    setSeminarScore(tempSeminarScore);
    setChangeScoreModalOpened(false);
  }
  function noteChangedHandler() {
    setSeminarNote(tempSeminarNote);
    setChangeSeminarNoteModalOpened(false);
    setTempSeminarNote(seminarNote);
  }

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Riwayat Seminar",
      type: "href",
      icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
      disabled: seminarDataCount <= 0,
      href: "riwayat",
    },
  ];

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${seminarData.name} (${seminarData.nim})`}
    >
      <FEInputModal
        opened={changeScoreModalOpened}
        setOpened={setChangeScoreModalOpened}
        title={"Penilaian Seminar"}
        yesButtonLabel={"Simpan"}
        children={
          <NumberInput
            label={"Presentasi - Nilai Total"}
            stepHoldDelay={500}
            stepHoldInterval={(t) => Math.max(1000 / t ** 2, 25)}
            hideControls={false}
            max={100}
            min={0}
            value={seminarScore}
            onChange={(val) => setTempSeminarScore(val || 0)}
          />
        }
        onSubmit={scoreChangedHandler}
      />

      <FEInputModal
        opened={changeSeminarNoteModalOpened}
        setOpened={setChangeSeminarNoteModalOpened}
        title={"Catatan Pembimbing/Penguji"}
        yesButtonLabel={"Simpan"}
        children={
          <TextInput
            defaultValue={seminarNote}
            onChange={(val) => setTempSeminarNote(val.target.value)}
          />
        }
        onSubmit={noteChangedHandler}
      />

      <LFPHeaderComponent
        title={seminarData.seminarType}
        buttons={buttons}
        disabledButtonTooltipLabel={"Anda belum memiliki riwayat seminar"}
      />
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
                  {seminarData.seminarTime}
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
        <FETableRow1>
          <Stack className="relative px-10 mb-4 ">
            <FEMultiplePersonOutline
              size={22}
              color={theme.colors["primary"][5]}
              className="absolute left-0"
            />
            <Text className="text-primary-500 font-semibold text-lg">
              Pembimbing & Penguji
            </Text>
            <Group className="">
              <Stack className="w-1/2">
                <Stack className="gap-0">
                  <Text className="text-secondary-text-500">
                    Pembimbing Utama
                  </Text>
                  <Text className="text-lg">{seminarData.mainMentor}</Text>
                </Stack>
                <Stack className="gap-0">
                  <Text className="text-secondary-text-500">
                    Pembimbing Pendamping
                  </Text>
                  <Text className="text-lg">{seminarData.sideMentor}</Text>
                </Stack>
              </Stack>
              <Stack>
                <Stack className="gap-0">
                  <Text className="text-secondary-text-500">
                    Penguji Pertama
                  </Text>
                  <Text className="text-lg">{seminarData.firstExaminer}</Text>
                </Stack>
                <Stack className="gap-0">
                  <Text className="text-secondary-text-500">Penguji Kedua</Text>
                  <Text className="text-lg">{seminarData.secondExaminer}</Text>
                </Stack>
              </Stack>
            </Group>
          </Stack>
        </FETableRow1>
        <FETableRow1>
          <Stack className="relative px-10 mb-4 ">
            <FEFileMultipleOutline
              size={22}
              color={theme.colors["primary"][5]}
              className="absolute left-0"
            />
            <Text className="text-primary-500 font-semibold text-lg">
              Berkas Persyaratan Seminar
            </Text>
            <FEDocumentListShowCase
              documentLabelList={[
                "Surat Izin Ujian Sidang",
                "Draf Skripsi",
                "SK Pembimbing",
                "SK Penguji",
                "Transkrip Nilai",
              ]}
            />
          </Stack>
        </FETableRow1>
        <FETableRow1>
          <Stack className="relative px-10 mb-4 ">
            <FEDocumentRewardOutline
              size={22}
              color={theme.colors["primary"][5]}
              className="absolute left-0"
            />
            <Text className="text-primary-500 font-semibold text-lg">
              Dokumen Seminar
            </Text>
            <FEDocumentListShowCase
              documentLabelList={[
                "Surat Persetujuan Pembimbing",
                "Undangan Seminar",
              ]}
            />
          </Stack>
        </FETableRow1>
        <FETableRow1 withBottomBorder={false}>
          <Stack className="relative px-10 mb-4 ">
            <FETogaOutline
              size={22}
              color={theme.colors["primary"][5]}
              className="absolute left-0"
            />
            <Text className="text-primary-500 font-semibold text-lg">
              Penilaian Seminar
            </Text>
            <Grid className={`mb-0 ` + `px-8`} gutter={32} columns={24}>
              <Grid.Col span={"auto"}>
                <div className="border p-2 border-secondary-500 rounded-xl relative">
                  <Button
                    variant="light"
                    className="absolute right-2 top-2 hover:bg-transparent  "
                    onClick={() => {
                      setChangeScoreModalOpened(true);
                    }}
                  >
                    <FEPenFilled size={16} color={"#334155"} />
                  </Button>
                  <FEScoreCircleBar
                    score={seminarScore.toString()}
                    title={"Nilai"}
                  />
                </div>
              </Grid.Col>
              <Grid.Col
                span={17}
                md={17}
                sm={24}
                className="flex flex-col gap-3 overflow-clip relative"
              >
                <Button
                  variant="light"
                  className="absolute left-[295px] top-1 hover:bg-transparent  "
                  onClick={() => {
                    setChangeSeminarNoteModalOpened(true);
                  }}
                >
                  <FEPenFilled size={16} color={"#334155"} />
                </Button>
                <Text className="text-primary-text-500 text-xl font-semibold">
                  Catatan Pembimbing & Penguji
                </Text>

                <Stack className="gap-0">
                  <FETableRow2
                    subject=""
                    value={
                      seminarNote == null || seminarNote == ""
                        ? "Belum Ada Catatan"
                        : `“${seminarNote}”`
                    }
                    withBottomBorder={false}
                    paddingX="px-0"
                  />
                </Stack>
              </Grid.Col>
            </Grid>
          </Stack>
        </FETableRow1>
      </Stack>
    </FEMainlayout>
  );
};
export default FELecturerSeminarDetails;
