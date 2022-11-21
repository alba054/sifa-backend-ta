import { Group, Stack, useMantineTheme, Text } from "@mantine/core";
import React from "react";
import { FECalendarOutline, FEPenCircleOutline } from "src/assets/Icons/Fluent";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FEProposalCard from "./FEProposalCard";

export interface IFEProposalMain {}

const FEProposalMain: React.FC<IFEProposalMain> = ({}) => {
  const theme = useMantineTheme();

  return (
    <Stack className="gap-8">
      <Stack className="py-7 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
        <Group className="justify-between mb-3">
          <Group spacing={"xs"}>
            <FEPenCircleOutline
              size={18}
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
              size={18}
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
        <FEProgressBar
          progressStages={[
            "Pengusulan Judul",
            "Judul Diterima",
            "Verifikasi Dokumen",
            "Penyusunan Tim Seminar",
            "Penandatangan SK",
            "SK Diterima",
          ]}
          currentProgress={2}
        />
      </Stack>
      <FEProposalCard
        proposalNumber="1"
        role="Mahasiswa"
        title="Potensi Tumbuhan Libo (Ficus variegata, Blume) sebagai Sumber Bahan Farmasi Potensial"
        laboratory="Lab: Biofarmaka, Farmasetika"
        mainMentor="Belum ditentukan"
        sideMentor="Belum ditentukan"
        status="Dalam Proses"
      />
      <FEProposalCard
        proposalNumber="2"
        role="Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)"
        title="Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus"
        laboratory="Lab: Kimia Farmasi"
        mainMentor="Belum ditentukan"
        sideMentor="Belum ditentukan"
        status="Ditolak"
      />
    </Stack>
  );
};
export default FEProposalMain;
