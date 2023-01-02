import { Button, Group, Stack } from "@mantine/core";
import React, { useState } from "react";
import { DeleteOutline, EditOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FEDocumentList from "src/components/fe-components/FEDocumentList";
import FEProgressBar from "src/components/fe-components/FEProgressBar";
import FEProposalCard, { IFEProposalCard } from "./FEProposalCard";

export interface IFEProposalMain {
  finalExamProposalArray: Array<IFEProposalCard>;
}

const FEProposalMain: React.FC<IFEProposalMain> = ({
  finalExamProposalArray,
}) => {
  return (
    <Stack className="gap-8">
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
        proposalDate={new Date().toLocaleDateString("id", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
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
      <FEDocumentList
        title="Dokumen Tugas Akhir"
        documentList={["SK Pembimbing", "SK Penguji"]}
        status="Belum Lengkap"
        info="Dokumen tugas akhir akan diberikan jika usulan diterima."
      />
    </Stack>
  );
};
export default FEProposalMain;
