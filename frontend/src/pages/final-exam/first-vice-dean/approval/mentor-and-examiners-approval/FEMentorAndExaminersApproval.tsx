import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalDetailsCard, {
  IFEApprovalDetailsCard,
} from "../../../../../components/fe-components/FEApprovalDetailsCard";

export interface IFEMentorAndExaminersApproval {}

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
    proposalArray: [
      {
        proposalTitle:
          "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
        laboratory: "Lab: Kimia Farmasi",
      },
    ],
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalArray: [
      {
        proposalTitle: "Cara Membuat Robot yang Bagus",
        laboratory: "Lab: DOP",
      },
    ],
  },
];

const FEMentorAndExaminersApproval: React.FC<
  IFEMentorAndExaminersApproval
> = ({}) => {
  const navigate = useNavigate();
  const { array: approvalList } = useArray(dummyApprovalList);
  // const { array: approvalList } = useArray([]);
  const [isDataExist, setIsDataExist] = useState(
    approvalList.length > 0 ? true : false
  );

  useEffect(() => {
    if (approvalList.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [approvalList]);

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="SK Pembimbing dan Penguji"
    >
      <LFPHeaderComponent title="SK Pembimbing dan Penguji" buttons={buttons} />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {approvalList.map((approval: IFEApprovalDetailsCard, e: number) => {
            return (
              <FEApprovalDetailsCard
                key={e}
                name={approval.name}
                nim={approval.nim}
                proposalArray={approval.proposalArray}
                onClick={() => {
                  navigate(`nim/${approval.nim}`);
                }}
              />
            );
          })}
        </Stack>
      ) : (
        <LFPEmptyDataComponent
          title="Belum Ada Usulan Persetujuan Terbaru"
          caption="Untuk melihat riwayat persetujuan yang telah disetujui ataupun di tolak tekan tombol “Riwayat Persetujuan” di pojok kanan atas"
        />
      )}
    </FEMainlayout>
  );
};
export default FEMentorAndExaminersApproval;
