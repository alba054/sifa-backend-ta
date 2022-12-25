import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useState } from "react";
import { FEBookmarkSingleSearchOutline, FETrashOutline } from "src/assets/Icons/Fluent";
import FEAlertModal from "src/components/fe-components/FEAlertModal";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FECard from "src/components/FECard";
import { FEStatus } from "src/utils/const/type";
import FEStudyProgramAdminApprovalExaminersFramingHistoryModal from "./FEStudyProgramAdminApprovalExaminersFramingHistoryModal";

export interface IFEStudyProgramAdminApprovalExaminersFramingHistoryCard {
  index?: number;
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  laboratoryChairman: string;
  mainMentor: string;
  sideMentor: string;
  proposedFirstExaminers?: IFEStudyProgramAdminApprovalExaminersFramingHistoryCardExaminer;
  proposedSecondExaminers?: IFEStudyProgramAdminApprovalExaminersFramingHistoryCardExaminer;
  onDelete?: (e: number) => void;
}

interface IFEStudyProgramAdminApprovalExaminersFramingHistoryCardExaminer {
  name: string;
  approvalStatus: FEStatus;
}

const FEStudyProgramAdminApprovalExaminersFramingHistoryCard: React.FC<
  IFEStudyProgramAdminApprovalExaminersFramingHistoryCard
> = ({
  index,
  name,
  nim,
  proposalTitle,
  laboratory,
  laboratoryChairman,
  onDelete,
  proposedFirstExaminers,
  proposedSecondExaminers,
  mainMentor,
  sideMentor,
}) => {
  const theme = useMantineTheme();
  const [isOpened, setIsOpened] = useState(false);
  const [isAlertOpened, setIsAlertOpened] = useState(false)

  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
      <FEStudyProgramAdminApprovalExaminersFramingHistoryModal
        laboratory={laboratory}
        laboratoryChairman={laboratoryChairman}
        mainMentor={mainMentor}
        name={name}
        nim={nim}
        proposalTitle={proposalTitle}
        proposedFirstExaminers={proposedFirstExaminers!}
        proposedSecondExaminers={proposedSecondExaminers!}
        sideMentor={sideMentor}
        opened={isOpened}
        setOpened={setIsOpened}
      />
      
      <FEAlertModal
        title="Hapus Riwayat Penyusunan?"
        description={`Data riwayat penyusunan tim penguji dari ${name} yang telah dihapus tidak dapat dikembalikan.`}
        opened={isAlertOpened}
        setOpened={setIsAlertOpened}
        onSubmit={()=>{
          onDelete!(index!)
          setIsAlertOpened(false)
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
              <Text className="text-secondary-text-500 text-lg tracking-1">
                Lab. {laboratory}
              </Text>
            </Stack>
          </Stack>
        </Stack>
          <Group className="justify-between">
            <div className="self-end">
              <FELinkMore onClick={()=>{setIsOpened(true)}} />
            </div>
            <Button
              variant="light"
              onClick={()=>{setIsAlertOpened(true)}}
              className="p-0 m-0 bg-white hover:bg-white z-10"
            >
              <FETrashOutline color="#FF2C56" className="bg-white" size={23} />
            </Button>
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
export default FEStudyProgramAdminApprovalExaminersFramingHistoryCard;
