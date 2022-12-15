import { AppShell, MediaQuery, Stack } from "@mantine/core";
import React from "react";
import { FECheckSquareOutlineForNavbar, HomeOutline } from "src/assets/Icons/Fluent";
import FEBreadCrumbs, {
  IFEBreadCrumbsItem
} from "src/components/fe-components/FEBreadCrumbs";
import FEMainNavbar, { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";

interface IMainLayoutProps {
  children: any;
  breadCrumbs?: Array<IFEBreadCrumbsItem>;
  breadCrumbsCurrentPage?: string
}

const menus: INavbarMenuItem[] = [
  {
    icon: HomeOutline,
    label: "Home",
    href: FEROUTES.FIRST_VICE_DEAN_HOMEPAGE,
  },
  {
    icon: FECheckSquareOutlineForNavbar,
    label: "Persetujuan",
    href: FEROUTES.FIRST_VICE_DEAN_APPROVAL,
  },
];

const FEFirstViceDeanMainLayout: React.FC<IMainLayoutProps> = ({
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
            <FEMainNavbar menus={menus} />
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
export default FEFirstViceDeanMainLayout;
