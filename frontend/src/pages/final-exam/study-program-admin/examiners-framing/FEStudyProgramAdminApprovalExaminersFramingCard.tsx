import { Button, Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React from "react";
import { FEBookmarkSingleSearchOutline } from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import {
  approvalChip
} from "src/components/fe-components/FERoundedChip";
import FECard from "src/components/FECard";
import { FEStatus } from "src/utils/const/type";

export interface IFEStudyProgramAdminApprovalExaminersFramingCard {
  index?: number;
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  laboratoryChairman: string;
  mainMentor: string;
  sideMentor: string;
  proposedFirstExaminers?: IFEStudyProgramAdminApprovalExaminersFramingCardExaminer;
  proposedSecondExaminers?: IFEStudyProgramAdminApprovalExaminersFramingCardExaminer;
  onDelete?: (e: number) => void;
}

export interface IFEStudyProgramAdminApprovalExaminersFramingCardExaminer {
  name: string;
  approvalStatus: FEStatus;
  // role: "first examiners" | "second examiners"
}

const FEStudyProgramAdminApprovalExaminersFramingCard: React.FC<
  IFEStudyProgramAdminApprovalExaminersFramingCard
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
                <Group>
                  <Text className="text-secondary-text-500 text-lg tracking-1">
                    {proposedFirstExaminers == null
                      ? "Belum Diusulkan"
                      : proposedFirstExaminers.name}
                  </Text>

                  {proposedFirstExaminers == null
                    ? null
                    : approvalChip[proposedFirstExaminers.approvalStatus]}
                </Group>
              </Stack>
              <Stack className="gap-0">
                <Text className="font-bold text-lg text-primary-text-500">
                  Penguji Kedua
                </Text>

                <Group>
                  <Text className="text-secondary-text-500 text-lg tracking-1">
                    {proposedSecondExaminers == null
                      ? "Belum Diusulkan"
                      : proposedSecondExaminers.name}
                  </Text>
                  {proposedSecondExaminers == null
                    ? null
                    : approvalChip[proposedSecondExaminers.approvalStatus]}
                </Group>
              </Stack>
            </Stack>
            <Group className="justify-between">
              <div className="self-end">
                <FELinkMore to={nim} />
              </div>
              {proposedFirstExaminers != null &&
              proposedSecondExaminers != null &&
              proposedFirstExaminers.approvalStatus === "accepted" &&
              proposedSecondExaminers.approvalStatus === "accepted" ? (
                <Button
                  variant="light"
                  className="bg-primary-500 text-white hover:bg-primary-500 px-10"
                  onClick={() => {
                    onDelete!(index!);
                  }}
                >
                  Selesai
                </Button>
              ) : null}
            </Group>
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
