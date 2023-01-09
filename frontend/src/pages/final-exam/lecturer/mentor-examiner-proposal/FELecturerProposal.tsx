import { Group, Title } from "@mantine/core";
import React from "react";
import FEApprovalCard from "src/components/fe-components/FEApprovalCard";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFELecturerProposal {}

const FELecturerProposal: React.FC<
  IFELecturerProposal
> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Usulan Pembimbing dan Penguji
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Usulan Pembimbing"
          description="Terima / Tolak Usulan Sebagai Pembimbing Tugas Akhir Mahasiswa"
          to={FEROUTES.LECTURER_HOMEPAGE_MENTOR_PROPOSAL}
        />
        <FEApprovalCard
          label="Usulan Penguji"
          description="Terima / Tolak Usulan Sebagai Penguji Tugas Akhir Mahasiswa"
          to={FEROUTES.LECTURER_HOMEPAGE_EXAMINER_PROPOSAL}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FELecturerProposal;
