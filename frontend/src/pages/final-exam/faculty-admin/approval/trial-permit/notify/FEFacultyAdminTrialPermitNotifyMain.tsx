import { Grid, MantineProvider, Stack } from "@mantine/core";
import React from "react";
import FEFacultyAdminTrialPermitNotifyCard, {
  IFEFacultyAdminTrialPermitNotifyCard,
} from "./FEFacultyAdminTrialPermitNotifyCard";

export interface IFEFacultyAdminTrialPermitNotifyMain {
  trialPermitApplicationArray: Array<IFEFacultyAdminTrialPermitNotifyCard>;
  deleteHandler: (e: number) => void;
}

const FEFacultyAdminTrialPermitNotifyMain: React.FC<
  IFEFacultyAdminTrialPermitNotifyMain
> = ({ trialPermitApplicationArray, deleteHandler }) => {
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
            (application: IFEFacultyAdminTrialPermitNotifyCard, e: number) => {
              return (
                <Grid.Col span={6} xs={12} sm={12} md={6}>
                  <FEFacultyAdminTrialPermitNotifyCard
                    key={e}
                    index={e}
                    {...application}
                    deleteHandler={deleteHandler}
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
export default FEFacultyAdminTrialPermitNotifyMain;
