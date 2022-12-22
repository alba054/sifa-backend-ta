import { Title } from "@mantine/core";
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
import FEStudyProgramAdminProposalApplicationHistoryMain from "./FEStudyProgramAdminProposalApplicationHistoryMain";
import { IFEStudyProgramAdminProposalApplicationHistoryMainCard } from "./FEStudyProgramAdminProposalApplicationHistoryMainCard";

export interface IFEStudyProgramAdminProposalApplicationHistory {}

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
    title: "Permohonan Judul Penelitian",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL_APPLICATION,
  },
];

const dummyProposalApplicationHistoryData: Array<IFEStudyProgramAdminProposalApplicationHistoryMainCard> =
  [
    {
      name: "Devi Selfira",
      nim: "N011181001",
      status: "accepted",
      acceptedProposal: {
        proposalTitle:
          "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
        laboratory: "Kimia Farmasi",
        proposer: "Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)",
      },
    },
    {
      name: "Muh. Yusuf Syam",
      nim: "H071191044",
      status: "rejected",
      refusedProposal: [
        {
          proposalTitle:
            "Efektivitas Ekstrak Daun Insulin (Tithonia diversifolia) terhadap Kadar Blood Urea Nitrogen (BUN) pada Tikus Model Diabetes Melitus",
          laboratory: "Kimia Farmasi",
          proposer: "Dosen (Rangga Meidianto Asri S.Si., M.Si., Apt.)",
        },
      ],
    },
  ];

const FEStudyProgramAdminProposalApplicationHistory: React.FC<
  IFEStudyProgramAdminProposalApplicationHistory
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
        title="Riwayat Permohonan Judul Penelitian"
        buttons={buttons}
        disabledButtonTooltipLabel={"Riwayat sudah kosong"}
      />
      {isHistoryExist ? (
        <FEStudyProgramAdminProposalApplicationHistoryMain
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
export default FEStudyProgramAdminProposalApplicationHistory;
