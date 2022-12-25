import {
  Grid, MantineProvider, Stack
} from "@mantine/core";
import React from "react";
import FEHeadAdministratorTrialPermitApprovalApplicationCard, { IFEHeadAdministratorTrialPermitApprovalApplicationCard } from "./FEHeadAdministratorTrialPermitApprovalApplicationCard";

export interface IFEHeadAdministratorTrialPermitApprovalApplicationMain {
  trialPermitApplicationArray: Array<IFEHeadAdministratorTrialPermitApprovalApplicationCard>
}

const FEHeadAdministratorTrialPermitApprovalApplicationMain: React.FC<IFEHeadAdministratorTrialPermitApprovalApplicationMain> = ({ trialPermitApplicationArray }) => {  
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

          {trialPermitApplicationArray.map((application:IFEHeadAdministratorTrialPermitApprovalApplicationCard, e: number) => {
            return (
              <Grid.Col span={6} xs={12} sm={12} md={6}>
                <FEHeadAdministratorTrialPermitApprovalApplicationCard key={e} {...application} />
              </Grid.Col>
            );
          })}
      </Grid>
      </MantineProvider>
    </Stack>
  );
};
export default FEHeadAdministratorTrialPermitApprovalApplicationMain;
