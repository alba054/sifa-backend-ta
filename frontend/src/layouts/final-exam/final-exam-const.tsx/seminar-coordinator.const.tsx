import {
  FEReference,
  FESeminarCoordinator,
  HomeOutline,
} from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";
import { INavbarItemList } from "../FEMainLayout";

export const seminarCoordinatorMenus: INavbarItemList = {
  menus: [
    {
      icon: HomeOutline,
      label: "Home",
      href: FEROUTES.SEMINAR_COORDINATOR_HOMEPAGE,
    },
    {
      icon: FESeminarCoordinator,
      label: "Seminar",
      href: FEROUTES.SEMINAR_COORDINATOR_SEMINAR,
    },
    {
      icon: FEReference,
      label: "Referensi",
      href: FEROUTES.SEMINAR_COORDINATOR_REFERENCE,
    },
  ],
  profileLink: FEROUTES.SEMINAR_COORDINATOR_PROFILE,
};
