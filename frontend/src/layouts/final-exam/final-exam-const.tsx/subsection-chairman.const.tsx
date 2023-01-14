import {
  FECheckSquareOutlineForNavbar,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const subsectionChairmanMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.SUBSECTION_CHAIRMAN_HOMEPAGE,
    },
    {
      icon: FECheckSquareOutlineForNavbar,
      label: "Persetujuan",
      href: FEROUTES.SUBSECTION_CHAIRMAN_APPROVAL,
    },
  ],
  profileLink: FEROUTES.SUBSECTION_CHAIRMAN_PROFILE,
};
