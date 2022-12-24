import { Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";
import { FEBookmarkSingleSearchOutline } from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FECard from "src/components/FECard";
import { FEROUTES } from "src/routes/final-exam.route";
import { approvalChip } from "src/components/fe-components/FERoundedChip";
import { FEStatus } from "src/utils/const/type";

export interface IFEStudyProgramAdminApprovalExaminersFramingCard {
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  proposedFirstExaminers?: IFEStudyProgramAdminApprovalExaminersFramingCardExaminer,
  proposedSecondExaminers?: IFEStudyProgramAdminApprovalExaminersFramingCardExaminer
  onClick?: () => void;
}

export interface IFEStudyProgramAdminApprovalExaminersFramingCardExaminer {
  name: string;
  approvalStatus: FEStatus,
  // role: "first examiners" | "second examiners"
}

const FEStudyProgramAdminApprovalExaminersFramingCard: React.FC<
  IFEStudyProgramAdminApprovalExaminersFramingCard
> = ({ name, nim, proposalTitle, laboratory, onClick }) => {
  const theme = useMantineTheme();

  return (
    <FECard bg="bg-primary-500" leftBorderRadius="xl">
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

            <Stack className="gap-4">
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Penguji Pertama
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  Prof. Dr. M.Natsir Djide, M.S.
                </Text>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Penguji Kedua
                </Text>
                <Text className="text-secondary-text-500 text-lg tracking-1">
                  Drs. Kus Haryono, MS.
                </Text>
              </Stack>
            </Stack>
          </Stack>
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
export default FEStudyProgramAdminApprovalExaminersFramingCard;
