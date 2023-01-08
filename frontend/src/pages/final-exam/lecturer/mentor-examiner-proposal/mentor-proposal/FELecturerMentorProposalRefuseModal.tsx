import { Stack, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { useState } from "react";
import FERefusalReasonForm, {
  feRefusalReasonFormSchema,
  IFERefusalReasonFormSchema,
} from "src/components/fe-components/FERefusalReasonForm";
import FEInputModal from "src/components/FEInputModal";

export interface IFELecturerMentorProposalRefuseModal {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit?: () => void;
  index: number;
  name: string;
  nim: number;
  proposalTitle: string;
  proposer: string;
  proposerName?: string;
  laboratory: string;
  mentorPosition: string;
  form: any
}

const FELecturerMentorProposalRefuseModal: React.FC<
  IFELecturerMentorProposalRefuseModal
> = ({
  opened,
  setOpened,
  onSubmit,
  laboratory,
  name,
  nim,
  proposalTitle,
  proposer,
  proposerName,
  mentorPosition,
  index,
  form
}) => {

  return (
    <FEInputModal
      opened={opened}
      setOpened={setOpened}
      title={"Konfirmasi Penolakan Usulan Pembimbing"}
      yesButtonLabel={"Tolak Usulan"}
      onSubmit={onSubmit}
      maxWidth={800}
    >
      <Stack>
        <Text className="text-primary-text-500">
          Terima usulan sebagai{" "}
          <Text className="text-error-500 font-bold inline">
            PEMBIMBING {mentorPosition.toUpperCase()}
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
        <FERefusalReasonForm form={form} textSize="md" label="Alasan Penolakan" />
      </Stack>
    </FEInputModal>
  );
};
export default FELecturerMentorProposalRefuseModal;
