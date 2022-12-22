import { FECheckSquareOutlineForNavbar, HomeOutline } from "src/assets/Icons/Fluent";
import { INavbarMenuItem } from "src/components/fe-components/navbars/FEMainNavbar.component";
import { FEROUTES } from "src/routes/final-exam.route";

export const firstViceDeanMenus: INavbarMenuItem[] = [
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