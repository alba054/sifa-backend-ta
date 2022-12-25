import { FECheckSquareOutlineForNavbar, HomeOutline } from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";

export const headAdministratorMenus: INavbarMenuItem[] = [
  {
    icon: HomeOutline,
    label: "Home",
    href: FEROUTES.HEAD_ADMINISTRATOR_HOMEPAGE,
  },
  {
    icon: FECheckSquareOutlineForNavbar,
    label: "Persetujuan",
    href: FEROUTES.HEAD_ADMINISTRATOR_APPROVAL,
  },
];