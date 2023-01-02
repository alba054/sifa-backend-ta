import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import {
  FEBookmarkSingleSearchOutline,
  FETrashOutline,
  PersonFilled,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import { FEStatus } from "src/utils/const/type";

export interface IFEProposalHistoryCard {
  index: number;
  proposalNumber: string;
  role: "Mahasiswa" | string;
  title: string;
  laboratory: string;
  status: FEStatus;
  refusalReason: string;
  onDelete: (e: number) => void;
}

const statusMap = new Map<FEStatus, "green" | "blue" | "red">([
  ["Belum_Diproses", "green"],
  ["Diterima", "blue"],
  ["Ditolak", "red"],
]);

const FEProposalHistoryCard: React.FC<IFEProposalHistoryCard> = ({
  index,
  proposalNumber,
  role,
  title,
  laboratory,
  status,
  refusalReason,
  onDelete,
}) => {
  const theme = useMantineTheme();

  const [isOpenAlertModal, setIsOpenAlertModal] = useState(false);

  function deleteHistory() {
    onDelete(index);
    setIsOpenAlertModal(false);
  }

  return (
    <Group className="p-8 border-[1px] border-secondary-500 box-border rounded-xl drop-shadow-1 shadow-md relative justify-between">
      <FEAlertModal
        opened={isOpenAlertModal}
        setOpened={setIsOpenAlertModal}
        title="Hapus Usulan"
        description="Data yang telah dihapus tidak dapat dikembalikan."
        onSubmit={deleteHistory}
      />
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
        <Stack className="gap-1">
          <Text className="text-lg font-bold tracking text-primary-text-500">
            Status
          </Text>
          <FERoundedChip label={status} type={statusMap.get(status)} />
        </Stack>
        <Stack className="gap-1">
          <Text className="text-lg font-bold tracking text-primary-text-500">
            Alasan Penolakan
          </Text>
          <Text className="text-md tracking-2 text-error-500">
            {refusalReason}
          </Text>
        </Stack>
      </Stack>
      <Button
        variant="light"
        onClick={() => {
          setIsOpenAlertModal(true);
        }}
        className="absolute right-8 bottom-8 p-0 m-0 bg-transparent hover:bg-transparent"
      >
        <FETrashOutline color="#FF2C56" className="bg-transparent" size={26} />
      </Button>
      <FEBookmarkSingleSearchOutline
        size={160}
        color={"#F1F1F3"}
        className="absolute right-4 bottom-8 z-[-1]"
      />
    </Group>
  );
};
export default FEProposalHistoryCard;
