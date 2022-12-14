import { Grid, Group, MantineProvider, Stack, Title } from "@mantine/core";
import React from "react";
import { IFEBreadCrumbsItem } from "src/components/fe-components/FEBreadCrumbs";
import FEFirstViceDeanMainLayout from "src/layouts/final-exam/first-vice-dean/FEFirstViceDeanMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEMentorAndExaminersApprovalMoreCard from "./FEMentorAndExaminersApprovalMoreCard";

export interface IFEMentorAndExaminersApprovalMore {}

const breadCrumbs: Array<IFEBreadCrumbsItem> = [
  {
    title: "Persetujuan",
    href: FEROUTES.APPROVAL,
  },
  {
    title: "SK Pembimbing dan Penguji",
    href: FEROUTES.APPROVAL_MENTOR_AND_EXAMINERS,
  },
];

const FEMentorAndExaminersApprovalMore: React.FC<
  IFEMentorAndExaminersApprovalMore
> = ({}) => {
  return (
    <FEFirstViceDeanMainLayout
      breadCrumbs={breadCrumbs}
      breadCrumbsCurrentPage="Devi Selfira (N011181001)"
    >
      <Title order={2} mb={"md"}>
        Devi Selfira (N011181001)
      </Title>
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            sm: 1000,
            md: 1050,
            lg: 1124,
            xl: 1280,
            "2xl": 1536,
          } as any,
        }}
        inherit
      >
        <Grid gutter={"xl"}>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FEMentorAndExaminersApprovalMoreCard
              SKType="mentor"
              title="SK Pembimbing"
              lab="Lab. Farmakologi Toksikologi"
              status="process"
              tanggalPermohonan="12 November 2022"
              passedTime="4 menit yang lalu"
            />
          </Grid.Col>
          <Grid.Col span={6} xs={12} sm={12} md={6}>
            <FEMentorAndExaminersApprovalMoreCard
              SKType="examiner"
              title="SK Penguji"
              lab="Lab. Farmakologi Toksikologi"
              status="process"
              tanggalPermohonan="12 November 2022"
              passedTime="4 menit yang lalu"
            />
          </Grid.Col>
        </Grid>
      </MantineProvider>
    </FEFirstViceDeanMainLayout>
  );
};
export default FEMentorAndExaminersApprovalMore;
