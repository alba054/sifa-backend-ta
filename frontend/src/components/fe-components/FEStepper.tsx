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
        // separator:{
        //   color: "black !important",
        //   backgroundColor: "black !import"
        // }
        root: {
          display: "flex",
          flexDirection: "column",
        },
        stepDescription: {
          display: "flex",
          marginTop: "12px !important",
          color: theme.colors["secondary"][9],
          fontWeight: 600,
          fontSize: "12px !important",
          letterSpacing: "0.004em",
          // position: "absolute",
          // backgroundColor: "red",
          textAlign: "center",
          // alignItems: "center",
          justifyContent: "center",
          width: "140px !important",
          height: "28px !important",
          // marginLeft: "-50px !important"
        },
        step: {
          display: "flex",
          flexDirection: "column",
          padding: 0,
          // alignItems: "center !important",
        },
        separator: {
          marginTop: "-42px !important",
          // position: "relative",
          height: "2px !important",
          // textAlign: "center",
          // left: "-7% !important",
          // right: "-5.5vw !important",
          marginLeft: "-5% !important",
          marginRight: "-5% !important",
          zIndex: -10,
        },
        stepIcon: {
          borderWidth: "2px !important",
          borderColor: theme.colors["primary"][5],
          color: theme.colors["primary"][5],
          // width: "40px !important",
          // backgroundColor: "red"
        },
      }}
    >
      {progressStages.map((currDesc) => {
        return <Stepper.Step description={currDesc} />;
      })}
    </Stepper>
  );
};
export default FEStepper;
