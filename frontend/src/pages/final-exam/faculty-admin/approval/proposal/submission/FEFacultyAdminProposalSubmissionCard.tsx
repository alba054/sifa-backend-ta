import { Button, Group, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { FEBookmarkSingleSearchOutline } from "src/assets/Icons/Fluent";
import FECard from "src/components/FECard";
import FEStudyProgramAdminProposalSubmissionCardModal from "./FEStudyProgramAdminProposalSubmissionCardModal";

export interface IFEStudyProgramAdminProposalSubmissionCard {
  index?: number;
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  proposer: string;
  entryDate: string,
  completionDate: string,
  onClick?: ((e:number)=>void)
}

const FEStudyProgramAdminProposalSubmissionCard: React.FC<
  IFEStudyProgramAdminProposalSubmissionCard
> = ({ index=-1, name, nim, proposalTitle, laboratory, proposer, entryDate, completionDate, onClick=(()=>{}) }) => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <FEStudyProgramAdminProposalSubmissionCardModal
        index={index}
        name={name}
        nim={nim}
        proposalTitle={proposalTitle}
        laboratory={laboratory}
        proposer={proposer}
        opened={isModalOpened}
        setOpened={setIsModalOpened}
        onSubmit={onClick}
        entryDate={entryDate}
        completionDate={completionDate}
      />
      <Stack className="bg-white px-8 py-6 justify-between relative border rounded-r-xl border-secondary-500">
        <Stack className="gap-4 z-10">
          <Text className="text-2xl font-bold text-primary-text-500">
            {name} ({nim})
          </Text>
          <Stack className="gap-2 mb-2">
            <Stack className="gap-0">
              <Text className="text-[18px] font-semibold text-primary-500 tracking-1 mb-1">
                {proposalTitle}
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1">
                Lab. {laboratory}
              </Text>
            </Stack>

            <Stack className="gap-0">
              <Text className="font-bold text-lg text-primary-text-500">
                Asal Usulan
              </Text>
              <Text className="text-secondary-text-500 text-lg tracking-1">
                {proposer}
              </Text>
            </Stack>
          </Stack>
          <Group>
            <Button
              variant="light"
              className="bg-primary-500/[0.1] text-primary-500 hover:bg-primary-500/[0.1] py-[10px]"
            >
              Lihat Dokumen
            </Button>
            <Button
              variant="light"
              className="bg-primary-500 text-white hover:bg-primary-500 py-[10px]"
              onClick={()=>{
                setIsModalOpened(true)
              }}
            >
              Buat Permohonan
            </Button>
          </Group>
        </Stack>
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEStudyProgramAdminProposalSubmissionCard;
