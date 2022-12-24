import { Stack } from "@mantine/core";
import React from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

import FEApprovalDetailsCard, {
  IFEApprovalDetailsCard
} from "../../../../../components/fe-components/FEApprovalDetailsCard";

export interface IFESubsectionChairmanTrialPermitApproval {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Usulan",
    type: "href",
    href: FEROUTES.STUDENT_FINAL_EXAM_PROPOSAL_HISTORY,
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FIRST_VICE_DEAN_APPROVAL,
  },
];

const dummyApprovalList: Array<IFEApprovalDetailsCard> = [
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Lab: Kimia Farmasi",
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Cara Membuat Robot yang Bagus",
    laboratory: "Lab: DOP",
  },
];

const FESubsectionChairmanTrialPermitApproval: React.FC<IFESubsectionChairmanTrialPermitApproval> = ({}) => {
  const { array: approvalList } = useArray(dummyApprovalList);

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Ujian Sidang"
    >
      <LFPHeaderComponent title="Ujian Sidang" buttons={buttons} />
      <Stack mt={"md"} className="gap-6">
        {approvalList.map((approval: IFEApprovalDetailsCard, e:number) => {
          return (
            <FEApprovalDetailsCard
              key={e}
              name={approval.name}
              nim={approval.nim}
              proposalTitle={approval.proposalTitle}
              laboratory={approval.laboratory}
            />
          );
        })}
      </Stack>
    </FEMainlayout>
  );
};
export default FESubsectionChairmanTrialPermitApproval;
