import { Stack, Title, useMantineTheme, Text, Group, Button } from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FEFileMultipleOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEDocumentListShowCase from "src/components/fe-components/FEDocumentListShowCase";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFESubsectionChairmanTrialPermitApprovalApplicationDetails {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL,
  },
  {
    title: "Izin Ujian Sidang",
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_TRIAL_PERMIT,
  },
  {
    title: "Surat Permohonan",
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_TRIAL_PERMIT_APPLICATION,
  },
];

const dummyApplicationData: {
  [nim: string]: any;
} = {
  N011181001: {
    applicationDate: "24 November 2022",
    name: "Devi Selfira",
    nim: "N011181001",
    status: "waiting",
  },
  H071191044: {
    applicationDate: "24 Desember 2022",
    name: "Yusuf Syam",
    nim: "H071191044",
    status: "accepted",
  },
  H071191040: {
    applicationDate: "14 November 2022",
    name: "Devon",
    nim: "H071191040",
    status: "process",
  },
};

const FESubsectionChairmanTrialPermitApprovalApplicationDetails: React.FC<
  IFESubsectionChairmanTrialPermitApprovalApplicationDetails
> = ({}) => {
  let { nim } = useParams();
  const [applicationData] = useState(dummyApplicationData[nim!]);
  const [isOpenAcceptAlertModal, setIsOpenAcceptAlertModal] = useState(false);
  const [isOpenRefuseAlertModal, setIsOpenRefuseAlertModal] = useState(false);
  const theme = useMantineTheme();
  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${applicationData.name} (${applicationData.nim})`}
    >
      <FEAlertModal
        title="Tolak Usulan"
        description="Usulan yang ditolak tidak dapat dikembalikan"
        opened={isOpenRefuseAlertModal}
        setOpened={setIsOpenRefuseAlertModal}
        yesButtonLabel={"Tolak"}
        // onSubmit={handleAcceptApproval}
      />

      <FEAlertModal
        title="Buat Surat Permohonan"
        description="Pastikan pilihan anda sudah BENAR"
        opened={isOpenAcceptAlertModal}
        setOpened={setIsOpenAcceptAlertModal}
        yesButtonLabel={"Buat"}
        // onSubmit={handleAcceptApproval}
      />
      <Title order={2} mb={"md"}>
        {applicationData.name} ({applicationData.nim})
      </Title>
      <Stack className="relative pl-16 pr-8 py-8 border border-secondary-500 rounded-xl ">
        <FEFileMultipleOutline
          size={22}
          color={theme.colors["primary"][5]}
          className="absolute left-8"
        />
        <Text className="text-primary-500 font-semibold text-lg">
          Berkas Persyaratan Izin Ujian Sidang
        </Text>
        <FEDocumentListShowCase
          documentLabelList={[
            "Pelaporan PD-Dikti",
            "Bukti Klirins SPP/UKT",
            "Ijazah Terakhir",
            "Transkip Nilai",
            "Pelaporan Nilai Mata Kuliah",
            "Daftar Nilai Fisik Mata Kuliah",
          ]}
        />
      </Stack>
      <Group mt={"md"} className="pt-4" grow>
        <Button
          variant="light"
          className="text-white bg-primary-500 hover:bg-primary-700 font-bold"
          onClick={() => {
            setIsOpenAcceptAlertModal(()=>{return true})
          }}
        >
          Setujui Usulan
        </Button>
        <Button
          variant="light"
          onClick={() => {
            setIsOpenRefuseAlertModal(()=>{return true})
          }}
          className="text-white bg-error-500 hover:bg-error-500 font-bold"
        >
          Tolak Usulan
        </Button>
      </Group>
    </FEMainlayout>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplicationDetails;
