import { Group, Title } from "@mantine/core";
import React from "react";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalCard from "../../../../components/fe-components/FEApprovalCard";

export interface IFEApproval {}

const FEApproval: React.FC<IFEApproval> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Persetujuan
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="SK Pembimbing dan Penguji"
          description="Skripsi dan Ujian Akhir"
          to={FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_MENTOR_AND_EXAMINERS}
        />
        <FEApprovalCard
          label="SK Izin Ujian Sidang"
          description="Permohonan izin ujian sidang"
          to={FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_TRIAL_PERMIT}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FEApproval;
