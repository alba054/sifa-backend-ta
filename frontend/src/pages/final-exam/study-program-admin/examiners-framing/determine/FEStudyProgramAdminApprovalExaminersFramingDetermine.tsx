import { Stack, Title, Text, Divider, Group, Button } from "@mantine/core";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FEArrowCircleOutline } from "src/assets/Icons/Fluent";
import FEBackNavigate from "src/components/fe-components/FEBackNavigate";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import { approvalChip } from "src/components/fe-components/FERoundedChip";
import { SelectInput } from "src/components/FormInput";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFEStudyProgramAdminApprovalExaminersFramingCard } from "../FEStudyProgramAdminApprovalExaminersFramingCard";

export interface IFEStudyProgramAdminApprovalExaminersFramingDetermine {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
  },
  {
    title: "Penyusunan Tim Penguji",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_EXAMINERS_TEAM,
  },
];

const dummyProposalData: any = {
  N011191004: 
  {
    name: "Indah Lestari",
    nim: "N011191004",
    proposalTitle:
      "Pengujian Aktivitas Antioksidan dan Analisis Mikrobiologi terhadap Lama Waktu Penyimpanan Teh Daun Gaharu (Aquilaria Malaccensis Lamk.) dalam Kemasan Siap Minum ",
    laboratory: "Kimia Farmasi",
    laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    sideMentor: "Prof. Dr. Jack Sully.",
    proposedFirstExaminers: {
      name: "Prof. Dr. M.Natsir Djide, M.S.",
      approvalStatus: "accepted",
    },
    proposedSecondExaminers: {
      name: "Drs. Kus Haryono, MS.",
      approvalStatus: "process",
    },
  },
  N011181001: 
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    sideMentor: "Prof. Dr. Jack Sully.",
    proposedFirstExaminers: {
      name: "Prof. Dr. Jack Sully",
      approvalStatus: "rejected",
    },
  },
  H071191044: 
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Penerapan Machine Learning untuk Lab",
    laboratory: "Farmasi",
    laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    mainMentor: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
    sideMentor: "Prof. Dr. Jack Sully.",
  },
};

const FEStudyProgramAdminApprovalExaminersFramingDetermine: React.FC<
  IFEStudyProgramAdminApprovalExaminersFramingDetermine
> = ({}) => {
  let { nim } = useParams();
  const currentProposal : IFEStudyProgramAdminApprovalExaminersFramingCard = dummyProposalData[nim!];
  const navigate = useNavigate();
  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${currentProposal.name} (${currentProposal.nim})`}
    >
      <Group mb={"sm"}>
        {/* Tanya Fajri */}
        <FEBackNavigate navigate={navigate} />
        <Title order={2} className="text-primary-text-500">
        {currentProposal.name} ({currentProposal.nim})
        </Title>
      </Group>
      <Stack className="gap-4">
        <Stack className="gap-0">
          <Text className="font-bold text-[18px] text-primary-text-500">
            Judul
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {currentProposal.proposalTitle}
          </Text>
        </Stack>

        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Laboratorium
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1">
            {currentProposal.laboratory}
          </Text>
        </Stack>

        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Kepala Laboratorium
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
          {currentProposal.laboratoryChairman}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Pembimbing Utama
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
            {currentProposal.mainMentor}
          </Text>
        </Stack>

        <Stack className="gap-0">
          <Text className="font-bold text-lg text-primary-text-500">
            Pembimbing Pendamping
          </Text>
          <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
            {currentProposal.sideMentor}
          </Text>
        </Stack>
      </Stack>

      <Divider />

      <Stack>
        <Text className="font-bold text-xl text-primary-text-500">
          Tim Penguji
        </Text>
        <Group grow className="gap-8">
          <Stack className="gap-0">
            <Group>
              <Text className="font-bold text-lg text-primary-text-500">
                Penguji Pertama
              </Text>
              {approvalChip["process"]}
            </Group>
            <SelectInput
              data={[
                { label: "Herlina Rante, S.Si., M.Si.", value: "1" },
                { label: "Dra. Aisyah Fatmawaty", value: "2" },
              ]}
              placeholder="Pilih penguji pertama"
              // error={errors?.[`${name}.${"firstLaboratory" as keyof TOffer}`]}
              // name={"firstLaboratory" as keyof TOffer}
              // onChange={(e) =>
              //   handleInputChange("firstLaboratory" as keyof TOffer, e)
              // }
              // value={value?.firstLaboratory}
              size={"md"}
            />
          </Stack>
          <Stack className="gap-0">
            <Group>
              <Text className="font-bold text-lg text-primary-text-500">
                Penguji Kedua
              </Text>
              {approvalChip["process"]}
            </Group>
            <SelectInput
              data={[
                { label: "Herlina Rante, S.Si., M.Si.", value: "1" },
                { label: "Dra. Aisyah Fatmawaty", value: "2" },
              ]}
              placeholder="Pilih penguji kedua"
              // error={errors?.[`${name}.${"secondLaboratory" as keyof TOffer}`]}
              // name={"secondLaboratory" as keyof TOffer}
              // onChange={(e) =>
              //   handleInputChange("secondLaboratory" as keyof TOffer, e)
              // }
              // disabled={!value?.firstLaboratory}
              // value={value?.secondLaboratory}
              size={"md"}
            />
          </Stack>
        </Group>
        <Button
          variant="light"
          className="bg-primary-500 text-white hover:bg-primary-500"
        >
          Ajukan Penyusunan Tim
        </Button>
      </Stack>
      <Group grow>
        <Button
          variant="light"
          className="text-primary-500 hover:bg-white"
          onClick={() => {
            navigate(-1);
          }}
        >
          Batal
        </Button>
        <Button
          variant="light"
          className="bg-primary-500 text-white hover:bg-primary-500"
          disabled
        >
          Selesai
        </Button>
      </Group>
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminApprovalExaminersFramingDetermine;
