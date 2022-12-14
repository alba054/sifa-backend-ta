import { Stack } from "@mantine/core";
import React from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEFirstViceDeanMainLayout from "src/layouts/final-exam/first-vice-dean/FEFirstViceDeanMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEMentorAndExaminersApprovalCard, {
  IFEMentorAndExaminersApprovalCard,
} from "./FEMentorAndExaminersApprovalCard";

export interface IFEMentorAndExaminersApproval {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Usulan",
    type: "href",
    href: FEROUTES.FINAL_EXAM_PROPOSAL_HISTORY,
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.APPROVAL,
  },
];

const dummyApprovalList: Array<IFEMentorAndExaminersApprovalCard> = [
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

const FEMentorAndExaminersApproval: React.FC<
  IFEMentorAndExaminersApproval
> = ({}) => {
  const { array: approvalList } = useArray(dummyApprovalList);

  return (
    <FEFirstViceDeanMainLayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="SK Pembimbing dan Penguji"
    >
      <LFPHeaderComponent title="SK Pembimbing dan Penguji" buttons={buttons} />
      <Stack mt={"md"} className="gap-6">
        {approvalList.map((approval: IFEMentorAndExaminersApprovalCard) => {
          return (
            <FEMentorAndExaminersApprovalCard
              name={approval.name}
              nim={approval.nim}
              proposalTitle={approval.proposalTitle}
              laboratory={approval.laboratory}
            />
          );
        })}
      </Stack>
    </FEFirstViceDeanMainLayout>
  );
};
export default FEMentorAndExaminersApproval;
