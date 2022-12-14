import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import {
  FEClockOutline,
  FEFileMultipleOutline,
  FELocationOutline,
  FETogaOutline,
} from "src/assets/Icons/Fluent";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FETableHeader2 from "src/components/fe-components/table/FETableHeader2";
import FETableRow1 from "src/components/fe-components/table/FETableRow1";
import FESeminarEvaluation from "../FESeminarEvaluation";
import { IFESeminarTimeInformation } from "../FESeminarTimeInformation";

export interface IFESeminarHistoryCard {
  seminarType: string;
  proposalTitle: string;
  seminarTimeInformation:IFESeminarTimeInformation;
  seminarScore: number;
  seminarRubric: string;
  mentorNotes: Array<string>;
}

const FESeminarHistoryCard: React.FC<IFESeminarHistoryCard> = ({
  seminarType,
  proposalTitle,
  seminarTimeInformation,
  seminarRubric,
  seminarScore,
  mentorNotes,
}) => {
  const theme = useMantineTheme();

  return (
    <FETableHeader2 title={seminarType} paddingX="px-0">
      <Stack>
        <FETableRow1>
          <Stack className="gap-2 pb-4">
            <Text className="text-[18px] font-semibold text-primary-500 tracking-[0.0015em] mb-4">
              {proposalTitle}
            </Text>
            <Stack className="">
              <Group className="items-center gap-2">
                <FEClockOutline
                  size={18}
                  color={theme.colors["secondary-text"][5]}
                />
                <Text className="text-secondary-text-500">
                  {seminarTimeInformation.date} ({seminarTimeInformation.time})
                </Text>
              </Group>
              <Group className="gap-2">
                <FELocationOutline
                  size={18}
                  color={theme.colors["secondary-text"][5]}
                  className="self-start"
                />
                <Stack className="gap-0 -mt-[2px]">
                  <Text className="text-secondary-text-500">
                    {seminarTimeInformation.offlinePlace}
                  </Text>
                  <Text className="text-secondary-text-500">
                    {seminarTimeInformation.onlinePlace}
                  </Text>
                </Stack>
              </Group>
            </Stack>
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
            <FEFileMultipleOutline
              size={22}
              color={theme.colors["primary"][5]}
              className="absolute left-0"
            />
            <Text className="text-primary-500 font-semibold text-lg">
              Dokumen Seminar
            </Text>
            <FEDocumentListShowCase
              documentLabelList={[
                "Surat Persetujuan Pendamping",
                "Undangan Seminar",
                "Berita Acara Seminar",
                "Surat Keterangan Sidang",
              ]}
            />
          </Stack>
        </FETableRow1>
        <FETableRow1 withBottomBorder={false}>
          <Stack className="relative px-10 m-0 -mb-6">
            <FETogaOutline
              size={22}
              color={theme.colors["primary"][5]}
              className="absolute left-0"
            />
            <Text className="text-primary-500 font-semibold text-lg">
              Penilaian Seminar
            </Text>
            <FESeminarEvaluation
              rubric={seminarRubric}
              score={seminarScore}
              mentorNotes={mentorNotes}
              paddingX="px-0"
            />
          </Stack>
        </FETableRow1>
      </Stack>
    </FETableHeader2>
  );
};
export default FESeminarHistoryCard;
