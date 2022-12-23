import { Button, Group, Stack, Text } from "@mantine/core";
import React from "react";
import FEGuidanceChatterCard from "src/components/fe-components/FEGuidanceChatterCard";

export interface IFEStudentHomepageGuidance {}

const FEStudentHomepageGuidance: React.FC<
  IFEStudentHomepageGuidance
> = ({}) => {
  return (
    <Stack >
      <Stack className="gap-0">
        <Group className="justify-between" mb={"md"}>
          <Text className="text-[22px] text-primary-text-500 font-semibold">
            Status Pembimbing
          </Text>
          <Button
          variant="light"
          className="bg-primary-500/[0.1] text-primary-500 hover:bg-primary-500/[0.1]"
          >
              Bimbingan Sekarang
          </Button>
        </Group>
        <Group className="gap-8">
          <FEGuidanceChatterCard />
          <FEGuidanceChatterCard />
        </Group>
      </Stack>
    </Stack>
  );
};
export default FEStudentHomepageGuidance;
