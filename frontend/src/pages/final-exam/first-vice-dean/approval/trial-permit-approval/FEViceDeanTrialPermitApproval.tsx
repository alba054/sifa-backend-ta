import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEViceDeanTrialPermitApprovalCard, { IFEViceDeanTrialPermitApprovalCard } from "./FEViceDeanTrialPermitApprovalCard";

export interface IFEViceDeanTrialPermitApproval {}

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Penandatanganan SK",
    type: "href",
    href: FEROUTES.FIRST_VICE_DEAN_APPROVAL_TRIAL_PERMIT_HISTORY,
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

export const deanApprovalChip: any = {
  Belum_Diproses: (
    <FERoundedChip
      label="Belum Ditandatangani"
      type="green"
    />
  ),
  Ditolak: (
    <FERoundedChip
      label="Tidak Ditandatangani"
      type="red"
    />
  ),
  Diterima: (
    <FERoundedChip
      label="Telah Ditandatangani"
      type="blue"
    />
  ),
};

const dummyApprovalList: Array<IFEViceDeanTrialPermitApprovalCard> = [
  {
    name: "Devi Selfira",
    nim: "N011181001",
    proposalTitle:
      "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
    laboratory: "Kimia Farmasi",
    TrialPermitApprovalStatus: "Belum_Diproses",
  },
  {
    name: "Muh. Yusuf Syam",
    nim: "H071191044",
    proposalTitle: "Cara Membuat Robot yang Bagus",
    laboratory: "DOP",
    TrialPermitApprovalStatus: "Ditolak",
  },
];

const FEViceDeanTrialPermitApproval: React.FC<
  IFEViceDeanTrialPermitApproval
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
      breadCrumbsCurrentPage="SK Izin Ujian Sidang"
    >
      <LFPHeaderComponent title="SK Izin Ujian Sidang" buttons={buttons} />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {approvalList.map(
            (approval: IFEViceDeanTrialPermitApprovalCard, e: number) => {
              return (
                <FEViceDeanTrialPermitApprovalCard
                  key={e}
                  {...approval}
                  chip={deanApprovalChip}
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
export default FEViceDeanTrialPermitApproval;
