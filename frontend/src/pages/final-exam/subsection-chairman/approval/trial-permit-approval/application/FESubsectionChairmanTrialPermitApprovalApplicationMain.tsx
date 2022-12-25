import {
  Grid, MantineProvider, Stack
} from "@mantine/core";
import React from "react";
import FESubsectionChairmanTrialPermitApprovalApplicationCard, { IFESubsectionChairmanTrialPermitApprovalApplicationCard } from "./FESubsectionChairmanTrialPermitApprovalApplicationCard";

export interface IFESubsectionChairmanTrialPermitApprovalApplicationMain {
  trialPermitApplicationArray: Array<IFESubsectionChairmanTrialPermitApprovalApplicationCard>
}

const FESubsectionChairmanTrialPermitApprovalApplicationMain: React.FC<IFESubsectionChairmanTrialPermitApprovalApplicationMain> = ({ trialPermitApplicationArray }) => {  
  return (
    <Stack spacing="md">
      <MantineProvider
        withCSSVariables
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            sm: 800,
            md: 1000,
            lg: 1024,
            xl: 1280,
            "2xl": 1536,
          } as any,
        }}
        inherit
      >
      <Grid className="mt-0" gutter={"xl"}>

          {trialPermitApplicationArray.map((application:IFESubsectionChairmanTrialPermitApprovalApplicationCard, e: number) => {
            return (
              <Grid.Col span={6} xs={12} sm={12} md={6}>
                <FESubsectionChairmanTrialPermitApprovalApplicationCard key={e} {...application} />
              </Grid.Col>
            );
          })}
      </Grid>
      </MantineProvider>
    </Stack>
  );
};
export default FESubsectionChairmanTrialPermitApprovalApplicationMain;
