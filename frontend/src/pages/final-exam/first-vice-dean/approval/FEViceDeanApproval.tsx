import { Grid, Group, MantineProvider, Stack, Title } from "@mantine/core";
import React from "react";
import FEMainlayout from "src/layouts/final-exam/FEMainLayout";
import { FEROUTES } from "src/routes/final-exam.route";
import FEApprovalCard from "../../../../components/fe-components/FEApprovalCard";

export interface IFEViceDeanApproval {}

const FEViceDeanApproval: React.FC<IFEViceDeanApproval> = ({}) => {
  return (
    <FEMainlayout>
      <Title order={2} className="text-primary-text-500" mb={"md"}>
        Persetujuan
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
        <Stack>
          <Grid gutter={"xl"} className="mb-0">
            <Grid.Col span={6} xs={12} sm={12} md={6}>
              <FEApprovalCard
                label="SK Izin Ujian Sidang"
                description="Permohonan izin ujian sidang"
                to={FEROUTES.FIRST_VICE_DEAN_APPROVAL_TRIAL_PERMIT}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </MantineProvider>
    </FEMainlayout>
  );
};
export default FEViceDeanApproval;
