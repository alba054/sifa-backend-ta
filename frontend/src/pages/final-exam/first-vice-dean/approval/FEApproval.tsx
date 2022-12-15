import { Group, Stack, Title } from "@mantine/core";
import React from "react";
import FEFirstViceDeanMainLayout from "src/layouts/final-exam/first-vice-dean/FEFirstViceDeanMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalCard from "./FEApprovalCard";

export interface IFEApproval {}

const FEApproval: React.FC<IFEApproval> = ({}) => {
  return (
    <FEFirstViceDeanMainLayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Persetujuan
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="SK Pembimbing dan Penguji"
          description="Skripsi dan Ujian Akhir"
          to={FEROUTES.FIRST_VICE_DEAN_APPROVAL_MENTOR_AND_EXAMINERS}
        />
        <FEApprovalCard
          label="SK Izin Ujian Sidang"
          description="Permohonan izin ujian sidang"
          to={FEROUTES.FIRST_VICE_DEAN_APPROVAL_TRIAL_PERMIT}
        />
      </Group>
    </FEFirstViceDeanMainLayout>
  );
};
export default FEApproval;
