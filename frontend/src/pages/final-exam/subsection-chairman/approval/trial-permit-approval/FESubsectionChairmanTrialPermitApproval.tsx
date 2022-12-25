import { Group, Title } from "@mantine/core";
import React from "react";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalCard from "../../../../../components/fe-components/FEApprovalCard";

export interface IFESubsectionChairmanTrialPermitApproval {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL,
  },
];

const FESubsectionChairmanApproval: React.FC<
  IFESubsectionChairmanTrialPermitApproval
> = ({}) => {
  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage={"Izin Ujian Sidang"}
    >
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Izin Ujian Sidang
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Surat Permohonan"
          description="Kelengkapan berkas dan pembuatan surat"
          to={FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_TRIAL_PERMIT_APPLICATION}
        />
        <FEApprovalCard
          label="Status Surat Permohonan"
          description="Validasi dari Tata Usaha"
          to={FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL_TRIAL_PERMIT}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FESubsectionChairmanApproval;
