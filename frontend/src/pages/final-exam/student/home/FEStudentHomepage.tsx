import { Stack, Text, Title, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import FEDateChip from "src/components/fe-components/FEDateChip";
import FEInformationNotification from "src/components/fe-components/FEInformationNotification";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import FEStudentHomepageGuidance from "./FEStudentHomepageGuidance";
import FEStudentHomepageLabFree, {
  IFEStudentHomepageLabFree,
} from "./FEStudentHomepageLabFree";
import { IFEStudentHomepageLabFreeCard } from "./FEStudentHomepageLabFreeCard";
import FEStudentHomepageProposalApplications, {
  IFEStudentHomepageProposalApplications,
} from "./FEStudentHomepageProposalApplications";

interface IFEStudentHomepageProps {}

const dummyStudentProposalApplicationsData: IFEStudentHomepageProposalApplications =
  {
    proposalComp: {
      currentProgress: 1,
      date: "20 November 2022",
      status: "process",
    },
    // seminarComp: {
    //   currentProgress: 3,
    //   date: "20 November 2022",
    //   status: "rejected",
    // },
    // trialPermitComp: {
    //   currentProgress: 6,
    //   date: "20 Desember 2022",
    //   status: "accepted",
    // },
  };

const dummyStudentLabFreeDataArray: Array<IFEStudentHomepageLabFreeCard> = [
  {
    title: "Permohonan #1",
    lab: "Fisika",
    status: "process",
  },
  {
    title: "Permohonan #2",
    lab: "Bio Farmaka",
    status: "rejected",
  },
  {
    title: "Permohonan #3",
    lab: "Matematika",
    status: "accepted",
  },
];

const FEStudentHomepage: React.FC<IFEStudentHomepageProps> = ({}) => {
  const [studentProposalApplicationsData] = useState(
    dummyStudentProposalApplicationsData
  );
  const { array: studentLabFreeDataArray } = useArray(
    dummyStudentLabFreeDataArray
  );
  

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
        <FEStudentHomepageProposalApplications
          {...studentProposalApplicationsData}
        />
        <FEStudentHomepageLabFree labFreeApplicationArray={studentLabFreeDataArray} />
        <FEStudentHomepageGuidance isMentored={true} />
      </Stack>
    </FEMainlayout>
  );
};
export default FEStudentHomepage;
