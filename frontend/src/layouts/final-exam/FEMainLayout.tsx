import { AppShell, MediaQuery, Stack } from "@mantine/core";
import React, { useContext } from "react";
import FEBreadCrumbs, {
  IFEBreadCrumbsItem,
} from "src/components/fe-components/FEBreadCrumbs";
import { UserRoleContext } from "src/components/fe-components/FERoleContext";
import FEMainNavbar, {
  INavbarMenuItem,
} from "src/components/fe-components/navbars/FEMainNavbar.component";
import { firstViceDeanMenus } from "./final-exam-const.tsx/first-vice-dean.const";
import { headAdministratorMenus } from "./final-exam-const.tsx/head-administrator";
import { studentMenus } from "./final-exam-const.tsx/student-role.const";
import { studyProgramAdminMenus } from "./final-exam-const.tsx/study-program-admin.const";
import { subsectionChairmanMenus } from "./final-exam-const.tsx/subsection-chairman.const";

interface IMainLayoutProps {
  children: any;
  breadCrumbs?: Array<IFEBreadCrumbsItem>;
  breadCrumbsCurrentPage?: string;
}

const switchMenus: { [role: string | number]: INavbarMenuItem[] } = {
  0: studentMenus,
  1: firstViceDeanMenus,
  2: studyProgramAdminMenus,
  3: subsectionChairmanMenus,
  4: headAdministratorMenus,
  student: studentMenus,
  "first-vice-dean": firstViceDeanMenus,
  "study-program-admin": studyProgramAdminMenus,
  "subsection-chairman": subsectionChairmanMenus,
  "head-administrator": headAdministratorMenus,
};

const FEMainlayout: React.FC<IMainLayoutProps> = ({
  children,
  breadCrumbs,
  breadCrumbsCurrentPage,
}) => {
  const role = useContext(UserRoleContext);
  return (
    <AppShell
      padding={0}
      fixed
      navbarOffsetBreakpoint={"xs"}
      navbar={
        <>
          <MediaQuery styles={{ display: "none" }}>
            <FEMainNavbar menus={switchMenus[role] || studentMenus} />
          </MediaQuery>
        </>
      }
    >
      <Stack className={`transition-all duration-150 mx-10 my-12`}>
        {typeof breadCrumbs !== "undefined" ? (
          <FEBreadCrumbs
            items={breadCrumbs}
            current={
              typeof breadCrumbsCurrentPage === "undefined"
                ? "Riwayat Tugas Akhir"
                : breadCrumbsCurrentPage
            }
          />
        ) : null}
        {children}
      </Stack>
    </AppShell>
  );
};
export default FEMainlayout;
