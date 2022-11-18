import { Group, Stack, Text, useMantineTheme, Divider } from "@mantine/core";
import React from "react";
import { FECalendarOutline, FEPenCircleOutline } from "src/assets/Icons/Fluent";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FESeminar from "./FESeminar";
import FESeminarFileUpload from "./FESeminarFileUpload";

export interface IFESeminarMain {}

const FESeminarMain: React.FC<IFESeminarMain> = ({}) => {
  const theme = useMantineTheme();
  return (
    <Stack className="gap-10">
      <Stack className="pt-7 pb-8 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
        <Group className="justify-between mb-4">
          <Group spacing={"xs"}>
            <FEPenCircleOutline
              size={22}
              color={theme.colors["primary-text"][5]}
              className="inline"
            />
            <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
              Progress saat ini:{" "}
              <Text className="inline font-normal">Judul Diterima</Text>
            </Text>
          </Group>
          <Group spacing={"xs"}>
            <FECalendarOutline
              size={22}
              color={theme.colors["primary-text"][5]}
              className="inline"
            />
            <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
              {" "}
              Tanggal pengusulan:{" "}
              <Text className="inline font-normal">14 November 2022</Text>
            </Text>
          </Group>
        </Group>
        <FEProgressBar />
      </Stack>
      <Stack className="pb-8 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
        <Text className="py-5 mx-[-32px] pl-8 mb-5 text-lg text-primary-text-500 font-bold tracking-[0.0015em] border-b border-secondary-500">
          Ujian Sidang
        </Text>
        <Text className="text-[22px] text-primary-text-500 font-normal">
          Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan
          Farmasi Potensial
        </Text>
        <Stack spacing={"xs"}>
          <Text className="text-primary-text-500 text-base font-bold tracking-[0.0025em]">
            Berkas Persyaratan Seminar:
          </Text>
          <Stack className="gap-11">
            <FESeminarFileUpload title="Pelaporan PD-Dikti" isFileUploaded={true} fileName="bukti_pelaporan_PD_Dikti.pdf" />
            <FESeminarFileUpload title="Ijazah Terakhir" />
            <FESeminarFileUpload title="Transkrip Nilai" />
            <FESeminarFileUpload title="Pas Foto Hitam Putih" />
            <FESeminarFileUpload title="Pelaporan Nilai Mata Kuliah pada Sistem APPS" />
            <FESeminarFileUpload title="Daftar Nilai Fisik Mata Kuliah pada Sistem APPS" />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default FESeminarMain;
