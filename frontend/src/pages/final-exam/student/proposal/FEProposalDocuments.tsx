import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { FEFileMultipleFilled } from "src/assets/Icons/Fluent";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FEProposalDocumentsCard from "./FEProposalDocumentsCard";

export interface IFEProposalDocuments {}

const FEProposalDocuments: React.FC<IFEProposalDocuments> = ({}) => {
  const theme = useMantineTheme();

  return (
    <Stack className="p-8 border-[1px] border-secondary-500 box-border rounded-xl drop-shadow-1 shadow-md">
      <Group>
        <Text className="text-[22px] font-bold text-primary-text-500">
          Dokumen Tugas Akhir
        </Text>
        <FERoundedChip
          type="red"
          label="Belum Lengkap"
          leftIcon={
            <FEFileMultipleFilled size={14} color={theme.colors["error"][5]} />
          }
        />
      </Group>
      <Group className="gap-6">
        <FEProposalDocumentsCard description="SK Pembimbing" />
        <FEProposalDocumentsCard description="SK Penguji" />
        <FEProposalDocumentsCard description="SK Penguji" />
      </Group>
    </Stack>
  );
};
export default FEProposalDocuments;
