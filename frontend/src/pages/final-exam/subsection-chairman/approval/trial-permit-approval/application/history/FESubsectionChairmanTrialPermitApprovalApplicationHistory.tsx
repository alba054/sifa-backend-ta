import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FEClockRepeatOutline, FETrashOutline } from "src/assets/Icons/Fluent";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FESubsectionChairmanTrialPermitApprovalApplicationHistoryCard, {
  IFESubsectionChairmanTrialPermitApprovalApplicationHistoryCard,
} from "./FESubsectionChairmanTrialPermitApprovalApplicationHistoryCard";
import FESubsectionChairmanTrialPermitApprovalApplicationHistoryMain from "./FESubsectionChairmanTrialPermitApprovalApplicationHistoryMain";
export interface IFESubsectionChairmanTrialPermitApprovalApplication {}

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

const dummyTrialPermitApprovalApplicationHistoryData: Array<IFESubsectionChairmanTrialPermitApprovalApplicationHistoryCard> =
  [
    {
      applicationDate: "24 November 2022",
      name: "Devi Selfira",
      nim: "N011181001",
      status: "rejected",
    },
    {
      applicationDate: "24 Desember 2022",
      name: "Yusuf Syam",
      nim: "H071191044",
      status: "accepted",
    },
    {
      applicationDate: "14 November 2022",
      name: "Devon",
      nim: "H071191040",
      status: "process",
    },
  ];

const FESubsectionChairmanTrialPermitApprovalApplication: React.FC<
  IFESubsectionChairmanTrialPermitApprovalApplication
> = ({}) => {
  const {
    array: trialPermitApprovalApplicationHistoryData,
    remove,
    clear,
  } = useArray(dummyTrialPermitApprovalApplicationHistoryData);
  const navigate = useNavigate();

  const [isDataExist, setIsDataExist] = useState(
    trialPermitApprovalApplicationHistoryData.length > 0 ? true : false
  );

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  function onDelete(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (trialPermitApprovalApplicationHistoryData.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [trialPermitApprovalApplicationHistoryData]);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Kosongkan Riwayat",
      type: "modal",
      disabled: !isDataExist,
      onClick: () => setIsAlertOpened(true),
      icon: <FETrashOutline className="mr-1" size={16} />,
    },
  ];

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Riwayat Surat Permohonan"
    >
      <FEAlertModal
        title="Kosongkan Riwayat Penyusunan?"
        description="Dengan mengklik tombol “Kosongkan”, semua data riwayat akan terhapus. Data yang telah dihapus tidak dapat dikembalikan"
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        yesButtonLabel={"Kosongkan"}
        onSubmit={() => {
          clear();
          setIsAlertOpened(false);
        }}
      />
      <LFPHeaderComponent
        title="Riwayat Surat Permohonan"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isDataExist ? (
        <FESubsectionChairmanTrialPermitApprovalApplicationHistoryMain
          trialPermitApplicationArray={
            trialPermitApprovalApplicationHistoryData
          }
          onDelete={(e: number) => {
            onDelete(e);
          }}
        />
      ) : (
        <LFPEmptyDataComponent
          title="Riwayat Surat Permohonan Kosong"
          caption="Riwayat surat permohonan belum ada atau sudah terhapus"
        />
      )}
    </FEMainlayout>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplication;
