import { AppShell, Burger, Group, MediaQuery, Stack } from "@mantine/core";
import React, { useState } from "react";
import FEMainNavbar from "./navbars/FEMainNavbar";

interface IMainLayoutProps {
  children: any;
}

const FEMainLayout: React.FC<IMainLayoutProps> = ({ children }) => {
  return (
    <AppShell
      padding={0}
      fixed
      navbarOffsetBreakpoint={"xs"}
      navbar={
        <>
          <MediaQuery styles={{ display: "none" }}>
            <FEMainNavbar />
          </MediaQuery>
        </>
      }
    >
      <Group className={`bg-black`}>{children}</Group>
    </AppShell>
  );
};
export default FEMainLayout;
