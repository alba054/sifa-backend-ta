import React from "react";
import { AppShell, MediaQuery, Stack, Text } from "@mantine/core";
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
      <Stack className={`mx-10 my-12`}>{children}</Stack>
    </AppShell>
  );
};
export default FEMainLayout;
