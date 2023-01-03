import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import {
  FEBookmarkSingleSearchOutline,
  FEPersonFilled,
  FETrashOutline,
} from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import { FEStatus } from "src/utils/const/type";

export interface IFEFacultyAdminProposalApplicationHistoryCard {
  index?: number;
  name: string;
  nim: string;
  status: FEStatus;
  proposalTitle: string;
  laboratory: string;
  proposer?: "Dosen" | "Mahasiswa";
  proposerName?: string;
  handleDelete?: (e: number) => void;
}

const FEFacultyAdminProposalApplicationHistoryCard: React.FC<
  IFEFacultyAdminProposalApplicationHistoryCard
> = ({
  index,
  name,
  nim,
  status,
  laboratory,
  proposalTitle,
  proposer,
  proposerName,
  handleDelete,
}) => {
  const theme = useMantineTheme();

  const [isAlertOpened, setIsAlertOpened] = useState(false);
  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <FEAlertModal
        title="Hapus Riwayat Persetujuan?"
        description={`Data riwayat persetujuan ${name} yang telah dihapus tidak dapat dikembalikan.`}
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        onSubmit={() => {
          handleDelete!(index!);
          setIsAlertOpened(false);
        }}
      />
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="gap-1 mb-4 z-10">
          <Text className="text-2xl font-bold text-primary-text-500 mb-2">
            {name} ({nim})
          </Text>
          <Stack className="gap-4">
            <Stack className="gap-0">
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                {proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                Lab. {laboratory}
              </Text>
              {proposer == null ? null : (
                <Group className="">
                  <Text className="text-primary-text-500 font-bold text-lg">
                    Asal Usulan
                  </Text>
                  <Text>
                    <FERoundedChip
                      label={
                        proposer === "Dosen"
                          ? `Dosen (${proposerName})`
                          : `Mahasiswa (${name})`
                      }
                      type="blue"
                      leftIcon={
                        <FEPersonFilled
                          size={14}
                          color={theme.colors["primary"][5]}
                        />
                      }
                    />
                  </Text>
                </Group>
              )}
            </Stack>
          </Stack>
        </Stack>

        <Button
          variant="light"
          onClick={() => {
            setIsAlertOpened(true);
          }}
          className="p-0 m-0 bg-white hover:bg-white z-10 absolute right-6 bottom-6"
        >
          <FETrashOutline color="#FF2C56" className="bg-white" size={23} />
        </Button>
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEFacultyAdminProposalApplicationHistoryCard;
