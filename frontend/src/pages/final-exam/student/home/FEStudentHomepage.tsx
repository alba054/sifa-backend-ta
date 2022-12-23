import { Title, useMantineTheme, Text, Stack, Group } from "@mantine/core";
import React from "react";
import { FEArrowCircleOutline } from "src/assets/Icons/Fluent";
import FEDateChip from "src/components/fe-components/FEDateChip";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import FEStudentHomepageGuidance from "./FEStudentHomepageGuidance";
import FEStudentHomepageLabFree from "./FEStudentHomepageLabFree";
import FEStudentHomepageProposalApplications from "./FEStudentHomepageProposalApplications";

interface IFEStudentHomepageProps {}

const FEStudentHomepage: React.FC<IFEStudentHomepageProps> = ({}) => {console.log('START')
  const theme = useMantineTheme();
  return (
    <FEMainlayout>
      <FEDateChip />
      <Title order={2} mb={"md"}>
        Home
      </Title>
      <Text className="text-lg text-primary-text-500">
        Selamat Datang, Takdim 👋.
      </Text>
      <FEInformationNotification
        description={
          <Text>
            <Text className="font-bold inline-block">
              Aplikasi Tugas Akhir Mahasiswa
            </Text>{" "}
            digunakan untuk membantu Mahasiswa dalam proses penyelesaian Tugas
            Akhir, mulai dari Pengusulan Judul, Bimbingan, Permohonan Bebas
            Laboratorium, Permohonan Seminar, Permohonan Izin Ujian Sidang,
            hingga Pelaksanaan Ujian Akhir.
          </Text>
        }
        title="Tugas Akhir Mahasiswa"
      />
      <Stack className="gap-8">
        <FEStudentHomepageProposalApplications />
        <FEStudentHomepageLabFree />
        <FEStudentHomepageGuidance />
      </Stack>
    </FEMainlayout>
  );
};
export default FEStudentHomepage;
