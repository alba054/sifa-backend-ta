import { Group, Title } from "@mantine/core";
import React from "react";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalCard from "../../../../../components/fe-components/FEApprovalCard";

export interface IFEFacultyAdminTrialPermit {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.FACULTY_ADMIN_APPROVAL,
  },
];

const FEFacultyAdminTrialPermit: React.FC<
  IFEFacultyAdminTrialPermit
> = ({}) => {
  return (
    <FEMainlayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Permohonan Izin Ujian Sidang"
    >
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Permohonan Izin Ujian Sidang
      </Title>
      <Group spacing={"xl"} grow>
        <FEApprovalCard
          label="Verifikasi Berkas"
          description="Berkas persyaratan izin ujian sidang"
          to={FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT_VERIFICATION}
        />
        <FEApprovalCard
          label="Notifikasi Surat Permohonan"
          description="Notifikasi ke mahasiswa"
          to={FEROUTES.FACULTY_ADMIN_APPROVAL_TRIAL_PERMIT_NOTIFICATION}
        />
      </Group>
    </FEMainlayout>
  );
};
export default FEFacultyAdminTrialPermit;
