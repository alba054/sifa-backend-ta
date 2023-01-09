import { Grid, MantineProvider, Stack } from "@mantine/core";
import React from "react";
import useArray from "src/hooks/fe-hooks/useArray";
import FEFacultyAdminTrialPermitNotifyHistoryCard, {
  IFEFacultyAdminTrialPermitNotifyHistoryCard,
} from "./FEFacultyAdminTrialPermitNotifyHistoryCard";

export interface IFEFacultyAdminTrialPermitNotifyHistoryMain {
  trialPermitApplicationArray: Array<IFEFacultyAdminTrialPermitNotifyHistoryCard>;
  
  onDelete?: (e: number) => void;
}

const FEFacultyAdminTrialPermitNotifyHistoryMain: React.FC<
  IFEFacultyAdminTrialPermitNotifyHistoryMain
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
              application: IFEFacultyAdminTrialPermitNotifyHistoryCard,
              e: number
            ) => {
              return (
                <Grid.Col span={6} xs={12} sm={12} md={6}>
                  <FEFacultyAdminTrialPermitNotifyHistoryCard
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
export default FEFacultyAdminTrialPermitNotifyHistoryMain;
