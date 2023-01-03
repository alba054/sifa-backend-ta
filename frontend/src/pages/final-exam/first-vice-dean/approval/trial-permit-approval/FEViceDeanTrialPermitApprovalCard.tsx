import { Group, Stack, Text, useMantineTheme } from "@mantine/core";
import React, { useEffect } from "react";
import { FEBookmarkSingleSearchOutline } from "src/assets/Icons/Fluent";
import FELinkMore from "src/components/fe-components/FELinkMore";
import FECard from "src/components/FECard";
import { FEROUTES } from "src/routes/final-exam.route";
import { FEStatus } from "src/utils/const/type";
import { approvalChip } from "src/components/fe-components/FERoundedChip";

export interface IFEViceDeanTrialPermitApprovalCard {
  name: string;
  nim: string;
  proposalTitle: string;
  laboratory: string;
  proposer?: string;
  TrialPermitApprovalStatus?: FEStatus;
  chip?: any;
  onClick?: () => void;
}

const FEViceDeanTrialPermitApprovalCard: React.FC<
  IFEViceDeanTrialPermitApprovalCard
> = ({
  name,
  nim,
  proposalTitle,
  laboratory,
  proposer,
  onClick,
  chip= approvalChip,
  TrialPermitApprovalStatus = "Belum_Diproses",
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
              <Text className="text-secondary-text-500 text-lg tracking-1 font-semibold">
                Lab. {laboratory}
              </Text>
            </Stack>
            <Stack className="gap-4">
              <Text className="font-bold text-xl text-primary-text-500">
                Status
              </Text>
              <Stack className="gap-2">
                <Group>
                  <Text className="text-secondary-text-500 text-lg font-semibold tracking-1">
                    SK Izin Ujian Sidang
                  </Text>
                  {chip[TrialPermitApprovalStatus || "Belum_Diproses"]}
                </Group>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <FELinkMore
          // color={theme.colors["secondary-text"][5]}
          color={theme.colors["primary"][7]}
          onClick={onClick}
        />
        <FEBookmarkSingleSearchOutline
          size={120}
          color={"#F1F1F3"}
          className="absolute right-6 bottom-6 z-[1]"
        />
      </Stack>
    </FECard>
  );
};
export default FEViceDeanTrialPermitApprovalCard;
