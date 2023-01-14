import {
  FECheckSquareOutlineForNavbar,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const deanMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.DEAN_HOMEPAGE,
    },
    {
      icon: FECheckSquareOutlineForNavbar,
      label: "Persetujuan",
      href: FEROUTES.DEAN_APPROVAL,
    },
  ],
  profileLink: FEROUTES.DEAN_PROFILE,
};
