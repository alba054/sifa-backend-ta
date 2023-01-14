import {
  FEBookOutline,
  FECheckSquareOutlineForNavbar,
  FEGuidance,
  FESeminar,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const lecturerMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.LECTURER_HOMEPAGE,
    },
    {
      icon: FEGuidance,
      label: "Usulan",
      href: FEROUTES.LECTURER_HOMEPAGE_PROPOSAL,
    },
    {
      icon: FECheckSquareOutlineForNavbar,
      label: "Persetujuan",
      href: FEROUTES.LECTURER_HOMEPAGE_APPROVAL,
    },
    {
      icon: FESeminar,
      label: "Seminar",
      href: FEROUTES.LECTURER_HOMEPAGE_SEMINAR,
    },
    {
      icon: FEBookOutline,
      label: "Bimbingan",
      href: FEROUTES.LECTURER_HOMEPAGE_GUIDANCE,
    },
  ],
  profileLink: FEROUTES.LECTURER_HOMEPAGE_PROFIL,
};
