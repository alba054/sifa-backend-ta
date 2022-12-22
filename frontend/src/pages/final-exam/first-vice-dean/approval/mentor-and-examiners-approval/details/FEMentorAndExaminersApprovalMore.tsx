import {
  Button,
  Grid,
  Group,
  MantineProvider,
  Stack,
  Title
} from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEMentorAndExaminersApprovalMoreCard, {
  IFEMentorAndExaminersApprovalMoreCard
} from "./FEMentorAndExaminersApprovalMoreCard";
import {
  useParams
} from "react-router-dom";

export interface IFEMentorAndExaminersApprovalMore {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FIRST_VICE_DEAN_APPROVAL,
  },
  {
    title: "SK Pembimbing dan Penguji",
    href: FEROUTES.FIRST_VICE_DEAN_APPROVAL_MENTOR_AND_EXAMINERS,
  },
];

const dummyApprovalCardData: Array<IFEMentorAndExaminersApprovalMoreCard> = [
  {
    SKType: "mentor",
    title: "SK Pembimbing",
    lab: "Lab. Farmakologi Toksikologi",
    status: "process",
    tanggalPermohonan: "12 November 2022",
    passedTime: "4 menit yang lalu",
    setStatus: (e: "process" | "rejected" | "accepted") => {},
  },
  {
    SKType: "examiner",
    title: "SK Penguji",
    lab: "Lab. Farmakologi Toksikologi",
    status: "process",
    tanggalPermohonan: "12 November 2022",
    passedTime: "4 menit yang lalu",
    setStatus: (e: "process" | "rejected" | "accepted") => {},
  },
];

const FEMentorAndExaminersApprovalMore: React.FC<
  IFEMentorAndExaminersApprovalMore
> = ({}) => {
  let { nim } = useParams();
  console.log(`nim: ${nim}`)
  
  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  const { array: approvalCardDataArray } = useArray(dummyApprovalCardData);
  const [mentorStatus, setMentorStatus] = useState(approvalCardDataArray[0].status)
  const [examinerStatus, setExaminerStatus] = useState(approvalCardDataArray[1].status)

  function handleAcceptApproval(){
    setIsOpenAlertModal(false)
  }

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Devi Selfira (N011181001)"
    >
      <FEAlertModal
        title="Konfirmasi Persetujuan"
        description="Tekan tombol konfirmasi untuk mengkonfirmasi persetujuan."
        opened={isOpenAlertModal}
        setOpened={setIsOpenAlertModal}
        yesButtonLabel={"Konfirmasi"}
        onSubmit={handleAcceptApproval}
      />
      <Title order={2} mb={"md"}>
        Devi Selfira (N011181001)
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
              <FEMentorAndExaminersApprovalMoreCard
                SKType={approvalCardDataArray[0].SKType}
                title={approvalCardDataArray[0].title}
                lab={approvalCardDataArray[0].lab}
                status={mentorStatus}
                tanggalPermohonan={approvalCardDataArray[0].tanggalPermohonan}
                passedTime={approvalCardDataArray[0].passedTime}
                setStatus={((e)=>{setMentorStatus(e)})}
              />
            </Grid.Col>
            <Grid.Col span={6} xs={12} sm={12} md={6}>
              <FEMentorAndExaminersApprovalMoreCard
                SKType={approvalCardDataArray[1].SKType}
                title={approvalCardDataArray[1].title}
                lab={approvalCardDataArray[1].lab}
                status={examinerStatus}
                tanggalPermohonan={approvalCardDataArray[1].tanggalPermohonan}
                passedTime={approvalCardDataArray[1].passedTime}
                setStatus={((e)=>{setExaminerStatus(e)})}
              />
            </Grid.Col>
          </Grid>
          <Group className="self-end">
            <Button
              variant="light"
              color={"primary"}
              className="bg-error-500 text-white hover:bg-error-500 px-8"
              component={Link}
              to={FEROUTES.FIRST_VICE_DEAN_APPROVAL_MENTOR_AND_EXAMINERS}
            >
              Batal
            </Button>
            <Button
              className="text-white bg-primary-500 hover:bg-primary-700 font-bold px-8"
              onClick={() => setIsOpenAlertModal(true)}
              variant="light"
              disabled={mentorStatus=='process' || examinerStatus=='process'}
            >
              Konfirmasi Persetujuan
            </Button>
          </Group>
        </Stack>
      </MantineProvider>
    </FEMainlayout>
  );
};
export default FEMentorAndExaminersApprovalMore;
