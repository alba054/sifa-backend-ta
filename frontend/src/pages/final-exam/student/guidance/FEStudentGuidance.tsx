import { Stack, Title } from "@mantine/core";
import React from "react";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";

export interface IFEStudentGuidance {}

const FEStudentGuidance: React.FC<IFEStudentGuidance> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} mb={"md"}>
        Bimbingan Tugas Akhir
      </Title>
      <Stack className="border rounded-xl border-secondary-500">
          konten di sini
      </Stack>

    </FEMainlayout>
  );
};
export default FEStudentGuidance;
