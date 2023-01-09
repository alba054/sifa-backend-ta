import {
  Button,
  Grid,
  Group,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  FEClockOutline,
  FEDocumentRewardOutline,
  FEDownArrowNoTailOutline,
  FEFileMultipleOutline,
  FELocationOutline,
  FEMultiplePersonOutline,
  FEPenFilled,
  FEPenOutline,
  FETogaOutline,
  FEUpArrowNoTailOutline,
} from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FEScoreCircleBar from "src/components/fe-components/FEScoreCircleBar";
import LFPHeaderComponent from "src/components/fe-components/LFPHeader.component";
import FETableRow1 from "src/components/fe-components/table/FETableRow1";
import FETableRow2 from "src/components/fe-components/table/FETableRow2";
import FEInputModal from "src/components/FEInputModal";
import { NumberInput, TextInput } from "src/components/FormInput";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFELecturerStudentSeminar } from "../FELecturerSeminarDetails";

export interface IFELecturerSeminarDetailsHistoryCard {
  seminarData: IFELecturerStudentSeminar;
}

const FELecturerSeminarDetailsHistoryCard: React.FC<
  IFELecturerSeminarDetailsHistoryCard
> = ({ seminarData }) => {
  const theme = useMantineTheme();
  const [displayed, setDisplayed] = useState(true);

  return (
    <Stack className="border rounded-xl border-secondary-500 pb-6 pt-8">
      <Group className="px-8 justify-between">
        <Title order={3}>{seminarData.seminarType}</Title>
        {displayed ? (
          <FEDownArrowNoTailOutline
            size={18}
            color={"#334155"}
            className="cursor-pointer"
            onClick={() => {
              setDisplayed(false);
            }}
          />
        ) : (
          <FEUpArrowNoTailOutline
            size={18}
            color={"#334155"}
            className="cursor-pointer"
            onClick={() => {
              setDisplayed(true);
            }}
          />
        )}
      </Group>
      {displayed ? (
        <>
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
                    <Text className="text-secondary-text-500">
                      Penguji Kedua
                    </Text>
                    <Text className="text-lg">
                      {seminarData.secondExaminer}
                    </Text>
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
                    <FEScoreCircleBar
                      score={seminarData.score || "0"}
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
                  <Text className="text-primary-text-500 text-xl font-semibold">
                    Catatan Pembimbing & Penguji
                  </Text>

                  <Stack className="gap-0">
                    <FETableRow2
                      subject=""
                      value={seminarData.note || "Belum Ada Catatan"}
                      withBottomBorder={false}
                      paddingX="px-0"
                    />
                  </Stack>
                </Grid.Col>
              </Grid>
            </Stack>
          </FETableRow1>
        </>
      ) : null}
    </Stack>
  );
};
export default FELecturerSeminarDetailsHistoryCard;
