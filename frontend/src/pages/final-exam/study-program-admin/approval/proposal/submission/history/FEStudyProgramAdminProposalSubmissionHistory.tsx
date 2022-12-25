import React, { useEffect, useState } from "react";
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
import FEStudyProgramAdminProposalSubmissionHistoryMain from "./FEStudyProgramAdminProposalSubmissionHistoryMain";
import { IFEStudyProgramAdminProposalSubmissionHistoryMainCard } from "./FEStudyProgramAdminProposalSubmissionHistoryMainCard";

export interface IFEStudyProgramAdminProposalSubmissionHistory {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
  },
  {
    title: "Judul Penelitian",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL,
  },
  {
    title: "Pengajuan Judul Penelitian",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL_SUBMISSION,
  },
];

const dummySubmissionList: Array<IFEStudyProgramAdminProposalSubmissionHistoryMainCard> =
  [
    {
      name: "Juwita Hafiva Sari",
      nim: "N011181010",
      laboratory: "Kimia Farmasi",
      laboratoryChairman: "NursiahHasyim, Dra., CES.",
      completionDate: "14 November 2022",
      entryDate: "7 November 2022",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      status: "accepted",
    },

    {
      name: "Indah Lestari",
      nim: "N011191004",
      laboratory: "Mikrobiologi Farmasi",
      laboratoryChairman: "Abdul Rahim, S.Si., M.Si., Ph.D., Apt.",
      completionDate: "1 November 2022",
      entryDate: "7 November 2022",
      proposalTitle:
        "Pengujian Aktivitas Antioksidan dan Analisis Mikrobiologi terhadap Lama Waktu Penyimpanan Teh Daun Gaharu (Aquilaria Malaccensis Lamk.) dalam Kemasan Siap Minum",
      status: "accepted",
    },
  ];

const FEStudyProgramAdminProposalSubmissionHistory: React.FC<
  IFEStudyProgramAdminProposalSubmissionHistory
> = ({}) => {
  const {
    array: proposalSubmissionHistoryData,
    remove,
    clear,
  } = useArray(dummySubmissionList);

  const [isHistoryExist, setIsHistoryExist] = useState(true);
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  function handleDelete(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (proposalSubmissionHistoryData.length <= 0) {
      setIsHistoryExist(false);
    } else {
      setIsHistoryExist(true);
    }
  }, [proposalSubmissionHistoryData]);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Kosongkan Riwayat",
      type: "modal",
      disabled: !isHistoryExist,
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
        title="Kosongkan Riwayat Pengajuan?"
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
        title="Riwayat Pengajuan Judul Penelitian"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isHistoryExist ? (
        <FEStudyProgramAdminProposalSubmissionHistoryMain
          proposalSubmissionHistoryData={proposalSubmissionHistoryData}
          handleDelete={handleDelete}
        />
      ) : (
        <LFPEmptyDataComponent
          title="Riwayat Pengajuan Masih Kosong"
          caption="Belum ada judul yang diajukan ke kepala laboratorium yang bersangkutan"
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
export default FEStudyProgramAdminProposalSubmissionHistory;
