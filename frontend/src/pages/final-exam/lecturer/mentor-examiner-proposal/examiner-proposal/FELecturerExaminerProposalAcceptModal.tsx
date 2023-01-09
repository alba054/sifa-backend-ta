import { Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import FEInputModal from "src/components/FEInputModal";

export interface IFELecturerExaminerProposalAcceptModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: (row: any) => void;
  index: number;
  name: string;
  nim: number;
  proposalTitle: string;
  proposer: string;
  proposerName?: string;
  laboratory: string;
  mainMentor: string;
  sideMentor: string;
}

const FELecturerExaminerProposalAcceptModal: React.FC<
  IFELecturerExaminerProposalAcceptModal
> = ({
  opened,
  setOpened,
  onSubmit,
  index,
  laboratory,
  name,
  nim,
  proposalTitle,
  proposer,
  proposerName,
  mainMentor,
  sideMentor
}) => {
  return (
    <FEInputModal
      opened={opened}
      setOpened={setOpened}
      title={"Konfirmasi Penerimaan Usulan Penguji"}
      yesButtonLabel={"Terima Usulan"}
      onSubmit={() => {
        onSubmit!(index);
      }}
      maxWidth={700}
    >
      <Stack>
        <Text className="text-primary-text-500">
          Terima usulan sebagai{" "}
          <Text className="text-primary-500 font-bold inline">
            PENGUJI
          </Text>{" "}
          untuk Tugas Akhir dengan detail sebagai berikut?
        </Text>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Mahasiswa</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {name} ({nim})
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Judul Tugas Akhir</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {proposalTitle}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Asal Usulan</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {proposer} ({proposer === "Dosen" ? proposerName : name})
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Laboratorium</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {laboratory}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-secondary-text-500">Dosen Pembimbing</Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {mainMentor} (Utama)
          </Text>
          <Text className="text-primary-text-500 text-lg tracking-1 font-semibold">
            {sideMentor} (Pendamping)
          </Text>
        </Stack>
      </Stack>
    </FEInputModal>
  );
};
export default FELecturerExaminerProposalAcceptModal;
