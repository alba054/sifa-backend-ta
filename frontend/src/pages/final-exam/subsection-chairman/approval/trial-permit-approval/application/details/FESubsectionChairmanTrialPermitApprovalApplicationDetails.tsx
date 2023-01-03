import { Stack, Title, useMantineTheme, Text } from "@mantine/core";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FESubsectionChairmanTrialPermitApprovalApplicationProcessedDetails from "./FESubsectionChairmanTrialPermitApprovalApplicationProcessedDetails";
import FESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails from "./FESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails";

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
];

const dummyApplicationData: {
  [nim: string]: any;
} = {
  N011181001: {
    applicationDate: "24 November 2022",
    name: "Devi Selfira",
    nim: "N011181001",
    status: "Menunggu",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
  H071191044: {
    applicationDate: "24 Desember 2022",
    name: "Yusuf Syam",
    nim: "H071191044",
    status: "Diterima",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
  H071191040: {
    applicationDate: "14 November 2022",
    name: "Devon",
    nim: "H071191040",
    status: "Belum_Diproses",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
  H071191055: {
    applicationDate: "15 November 2022",
    name: "Richard Enrico",
    nim: "H071191055",
    status: "Ditolak",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    mentors: {
      mainMentor: "a",
      sideMentor: "b",
    },
    examiners: {
      firstExaminer: "b",
      secondExaminer: "d",
    },
  },
};

const FESubsectionChairmanTrialPermitApprovalApplicationDetails: React.FC<
  IFESubsectionChairmanTrialPermitApprovalApplicationDetails
> = ({}) => {
  let { nim } = useParams();
  const navigate = useNavigate();
  const [applicationData] = useState(dummyApplicationData[nim!]);
  const [isOpenAcceptAlertModal, setIsOpenAcceptAlertModal] = useState(false);
  const [isOpenRefuseAlertModal, setIsOpenRefuseAlertModal] = useState(false);
  const [dataStatus, setDataStatus] = useState(applicationData.status);

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${applicationData.name} (${applicationData.nim})`}
    >
      <Title order={2} mb={"md"}>
        {applicationData.name} ({applicationData.nim})
      </Title>
      <Stack className="relative pl-8 pr-8 py-8 border border-secondary-500 rounded-xl ">
        <Stack className="gap-0">
          <Text className="font-semibold text-lg text-secondary-text-500">
            Judul
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {applicationData.proposalTitle}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-semibold text-lg text-secondary-text-500">
            Pembimbing Utama
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {applicationData.mentors.mainMentor}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="font-semibold text-lg text-secondary-text-500">
            Pembimbing Pendamping
          </Text>
          <Text className="text-primary-text-500 font-semibold text-lg tracking-1">
            {applicationData.mentors.sideMentor}
          </Text>
        </Stack>
      </Stack>
      {dataStatus == "Menunggu" ? (
        <FESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails
          setStatus={setDataStatus}
        />
      ) : (
        <FESubsectionChairmanTrialPermitApprovalApplicationProcessedDetails
          status={dataStatus}
        />
      )}
    </FEMainlayout>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplicationDetails;
