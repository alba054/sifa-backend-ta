import { Group, Title } from "@mantine/core";
import React from "react";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalCard from "../../../../components/fe-components/FEApprovalCard";

export interface IFEHeadAdministratorApproval {}

const FEHeadAdministratorApproval: React.FC<IFEHeadAdministratorApproval> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Persetujuan
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="SK Pembimbing dan Penguji"
          description="Skripsi dan Ujian Akhir"
          to={FEROUTES.HEAD_ADMINISTRATOR_APPROVAL_MENTOR_AND_EXAMINERS}
        />
        <FEApprovalCard
          label="SK Izin Ujian Sidang"
          description="Validasi berkas dan Surat Permohonan"
          to={FEROUTES.HEAD_ADMINISTRATOR_APPROVAL_TRIAL_PERMIT}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FEHeadAdministratorApproval;
