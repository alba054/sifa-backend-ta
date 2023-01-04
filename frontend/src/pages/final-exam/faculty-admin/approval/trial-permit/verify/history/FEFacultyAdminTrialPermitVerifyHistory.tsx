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
import FEFacultyAdminTrialPermitVerifyHistoryCard, {
  IFEFacultyAdminTrialPermitVerifyHistoryCard,
} from "./FEFacultyAdminTrialPermitVerifyHistoryCard";
import FEFacultyAdminTrialPermitVerifyHistoryMain from "./FEFacultyAdminTrialPermitVerifyHistoryMain";
export interface IFEFacultyAdminTrialPermitVerifyHistory {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
  {
    title: "Permohonan Izin Ujian Sidang",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT,
  },
  {
    title: "Verifikasi Berkas",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT_VERIFICATION,
  },
];

const dummyTrialPermitApprovalApplicationHistoryData: Array<IFEFacultyAdminTrialPermitVerifyHistoryCard> =
  [
    {
      applicationDate: "24 November 2022",
      name: "Devi Selfira",
      nim: "N011181001",
      status: "Menunggu",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      mentors: {
        mainMentor: "a",
        sideMentor: "b",
      },
      examiners: {
        firstExaminer: "b",
        secondExaminer: "d",
      },
    },
    {
      applicationDate: "24 Desember 2022",
      name: "Yusuf Syam",
      nim: "H071191044",
      status: "Diterima",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      mentors: {
        mainMentor: "a",
        sideMentor: "b",
      },
      examiners: {
        firstExaminer: "b",
        secondExaminer: "d",
      },
    },
    {
      applicationDate: "14 November 2022",
      name: "Devon",
      nim: "H071191040",
      status: "Belum_Diproses",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      mentors: {
        mainMentor: "a",
        sideMentor: "b",
      },
      examiners: {
        firstExaminer: "b",
        secondExaminer: "d",
      },
    },
    {
      applicationDate: "15 November 2022",
      name: "Richard Enrico",
      nim: "H071191055",
      status: "Ditolak",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      mentors: {
        mainMentor: "a",
        sideMentor: "b",
      },
      examiners: {
        firstExaminer: "b",
        secondExaminer: "d",
      },
    },
  ];

const FEFacultyAdminTrialPermitVerifyHistory: React.FC<
  IFEFacultyAdminTrialPermitVerifyHistory
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
        <FEFacultyAdminTrialPermitVerifyHistoryMain
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
export default FEFacultyAdminTrialPermitVerifyHistory;
