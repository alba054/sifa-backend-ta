import {
  Grid, MantineProvider, Stack
} from "@mantine/core";
import React from "react";
import FEFacultyAdminTrialPermitVerifyCard, { IFEFacultyAdminTrialPermitVerifyCard } from "./FEFacultyAdminTrialPermitVerifyCard";

export interface IFEFacultyAdminTrialPermitVerifyMain {
  trialPermitApplicationArray: Array<IFEFacultyAdminTrialPermitVerifyCard>
}

const FEFacultyAdminTrialPermitVerifyMain: React.FC<IFEFacultyAdminTrialPermitVerifyMain> = ({ trialPermitApplicationArray }) => {  
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

          {trialPermitApplicationArray.map((application:IFEFacultyAdminTrialPermitVerifyCard, e: number) => {
            return (
              <Grid.Col span={6} xs={12} sm={12} md={6}>
                <FEFacultyAdminTrialPermitVerifyCard key={e} {...application} />
              </Grid.Col>
            );
          })}
      </Grid>
      </MantineProvider>
    </Stack>
  );
};
export default FEFacultyAdminTrialPermitVerifyMain;
