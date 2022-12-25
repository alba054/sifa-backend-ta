import { Grid, MantineProvider, Stack, Title } from "@mantine/core";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { FEStatus } from "src/utils/const/type";
import FEHeadAdministratorTrialPermitApprovalApplicationDetailsCard, {
  IFEHeadAdministratorTrialPermitApprovalApplicationDetailsCard,
} from "./FEHeadAdministratorTrialPermitApprovalApplicationDetailsCard";

export interface IFEHeadAdministratorTrialPermitApprovalApplicationDetails {}

export interface IApprovalMore {
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  sk: Array<IFEHeadAdministratorTrialPermitApprovalApplicationDetailsCard>;
}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.HEAD_ADMINISTRATOR_APPROVAL,
  },
  {
    title: "SK Izin Ujian Sidang",
    href: FEROUTES.HEAD_ADMINISTRATOR_APPROVAL_TRIAL_PERMIT_APPLICATION,
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
      status: "process",
      applicationDate: "12 November 2022",
      passedTime: "4 menit yang lalu",
      setStatus: (e: FEStatus) => {},
    },
  },
  H071191044: {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Penerapan Machine Learning untuk Lab",
    laboratory: "Farmasi",
    sk: {
      status: "process",
      applicationDate: "12 Desember 2022",
      passedTime: "40 menit yang lalu",
      setStatus: (e: FEStatus) => {},
    },
  },
};

const FEHeadAdministratorTrialPermitApprovalApplicationDetails: React.FC<
  IFEHeadAdministratorTrialPermitApprovalApplicationDetails
> = ({}) => {
  let { nim } = useParams();

  const [proposalData] = useState(dummyProposalData[nim!]);
  const [approvalCardData] = useState<any>(proposalData.sk);
  const [status, setStatus] = useState(approvalCardData.status);

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={`${proposalData.name} (${proposalData.nim})`}
    >
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
              <FEHeadAdministratorTrialPermitApprovalApplicationDetailsCard
                status={status}
                applicationDate={approvalCardData.applicationDate}
                passedTime={approvalCardData.passedTime}
                setStatus={(e) => {
                  setStatus(e);
                }}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </MantineProvider>
    </FEMainlayout>
  );
};
export default FEHeadAdministratorTrialPermitApprovalApplicationDetails;
