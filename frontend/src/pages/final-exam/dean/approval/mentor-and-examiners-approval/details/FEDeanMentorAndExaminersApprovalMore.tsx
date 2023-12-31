import {
  Button,
  Grid,
  Group,
  MantineProvider,
  Stack,
  Title
} from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEDeanMentorAndExaminersApprovalMoreCard, {
  IFEDeanMentorAndExaminersApprovalMoreCard
} from "./FEDeanMentorAndExaminersApprovalMoreCard";
import {
  useParams
} from "react-router-dom";
import FEDisabledTooltip from "src/components/fe-components/FEDisabledTooltip";
import { IApprovalMore } from "src/pages/final-exam/head-administrator/approval/mentor-and-examiners-approval/details/FEHeadAdministratorMentorAndExaminersApprovalMore";
import { FEStatus } from "src/utils/const/type";

export interface IFEDeanMentorAndExaminersApprovalMore {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.DEAN_APPROVAL,
  },
  {
    title: "SK Pembimbing dan Penguji",
    href: FEROUTES.DEAN_APPROVAL_MENTOR_AND_EXAMINERS,
  },
];

const dummyProposalData: {
  [nim: string ]: IApprovalMore;
} = {
  N011181001: {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    sk: [
      {
        SKType: "mentor",
        status: "Diterima",
        applicationDate: "12 November 2022",
        passedTime: "4 menit yang lalu",
        setStatus: (e: FEStatus) => {},
      },
      {
        SKType: "examiner",
        status: "Belum_Diproses",
        applicationDate: "12 November 2022",
        passedTime: "4 menit yang lalu",
        setStatus: (e: FEStatus) => {},
      },
    ],
  },
  H071191044: {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Penerapan Machine Learning untuk Lab",
    laboratory: "Farmasi",
    sk: [
      {
        SKType: "mentor",
        status: "Belum_Diproses",
        applicationDate: "12 Desember 2022",
        passedTime: "40 menit yang lalu",
        setStatus: (e: FEStatus) => {},
      },
      {
        SKType: "examiner",
        status: "Belum_Diproses",
        applicationDate: "12 November 2022",
        passedTime: "4 menit yang lalu",
        setStatus: (e: FEStatus) => {},
      },
    ],
  },
};

const FEDeanMentorAndExaminersApprovalMore: React.FC<
  IFEDeanMentorAndExaminersApprovalMore
> = ({}) => {
  let { nim } = useParams();
  console.log(`nim: ${nim}`)
  
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  const [proposalData,] = useState(dummyProposalData[nim!]) 
  const { array: approvalCardDataArray } = useArray(proposalData.sk);
  const [mentorStatus, setMentorStatus] = useState(approvalCardDataArray[0].status)
  const [examinerStatus, setExaminerStatus] = useState(approvalCardDataArray[1].status)

  const navigate= useNavigate()

  function handleAcceptApproval(){
    setIsOpenAlertModal(false)
    navigate(-1)
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
              <FEDeanMentorAndExaminersApprovalMoreCard
                SKType={approvalCardDataArray[0].SKType}
                initialStatus= {approvalCardDataArray[0].status}
                status={mentorStatus}
                applicationDate={approvalCardDataArray[0].applicationDate}
                passedTime={approvalCardDataArray[0].passedTime}
                setStatus={(e) => {
                  setMentorStatus(e);
                }}
              />
            </Grid.Col>
            <Grid.Col span={6} xs={12} sm={12} md={6}>
              <FEDeanMentorAndExaminersApprovalMoreCard
                SKType={approvalCardDataArray[1].SKType}
                initialStatus= {approvalCardDataArray[1].status}
                status={examinerStatus}
                applicationDate={approvalCardDataArray[1].applicationDate}
                passedTime={approvalCardDataArray[1].passedTime}
                setStatus={(e) => {
                  setExaminerStatus(e);
                }}
              />
            </Grid.Col>
          </Grid>
          <Group className="self-end">
            <Button
              variant="light"
              color={"primary"}
              className="font-bold hover:bg-white px-4"
              onClick={()=>{navigate(-1)}}
            >
              Batal
            </Button>
            <FEDisabledTooltip
              label="Tanda tangan pada setidaknya satu SK untuk mengkonfirmasi penandatanganan"
              isDisabled={
                (approvalCardDataArray[0].status != mentorStatus || approvalCardDataArray[1].status != examinerStatus)
              }
            >
              <Button
                className="text-white bg-primary-500 hover:bg-primary-700 font-bold px-8"
                onClick={() => setIsOpenAlertModal(true)}
                variant="light"
                disabled={
                  !(approvalCardDataArray[0].status != mentorStatus || approvalCardDataArray[1].status != examinerStatus) 
                }
              >
                Konfirmasi Penandatanganan
              </Button>
            </FEDisabledTooltip>
          </Group>
        </Stack>
      </MantineProvider>
    </FEMainlayout>
  );
};
export default FEDeanMentorAndExaminersApprovalMore;
