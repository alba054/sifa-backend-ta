import { Group, Title } from "@mantine/core";
import React from "react";
import FEApprovalCard from "src/components/fe-components/FEApprovalCard";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFEStudyProgramAdminProposal {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
  },
];

const FEStudyProgramAdminProposal: React.FC<
  IFEStudyProgramAdminProposal
> = ({}) => {
  return (
    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Judul Penelitian">
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Judul Penelitian
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Permohonan Judul Penelitian"
          description="Permohonan judul penelitian mahasiswa"
          to={FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL_APPLICATION}
        />
        <FEApprovalCard
          label="Pengajuan Judul Penelitian"
          description="Disposisi dokumen"
          to={FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_EXAMINERS_TEAM}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminProposal;
