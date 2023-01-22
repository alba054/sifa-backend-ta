import {
  FECheckSquareOutlineForNavbar,
  FEReference,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const studyProgramAdminMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.STUDY_PROGRAM_ADMIN_HOMEPAGE,
    },
    {
      icon: FECheckSquareOutlineForNavbar,
      label: "Persetujuan",
      href: FEROUTES.STUDY_PROGRAM_ADMIN_APPROVAL,
    },
    {
      icon: FEReference,
      label: "Referensi",
      href: FEROUTES.STUDY_PROGRAM_ADMIN_REFERENCE,
    },
  ],
  profileLink: FEROUTES.STUDY_PROGRAM_ADMIN_PROFILE,
};
