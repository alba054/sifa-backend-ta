import { Stack, Group, Stepper, Text, useMantineTheme } from "@mantine/core";
import React from "react";

export interface IFEProgressBar {
  progressStages?: Array<string>;
  currentProgress?: number;
  date?: string;
}

const FEProgressBar: React.FC<IFEProgressBar> = ({}) => {
  const theme = useMantineTheme();
  return (
    <Stepper
      active={2}
      breakpoint="sm"
      iconPosition="right"
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
          marginTop: "13px !important",
          color: theme.colors["secondary"][9],
          fontWeight: 600,
          fontSize: "14px !important",
          letterSpacing: "0.004em",
          // position: "absolute",
          // backgroundColor: "red",
          textAlign: "center",
          // alignItems: "center",
          justifyContent: "center",
          width: "120px !important",
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
          marginLeft: "-4% !important",
          marginRight: "-4% !important",
          zIndex: -10,
        },
        stepIcon: {
          borderWidth: "3px !important",
          borderColor: theme.colors["primary"][5],
          color: theme.colors["primary"][5],
          // width: "40px !important",
          // backgroundColor: "red"
        },
      }}
    >
      <Stepper.Step description="Pengusulan Judul" />
      <Stepper.Step description="Judul Diterima" />
      <Stepper.Step description="Verifikasi Dokumen" />
      <Stepper.Step description="Penyusunan Tim Seminar " />
      <Stepper.Step description="Penandatangan SK" />
      <Stepper.Step description="SK Diterima" />
    </Stepper>
  );
};
export default FEProgressBar;
