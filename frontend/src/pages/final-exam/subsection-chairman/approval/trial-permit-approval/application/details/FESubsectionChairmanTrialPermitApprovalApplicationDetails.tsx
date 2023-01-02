import { Title, useMantineTheme } from "@mantine/core";
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
  },
  H071191044: {
    applicationDate: "24 Desember 2022",
    name: "Yusuf Syam",
    nim: "H071191044",
    status: "Diterima",
  },
  H071191040: {
    applicationDate: "14 November 2022",
    name: "Devon",
    nim: "H071191040",
    status: "Belum_Diproses",
  },
  H071191055: {
    applicationDate: "15 November 2022",
    name: "Richard Enrico",
    nim: "H071191055",
    status: "Ditolak",
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
  const [dataStatus, setDataStatus] = useState(applicationData.status)

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${applicationData.name} (${applicationData.nim})`}
    >
      <Title order={2} mb={"md"}>
        {applicationData.name} ({applicationData.nim})
      </Title>
      {dataStatus == "Menunggu" ? (
        <FESubsectionChairmanTrialPermitApprovalApplicationUnprocessedDetails setStatus={setDataStatus} />
      ) : (
        <FESubsectionChairmanTrialPermitApprovalApplicationProcessedDetails
          status={dataStatus}
        />
      )}
    </FEMainlayout>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplicationDetails;
