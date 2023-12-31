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
import { IFEFacultyAdminTrialPermitVerifyCard } from "./FEFacultyAdminTrialPermitVerifyCard";
import FEFacultyAdminTrialPermitVerifyMain from "./FEFacultyAdminTrialPermitVerifyMain";
export interface IFEFacultyAdminTrialPermitVerify {}

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
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT_VERIFICATION_HISTORY,
  },
];

const dummyTrialPermitApprovalApplicationData: Array<IFEFacultyAdminTrialPermitVerifyCard> =
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

const FEFacultyAdminTrialPermitVerify: React.FC<
  IFEFacultyAdminTrialPermitVerify
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
      breadCrumbsCurrentPage="Verifikasi Berkas"
    >
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
        title="Verifikasi Berkas"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isDataExist ? (
        <FEFacultyAdminTrialPermitVerifyMain
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
export default FEFacultyAdminTrialPermitVerify;
