import { Grid, MantineProvider, Stack } from "@mantine/core";
import React from "react";
import useArray from "src/hooks/fe-hooks/useArray";
import FEFacultyAdminTrialPermitVerifyHistoryCard, {
  IFEFacultyAdminTrialPermitVerifyHistoryCard,
} from "./FEFacultyAdminTrialPermitVerifyHistoryCard";

export interface IFEFacultyAdminTrialPermitVerifyHistoryMain {
  trialPermitApplicationArray: Array<IFEFacultyAdminTrialPermitVerifyHistoryCard>;
  
  onDelete?: (e: number) => void;
}

const FEFacultyAdminTrialPermitVerifyHistoryMain: React.FC<
  IFEFacultyAdminTrialPermitVerifyHistoryMain
> = ({ trialPermitApplicationArray,  onDelete }) => {

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
          {trialPermitApplicationArray.map(
            (
              application: IFEFacultyAdminTrialPermitVerifyHistoryCard,
              e: number
            ) => {
              return (
                <Grid.Col span={6} xs={12} sm={12} md={6}>
                  <FEFacultyAdminTrialPermitVerifyHistoryCard
                    key={e}
                    index={e}
                    {...application}
                    onDelete={(e: number) => {
                      onDelete!(e);
                    }}
                  />
                </Grid.Col>
              );
            }
          )}
        </Grid>
      </MantineProvider>
    </Stack>
  );
};
export default FEFacultyAdminTrialPermitVerifyHistoryMain;
