import { Stack } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FETrashOutline } from "src/assets/Icons/Fluent";
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
import { FEStatus } from "src/utils/const/type";
import FEHeadAdministratorTrialPermitApprovalHistoryCard, {
  IFEHeadAdministratorTrialPermitApprovalHistoryCard,
} from "./FEHeadAdministratorTrialPermitApprovalHistoryCard";
export interface IFEHeadAdministratorTrialPermitApprovalHistory {}

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

const dummyProposalHistoryList: Array<IFEHeadAdministratorTrialPermitApprovalHistoryCard> =
  [
    {
      name: "Devi Selfira",
      nim: "N011181001",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      laboratory: "Kimia Farmasi",
      sk: {
        status: "Belum_Diproses",
        applicationDate: "12 November 2022",
        passedTime: "4 menit yang lalu",
        setStatus: (e: FEStatus) => {},
      },
    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      proposalTitle: "Penerapan Machine Learning untuk Lab",
      laboratory: "Farmasi",
      sk: {
        status: "Ditolak",
        applicationDate: "12 Desember 2022",
        passedTime: "40 menit yang lalu",
        setStatus: (e: FEStatus) => {},
        refusalReason: "Kurang kompleks aplikasinya"
      },
    },
  ];

const FEHeadAdministratorTrialPermitApprovalHistory: React.FC<
  IFEHeadAdministratorTrialPermitApprovalHistory
> = ({}) => {
  const {
    array: proposalHistoryList,
    remove,
    clear,
  } = useArray(dummyProposalHistoryList);
  const navigate = useNavigate();

  const [isDataExist, setIsDataExist] = useState(
    proposalHistoryList.length > 0 ? true : false
  );

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  function onDelete(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (proposalHistoryList.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [proposalHistoryList]);

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
      breadCrumbsCurrentPage="Riwayat Persetujuan"
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
        title="Riwayat Persetujuan"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isDataExist ? (
        <Stack mt={"md"} className="gap-6">
          {proposalHistoryList.map(
            (
              proposal: IFEHeadAdministratorTrialPermitApprovalHistoryCard,
              e: number
            ) => {
              return (
                <FEHeadAdministratorTrialPermitApprovalHistoryCard
                  key={e}
                  index={e}
                  onDelete={(e: number) => {
                    onDelete(e);
                  }}
                  {...proposal}
                />
              );
            }
          )}
        </Stack>
      ) : (
        <LFPEmptyDataComponent
          title="Riwayat Persetujuan Kosong"
          caption="Belum ada riwayat persetujuan yang diajukan"
          icon={
            <ManThinkingAnimation
              width={400}
              className="overflow-hidden z-[-1]"
            />
          }
        />
      )}
    </FEMainlayout>
  );
};
export default FEHeadAdministratorTrialPermitApprovalHistory;
