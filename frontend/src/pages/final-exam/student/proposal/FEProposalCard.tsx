import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import {
  FEBookmarkSingleSearchOutline,
  PersonFilled,
} from "src/assets/Icons/Fluent";
import FERoundedChip, {
  statusChipNoIcon,
} from "src/components/fe-components/FERoundedChip";
import { FEStatus } from "src/utils/const/type";

export interface IFEProposalCard {
  proposalNumber: string;
  role: "Mahasiswa" | string;
  title: string;
  laboratory: string;
  mainMentor?: string;
  sideMentor?: string;
  status: FEStatus;
}

const statusMap = new Map<FEStatus, "green" | "blue" | "red">([
  ["Belum_Diproses", "green"],
  ["Diterima", "blue"],
  ["Ditolak", "red"],
]);

const FEProposalCard: React.FC<IFEProposalCard> = ({
  proposalNumber,
  role,
  title,
  laboratory,
  mainMentor = "Belum Ditentukan",
  sideMentor = "Belum Ditentukan",
  status,
}) => {
  const theme = useMantineTheme();
  return (
    <Group className="p-8 border-[1px] border-secondary-500 box-border rounded-xl drop-shadow-1 shadow-md relative justify-between">
      <Stack>
        <Group className="mb-0">
          <Text className="text-[22px] font-bold text-primary-text-500">
            Usulan #{proposalNumber}
          </Text>
          <FERoundedChip
            label={role}
            type="blue"
            leftIcon={
              <PersonFilled
                size={14}
                color={theme.colors["primary"][5]}
                className="items-center"
              />
            }
          />
        </Group>
        <Stack className="gap-0">
          <Text className="text-[18px] font-semibold text-primary-500 tracking-[0.0015em]">
            {title}
          </Text>
          <Text className="text-lg font-semibold tracking-[0.0015em] text-secondary-text-500">
            {laboratory}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-lg font-bold tracking text-primary-text-500">
            Pembimbing Utama
          </Text>
          <Text className="text-md tracking-2 text-secondary-text-500">
            {mainMentor}
          </Text>
        </Stack>
        <Stack className="gap-0">
          <Text className="text-lg font-bold tracking text-primary-text-500">
            Pembimbing Pendamping
          </Text>
          <Text className="text-md tracking-2 text-secondary-text-500">
            {sideMentor}
          </Text>
        </Stack>
        <Stack className="gap-1">
          <Text className="text-lg font-bold tracking text-primary-text-500">
            Status
          </Text>
          {statusChipNoIcon[status]}
        </Stack>
      </Stack>
      <FEBookmarkSingleSearchOutline
        size={160}
        color={"#F1F1F3"}
        className="absolute right-4 bottom-8 z-[-1]"
      />
    </Group>
  );
};
export default FEProposalCard;
