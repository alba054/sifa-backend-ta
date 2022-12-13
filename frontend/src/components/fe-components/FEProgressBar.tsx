import { Group, Stack, useMantineTheme, Text } from "@mantine/core";
import React from "react";
import { FECalendarOutline, FEPenCircleOutline } from "src/assets/Icons/Fluent";
import FEStepper from "./FEStepper";

export interface IFEProgressBar {
  progressStages: Array<string>;
  currentProgress: number;
  proposalDate: string;
}

const FEProgressBar: React.FC<IFEProgressBar> = ({
  progressStages,
  currentProgress,
  proposalDate
}) => {
  const theme = useMantineTheme();

  const currStages= progressStages[currentProgress]

  return (
    <Stack className="py-7 px-8 border-[1px] border-secondary-500 box-border rounded-xl drop-[0_1px_4px_rgba(0,0,0,0.12)] shadow-md">
      <Group className="justify-between mb-3">
        <Group spacing={"xs"}>
          <FEPenCircleOutline
            size={18}
            color={theme.colors["primary-text"][5]}
            className="inline"
          />
          <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
            Progress saat ini:
            <Text className="inline font-normal ml-1">{currStages}</Text>
          </Text>
        </Group>
        <Group spacing={"xs"}>
          <FECalendarOutline
            size={18}
            color={theme.colors["primary-text"][5]}
            className="inline"
          />
          <Text className="font-bold text-primary-text-500 tracking-[0.0015em]">
            Tanggal pengusulan:
            <Text className="inline font-normal ml-1">{proposalDate}</Text>
          </Text>
        </Group>
      </Group>
      <FEStepper
        progressStages={progressStages}
        currentProgress={currentProgress}
      />
    </Stack>
  );
};
export default FEProgressBar;
