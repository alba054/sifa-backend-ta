import { Group, Stack, useMantineTheme, Text, Button } from "@mantine/core";
import React, { useState } from "react";
import {
  DeleteOutline,
  EditOutline,
  FECalendarOutline,
  FEPenCircleOutline,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FEStepper from "src/components/fe-components/FEStepper";
import FEInputModal from "src/components/FEInputModal";
import useArray from "src/hooks/fe-hooks/useArray";
import FEProposalCard, { IFEProposalCard } from "./FEProposalCard";
import FEProposalDocuments from "./FEProposalDocuments";

export interface IFEProposalMain {
  finalExamProposalArray: Array<IFEProposalCard>;
  clearFinalExamProposalArray: () => void;
}

const FEProposalMain: React.FC<IFEProposalMain> = ({
  finalExamProposalArray,
  clearFinalExamProposalArray,
}) => {
  const theme = useMantineTheme();

  const [alertOpened, setAlertOpened] = useState(false);

  function handleDeleteProposal() {
    clearFinalExamProposalArray();
  }

  return (
    <Stack className="gap-8">
      <FEAlertModal
        opened={alertOpened}
        setOpened={setAlertOpened}
        title="Hapus Usulan?"
        description="Data yang telah dihapus tidak dapat dikembalikan."
        onSubmit={handleDeleteProposal}
      />
      <FEProgressBar
        progressStages={[
          "Pengusulan Judul",
          "Judul Diterima",
          "Verifikasi Dokumen",
          "Penyusunan Tim Seminar",
          "Penandatangan SK",
          "SK Diterima",
        ]}
        currentProgress={4}
        proposalDate={
          new Date()
          .toLocaleDateString("id", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        }
      />

      {finalExamProposalArray.map((proposal: IFEProposalCard, idx: number) => {
        return (
          <FEProposalCard
            key={idx}
            proposalNumber={proposal.proposalNumber}
            role={proposal.role}
            title={proposal.title}
            laboratory={proposal.laboratory}
            mainMentor={proposal.mainMentor}
            sideMentor={proposal.sideMentor}
            status={proposal.status}
          />
        );
      })}

      <FEProposalDocuments />
      <Group grow spacing={"md"}>
        <Button
          variant="light"
          className="bg-[#3B82F6] py-[10px] h-full rounded-lg text-white hover:bg-[#3B82F6]"
          // onClick={onPreviewClick}
        >
          <EditOutline size={16} color={"white"} className="mr-2" />
          Edit Usulan
        </Button>
        <Button
          variant="light"
          className="bg-error-500 !important py-[10px] h-full rounded-lg text-white hover:bg-error-500"
          // onClick={onDelete}
          onClick={() => {
            setAlertOpened(true);
          }}
        >
          <DeleteOutline size={18} color={"white"} className="mr-2" />
          Hapus File
        </Button>
      </Group>
    </Stack>
  );
};
export default FEProposalMain;
