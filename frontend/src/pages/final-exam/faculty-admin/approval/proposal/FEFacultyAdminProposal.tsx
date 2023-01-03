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
    <FEMainlayout breadCrumbs={breadCrumbs} breadCrumbsCurrentPage="Tugas Akhir">
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Tugas Akhir
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Permohonan Tugas Akhir"
          description="Permohonan judul tugas akhir mahasiswa"
          to={FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL_APPLICATION}
        />
        <FEApprovalCard
          label="Pengajuan Tugas Akhir"
          description="Pengajuan ke kepala laboratorium"
          to={FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL_PROPOSAL_SUBMISSION}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FEStudyProgramAdminProposal;
