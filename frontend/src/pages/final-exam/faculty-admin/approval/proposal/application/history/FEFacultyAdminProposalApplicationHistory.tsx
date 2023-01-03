import React, { useEffect, useState } from "react";
import { FETrashOutline } from "src/assets/Icons/Fluent";
import ManThinkingAnimation from "src/assets/Icons/ManThinkingAnimation";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import LFPEmptyDataComponent from "src/components/fe-components/LFPEmptyData.component";
import LFPHeaderComponent, {
  ILFPHeaderButton
} from "src/components/fe-components/LFPHeader.component";
import useArray from "src/hooks/fe-hooks/useArray";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEFacultyAdminProposalApplicationHistoryMain from "./FEFacultyAdminProposalApplicationHistoryMain";
import { IFEFacultyAdminProposalApplicationHistoryCard } from "./FEFacultyAdminProposalApplicationHistoryCard";

export interface IFEFacultyAdminProposalApplicationHistory {}


const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
  {
    title: "SK Pembimbing dan Penguji",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS,
  },
  {
    title: "Persetujuan Permohonan Judul",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS_APPLICATION
  }
];

const dummyProposalApplicationHistoryData: Array<IFEFacultyAdminProposalApplicationHistoryCard> =
  [
    {
      name: "Devi Selfira",
      nim: "N011181001",
      status: "Diterima",
      proposalTitle:
        "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
      laboratory: "Kimia Farmasi",
      proposer: "Dosen",
      proposerName: "Ricar Enrico ST"

    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      status: "Ditolak",
      proposalTitle: "Cara Membuat Robot yang Bagus",
      laboratory: "DOP",
      proposer: "Mahasiswa",
    },
  ];

const FEFacultyAdminProposalApplicationHistory: React.FC<
  IFEFacultyAdminProposalApplicationHistory
> = ({}) => {
  const {
    array: proposalApplicationHistoryData,
    remove,
    clear,
  } = useArray(dummyProposalApplicationHistoryData);
  const [isHistoryExist, setIsHistoryExist] = useState(true);
  const [isAlertOpened, setIsAlertOpened] = useState(false);

  function handleDelete(index: number) {
    remove(index);
  }

  useEffect(() => {
    if (proposalApplicationHistoryData.length <= 0) {
      setIsHistoryExist(false);
    } else {
      setIsHistoryExist(true);
    }
  }, [proposalApplicationHistoryData]);

  const buttons: ILFPHeaderButton[] = [
    {
      label: "Kosongkan Riwayat",
      type: "modal",
      disabled: !isHistoryExist,
      onClick: () => setIsAlertOpened(true),
      icon: <FETrashOutline className="mr-1" size={16}  />,
    },
  ];

  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Riwayat Persetujuan"
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
        title="Riwayat Permohonan Tugas Akhiru"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat kosong"}
      />
      {isHistoryExist ? (
        <FEFacultyAdminProposalApplicationHistoryMain
          proposalApplicationHistoryData={proposalApplicationHistoryData}
          handleDelete={handleDelete}
        />
      ) : (
        <LFPEmptyDataComponent
          title="Riwayat Persetujuan Masih Kosong"
          caption="Belum ada mahasiswa mengajukan persetujuan"
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
export default FEFacultyAdminProposalApplicationHistory;
