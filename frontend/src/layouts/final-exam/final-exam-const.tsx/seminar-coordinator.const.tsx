import { FESeminarCoordinator, HomeOutline } from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";

export const seminarCoordinatorMenus: INavbarMenuItem[] = [
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
];