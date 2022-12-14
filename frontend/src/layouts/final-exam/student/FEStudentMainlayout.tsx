import React from "react";
import { AppShell, MediaQuery, Stack } from "@mantine/core";
import FEMainNavbar from "src/components/fe-components/navbars/FEMainNavbar.component";
import FEBreadCrumbs, {
  IFEBreadCrumbsItem,
} from "src/components/fe-components/FEBreadCrumbs";
import { FEROUTES } from "src/routes/final-exam.route";

interface IMainLayoutProps {
  children: any;
  breadCrumbs?: Array<IFEBreadCrumbsItem>;
  breadCrumbsCurrentPage?: string
}

const FEStudentMainlayout: React.FC<IMainLayoutProps> = ({
  children,
  breadCrumbs,
  breadCrumbsCurrentPage
}) => {
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
      <Stack className={`transition-all duration-150 mx-10 my-12`}>
        {typeof breadCrumbs !== "undefined" ? (
          <FEBreadCrumbs items={breadCrumbs} current={typeof breadCrumbsCurrentPage === "undefined"? "Riwayat Tugas Akhir" : breadCrumbsCurrentPage} />
        ) : null}
        {children}
      </Stack>
    </AppShell>
  );
};
export default FEStudentMainlayout;
