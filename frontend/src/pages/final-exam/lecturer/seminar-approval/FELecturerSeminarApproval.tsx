import { Group, Title } from "@mantine/core";
import React from "react";
import FEApprovalCard from "src/components/fe-components/FEApprovalCard";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFELecturerSeminarApproval {}

const FELecturerSeminarApproval: React.FC<
  IFELecturerSeminarApproval
> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Usulan Pembimbing dan Penguji
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Persetujuan Pembimbing"
          description="Daftar Seminar yang Memerlukan Persetujuan Pembimbing"
          to={FEROUTES.LECTURER_HOMEPAGE_APPROVAL_MENTOR}
        />
        <FEApprovalCard
          label="Persetujuan Waktu Seminar"
          description="Daftar Persetujuan Waktu Pelaksanaan Seminar"
          to={FEROUTES.LECTURER_HOMEPAGE_APPROVAL_SEMINAR_TIME}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FELecturerSeminarApproval;
