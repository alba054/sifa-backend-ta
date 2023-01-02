import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import FEHeadAdministratorTrialPermitApprovalApplicationCard, {
  IFEHeadAdministratorTrialPermitApprovalApplicationCard
} from "./FEHeadAdministratorTrialPermitApprovalApplicationCard";
export interface IFEHeadAdministratorTrialPermitApprovalApplication {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.HEAD_ADMINISTRATOR_APPROVAL,
  },
];

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Persetujuan",
    type: "href",
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
    href: FEROUTES.HEAD_ADMINISTRATOR_APPROVAL_TRIAL_PERMIT_APPLICATION_HISTORY,
  },
];

const dummyTrialPermitApprovalApplicationData: Array<IFEHeadAdministratorTrialPermitApprovalApplicationCard> =
  [
    {
      name: "Devi Selfira",
      nim: "N011181001",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      laboratory: "Kimia Farmasi",
      trialPermitCertificateStatus: "Diterima",
    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      proposalTitle: "Cara Membuat Robot yang Bagus",
      laboratory: "DOP",
      trialPermitCertificateStatus: "Ditolak",
    },
  ];

const FEHeadAdministratorTrialPermitApprovalApplication: React.FC<
  IFEHeadAdministratorTrialPermitApprovalApplication
> = ({}) => {
  const {
    array: trialPermitApprovalApplicationData,
    remove,
    clear,
  } = useArray(dummyTrialPermitApprovalApplicationData);
  const [isDataExist, setIsDataExist] = useState(
    trialPermitApprovalApplicationData.length > 0 ? true : false
  );
  const navigate = useNavigate();

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
      breadCrumbsCurrentPage="SK Izin Ujian Sidang"
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
        title="Surat Permohonan"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {trialPermitApprovalApplicationData.map(
            (
              approval: IFEHeadAdministratorTrialPermitApprovalApplicationCard,
              e: number
            ) => {
              return (
                <FEHeadAdministratorTrialPermitApprovalApplicationCard
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
          caption="Usulan persetujuan yang telah disetujui berada di Riwayat Persetujuan” di pojok kanan atas"
        />
      )}
    </FEMainlayout>
  );
};
export default FEHeadAdministratorTrialPermitApprovalApplication;
