import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import FEApprovalDetailsCardWithStatus, {
  IFEApprovalDetailsCardWithStatus,
} from "src/components/fe-components/FEApprovalDetailsCardWithStatus";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFESubsectionChairmanMentorAndExaminersApproval {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Persetujuan",
    type: "href",
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_MENTOR_AND_EXAMINERS_HISTORY,
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
  },
];

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL,
  },
];

const dummyApprovalList: Array<IFEApprovalDetailsCardWithStatus> = [
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    mentorCertificateApprovalStatus: "Diterima",
    examinersCertificateApprovalStatus: "Belum_Diproses"
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Cara Membuat Robot yang Bagus",
    laboratory: "DOP",
    examinersCertificateApprovalStatus: "Ditolak"
  },
];

const FESubsectionChairmanMentorAndExaminersApproval: React.FC<
  IFESubsectionChairmanMentorAndExaminersApproval
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
          {approvalList.map(
            (approval: IFEApprovalDetailsCardWithStatus, e: number) => {
              return (
                <FEApprovalDetailsCardWithStatus
                  key={e}
                  {...approval}
                  onClick={() => {
                    navigate(approval.nim);
                  }}
                />
              );
            }
          )}
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
export default FESubsectionChairmanMentorAndExaminersApproval;
