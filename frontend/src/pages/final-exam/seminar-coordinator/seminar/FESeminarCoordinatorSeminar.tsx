import { Group, Title } from "@mantine/core";
import React from "react";
import FEApprovalCard from "src/components/fe-components/FEApprovalCard";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";

export interface IFESeminarCoordinatorSeminar {}

const FESeminarCoordinatorSeminar: React.FC<
  IFESeminarCoordinatorSeminar
> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Penjadwalan dan Penilaian Seminar
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Jadwal Seminar"
          description="Daftar waktu pelaksanaan seminar mahasiswa"
          to={FEROUTES.SEMINAR_COORDINATOR_SEMINAR_SCHEDULING}
        />
        <FEApprovalCard
          label="Nilai Seminar"
          description="Daftar nilai seminar/ujian mahasiswa"
          to={FEROUTES.SEMINAR_COORDINATOR_SEMINAR_EVALUATION}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FESeminarCoordinatorSeminar;
