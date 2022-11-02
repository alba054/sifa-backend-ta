import React from "react";
import { AppShell, MediaQuery, Stack } from "@mantine/core";
import FEMainNavbar from "src/components/fe-components/navbars/FEMainNavbar.component";

interface IMainLayoutProps {
  children: any;
}

const FEStudentMainlayout: React.FC<IMainLayoutProps> = ({ children }) => {
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
export default FEStudentMainlayout;
