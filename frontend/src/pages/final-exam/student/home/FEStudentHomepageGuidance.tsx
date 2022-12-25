import { Button, Group, Stack, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import FEGuidanceChatterCard from "src/components/fe-components/FEGuidanceChatterCard";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFEStudentHomepageGuidance {
  isMentored?: boolean;
}

const FEStudentHomepageGuidance: React.FC<IFEStudentHomepageGuidance> = ({
  isMentored = false,
}) => {
  return (
    <Stack className="gap-0">
      {isMentored ? (
        <>
          <Group className="justify-between" mb={"md"}>
            <Text className="text-[22px] text-primary-text-500 font-semibold">
              Status Pembimbing
            </Text>
            <Button
              variant="light"
              className="bg-primary-500/[0.1] text-primary-500 hover:bg-primary-500/[0.1]"
              component={Link}
              to={FEROUTES.STUDENT_GUIDANCE}
            >
              Bimbingan Sekarang
            </Button>
          </Group>
          <Group className="gap-8">
            <FEGuidanceChatterCard mentorId={1} role={"Pembimbing Utama"} />
            <FEGuidanceChatterCard mentorId={2} role={"Pembimbing Kedua"} />
          </Group>
        </>
      ) : null}
    </Stack>
  );
};
export default FEStudentHomepageGuidance;
