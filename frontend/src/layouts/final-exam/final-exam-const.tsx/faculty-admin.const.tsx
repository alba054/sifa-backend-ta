import {
  FECheckSquareOutlineForNavbar,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const facultyAdminMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.FACULTY_ADMIN_HOMEPAGE,
    },
    {
      icon: FECheckSquareOutlineForNavbar,
      label: "Persetujuan",
      href: FEROUTES.FACULTY_ADMIN_APPROVAL,
    },
  ],
  profileLink: FEROUTES.FACULTY_ADMIN_PROFILE,
};
