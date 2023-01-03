import { Group, Title } from "@mantine/core";
import React from "react";
import FEApprovalCard from "src/components/fe-components/FEApprovalCard";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFEFacultyAdminProposal {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
];

const FEFacultyAdminProposal: React.FC<IFEFacultyAdminProposal> = ({}) => {
  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="SK Pembimbing dan Penguji"
    >
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        SK Pembimbing dan Penguji
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Persetujuan Permohonan Judul"
          description="Verifikasi dan validasi berkas"
          to={FEROUTES.FACULTY_ADMIN_APPROVAL_MENTOR_AND_EXAMINERS_APPLICATION}
        />
        <FEApprovalCard
          label="Pembuatan SK"
          description="Pembuatan SK Pembimbing dan Penguji"
          to={FEROUTES.FACULTY_ADMIN_APPROVAL}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FEFacultyAdminProposal;
