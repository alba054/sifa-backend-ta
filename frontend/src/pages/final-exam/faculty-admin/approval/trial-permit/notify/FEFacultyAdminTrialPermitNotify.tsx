import React, { useEffect, useState } from "react";
import { FEClockRepeatOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton,
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import { IFEFacultyAdminTrialPermitNotifyCard } from "./FEFacultyAdminTrialPermitNotifyCard";
import FEFacultyAdminTrialPermitNotifyMain from "./FEFacultyAdminTrialPermitNotifyMain";
export interface IFEFacultyAdminTrialPermitNotify {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
  {
    title: "Permohonan Izin Ujian Sidang",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT,
  },
];

const buttons: ILFPHeaderButton[] = [
  {
    label: "Riwayat Surat Permohonan",
    type: "href",
    icon: <FEClockRepeatOutline size={15} className="mr-[6px]" />,
    disabled: false,
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT_NOTIFICATION_HISTORY,
  },
];

const dummyTrialPermitApprovalApplicationData: Array<IFEFacultyAdminTrialPermitNotifyCard> =
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

const FEFacultyAdminTrialPermitNotify: React.FC<
  IFEFacultyAdminTrialPermitNotify
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

  function deleteHandler(e: number) {
    remove(e);
  }

  useEffect(() => {
    if (trialPermitApprovalApplicationData.length > 0) {
      setIsDataExist(true);
    } else {
      setIsDataExist(false);
    }
  }, [trialPermitApprovalApplicationData]);

  return (
    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Notifikasi">
      <FEAlertModal
        title="Kosongkan Riwayat Permohonan?"
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
        title="Notifikasi Surat Permohonan"
        // buttons={buttons}
        // disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isDataExist ? (
        <FEFacultyAdminTrialPermitNotifyMain
          trialPermitApplicationArray={trialPermitApprovalApplicationData}
          deleteHandler={deleteHandler}
        />
      ) : (
        <LFPEmptyDataComponent
          title="Belum Ada Notifikasi Surat Permohonan Terbaru"
          caption="Surat permohonan yang telah dinotifikasikan kepada mahasiswa berada di Riwayat Surat Permohonan di pojok kanan atas"
        />
      )}
    </FEMainlayout>
  );
};
export default FEFacultyAdminTrialPermitNotify;
