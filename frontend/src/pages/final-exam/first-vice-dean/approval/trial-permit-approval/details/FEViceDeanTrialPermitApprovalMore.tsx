import {
  Button,
  Grid,
  Group,
  MantineProvider,
  Stack,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEViceDeanTrialPermitApprovalMoreCard, {
  IFEViceDeanTrialPermitApprovalMoreCard,
} from "./FEViceDeanTrialPermitApprovalMoreCard";
import { useParams } from "react-router-dom";
import FEDisabledTooltip from "src/components/fe-components/FEDisabledTooltip";
import { IApprovalMore } from "src/pages/final-exam/head-administrator/approval/mentor-and-examiners-approval/details/FEHeadAdministratorMentorAndExaminersApprovalMore";
import { FEStatus } from "src/utils/const/type";

export interface IFEViceDeanTrialPermitApprovalMore {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FIRST_VICE_DEAN_APPROVAL,
  },
  {
    title: "SK Izin Ujian Sidang",
    href: FEROUTES.FIRST_VICE_DEAN_APPROVAL_TRIAL_PERMIT,
  },
];

const dummyProposalData: {
  [nim: string]: any;
} = {
  N011181001: {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    sk: {
      status: "Belum_Diproses",
      applicationDate: "12 Desember 2022",
      passedTime: "40 menit yang lalu",
      setStatus: (e: FEStatus) => {},
    },
  },
  H071191044: {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Penerapan Machine Learning untuk Lab",
    laboratory: "Farmasi",
    sk: {
      status: "Belum_Diproses",
      applicationDate: "12 Desember 2022",
      passedTime: "40 menit yang lalu",
      setStatus: (e: FEStatus) => {},
    },
  },
};

const FEViceDeanTrialPermitApprovalMore: React.FC<
  IFEViceDeanTrialPermitApprovalMore
> = ({}) => {
  let { nim } = useParams();
  console.log(`nim: ${nim}`);

  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  const [proposalData] = useState(dummyProposalData[nim!]);
  const [skData] = useState(proposalData.sk);
  const [mentorStatus, setMentorStatus] = useState(
    skData.status
  );

  const navigate = useNavigate();

  function handleAcceptApproval() {
    setIsOpenAlertModal(false);
    navigate(-1);
  }

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${proposalData.name} (${proposalData.nim})`}
    >
      <FEAlertModal
        title="Konfirmasi Penandatanganan?"
        description="Tekan tombol konfirmasi untuk mengkonfirmasi penandatanganan."
        opened={isOpenAlertModal}
        setOpened={setIsOpenAlertModal}
        yesButtonLabel={"Konfirmasi"}
        onSubmit={handleAcceptApproval}
      />
      <Title order={2} mb={"md"}>
        {proposalData.name} ({proposalData.nim})
      </Title>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            sm: 1000,
            md: 1050,
            lg: 1124,
            xl: 1280,
            "2xl": 1536,
          } as any,
        }}
        inherit
      >
        <Stack>
          <Grid gutter={"xl"} className="mb-0">
            <Grid.Col span={6} xs={12} sm={12} md={6}>
              <FEViceDeanTrialPermitApprovalMoreCard
                initialStatus={skData.status}
                status={mentorStatus}
                applicationDate={skData.applicationDate}
                passedTime={skData.passedTime}
                setStatus={(e) => {
                  setMentorStatus(e);
                }}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </MantineProvider>
    </FEMainlayout>
  );
};
export default FEViceDeanTrialPermitApprovalMore;
