import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import {
  FEBookmarkSingleSearchOutline,
  FEPenOutline,
  FEPersonFilled,
  FETrashOutline,
} from "src/assets/Icons/Fluent";
import { IProposal } from "src/components/fe-components/FEApprovalDetailsCard";
import FERoundedChip from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import { statusChip } from "src/components/fe-components/FERoundedChip";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import { FEStatus } from "src/utils/const/type";

export interface IFEStudyProgramAdminProposalApplicationHistoryMainCard {
  index?: number;
  name: string;
  nim: string;
  status: FEStatus;
  acceptedProposal?: IProposal;
  refusedProposal?: Array<IProposal>;
  handleDelete?: ((e:number)=>void)
}

const FEStudyProgramAdminProposalApplicationHistoryMainCard: React.FC<
  IFEStudyProgramAdminProposalApplicationHistoryMainCard
> = ({ index, name, nim, status, acceptedProposal={}, refusedProposal = [], handleDelete}) => {
  const theme = useMantineTheme();

  const [isAlertOpened, setIsAlertOpened] = useState(false);

  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <FEAlertModal
        title="Hapus Riwayat Persetujuan?"
        description={`Data riwayat persetujuan ${name} yang telah dihapus tidak dapat dikembalikan.`}
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        onSubmit={()=>{
          handleDelete!(index!)
          setIsAlertOpened(false)
        }}
      />
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="gap-1 mb-4 z-10">
          <Group className="justify-between">
            <Group>
              <Text className="text-2xl font-bold text-primary-text-500 mb-2">
                {name} ({nim})
              </Text>
              {status === "Diterima" ? (
                <FERoundedChip
                  label={acceptedProposal!.proposer || `Mahasiswa (${name})`}
                  type="blue"
                  leftIcon={
                    <FEPersonFilled
                      size={14}
                      color={theme.colors["primary"][5]}
                    />
                  }
                />
              ) : null}
            </Group>

            <Text className="text-secondary-text-500">14 November 2022</Text>
          </Group>
          {status === "Diterima" ? (
            <Stack className="gap-0">
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                {acceptedProposal!.proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1">
                Lab. {acceptedProposal!.laboratory}
              </Text>
            </Stack>
          ) : (
            <Stack className="gap-4">
              <Stack className="gap-0">
                <Text className="font-bold text-xl text-primary-text-500">
                  Judul Pertama
                </Text>
                <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                  {refusedProposal[0].proposalTitle}
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  Lab. {refusedProposal[0].laboratory}
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-bold text-xl text-primary-text-500">
                  Judul Kedua
                </Text>
                {refusedProposal.length >= 2 ? (
                  <>
                    <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                      {refusedProposal[1].proposalTitle}
                    </Text>
                    <Text className="text-secondary-text-500 text-lg tracking-1">
                      Lab. {refusedProposal[1].laboratory}
                    </Text>
                  </>
                ) : (
                  <Text className="text-secondary-text-500 text-lg tracking-1">
                    Tidak Mengajukan Judul
                  </Text>
                )}
              </Stack>
            </Stack>
          )}
        </Stack>
        <Group className="justify-between">
          {statusChip[status]}
          <Group>
            <Button
              variant="light"
              // onClick={handleEditProposalClick}
              // disabled={status !== "Belum_Diproses"}
              className={"p-0 m-0 bg-white hover:bg-white z-10"}
            >
              <FEPenOutline
                color={theme.colors["primary"][5]}
                className="bg-white"
                size={23}
              />
            </Button>
            <Button
              variant="light"
              onClick={()=>{setIsAlertOpened(true)}}
              className="p-0 m-0 bg-white hover:bg-white z-10"
            >
              <FETrashOutline color="#FF2C56" className="bg-white" size={23} />
            </Button>
          </Group>
        </Group>
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEStudyProgramAdminProposalApplicationHistoryMainCard;
