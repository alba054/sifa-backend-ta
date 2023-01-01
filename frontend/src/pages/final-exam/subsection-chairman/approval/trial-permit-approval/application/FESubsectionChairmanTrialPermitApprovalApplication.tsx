import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFESubsectionChairmanTrialPermitApprovalApplicationCard } from "./FESubsectionChairmanTrialPermitApprovalApplicationCard";
import FESubsectionChairmanTrialPermitApprovalApplicationMain from "./FESubsectionChairmanTrialPermitApprovalApplicationMain";
export interface IFESubsectionChairmanTrialPermitApprovalApplication {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL,
  },
];

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Persetujuan",
    type: "href",
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_TRIAL_PERMIT_APPLICATION_HISTORY,
  },
];

const dummyTrialPermitApprovalApplicationData: Array<IFESubsectionChairmanTrialPermitApprovalApplicationCard> =
  [
    {
      applicationDate: "24 November 2022",
      name: "Devi Selfira",
      nim: "N011181001",
      status: "waiting",
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
    {
      applicationDate: "15 November 2022",
      name: "Richard Enrico",
      nim: "H071191055",
      status: "rejected",
    },
  ];

const FESubsectionChairmanTrialPermitApprovalApplication: React.FC<
  IFESubsectionChairmanTrialPermitApprovalApplication
> = ({}) => {
  const {
    array: trialPermitApprovalApplicationData,
    remove,
    clear,
  } = useArray(dummyTrialPermitApprovalApplicationData);
  const [isDataExist, setIsDataExist] = useState(
    trialPermitApprovalApplicationData.length > 0 ? true : false
  );

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  useEffect(() => {
    if (trialPermitApprovalApplicationData.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [trialPermitApprovalApplicationData]);

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Izin Ujian Sidang"
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
        title="Surat Permohonan Izin Ujian Sidang"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isDataExist ? (
        <FESubsectionChairmanTrialPermitApprovalApplicationMain
          trialPermitApplicationArray={trialPermitApprovalApplicationData}
        />
      ) : (
        <LFPEmptyDataComponent
          title="Belum Ada Usulan Persetujuan Terbaru"
          caption="Usulan persetujuan yang telah disetujui berada di Riwayat Persetujuan” di pojok kanan atas"
        />
      )}
    </FEMainlayout>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplication;
