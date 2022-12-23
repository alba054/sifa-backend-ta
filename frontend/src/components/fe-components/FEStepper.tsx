import { Stepper, useMantineTheme } from "@mantine/core";
import React from "react";

export interface IFEStepper {
  progressStages: Array<string>;
  currentProgress: number;
}

const FEStepper: React.FC<IFEStepper> = ({
  progressStages,
  currentProgress,
}) => {
  const theme = useMantineTheme();
  return (
    <Stepper
      active={currentProgress}
      breakpoint="sm"
      iconPosition="right"
      size="sm"
      styles={{
        steps: {
          display: "flex",
          alignItems: "center",
        },
        step: {
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 0,
          paddingBottom: 20,
          flexGrow: 1,
        },
        stepBody: {
          marginRight: 0,
          marginTop: 10,
          top: 30,
          position: "absolute",
        },
        separator: {
          margin: 0,
          marginTop: -15,
          marginRight: "-7%",
          marginLeft: "-7%",
        },
      }}
    >
      {progressStages.map((currDesc:string, e:number) => {
        return <Stepper.Step key={e} description={currDesc} />;
      })}
    </Stepper>
  );
};
export default FEStepper;
