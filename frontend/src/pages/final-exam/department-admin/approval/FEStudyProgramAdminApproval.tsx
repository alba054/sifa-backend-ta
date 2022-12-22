import { Group, Title } from "@mantine/core";
import React from "react";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalCard from "../../../../components/fe-components/FEApprovalCard";

export interface IFEStudyProgramAdminApproval {}

const FEStudyProgramAdminApproval: React.FC<IFEStudyProgramAdminApproval> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Persetujuan
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Judul Penelitian"
          description="Permohonan dan pengajuan judul penelitian"
          to={FEROUTES.STUDY_PROGRAM_ADMIN_PROPOSAL_SUBMISSION}
        />
        <FEApprovalCard
          label="Tim Penguji"
          description="Penyusunan Tim Penguji"
          to={FEROUTES.STUDY_PROGRAM_ADMIN_EXAMINERS_TEAM}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminApproval;
